/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  console.log('errorHandler');
  const { response } = error;
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request.use(async (ctx, next) => {
//   await next();
//   const { res } = ctx;
//   if (res.statusCode !== '0') {
//     throw res;
//   }
//   console.log(res);
// });

const responseHandle = (response: any) => {
  return new Promise((resolve, reject) => {
    const { data } = response;
    if (response.statusCode === '0') {
      resolve(data);
    } else {
      reject(response);
    }
  });
};

export default {
  async get(url: string, params: any) {
    const response = await request(url, { params });
    return responseHandle(response);
  },
  async post(url: string, params: any) {
    const response = await request(url, {
      method: 'POST',
      data: {
        ...params,
      },
    });
    return responseHandle(response);
  },
  // async put(url, params) {
  //   addDefaultParams(params);
  //   add();
  //   let host = store.getters.current.host || '';
  //   let response = await axios.put(host + url, params);
  //   minus();
  //   return responseHandle(response);
  // },
  // async delete(url, params) {
  //   addDefaultParams(params);
  //   add();
  //   let host = store.getters.current.host || '';
  //   let response = await axios.delete(host + url, { data: params });
  //   minus();
  //   return responseHandle(response);
  // },
};

// export default request;
