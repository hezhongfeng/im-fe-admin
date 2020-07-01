import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin, fakeAccountLogout } from '@/services/login';
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
      try {
        const data = yield call(fakeAccountLogin, payload);
        // 处理权限问题
        if (data.roles) {
          data.roles = data.roles.map((item: any) => item.keyName);
          // 没有admin权限显示出提示信息
          if (!isAdmin(data.roles)) {
            data.statusCode = '1';
            data.errorMessage = '权限错误，您不具备管理权限';
            yield put({
              type: 'changeLoginStatus',
              payload: data,
            });
            return;
          }
          yield put({
            type: 'changeLoginStatus',
            payload: data,
          });
        }

        // 登录成功且权限验证正确
        history.replace('/');
      } catch (error) {
        // 处理账号密码错误等问题
        yield put({
          type: 'changeLoginStatus',
          payload: error,
        });
      }
    },

    *logout(action, { call, put }) {
      yield call(fakeAccountLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          roles: [],
        },
      });
      history.replace({
        pathname: '/user/login',
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.roles) {
        setAuthority(payload.roles);
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
