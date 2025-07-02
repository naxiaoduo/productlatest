// Cloudflare Workers 代理脚本
// 用于保护 API 密钥并解决 CORS 问题

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const PRODUCT_HUNT_API_URL = 'https://api.producthunt.com/v2/api/graphql'
const API_TOKEN = 'YOUR_DEVELOPER_TOKEN' // 替换为你的 Product Hunt Developer Token

// 缓存时间 (秒)
const CACHE_TTL = 300 // 5分钟，减少缓存时间

async function handleRequest(request) {
  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return handleCors(request)
  }

  try {
    // 确保请求包含 JSON 主体
    let requestBody
    try {
      requestBody = await request.json()
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON in request" }), {
        status: 400,
        headers: corsHeaders()
      })
    }

    // 记录接收到的查询和变量
    console.log('收到查询:', requestBody.query)
    console.log('收到变量:', requestBody.variables)
    
    // 检查是否请求跳过缓存
    const skipCache = requestBody.skipCache === true
    
    // 尝试从缓存获取响应（除非明确要求跳过缓存）
    let cachedResponse = null
    if (!skipCache) {
      const cacheKey = getCacheKey(requestBody)
      cachedResponse = await getCachedResponse(cacheKey)
    }
    
    if (cachedResponse) {
      console.log('从缓存返回数据')
      return new Response(JSON.stringify(cachedResponse), {
        headers: corsHeaders()
      })
    }

    // 发送请求到 Product Hunt API
    const response = await fetch(PRODUCT_HUNT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: requestBody.query,
        variables: requestBody.variables
      })
    })

    // 检查HTTP状态
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API请求失败:', response.status, errorText)
      
      return new Response(JSON.stringify({
        errors: [{
          message: `API请求失败 (${response.status}): ${errorText}`
        }]
      }), {
        status: 502,
        headers: corsHeaders()
      })
    }

    // 获取响应数据
    const data = await response.json()
    console.log('API 响应:', data)
    
    // 缓存响应（除非明确要求跳过缓存）
    if (!skipCache && !data.errors) {
      const cacheKey = getCacheKey(requestBody)
      await cacheResponse(cacheKey, data)
    }

    // 返回带有 CORS 头的响应
    return new Response(JSON.stringify(data), {
      headers: corsHeaders()
    })
  } catch (err) {
    console.error('Worker 错误:', err)
    return new Response(JSON.stringify({ 
      errors: [{ message: err.message || '请求处理失败' }] 
    }), {
      status: 500,
      headers: corsHeaders()
    })
  }
}

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}

function handleCors(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}

// 生成缓存键
function getCacheKey(requestBody) {
  // 简单地使用查询和变量作为缓存键
  const { query, variables } = requestBody
  return `ph_api_${JSON.stringify(variables)}_${query.replace(/\s+/g, '')}`
}

// 从缓存获取响应
async function getCachedResponse(key) {
  try {
    const cached = await caches.default.match(new Request(`https://example.com/${key}`))
    if (cached) {
      const data = await cached.json()
      return data
    }
  } catch (e) {
    console.error('缓存读取错误:', e)
  }
  return null
}

// 缓存响应
async function cacheResponse(key, data) {
  try {
    const response = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${CACHE_TTL}`
      }
    })
    
    await caches.default.put(new Request(`https://example.com/${key}`), response)
  } catch (e) {
    console.error('缓存写入错误:', e)
  }
} 