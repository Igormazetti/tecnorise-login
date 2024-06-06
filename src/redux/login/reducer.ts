import { produce } from "immer";

type ActionType = {
  type: string;
  payload: {
    token: string;
    id: string;
  };
};

export type User = {
  token: string;
  id: string;
};

const initialState = { token: "", id: "" } as User;

export default function login(state = initialState, action: ActionType) {
  switch (action.type) {
    case "@login/USER_LOGIN_SUCCEEDED":
      return produce(state, (draft) => {
        const { token, id } = action.payload;
        draft.token = token;
        draft.id = id;
      });

    default:
      return state;
  }
}
