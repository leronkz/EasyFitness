import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.PUBLIC_URL;

// const authorizationHeaderInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
//   const token = localStorage.getItem('token');
//   config.headers = {
//     ...config.headers,
//     Authorization: 'Bearer ' + token,
//   };
//   return config;
// }

// axios.interceptors.request.use(authorizationHeaderInterceptor);

export const isCancel = (error: any) => axios.isCancel(error);

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const { data } = await axios.get<T>(url, config);
  return data;
}

export const post = async<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.post<T>(url, data, config);
  return response.data;
}

export const put = async<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.put<T>(url, data, config);
  return response.data;
}

export const deletion = async<T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.delete<T>(url, config);
  return response.data;
}