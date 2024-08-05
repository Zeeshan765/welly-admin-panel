import { UserIcon,ClipboardDocumentIcon} from '@heroicons/react/24/outline';

const AdminSidebar = [
  {
    link: '/admin/users',
    name: 'users',
    title: 'Users',
    icon: UserIcon,
  },

  {
    link: '/admin/doctors',
    name: 'doctors',
    title: 'Doctors',
    icon: UserIcon,
  },
];

const DoctorSidebar = [
  {
    link: '/profile',
    name: 'profile',
    title: 'Profile',
    icon: UserIcon,
  },
  {
    link: '/appointments',
    name: 'appointments',
    title: 'Appointments',
    icon: ClipboardDocumentIcon,
  },
];

export { DoctorSidebar, AdminSidebar };
