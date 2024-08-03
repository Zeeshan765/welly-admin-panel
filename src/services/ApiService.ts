import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode';

class APIService {
  get = (url: any, data: any) => axiosInstance.get(url, { params: data });
  post = (url: any, data: any) => axiosInstance.post(url, data);
  postImage = (url: any, data: any, header: any) =>
    axiosInstance.post(url, data, header);
  put = (url: any, data: any) => axiosInstance.put(url, data);
  delete = (url: any, data: any) => axiosInstance.delete(url, { params: data });

  // Check User Log or not
  isLoggedIn = () => {
    const adminToken = localStorage.getItem('admin_jwt_access_token');
    const doctorToken = localStorage.getItem('doctor_jwt_access_token');
    return adminToken || doctorToken ? true : false;
  };

  //Get Logged In user
  getLoggedInUser = (jwt: any) => {
    try {
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
}

let apiService = new APIService();
export default apiService;
