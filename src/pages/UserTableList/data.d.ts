export interface TableListItem {
  id: number;
  disabled?: boolean;
  avatar: string;
  name: string;
  desc: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  mute?: boolean;
  roles: Array;
  roleIds: Array<number>;
  userStatus: {
    disabled: boolean;
    mute: boolean;
  };
  userInfo: {
    nickname: string;
    photo: string;
  };
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
