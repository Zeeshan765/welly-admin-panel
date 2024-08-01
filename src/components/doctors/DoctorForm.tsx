import { Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/ApiService';
import { useFormik } from 'formik';

interface Props {
  loading: boolean;
  EditData: any;
}

const DoctorForm = ({ loading, EditData }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    profile_image: '',
    status: '',
  });

  const onSubmit = async (values: any) => {
    await EditData(values, id);
  };

  //Formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

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
        consultation,
        qualification,
        experience,
        phone,
        about,
        zip,
        profile_image,
        status,
      } = res.data;


      console.log('res.data', res.data)

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
        profile_image,
        status,
      });
      formik.setValues({
        first_name,
        last_name,
        email,
        address,
        status,
        city,
        country,
        specialization: consultation[0],
        qualification: qualification[0],
        experience: experience[0],
        phone,
        about,
        zip,
        profile_image,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // handleCancel

  const handleCancel = () => {
    navigate('/admin/doctors');
  };

  return (
    <>
      <div className="relative">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6.5">
            <div className="flex flex-col md:flex-row mb-4.5">
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formik.values.first_name}
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formik.values.last_name}
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-4.5">
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  placeholder="Enter Email"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  value={formik.values.address}
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-4.5">
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-4.5">
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specialization}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  placeholder="Enter First Name"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.experience}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-4.5">
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.qualification}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-4.5">
              {/* <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.about}
                />
               
              </div> */}
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                />
                {/* {formik.touched.title && formik.errors.title && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.title}
                        </div>
                      )} */}
              </div>
              <div className=" md:w-1/2 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5  outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option selected disabled value="">
                    Select the Type
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">InActive</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                About
              </label>
              <textarea
                rows={6}
                name="about"
                value={formik.values.about}
                className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="mb-7">
              <label className="mb-2.5 block text-black dark:text-white">
                Profile Image
              </label>
              <img
                src={
                  initialValues?.profile_image
                    ? initialValues?.profile_image
                    : 'https://placehold.co/600x400'
                }
                alt="logo"
                className="w-20 h-20 rounded-lg"
              />
            </div>

            <div className="flex flex-col md:flex-row">
              <button
                type="submit"
                className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray mb-2 md:mb-0 md:mr-2"
              >
                {loading ? <Spinner className="h-6 w-6" /> : 'Edit Doctor'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DoctorForm;
