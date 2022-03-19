import { USER_SIGNIN_SAGA } from "../constants";

export const actionLogin = (email,password) => ({
  type: USER_SIGNIN_SAGA,
  userLogin: {
    email: email,
    password: password,
  }
})