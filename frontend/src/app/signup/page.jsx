'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const signupSchema = Yup.object().shape({
    fullname: Yup.string().min(2, 'Too Short..!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Password is too short').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
    const router = useRouter();

    const signupForm = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:5000/user/add',values)
            .then((result) => {
                console.log(result.data);
                toast.success('User Created Successfully !!')
                resetForm();   
                router.push('/login');
            }).catch((err) => {
                console.log(err);
                toast.error('Something went wrong !!')
            });
        },
        validationSchema: signupSchema
    })

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="bg-white  p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Sign Up for AutoDocs
                </h2>
                <form onSubmit={signupForm.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600" htmlFor="fullname">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.fullname}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required=""
                        />
                        {(signupForm.errors.fullname && signupForm.touched.fullname) ? (
                            <p className='text-sm text-red-600'>{signupForm.errors.fullname}</p>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.email}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required=""
                        />
                        {(signupForm.errors.email && signupForm.touched.email) ? (
                            <p className='text-sm text-red-600'>{signupForm.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.password}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required=""
                        />
                        {(signupForm.errors.password && signupForm.touched.password) ? (
                            <p className='text-sm text-red-600'>{signupForm.errors.password}</p>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.confirmPassword}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required=""
                        />
                        {(signupForm.errors.confirmPassword && signupForm.touched.confirmPassword) ? (
                            <p className='text-sm text-red-600'>{signupForm.errors.confirmPassword}</p>
                        ) : null}
                    </div>
                    <p id="error-message" className="text-red-500 text-sm mb-4 hidden">
                        Passwords do not match!
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{" "}
                    <a href="loginpage.html" className="text-blue-500">
                        Login
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup
