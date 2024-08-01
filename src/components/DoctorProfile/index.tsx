import { useEffect, useState } from 'react';
import apiService from '../../services/ApiService';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import Breadcrumb from '../Breadcrumb';

const DoctorProfile = ({ handleProfile }: any) => {
  const id = localStorage.getItem('doctor_id');
  const [loading, setLoading] = useState(false);

  // Validation
  const validationSchema = yup.object({
    first_name: yup.string().required('First Name is Required'),
    last_name: yup.string().required('Last Name is Required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    specialization: yup.string().required('Specialization is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    phone: yup.string().required('Phone is required'),
    about: yup.string().required('About is required'),
    zip: yup.string().required('Zip is required'),
    qualification: yup.string().required('Qualification is required'),
    experience: yup.string().required('Experience is required'),
  });

  // Initial Values
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    specialization: '',
    qualification: '',
    experience: '',
    phone: '',
    about: '',
    zip: '',
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { qualification, specialization, experience, ...rest } = values;
      const updatedData = {
        id,
        ...rest,
        qualification: [qualification],
        consultation: [specialization],
        experience: [experience],
      };

      const res = await apiService.post('users/updateUser', updatedData);
      if (res.status === 201) {
        toast.success('Doctor Info Updated Successfully');
        localStorage.setItem('flag', '1');
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  // Data from Backend
  const getData = async () => {
    try {
      const res = await apiService.get(`users/getSingleUser?id=${id}`, {});
      const {
        first_name,
        last_name,
        email,
        address,
        city,
        country,
        specialization,
        qualification,
        experience,
        consultation,
        phone,
        about,
        zip,
      } = res.data;

      setInitialValues({
        first_name,
        last_name,
        email,
        address,
        city,
        country,
        specialization: consultation[0],
        qualification: qualification[0],
        experience: experience[0],
        phone,
        about,
        zip,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
    enableReinitialize: true, // Add this line
  });

  return (
    <>
      <Breadcrumb pageName="Profile" parentName="ProfileManagement /" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative">
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <div className="flex flex-col md:flex-row mb-4.5">
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 block text-black text-left dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter Your First Name"
                    value={formik.values.first_name}
                    className={`w-full rounded-lg border text-left ${
                      formik.touched.first_name && formik.errors.first_name
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 block text-left text-black dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter Your Last Name"
                    value={formik.values.last_name}
                    className={`w-full rounded-lg border ${
                      formik.touched.last_name && formik.errors.last_name
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row mb-4.5">
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5  text-left block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    placeholder="Enter Your Email"
                    className={`w-full rounded-lg border ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    value={formik.values.address}
                    className={`w-full text-left rounded-lg border ${
                      formik.touched.address && formik.errors.address
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row mb-4.5">
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter Your City"
                    className={`w-full rounded-lg border ${
                      formik.touched.city && formik.errors.city
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.city}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter Your Country Name"
                    className={`w-full rounded-lg border ${
                      formik.touched.country && formik.errors.country
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.country}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row mb-4.5">
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Enter Your Specialization"
                    className={`w-full rounded-lg border ${
                      formik.touched.specialization &&
                      formik.errors.specialization
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.specialization}
                  />
                  {formik.touched.specialization &&
                    formik.errors.specialization && (
                      <div className="mt-2 text-left text-red-500">
                        {formik.errors.specialization}
                      </div>
                    )}
                </div>
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Enter Your Qualification"
                    className={`w-full rounded-lg border ${
                      formik.touched.qualification &&
                      formik.errors.qualification
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.qualification}
                  />
                  {formik.touched.qualification &&
                    formik.errors.qualification && (
                      <div className="mt-2 text-left text-red-500">
                        {formik.errors.qualification}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row mb-4.5">
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="Enter Your Experience"
                    className={`w-full rounded-lg border ${
                      formik.touched.experience && formik.errors.experience
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.experience}
                  />
                  {formik.touched.experience && formik.errors.experience && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.experience}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    className={`w-full rounded-lg border ${
                      formik.touched.phone && formik.errors.phone
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row mb-4.5">
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    About
                  </label>
                  <input
                    type="text"
                    name="about"
                    placeholder="Write about yourself"
                    className={`w-full rounded-lg border ${
                      formik.touched.about && formik.errors.about
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.about}
                  />
                  {formik.touched.about && formik.errors.about && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.about}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                  <label className="mb-2.5 text-left block text-black dark:text-white">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    placeholder="Enter Your Zip Code"
                    className={`w-full rounded-lg border ${
                      formik.touched.zip && formik.errors.zip
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zip}
                  />
                  {formik.touched.zip && formik.errors.zip && (
                    <div className="mt-2 text-left text-red-500">
                      {formik.errors.zip}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-10 flex justify-center items-center ">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
                >
                  {loading ? (
                    <Spinner className="w-4 h-4" />
                  ) : (
                    <span>Update Profile</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
