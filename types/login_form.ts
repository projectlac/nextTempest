export interface LoginForm {
  username: string;
  password: string;
}
export interface ParamChangePassword {
  email: string;
  temporaryPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface RegisterForm {
  username: string;
  password: string;
  email: string;
}
