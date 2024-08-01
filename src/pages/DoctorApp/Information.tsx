import { useState } from 'react';
import UnderlineTabs from '../../components/UnderlineTabs';

import ImagesComponent from '../../components/doctorPanel/ImagesComponent';
import toast from 'react-hot-toast';
import apiService from '../../services/ApiService';

const Information = () => {
  const id = localStorage.getItem('doctor_id');
  const flagValue = localStorage?.getItem('flag');
  console.log('flagValue', flagValue);
  let flag = false;
  // @ts-ignore
  if (flagValue == 1) {
    flag = true;
  }

  const [consultations, setConsultations] = useState([]);
  const [profile, setProfile] = useState({});
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loadSpin, setLoadSpin] = useState(false);

  const handleProfile = async (values: any) => {
    const { qualification, specialization, experience, ...rest } = values;

    const updatedData = {
      ...rest,
      qualification: [qualification],
      consultation: [specialization],
      experience: [experience],
    };
    setProfile(updatedData);
  };

  const handleDataSubmit = async () => {
    try {
      setLoadSpin(true);
      const newData = {
        id,
        ...profile,
        cover_image: coverImageUrl,
        profile_image: profileImageUrl,
        schedule: consultations,
      };
      const res = await apiService.post('users/updateUser', newData);
      console.log('res', res);
      if (res.status === 201) {
        toast.success('Doctor Info Updated Successfully');
        localStorage.setItem('flag', '1');
        setLoadSpin(false);
        
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Unable to Update Doctor');
      setLoadSpin(true);
    }
  };

  return (
    <>
      {flag ? (
        <>
          <div className="flex w-full border-l-6 mt-10 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                  fill="#FBBF24"
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                Attention needed
              </h5>
              <p className="leading-relaxed text-[#D0915C]">
                Your profile is currently under review. Once the admin approves
                your profile, you will be able to continue working on the panel.
                Thank you for your patience.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto">
            {/* <!-- Alerts Item --> */}
            <div className="flex w-full border-l-6 mt-10 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                    fill="#FBBF24"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                  Attention needed
                </h5>
                <p className="leading-relaxed text-[#D0915C]">
                  Your profile is currently under review. Please Fill all the
                  remaining Details. Thanks
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-sm border mt-10 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <ImagesComponent
                coverImageUrl={coverImageUrl}
                profileImageUrl={profileImageUrl}
                setProfileImageUrl={setProfileImageUrl}
                setCoverImageUrl={setCoverImageUrl}
              />

              <div className="mt-10">
                <UnderlineTabs
                  handleProfile={handleProfile}
                  consultations={consultations}
                  setConsultations={setConsultations}
                  handleDataSubmit={handleDataSubmit}
                  loadSpin={loadSpin}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Information;
