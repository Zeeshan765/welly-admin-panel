import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import apiService from '../../services/ApiService';
import CardCount from '../../components/CardOne';
import DoctorList from '../../components/doctors/DoctorList';
import AppointmentList from '../../components/appointments/AppointmentList';
interface UserData {
  name: string;
  email: string;
  role: any;
  status: string;
}
const AppointmentsListing = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [totalRecord, setTotalRecord] = useState(() => 0);

  const [loading, setLoading] = useState<boolean>(false);

//   const getApiData = async (params: any) => {
//     try {
//       setLoading(true);
//       const response = await apiService.get(
//         `users/getAllUsersWithPagination`,
//         params,
//       );
//       console.log('response', response);
//       const { user, totalUsers } = response?.data;
//       setTotalRecord(totalUsers);
//       setUserData(user);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log('error', error);
//     }
//   };

  //Pagination Logic here
//   const getPaginatedData = async (params: any) => {
//     try {
//       setLoading(true);
//       const response = await apiService.get(
//         `users/getAllUsersWithPagination`,
//         params,
//       );
//       console.log('paginated response', response);
//       // const { records, metadata } = response.data.data.users;
//       // setTotalRecord(metadata?.count);
//       // setUserData(records);
//       const { user } = response?.data;
//       setUserData(user);
//     } catch (error) {
//       setLoading(false);
//       console.log('error', error);
//     }
//   };

  return (
    <>
      <Breadcrumb pageName="Appointments" parentName="AppointmentManagement /" />
    
      <div className="flex flex-col gap-10 mt-10">
        <AppointmentList
          loading={loading}
          setLoading={setLoading}
          //   @ts-ignore
          userData={userData}
        //   getApiData={getApiData}
        //   getPaginatedData={getPaginatedData}
        />
      </div>
    </>
  );
};

export default AppointmentsListing;
