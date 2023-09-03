import axios, { AxiosError } from "axios";
import QueryString from "qs";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.paramsSerializer = {
  serialize: (params) => {
    return QueryString.stringify(params, {
      allowDots: true,
      arrayFormat: "indices",
    });
  },
};

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest) {
      // call API refresh token
      return axios.request(originalRequest);
    }

    return Promise.reject(error);
  },
);
