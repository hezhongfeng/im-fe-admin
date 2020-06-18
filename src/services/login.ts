import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/v1/login', {
    method: 'POST',
    data: params,
  });
}
