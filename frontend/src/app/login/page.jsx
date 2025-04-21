'use client';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    name: Yup.string().min(1, 'Too Short..!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Password is too short').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});



const Login = () => {
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

    },
    validationSchema: loginSchema

  })
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
            {(loginForm.errors.email && loginForm.touched.email) ? (
                            <p className='text-sm text-red-600'>{loginForm.errors.email}</p>
                        ) : null}
          </div>
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-blue-500 text-sm">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="signuppage.html" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>

    </div>
  )
}

export default Login
