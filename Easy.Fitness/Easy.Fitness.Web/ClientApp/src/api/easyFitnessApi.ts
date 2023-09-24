import { post, put, get } from "./axiosSource";
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
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: string;
}
export interface UserInfoDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: string;
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
  cancellationSource?: CancellationSource
): Promise<UserDto> => {
  return post<UserDto>('api/v1/register', newUser, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const loginUser = async (
  userCredentials: LoginDto,
  cancellationSource?: CancellationSource
): Promise<TokenDto> => {
  return post<TokenDto>('api/v1/login', userCredentials, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
}

export const updateUser = async (
  userData: UserInfoDto,
  cancellationSource?: CancellationSource
): Promise<UserInfoDto> => {
  return put<UserInfoDto>('api/v1/user', userData, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const getUserInfo = async (
  cancellationSource?: CancellationSource
): Promise<UserInfoDto> => {
  return get<UserInfoDto>('api/v1/user', {
    cancelToken: cancellationSource?.tokenSource.token
  });
};