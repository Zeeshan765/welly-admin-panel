import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import Pagination from '../Pagination';
import AppointmentTable from '../AppointmentTable';

type UserData = {
  name: string;
  email: string;
  role: any;
};

interface Props {
  loading: boolean;
  setLoading: (value: boolean) => void;
  userData: UserData;
  getApiData: any;
  getPaginatedData: any;
}

const AppointmentList = ({
  loading,
  userData,
  // getApiData,
  // getPaginatedData,
}: Props) => {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState('');

  const [search, setSearch] = useState<any>({
    name: '',
    email: '',
    role: '',
  });
  const [page, setPage] = useState(() => 1);
  const [resultPerPage, setResultPerPage] = useState(() => 10);

  const [req, setReq] = useState(false);

  const [defaultPageOneReq, setDefaultPageOneReq] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<any>({});

  //Function to handle change in Search Input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle change in role select
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSearch((prev: any) => ({
      ...prev,
      roles: value,
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle clear button click
  const handleClear = () => {
    setSearch((prevState: any) => ({
      ...prevState,
      roles: '',
    }));
    debouncedDefaultPageOneCallApi();
  };

  useEffect(() => {
    if (page && resultPerPage && page > 0 && resultPerPage > 0) {
      //function to call api for data
      let searchObj = {
        ...search,
        role: 'doctor',
        page,
        page_size: resultPerPage,
        ...sortedInfo,
      };
      Object.keys(searchObj).forEach((el: any) => {
        !searchObj[el] && delete searchObj[el];
      });
      // getApiData(searchObj);
    }
  }, [req]);

  useEffect(() => {
    debouncedCallApi();
  }, [search]);

  useEffect(() => {
    let paramsPage = 1;
    if (paramsPage && resultPerPage && paramsPage > 0 && resultPerPage > 0) {
      let searchObj = {
        ...search,
        role: 'doctor',
        page: paramsPage,
        page_size: resultPerPage,
        ...sortedInfo,
      };
      Object.keys(searchObj).forEach((el: any) => {
        !searchObj[el] && delete searchObj[el];
      });
      // getPaginatedData(searchObj);
      setPage(1);
    }
  }, [defaultPageOneReq]);

  //Debounce call for simple api
  const [debouncedCallApi] = useState(() =>
    _.debounce(() => setReq((prev) => !prev), 1000),
  );

  //Debounce call for default page  api
  const [debouncedDefaultPageOneCallApi] = useState(() =>
    _.debounce(() => setDefaultPageOneReq((prev) => !prev), 1000),
  );

  useEffect(() => {
    debouncedCallApi();
  }, [sortedInfo]);

  // Sorting Functionality
  const handleSort = (column: keyof UserData) => {
    let direction: any = 'asc';
    if (sortedInfo?.sort_by === column) {
      direction = sortedInfo?.sort_order === 'asc' ? 'desc' : '';
    }
    setSortedInfo({ sort_by: direction ? column : '', sort_order: direction });
  };

  //PopOver Open
  const handlePopup = (id: string) => {
    setOpen(id);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <AppointmentTable
          handleChange={handleChange}
          userData={userData}
          handleClear={handleClear}
          handleRoleChange={handleRoleChange}
          handlePopup={handlePopup}
          handleSort={handleSort}
          search={search}
          open={open}
          sortedInfo={sortedInfo}
          loading={loading}
          // getApiData={getApiData}
          // getPaginatedData={getPaginatedData}
          debouncedCallApi={debouncedCallApi}
          debouncedDefaultPageOneCallApi={debouncedDefaultPageOneCallApi}
        />
      </div>
      {/* Pagination controls */}
      <Pagination
        page={page}
        setPage={setPage}
        resultPerPage={resultPerPage}
        debouncedCallApi={debouncedCallApi}
        setResultPerPage={setResultPerPage}
      />
    </div>
  );
};

export default AppointmentList;
