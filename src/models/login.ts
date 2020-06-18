import { history, Reducer, Effect } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';

export interface StateType {
  status?: '0' | '1';
  errorMessage?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
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

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.statusCode === '0') {
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
      if (payload.roles) {
        setAuthority(payload.roles[0].keyName);
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
