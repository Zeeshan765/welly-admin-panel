import Breadcrumb from '../../components/Breadcrumb';
import { useState } from 'react';
import DoctorForm from '../../components/doctors/DoctorForm';
import toast from 'react-hot-toast';
import apiService from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const EditDoctor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const EditData = async (data: any, id: number) => {
    setLoading(true);

    const { qualification, specialization, experience, ...rest } = data;

    const updatedData = {
      id,
      ...rest,
      qualification: [qualification],
      consultation: [specialization],
      experience: [experience],
    };
    try {
      const res = await apiService.post('users/updateUser', updatedData);
      if (res.status === 201) {
        toast.success('Doctor Updated Successfully');
        navigate('/admin/doctors');
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName={'Edit Doctor'} parentName={'DoctorManagement'} />

      <div className="grid grid-cols-1 ">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Doctor
              </h3>
            </div>

            <DoctorForm EditData={EditData} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDoctor;
