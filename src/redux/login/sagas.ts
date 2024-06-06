import { call, put, takeLatest } from "redux-saga/effects";
import { setUser } from "./actions";
import { client } from "../../client";
import { LOGIN } from "../../graphql/Query";

export type RegisterPayload = {
  type: string;
  payload: {
    username: string;
    password: string;
  };
};

function* login(action: RegisterPayload) {
  try {
    const { username, password } = action.payload;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const response = yield call(client.mutate, {
      mutation: LOGIN,
      variables: { usuario: username, password },
    });
    const token = response.data.login.token;
    const id = response.data.login.empresa.isn_empresa;

    yield put(setUser({ token, id }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put({ type: "USER_LOGIN_FAILED", message: e.message });
  }
}

export function* watchLogin() {
  yield takeLatest("@login/USER_LOGIN_REQUESTED", login);
}
