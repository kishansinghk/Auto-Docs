'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Password is too short').required('Required'),
});

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios.post('http://localhost:5000/user/authenticate', values)
        .then((response) => {
          console.log(response.data);
          toast.success('Login Successful');
          localStorage.setItem('user', response.data.token);
          resetForm();
          router.push('/');
        }).catch((err) => {
          console.log(err);
          toast.error('Login Failed');
        });
    },
    validationSchema: loginSchema
  });

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to AutoDocs
        </h2>
        <form onSubmit={loginForm.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required=""
            />
            {(loginForm.errors.email && loginForm.touched.email) ? (
              <p className='text-sm text-red-600'>{loginForm.errors.email}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required=""
            />
            {(loginForm.errors.password && loginForm.touched.password) ? (
              <p className='text-sm text-red-600'>{loginForm.errors.password}</p>
            ) : null}
          </div>
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-blue-500 text-sm">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full active:bg-blue-800 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>

    </div>
  )
}

export default Login;
