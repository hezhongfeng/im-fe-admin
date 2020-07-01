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
  async get(url: string, params: any = {}) {
    const response = await request(url, { params });
    return responseHandle(response);
  },
  async post(url: string, params: any = {}) {
    const response = await request(url, {
      method: 'POST',
      data: {
        ...params,
      },
    });
    return responseHandle(response);
  },
  async put(url: string, params: any = {}) {
    const response = await request(url, {
      method: 'PUT',
      data: {
        ...params,
      },
    });
    return responseHandle(response);
  },
  async delete(url: string, params: any = {}) {
    const response = await request(url, {
      method: 'DELETE',
      data: {
        ...params,
      },
    });
    return responseHandle(response);
  },
};
