import { Spinner } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const DoctorRegistration = ({ RegistrationData, loading }: any) => {
  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    specialization: '',
    experience: '',
    qualification:'',
    password: '',
  };

  // Validation
  const validationSchema = yup.object({
    first_name: yup.string().required('First Name is Required'),
    last_name: yup.string().required('Last Name is Required'),
    username: yup.string().required('User Name is Required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    specialization: yup.string().required('Specialization is required'),
    qualification:yup.string().required('Qualification is required'),
    experience: yup.string().required('Experience is required'),
  });

  const onSubmit = async (values: any) => {
    await RegistrationData(values);
  };

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="first_name"
              className={`w-full rounded-lg border ${
                formik.touched.first_name && formik.errors.first_name
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="mt-2 text-red-500">
                {formik.errors.first_name}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="last_name"
              className={`w-full rounded-lg border ${
                formik.touched.last_name && formik.errors.last_name
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="mt-2 text-red-500">{formik.errors.last_name}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            UserName
          </label>
          <div className="relative">
            <input
              type="text"
              name="username"
              className={`w-full rounded-lg border ${
                formik.touched.username && formik.errors.username
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="mt-2 text-red-500">{formik.errors.username}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              className={`w-full rounded-lg border ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="mt-2 text-red-500">{formik.errors.email}</div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Specialization
          </label>
          <div className="relative">
            <input
              type="text"
              name="specialization"
              className={`w-full rounded-lg border ${
                formik.touched.specialization && formik.errors.specialization
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.specialization && formik.errors.specialization && (
              <div className="mt-2 text-red-500">
                {formik.errors.specialization}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Experience
          </label>
          <div className="relative">
            <input
              type="text"
              name="experience"
              className={`w-full rounded-lg border ${
                formik.touched.experience && formik.errors.experience
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.experience && formik.errors.experience && (
              <div className="mt-2 text-red-500">
                {formik.errors.experience}
              </div>
            )}
          </div>
        </div>


        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Qualification          </label>
          <div className="relative">
            <input
              type="text"
              name="qualification"
              className={`w-full rounded-lg border ${
                formik.touched.qualification && formik.errors.qualification
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.qualification && formik.errors.qualification && (
              <div className="mt-2 text-red-500">
                {formik.errors.qualification}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              className={`w-full rounded-lg border ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-stroke'
              } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-2 text-red-500">{formik.errors.password}</div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <button
            type="submit"
            className="w-full cursor-pointer flex justify-center items-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            {loading ? <Spinner className="h-6 w-6" /> : 'Sign In'}
          </button>
        </div>
      </form>
    </>
  );
};

export default DoctorRegistration;
