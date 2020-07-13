export interface ListItemDataType {
  id: number;
  name: string;
  keyName: string;
  desc: string;
  updatedAt: Date;
  createdAt: Date;
  rightIds: Array<any>;
  rights: Array<{
    name: string;
    id: string;
    keyName: string;
  }>;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}
