import axios from "axios";
import system_config from '@/system.config'
import { showLoading, hideLoading, errorLoading, successLoading } from "./popups";

const axios_instance = axios.create({
  baseURL: system_config.baseUrl,
  timeout: 60000
})

axios_instance.interceptors.request.use(
  (config) => {
    if (config.headers.showLoading) {
      showLoading();
    }
    return config;
  },
  (error) => {
    if (error.headers.showLoading) {
      hideLoading();
    }
    errorLoading()
    return Promise.reject(error);
  }
)

axios_instance.interceptors.response.use(
  (res) => {
    if (res.config.headers.showLoading) {
      hideLoading();
    }
    if(res.data.msg == 'success') {
      successLoading();
    }
    return Promise.resolve(res.data);
  },
  (error) => {
    if (error.config.headers.showLoading) {
      hideLoading();
    }
    errorLoading()
    return Promise.reject(error);
  }
)

export const request = e => {
  if (e.headers) e.headers.showLoading = true
  return axios_instance({
    method: e.method,
    url: e.url,
    headers: e.headers ? e.headers : {
      'Content-Type': 'application/json',
      showLoading: true,
    },
    data: e.data,
    params: e.params,
  });
};