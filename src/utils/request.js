import axios from "axios";
import system_config from '@/system.config'

const axios_instance = axios.create({
  baseURL: system_config.baseUrl,
  timeout: 60000
})

// axios_instance.interceptors.request.use()

// axios_instance.interceptors.response.use()

export const request = e => {
  if(e.headers) e.headers.showLoading = true
  return axios_instance({
    method: e.method,
    url: e.url,
    headers: e.headers?e.headers:{
      'Content-Type': 'application/json',
      showLoading: true,
    },
    data: e.data,
    params: e.params,
  });
};