import { useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';
import apiService from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await apiService.post('users/login', values);
      console.log('response', response);
      let { access_token, role, status, userId, first_name,isSubmitted} =
        response?.data;
      console.log('status',response?.data);

      if (role !== 'admin' && role !== 'doctor') {
        toast.error('Invalid Credentials');
        setLoading(false);
        return;
      }

      if ((response.data.success && role === 'admin') || role === 'doctor') {
        const rolePrefix = role === 'admin' ? 'admin' : 'doctor';

        localStorage.setItem(
          `${rolePrefix}_jwt_access_token`,
          JSON.stringify(access_token),
        );
        localStorage.setItem(`${rolePrefix}_role`, role);
        localStorage.setItem(`${rolePrefix}_id`, userId);
        localStorage.setItem(`${rolePrefix}_status`, status);
        localStorage.setItem(`${rolePrefix}_first_name`, first_name);
        localStorage.setItem(`${rolePrefix}_isSubmitted`, isSubmitted);
        // axios.defaults.headers.common['Authorization'] = token;
        toast.success('Login Successfully');

        let docUrl = '';
        if (role === 'doctor') {
          docUrl = status != 'active' ? '/information' : '/profile';
        }

        let url = role === 'admin' ? '/admin/users' : docUrl;

        navigate(url);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error('Unable to Login');
    }
  };

  return (
    <>
      <LoginForm handleLogin={handleLogin} loading={loading} />
    </>
  );
};

export default SignIn;
