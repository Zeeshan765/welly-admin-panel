import { lazy } from 'react';


const Users = lazy(() => import('../pages/Users'));
const Doctors = lazy(() => import('../pages/Doctors'));
const EditDoctor = lazy(() => import('../pages/Doctors/EditDoctor'));

const coreRoutes = [
  {
    path: '/admin/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/admin/doctors',
    title: 'Doctor',
    component: Doctors,
  },
  {
    path: '/admin/doctor/edit-doctor/:id',
    title: 'Edit Doctor',
    component: EditDoctor,
  },
  
];

const routes = [...coreRoutes];
export default routes;
