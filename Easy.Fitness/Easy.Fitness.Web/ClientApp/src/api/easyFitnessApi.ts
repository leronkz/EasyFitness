import { post } from "./axiosSource";
import { CancellationSource } from "./models/CancelationSource";

export interface RegisterDto {
  email: string;
  password: string;
  repeatPassword: string;
}
export interface UserDto {
  id: string;
  email: string;
  password: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface TokenDto {
  accessToken: string;
}

export interface Error {
  code: string,
  response: any;
  message: string;
  status: number;
}

export const registerUser = async (
  newUser: LoginDto,
  cancelationSource?: CancellationSource
): Promise<UserDto> => {
  return post<UserDto>('api/v1/register', newUser, {
    cancelToken: cancelationSource?.tokenSource.token
  });
};

export const loginUser = async (
  userCredentials: LoginDto,
  cancelationSource?: CancellationSource
): Promise<TokenDto> => {
  return post<TokenDto>('api/v1/login', userCredentials, {
    cancelToken: cancelationSource?.tokenSource.token
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
}