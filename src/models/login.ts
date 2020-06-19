import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';

export interface StateType {
  status?: '0' | '1';
  errorMessage?: string;
  currentAuthority?: Array<object>;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

function isAdmin(roles: Array<string>): boolean {
  return roles.some((item: string) => item === 'admin');
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // 处理权限问题
      if (response.data && response.data.roles) {
        response.data.roles = response.data.roles.map((item: any) => item.keyName);
        // 没有admin权限的话手动赋值错误信息
        if (!isAdmin(response.data.roles)) {
          response.errorMessage = '权限错误';
          response.statusCode = '1';
        }
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.statusCode === '0' && isAdmin(response.data.roles)) {
        history.replace('/');
      }
    },

    logout() {
      history.replace({
        pathname: '/user/login',
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.data && payload.data.roles) {
        setAuthority(payload.data.roles);
      }

      return {
        ...state,
        status: payload.statusCode,
        errorMessage: payload.errorMessage,
      };
    },
  },
};

export default Model;
