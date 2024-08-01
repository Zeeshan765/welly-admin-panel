import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import UserList from '../../components/users/UserList';
import apiService from '../../services/ApiService';
import CardCount from '../../components/CardOne';
interface UserData {
  name: string;
  email: string;
  role: any;
}
const Users = () => {
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

      const { user } = response?.data;
      setUserData(user);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Users" parentName="UserManagement /" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardCount name={'Users'} totalReacord={totalRecord} />
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <UserList
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

export default Users;
