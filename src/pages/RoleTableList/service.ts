import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryRoles(params?: TableListParams) {
  const param = Object.assign(
    {
      pageNumber: params ? params.current : 1,
    },
    params,
  );
  delete param.current;
  const res = await request('/api/v1/admin/roles', {
    params: param,
  });
  return {
    data: res.data.rows,
    total: res.data.count,
    success: true,
  };
}
