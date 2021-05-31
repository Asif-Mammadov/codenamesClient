import axios from 'axios';
import Router from 'next/router';
import { API_BASE_URL } from '../constants/config';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
});

// Config
const ENTRY_ROUTE = '/';
const PUBLIC_REQUEST_KEY = 'public-request';

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    if (!config.headers[PUBLIC_REQUEST_KEY]) {
      Router.push(ENTRY_ROUTE);
      Router.reload();
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    console.log(error);
    Promise.reject(error);
  }
);

// API response interceptor
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
