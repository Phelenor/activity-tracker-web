const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";

export const getUserToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setUserToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeUserToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const setUserId = (id: string) => {
  localStorage.setItem(USER_ID_KEY, id);
};

export const removeUserId = () => {
  localStorage.removeItem(USER_ID_KEY);
};
