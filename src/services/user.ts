import http from '@/utils/http';

export async function query(): Promise<any> {
  // return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return http.get('/api/v1/currentUser', {});
}

export async function queryNotices(): Promise<any> {
  // return request('/api/notices');
}
