# Product Hunt 卡片生成器部署教程

这个教程将帮助你从零开始部署 Product Hunt 卡片生成器，包括前端应用和后端 API。本教程面向零基础用户，我们会一步一步解释每个操作。

## 目录
- [准备工作](#准备工作)
- [部署 Cloudflare Worker (API)](#部署-cloudflare-worker-api)
- [部署前端应用到 Cloudflare Pages](#部署前端应用到-cloudflare-pages)
- [域名设置（可选）](#域名设置可选)
- [本地开发（可选）](#本地开发可选)
- [常见问题排查](#常见问题排查)

## 准备工作

### 1. 创建必要的账号

在开始部署之前，你需要注册以下账号：

- **GitHub 账号**：[https://github.com/signup](https://github.com/signup)
- **Cloudflare 账号**：[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
- **Product Hunt 开发者账号**：[https://api.producthunt.com/v2/oauth/applications](https://api.producthunt.com/v2/oauth/applications)

### 2. 获取 Product Hunt API Token

1. 登录 [Product Hunt API Dashboard](https://api.producthunt.com/v2/docs)
2. 点击 "My Applications"
3. 点击 "Add an application"
4. 填写应用信息：
   - 名称：可以填写 "Product Hunt Card Generator"
   - Redirect URI：填写你的域名，如 `https://你的域名.com`（如果没有域名，可以先填写 `https://ph-cards.pages.dev`，之后再修改）
5. 创建应用后，记下以下信息：
   - API Key
   - API Secret
   - Developer Token

### 3. 安装必要的软件（仅本地开发需要）

如果你想在本地开发或测试项目，需要安装以下软件：

- **Node.js**：[https://nodejs.org/](https://nodejs.org/) (推荐安装 LTS 版本)
- **Git**：[https://git-scm.com/downloads](https://git-scm.com/downloads)

## 部署 Cloudflare Worker (API)

Cloudflare Worker 用于中转 API 请求，保护你的 API 密钥不被暴露。

### 1. 登录 Cloudflare Dashboard

访问 [https://dash.cloudflare.com](https://dash.cloudflare.com) 并登录你的账号。

### 2. 创建 Worker

1. 点击左侧导航栏中的 "Workers & Pages"
2. 点击 "Create application"
3. 选择 "Create Worker"
4. 给你的 Worker 起个名字，如 "ph-api-proxy"
5. 点击 "Deploy" 按钮

### 3. 编辑 Worker 代码

1. Worker 创建成功后，点击 "Quick edit"
2. 删除编辑器中的全部默认代码
3. 粘贴以下代码（记得替换 `YOUR_DEVELOPER_TOKEN`）：

```js
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
```

4. 将代码中的 `YOUR_DEVELOPER_TOKEN` 替换为你之前获取的 Product Hunt Developer Token
5. 点击 "Save and Deploy" 保存并部署代码
6. 部署成功后，记下你的 Worker URL，例如：`https://ph-api-proxy.username.workers.dev`

## 部署前端应用到 Cloudflare Pages

### 1. 创建 GitHub 仓库

1. 登录你的 GitHub 账号
2. 点击右上角的 "+" 图标，选择 "New repository"
3. 填写仓库信息：
   - 仓库名称：如 "product-hunt-cards"
   - 描述（可选）
   - 选择 "Public"（公开）
   - 勾选 "Add a README file"
4. 点击 "Create repository"

### 2. 获取项目代码

获取项目代码有两种方式：可以从已有项目复制，或者从头开始创建。

#### 方法一：从已有项目复制（推荐）

1. 克隆或下载本项目的所有文件
2. 确保项目结构正确，包含以下文件和目录：
   - `src/` 目录（包含所有源代码文件）
   - `public/` 目录（包含静态资源）
   - `index.html`
   - `package.json`
   - `vite.config.js`
   - `tailwind.config.js`
   - `.gitignore`
   - `README.md`

#### 方法二：从头开始创建（需要基本的开发知识）

1. 安装 Node.js 和 npm（上面已经提到）
2. 创建一个新的 Vite 项目：
   ```bash
   npm create vite@latest product-hunt-cards -- --template react
   cd product-hunt-cards
   ```
3. 安装必要的依赖：
   ```bash
   npm install react-router-dom html-to-image axios @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome react-colorful
   npm install -D tailwindcss postcss autoprefixer daisyui
   ```
4. 初始化 TailwindCSS：
   ```bash
   npx tailwindcss init -p
   ```
5. 然后你需要根据项目要求创建所有必要的组件和文件

### 3. 上传项目代码

方法一：使用 GitHub Desktop（推荐新手使用）

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 打开 GitHub Desktop 并登录你的 GitHub 账号
3. 点击 "Clone a Repository"，选择你刚才创建的仓库
4. 点击 "Clone"
5. 将本项目的所有文件复制到你克隆的仓库文件夹中
6. 在 GitHub Desktop 中，你会看到变更列表
7. 在左下角填写 commit 信息，如 "Initial commit"
8. 点击 "Commit to main"
9. 点击右上角的 "Push origin" 上传代码

方法二：使用命令行（适合有经验的用户）

```bash
# 克隆你的空仓库
git clone https://github.com/你的用户名/product-hunt-cards.git

# 进入仓库目录
cd product-hunt-cards

# 复制项目文件到此目录

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到远程仓库
git push origin main
```

### 4. 修改 API 代理地址

在推送代码之前，需要修改 `src/services/productHuntApi.js` 文件：

1. 打开 `src/services/productHuntApi.js` 文件
2. 找到以下代码行：
   ```javascript
   const API_PROXY_URL = 'https://ancient-frost-fcff.mengchenmo.workers.dev';
   ```
3. 将这个 URL 替换为你的 Cloudflare Worker URL：
   ```javascript
   const API_PROXY_URL = 'https://你的worker名称.你的用户名.workers.dev';
   ```
4. 保存文件并提交更改：
   ```bash
   git add src/services/productHuntApi.js
   git commit -m "更新 API 代理地址"
   git push origin main
   ```

### 5. 在 Cloudflare Pages 中部署前端应用

1. 登录 Cloudflare Dashboard
2. 点击左侧导航栏中的 "Workers & Pages"
3. 点击 "Create application"
4. 选择 "Pages" 选项卡
5. 点击 "Connect to Git"
6. 授权 Cloudflare 访问你的 GitHub 账号
7. 选择你上传项目代码的仓库 
8. 点击 "Begin setup"
9. 填写部署信息：
   - 项目名称：如 "ph-cards"
   - 生产分支：main
   - 构建设置：
     - 构建命令：`npm install && npm run build`
     - 构建输出目录：`dist`
     - 框架预设：Vite
10. 点击 "Save and Deploy"

### 6. 等待部署完成

Cloudflare Pages 会自动进行以下操作：
- 从 GitHub 拉取你的代码
- 安装依赖 (`npm install` 或 `yarn install`)
- 构建项目 (`npm run build` 或 `yarn build`)
- 部署到 CDN

部署完成后，你会看到 "Success" 状态，同时得到一个 `*.pages.dev` 的访问地址。

## 域名设置（可选）

如果你想使用自己的域名，而不是 Cloudflare 提供的 `*.pages.dev` 域名：

1. 在 Cloudflare Dashboard 中点击你的 Pages 项目
2. 点击 "Custom domains" 选项卡
3. 点击 "Set up a custom domain"
4. 输入你想使用的域名（该域名需要已经添加到 Cloudflare 账号下）
5. 点击 "Continue"
6. 按照向导完成设置

## 本地开发（可选）

如果你想在本地开发和测试项目，按照以下步骤操作：

### 1. 安装依赖

在项目根目录下运行：

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

这会启动一个本地开发服务器，通常在 `http://localhost:5173` 或 `http://localhost:3000`。

### 3. 构建项目

当你完成开发后，可以构建项目：

```bash
npm run build
```

这会在 `dist` 目录下生成静态文件，你可以将这些文件部署到任何静态网站托管服务。

### 4. 预览构建结果

```bash
npm run preview
```

这会启动一个本地服务器来预览构建结果。

## 常见问题排查

### 1. Worker 部署失败

- **问题**: Worker 代码部署失败或报错
- **解决方案**:
  - 确保 Worker 代码语法正确，没有多余的字符
  - 确认 Product Hunt Developer Token 是否正确
  - 检查 Cloudflare 账号是否有足够的权限

### 2. Pages 构建失败

- **问题**: 前端项目构建失败
- **解决方案**:
  - 检查构建命令和输出目录是否正确
  - 查看构建日志找出错误原因
  - 确保 `package.json` 中的依赖版本兼容
  - 尝试在本地运行 `npm run build` 先排查错误

### 3. API 调用失败

- **问题**: 无法获取 Product Hunt 数据
- **解决方案**:
  - 确认 Worker URL 正确无误
  - 在浏览器控制台查看网络请求和错误信息
  - 验证 Product Hunt Developer Token 是否过期
  - 检查 Worker 日志是否有错误信息
  - 尝试直接访问 Worker URL，如果返回错误，则表明 Worker 配置有问题

### 4. 导出图片出错

- **问题**: 无法导出图片或图片显示异常
- **解决方案**:
  - 确保浏览器支持现代 JavaScript 功能
  - 尝试降低导出图片的分辨率
  - 如果是图片背景透明问题，检查导出格式是否为 PNG
  - 对于较大的图片，可能需要增加处理等待时间

### 5. 前端样式加载失败

- **问题**: 页面显示没有样式或布局错乱
- **解决方案**:
  - 确认是否正确配置了 TailwindCSS
  - 检查构建输出目录是否包含 CSS 文件
  - 查看浏览器控制台是否有 404 错误

## 总结

恭喜你！现在你应该有一个完全部署好的 Product Hunt 卡片生成器，包括：
- 一个托管在 Cloudflare Worker 上的 API 代理
- 一个托管在 Cloudflare Pages 上的前端应用

你可以访问你的 Pages URL 或自定义域名来使用这个应用。如果未来需要更新应用，只需将新代码推送到 GitHub 仓库即可，Cloudflare Pages 会自动重新构建和部署。

## 前端应用功能简介

部署完成后，你的应用将提供以下功能：

1. **输入 Product Hunt URL**：输入任何 Product Hunt 产品链接
2. **生成精美卡片**：自动提取产品信息，生成展示卡片
3. **自定义卡片样式**：
   - 选择不同的框架样式（简洁、窗口、复古等）
   - 选择背景类型和颜色
   - 调整阴影效果和卡片比例
   - 显示/隐藏 Logo、标语和水印
4. **导出设置**：
   - 选择导出格式（PNG、JPEG、WebP）
   - 调整图片质量（50%-100%）
   - 选择分辨率（1x-4x）
5. **一键导出**：下载精美的产品展示卡片

祝你使用愉快！如果有任何问题，可以查看上面的常见问题排查部分，或者向我们寻求帮助。  