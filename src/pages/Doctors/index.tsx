import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import apiService from '../../services/ApiService';
import CardCount from '../../components/CardOne';
import DoctorList from '../../components/doctors/DoctorList';
interface UserData {
  name: string;
  email: string;
  role: any;
  status: string;
}
const Doctors = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [totalRecord, setTotalRecord] = useState(() => 0);

  const [loading, setLoading] = useState<boolean>(false);

  const getApiData = async (params: any) => {
    try {
      setLoading(true);
      const response = await apiService.get(
        `users/getAllUsersWithPagination`,
        params,
      );
      console.log('response', response);
      const { user, totalUsers } = response?.data;
      setTotalRecord(totalUsers);
      setUserData(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  //Pagination Logic here
  const getPaginatedData = async (params: any) => {
    try {
      setLoading(true);
      const response = await apiService.get(
        `users/getAllUsersWithPagination`,
        params,
      );
      console.log('paginated response', response);
      // const { records, metadata } = response.data.data.users;
      // setTotalRecord(metadata?.count);
      // setUserData(records);
      const { user } = response?.data;
      setUserData(user);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Doctors" parentName="DoctorManagement /" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardCount name={'Doctors'} totalReacord={totalRecord} />
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <DoctorList
          loading={loading}
          setLoading={setLoading}
          //   @ts-ignore
          userData={userData}
          getApiData={getApiData}
          getPaginatedData={getPaginatedData}
        />
      </div>
    </>
  );
};

export default Doctors;
