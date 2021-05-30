import axios from 'axios';
import Router from 'next/router';
import { AUTH_TOKEN, USER_ID } from '../store/constants/Auth';
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
    const jwtToken = localStorage.getItem(AUTH_TOKEN);

    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
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
  const res = response.data;

  if (res.status === 'success') {
    return res;
  } else {
    // Remove token and redirect
    if (status === 400 || status === 408) {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER_ID);
      Router.push(ENTRY_ROUTE);
      Router.reload();
    }

    return Promise.reject(res.message);
  }
});

export default service;
