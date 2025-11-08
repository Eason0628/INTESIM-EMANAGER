1.http.js
    config 是 Axios 请求配置对象，它包含了发送 HTTP 请求时的一些配置信息。你可以在 request 拦截器中获取到这个对象。它的结构如下：
    {
        url: '',                // 请求的 URL 地址
        method: '',             // 请求方法，如 'get', 'post' 等
        headers: {},            // 请求头
        params: {},             // 请求的 URL 参数（适用于 GET 请求）
        data: {},               // 请求的主体数据（适用于 POST 请求）
        timeout: 10000,         // 请求超时时间
        baseURL: '',            // 基础 URL
        responseType: '',       // 响应的数据类型
        auth: {},               // HTTP 基本认证信息
        maxRedirects: 5,        // 最大重定向次数
        transformRequest: [],   // 请求数据转换函数
        transformResponse: [],  // 响应数据转换函数
        // 其他与请求相关的配置项
    }
    
