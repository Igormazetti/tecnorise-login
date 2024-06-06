import { produce } from "immer";

type ActionType = {
  type: string;
  payload: {
    token: string;
    id: string;
    error?: boolean;
  };
};

export type User = {
  token: string;
  id: string;
  error: boolean;
};

const initialState = { token: "", id: "", error: false } as User;

export default function login(state = initialState, action: ActionType) {
  switch (action.type) {
    case "@login/USER_LOGIN_SUCCEEDED":
      return produce(state, (draft) => {
        const { token, id } = action.payload;
        draft.token = token;
        draft.id = id;
      });
    case "@login/USER_LOGIN_FAILED":
      return produce(state, (draft) => {
        const { error } = action.payload;
        draft.error = error ? error : false;
      });
    default:
      return state;
  }
}
