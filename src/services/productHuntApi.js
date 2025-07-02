import axios from 'axios';

// 使用 Cloudflare Workers 作为代理来保护 API 密钥
const API_PROXY_URL = 'https://shy-flower-3dce.mengchenmo.workers.dev'; // 已更新为您的Worker地址

// GraphQL 查询 - 使用正确的 post 字段而不是 product
const PRODUCT_QUERY = `
  query GetPost($slug: String!) {
    post(slug: $slug) {
      id
      name
      tagline
      description
      url
      thumbnail {
        url
      }
      media {
        type
        url
        videoUrl
      }
      votesCount
      commentsCount
    }
  }
`;

// 备用查询 - 如果上面的不起作用，可以尝试这个
const ALTERNATE_QUERY = `
  query SearchPosts($slug: String!) {
    posts(first: 1, order: RANKING, search: $slug) {
      edges {
        node {
          id
          name
          tagline
          description
          url
          thumbnail {
            url
          }
          media {
            type
            url
            videoUrl
          }
          votesCount
          commentsCount
        }
      }
    }
  }
`;

// 第三种查询方式 - 使用产品API
const PRODUCT_API_QUERY = `
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      tagline
      description
      website
      thumbnail {
        url
      }
      media {
        type
        url
        videoUrl
      }
      votesCount
      commentsCount
    }
  }
`;

// 默认示例产品 - 替代模拟数据
const DEFAULT_EXAMPLE = 'demodazzle';

/**
 * 获取 Product Hunt 产品数据
 * @param {string} slug - 产品的 slug
 * @param {boolean} skipCache - 是否跳过缓存，直接从API获取最新数据
 * @returns {Promise<Object>} - 产品数据
 */
export const fetchProductData = async (slug, skipCache = true) => {
  console.log('开始获取产品数据，slug:', slug, '跳过缓存:', skipCache);
  
  // 如果没有提供slug，使用默认示例
  if (!slug || slug.trim() === '') {
    slug = DEFAULT_EXAMPLE;
  }
  
  // 最大重试次数
  const MAX_RETRIES = 3;
  let retries = 0;
  
  const fetchWithRetry = async () => {
    try {
      console.log(`尝试获取产品数据 (尝试 ${retries + 1}/${MAX_RETRIES})`, slug);
      
      // 尝试所有可能的查询方式
      const methods = [
        { name: 'post查询', query: PRODUCT_QUERY, dataPath: ['data', 'post'] },
        { name: '搜索查询', query: ALTERNATE_QUERY, dataPath: ['data', 'posts', 'edges', 0, 'node'] },
        { name: '产品查询', query: PRODUCT_API_QUERY, dataPath: ['data', 'product'] }
      ];
      
      // 依次尝试每种查询方法
      for (const method of methods) {
        try {
          console.log(`尝试使用${method.name}`);
          
          const response = await axios.post(API_PROXY_URL, {
            query: method.query,
            variables: { slug },
            skipCache: skipCache // 添加跳过缓存选项
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000 // 10秒超时
          });
          
          // 检查是否有GraphQL错误
          if (response.data.errors) {
            const errorMessage = response.data.errors.map(err => err.message).join('; ');
            console.warn(`${method.name}错误:`, errorMessage);
            continue; // 尝试下一种方法
          }
          
          // 使用提供的数据路径获取产品数据
          let product = response.data;
          for (const key of method.dataPath) {
            if (product && product[key]) {
              product = product[key];
            } else {
              product = null;
              break;
            }
          }
          
          if (product) {
            console.log(`成功获取产品(使用${method.name}):`, product.name);
            console.log(`投票数: ${product.votesCount}, 评论数: ${product.commentsCount}`);
            
            // 处理数据格式
            return {
              id: product.id,
              name: product.name,
              tagline: product.tagline,
              description: product.description,
              logoUrl: product.thumbnail?.url || '',
              media: product.media?.map(m => m.url || m.videoUrl).filter(Boolean) || [],
              votesCount: product.votesCount || 0,
              commentsCount: product.commentsCount || 0,
              url: product.url || product.website || ''
            };
          }
        } catch (error) {
          console.warn(`${method.name}失败:`, error.message);
        }
      }
      
      // 如果所有方法都失败，抛出错误
      throw new Error('所有查询方法均失败');
    } catch (error) {
      retries++;
      
      if (retries < MAX_RETRIES) {
        console.log(`重试获取产品数据 (${retries}/${MAX_RETRIES})`);
        // 指数退避策略
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry();
      }
      
      // 如果重试次数用尽，抛出最终错误
      console.error('获取产品数据失败，已达到最大重试次数');
      throw error;
    }
  };
  
  try {
    return await fetchWithRetry();
  } catch (error) {
    // 如果是Axios错误，打印更详细的信息
    if (error.isAxiosError) {
      console.error('网络请求失败:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`网络请求失败: ${error.message}`);
    }
    
    console.error('获取产品数据失败:', error);
    throw error;
  }
}; 