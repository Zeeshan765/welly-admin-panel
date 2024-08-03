import axios from 'axios';
let token: any = localStorage.getItem('jwt_access_token');
let parseToken = JSON.parse(token);
axios.defaults.headers.common['Authorization'] = parseToken;
axios.defaults.baseURL = 'https://api-wellypsicologabackend-production.up.railway.app/';

// axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err?.response?.data?.message?.toLowerCase() ===
      'invalid authorization token'
    ) {
      localStorage.removeItem('jwt_access_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);
export default axios;
