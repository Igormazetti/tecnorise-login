export function setUser({ token, id }: { token: string; id: string }) {
  return {
    type: "@login/USER_LOGIN_SUCCEEDED",
    payload: { token, id },
  };
}

export const login = (username: string, password: string) => ({
  type: "@login/USER_LOGIN_REQUESTED",
  payload: { username, password },
});
