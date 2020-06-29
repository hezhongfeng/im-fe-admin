import http from '@/utils/http';
import { TableListParams } from './data';

export async function queryRoles(params?: TableListParams) {
  const param = Object.assign(
    {
      pageNumber: params ? params.current : 1,
    },
    params,
  );
  delete param.current;
  const data: any = await http.get('/api/v1/admin/roles', param);
  return {
    data: data.rows,
    total: data.count,
    success: true,
  };
}
