import axios from 'axios';
import Router from 'next/router';
import { AUTH_TOKEN } from '../store/constants/Auth';
import { API_BASE_URL } from '../constants/config';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
});

// Config
const ENTRY_ROUTE = '/';
const TOKEN_PAYLOAD_KEY = 'token';
const PUBLIC_REQUEST_KEY = 'public-request';

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN);

    if (!config.headers[TOKEN_PAYLOAD_KEY]) {
      config.headers[TOKEN_PAYLOAD_KEY] = jwtToken;
    }

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

  // Get response status code
  const statusCode = res.status.code;

  if (statusCode === 200) {
    return { response: res.response, successMessage: res.status.text };
  } else {
    // Remove token and redirect
    if (statusCode === 400 || statusCode === 408) {
      // notification.error({
      //   message: 'Authentication Fail',
      //   description: 'Please login again'
      // });
      localStorage.removeItem(AUTH_TOKEN);
      Router.push(ENTRY_ROUTE);
      Router.reload();
    }

    if (statusCode === 409) {
      // notification.error({ message: 'Bad request' });
    }

    if (statusCode === 410) {
      // notification.error({ message: 'Internal Server Error' });
    }

    return Promise.reject(Object.values(res.errors)); //Errors object to array
  }
});

export default service;
