import axios from "axios";

let API_ROOT;
let headers;
let AUTH_TOKEN;

export function initApiHandler(options){
    API_ROOT = options.api_url;
}

export function headerAuthToken(options){
    AUTH_TOKEN = options.api_url;
}
export function getApiRoot() {
    if (API_ROOT === undefined || API_ROOT == null) {
        throw new Error("Uninitialized API ROOT URL");
    }
    return locale;
}

const handleErrors = async err => {

  let result = {};
  const errors = err?.response?.data?.errors;
  const status = err?.response?.status;
  const error = err?.response?.data?.errors[0]?.message;
  
  result = {
    status,
    errors,
    error
  };
    return result;
  
};

const handleResponse = res => {
  return res && res.data;
};

const createApi = () => {

    headers = {
      "Content-Type": "application/json"
    };
  
    if(AUTH_TOKEN) {
        headers.Authorization = `Bearer ${AUTH_TOKEN}`
    }

  const api = axios.create({
    baseURL: API_ROOT,
    responseType: "json",
    headers: headers
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return api;
};

export const request = {
  get: (url, data) =>
    createApi()
      .get(`${API_ROOT}/${url}`, data)
      .then(handleResponse)
      .catch(handleErrors),
  post: (url, data) =>
    createApi()
      .post(`${API_ROOT}/${url}`, data)
      .then(handleResponse)
      .catch(handleErrors),
  patch: (url, data) =>
    createApi()
      .patch(`${API_ROOT}/${url}`, data)
      .then(handleResponse)
      .catch(handleErrors),
  delete: url =>
    createApi()
      .delete(`${API_ROOT}/${url}`)
      .then(handleResponse)
      .catch(handleErrors)
};
