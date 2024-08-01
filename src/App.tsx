import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import apiService from './services/ApiService';
import Information from './pages/DoctorApp/Information';
import DoctorProfile from './components/DoctorProfile';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const DoctorLayout = lazy(() => import('./layout/DoctorLayout'));
const PanelLayout = lazy(() => import('./layout/PanelLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const role = localStorage.getItem('admin_role');
  const docrole = localStorage.getItem('doctor_role');
  const status = localStorage.getItem('doctor_status');
  let isAdmin = false;
  let isDoctor = false;

  if (role == 'admin') {
    isAdmin = true;
  } else if (docrole == 'doctor') {
    isDoctor = true;
  }

  // useEffect(() => {
  //   if (pathname === '/register') {
  //     let url = '/register';
  //     navigate(url);
  //   }
  // }, []);

  let isLoggedIn = apiService.isLoggedIn();

  useEffect(() => {
    console.log('pathname', pathname);
    const isRegisterPage = pathname === '/register';
    if (!isLoggedIn) {
      if (!isRegisterPage) {
        return navigate('/login');
      }
      return navigate('/register');
    }
  }, [isLoggedIn]);


  // useEffect(() => {
  //   if (loading) return;

  //   const isLoginPage = pathname === '/login';
  //   const isRegisterPage = pathname === '/register';

  //   if (isLoggedIn) {
  //     if (isLoginPage || isRegisterPage) {
  //       navigate('/register');
  //     }
  //   } else {
  //     if (!isLoginPage && !isRegisterPage) {
  //       navigate('/login');
  //     }
  //   }
  // }, [isLoggedIn, pathname, navigate, loading]);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {isAdmin && (
          <Route element={<DefaultLayout />}>
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Route>
        )}

        {isDoctor && status !== 'active' && (
          <Route element={<DoctorLayout />}>
            <Route path="/information" element={<Information />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}

        {isDoctor && status == 'active' && (
          <Route element={<PanelLayout />}>
            <Route path="/profile" element={<DoctorProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
