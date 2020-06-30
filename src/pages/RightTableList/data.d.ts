export interface TableListItem {
  id: number;
  name: string;
  keyName: string;
  desc: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ItemDataType {
  id: string;
  name: string;
  keyName: string;
  desc: string;
  updatedAt: number;
  createdAt: number;
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
