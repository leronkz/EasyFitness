import { post, put, get, deletion } from "./axiosSource";
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
  code: string;
  response: any;
  message: string;
  status: number;
}
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
export interface UserParametersDto {
  weight?: number;
  height?: number;
}
export interface UserImageDto {
  fileBytes: string;
}
export interface ActivityDto {
  id?: string;
  date: string;
  type: string;
  name: string;
  calories: number;
  duration: string;
}
export interface DurationInterface {
  hours: number;
  minutes: number;
  seconds: number;
}
export interface ScheduleDto {
  id?: string;
  date: string;
  type: string;
  note: string;
}
export interface PageDto<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface FoodDto {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}
export interface DayDietDto {
  id?: string;
  date: string;
  calories?: number;
  fat?: number;
  carbs?: number;
  protein?: number;
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

export const changePassword = async (
  passwordDto: ChangePasswordDto,
  cancellationSource?: CancellationSource
): Promise<void> => {
  return put<void>('api/v1/user/password', passwordDto, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const updateUserParameters = async (
  userParameters: UserParametersDto,
  cancellationSource?: CancellationSource
): Promise<UserParametersDto> => {
  return put<UserParametersDto>('api/v1/user/parameters', userParameters, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const getUserParameters = async (
  cancellationSource?: CancellationSource
): Promise<UserParametersDto> => {
  return get<UserParametersDto>('api/v1/user/parameters', {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const changeUserPicture = async (
  formData: FormData,
  cancellationSource?: CancellationSource
): Promise<void> => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    cancelToken: cancellationSource?.tokenSource.token
  };
  return put<void>('api/v1/user/image', formData, config);
};

export const getUserPicture = async (
  cancellationSource?: CancellationSource
): Promise<UserImageDto> => {
  return get<UserImageDto>('api/v1/user/image', {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const deleteUserPicture = async (
  cancellationSource?: CancellationSource
): Promise<void> => {
  return deletion<void>('api/v1/user/image', {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const getUserAccountInfo = async (
  cancellationSource?: CancellationSource
): Promise<UserInfoDto> => {
  return get<UserInfoDto>('api/v1/user/account', {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const addNewActivity = async (
  newActivity: ActivityDto,
  cancellationSource?: CancellationSource
): Promise<ActivityDto> => {
  return post<ActivityDto>('api/v1/activity', newActivity, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const getActivityPage = async (
  count: number,
  isDescending: boolean,
  page: number,
  sortColumn: string,
  searchType?: string,
  searchDate?: string,
  cancellationSource?: CancellationSource
): Promise<PageDto<ActivityDto>> => {
  return get<PageDto<ActivityDto>>('api/v1/activity', {
    params: { count, isDescending, page, sortColumn, searchType, searchDate },
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const deleteActivity = async (
  id: string,
  cancellationSource?: CancellationSource
): Promise<void> => {
  return deletion<void>(`api/v1/activity/${id}`, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const updateActivity = async (
  id: string,
  activity: ActivityDto,
  cancellationSource?: CancellationSource
): Promise<ActivityDto> => {
  return put<ActivityDto>(`api/v1/activity/${id}`, activity, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const addNewSchedule = async (
  newSchedule: ScheduleDto,
  cancellationSource?: CancellationSource
): Promise<ScheduleDto> => {
  return post<ScheduleDto>('api/v1/schedule', newSchedule, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const getSchedulePage = async (
  count: number,
  isDescending: boolean,
  page: number,
  sortColumn: string,
  searchType?: string,
  searchDate?: string,
  cancellationSource?: CancellationSource
): Promise<PageDto<ScheduleDto>> => {
  return get<PageDto<ScheduleDto>>('api/v1/schedule', {
    params: { count, isDescending, page, sortColumn, searchType, searchDate },
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const deleteSchedule = async (
  id: string,
  cancellationSource?: CancellationSource
): Promise<void> => {
  return deletion<void>(`api/v1/schedule/${id}`, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const updateSchedule = async (
  id: string,
  schedule: ScheduleDto,
  cancellationSource?: CancellationSource
): Promise<ScheduleDto> => {
  return put<ScheduleDto>(`api/v1/schedule/${id}`, schedule, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};

export const setDietProperties = async (
  dietConfiguration: DayDietDto,
  cancellationSource?: CancellationSource
): Promise<DayDietDto> => {
  return post<DayDietDto>('api/v1/diet/properties', dietConfiguration, {
    cancelToken: cancellationSource?.tokenSource.token
  });
};