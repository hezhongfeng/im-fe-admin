// import { message } from 'antd';
import http from '@/utils/http';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return http.post('/api/v1/login', params);
}

export async function fakeAccountLogout() {
  return http.post('/api/v1/logout');
}
