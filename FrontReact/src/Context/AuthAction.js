export const LoginStart = (userInformations) => ({
  type: "LoginStart",
});
export const LoginSuccess = (user) => ({
  type: "LoginSucces",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LoginError",
  payload: error,
});
