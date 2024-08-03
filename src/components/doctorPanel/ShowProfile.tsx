import { useEffect, useState } from 'react';
import apiService from '../../services/ApiService';
import { useFormik } from 'formik';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';

const ShowProfile = () => {
  const id = localStorage.getItem('doctor_id');

  const [aboutImage, setAboutImage] = useState('');
  const [profileImage, setProfileImage] = useState('');

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
    console.log('values', values);
  };

  // Data from Backend
  const getData = async () => {
    try {
      const res = await apiService.get(`users/getSingleUser?id=${id}`, {});
      console.log('res', res);
      const {
        first_name,
        last_name,
        email,
        address,
        city,
        country,
        qualification,
        experience,
        consultation,
        phone,
        about,
        cover_image,
        profile_image,
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
      setAboutImage(cover_image);
      setProfileImage(profile_image);
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
    onSubmit,
    enableReinitialize: true, // Add this line
  });

  return (
    <>
      <div className="overflow-hidden rounded-sm border mt-10 border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={aboutImage ? aboutImage : CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>

        {/* Profile Image */}

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                //  src={userSix}
                src={profileImage ? profileImage : userSix}
                alt="profile"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
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
                  disabled
                  placeholder="Enter Your First Name"
                  value={formik.values.first_name}
                  className={`w-full rounded-lg border border-stroke text-left  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 block text-left text-black dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  disabled
                  placeholder="Enter Your Last Name"
                  value={formik.values.last_name}
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
                  disabled
                  value={formik.values.email}
                  placeholder="Enter Your Email"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 text-left block text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  disabled
                  placeholder="Enter Your Address"
                  value={formik.values.address}
                  className={`w-full text-left rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
                  disabled
                  placeholder="Enter Your City"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 text-left block text-black dark:text-white">
                  Country
                </label>
                <input
                  type="text"
                  disabled
                  name="country"
                  placeholder="Enter Your Country Name"
                  className={`w-full rounded-lg border border-stroke  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
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
                  disabled
                  placeholder="Enter Your Specialization"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specialization}
                />
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 text-left block text-black dark:text-white">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  disabled
                  placeholder="Enter Your Qualification"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.qualification}
                />
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
                  disabled
                  placeholder="Enter Your Experience"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.experience}
                />
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 text-left block text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  disabled
                  placeholder="Enter Your Phone Number"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
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
                  disabled
                  placeholder="Write about yourself"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.about}
                />
              </div>
              <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                <label className="mb-2.5 text-left block text-black dark:text-white">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip"
                  disabled
                  placeholder="Enter Your Zip Code"
                  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowProfile;
