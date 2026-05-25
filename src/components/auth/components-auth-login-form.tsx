'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Sprout, Mail, Lock, Eye, EyeOff, PhoneCall, Phone } from 'lucide-react';
import CustomNumberInput from '../customComponents/CustomNumberInput';
import CustomTextInput from '../customComponents/CustomTextInput';
import { generateOTP } from '@/app/api/Requests';
import { Message } from '@/app/helpers/AssetHelpers';
import { transformPermissions } from './LoginFunction';
import { useAuth } from './Auth';
import roleContext from '../context/roleContext';

const ComponentsAuthLoginForm = () => {
    const router = useRouter();

    const { saveAuth, setCurrentUser } = useAuth();

    const { updateState } = useContext(roleContext);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ phoneNumber: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setErrors({ phoneNumber: '', password: '' });

        let isValid = true;
        const newErrors = { phoneNumber: '', password: '' };

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setIsLoading(true);

            generateOTP(phoneNumber, password).then((res) => {
                if (res?.statusCode === 200) {
                    localStorage?.setItem('isLoggedIn', 'true');

                    const features = transformPermissions(res?.data?.role);

                    const userData = {
                        role: res?.data?.role?.name,
                        token: res?.data?.token,
                        user: {
                            user_id: res?.data?.user_id,
                            first_name: res?.data?.first_name,
                            last_name: res?.data?.last_name,
                            email: res?.data?.email,
                        },
                    };

                    const token = {
                        accessToken: res?.data?.token,
                    };

                    localStorage?.setItem(
                        'currentUserRole',
                        JSON.stringify({
                            features: features,
                        }),
                    );
                    setCurrentUser(userData);
                    saveAuth(token);

                    router.push('/farmerDashboard');

                    const role = JSON.parse(localStorage?.getItem('currentUserRole') || '{}');
                    if (role?.features) {
                        updateState(role?.features);
                    }
                } else {
                    Message(res?.message, 'error');
                }
            });
        }
    };

    return (
        // <div
        //     className="flex items-center justify-start min-h-screen p-6 bg-center bg-no-repeat bg-cover"
        //     style={{
        //         backgroundImage: "url('public/assets/images/fresh-space.jpg')", // put image in public/images
        //     }}
        // >
        //     <div className="w-full max-w-md">
        //         {/* Login Card */}
        //         <div className="p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        //             {/* Header */}
        //             <div className="space-y-2 text-center">
        //                 <div className="flex justify-center mb-4">
        //                     <div className="p-3 bg-green-100 rounded-full">
        //                         <Sprout className="w-10 h-10 text-green-600" />
        //                     </div>
        //                 </div>
        //                 <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        //                 <p className="text-gray-600">Sign in to your agricultural platform</p>
        //             </div>

        //             <form onSubmit={handleSubmit} className="space-y-5">
        //                 <div className="space-y-2">
        //                     <CustomTextInput
        //                         name="phoneNumber"
        //                         label="Phone Number"
        //                         placeholder="Enter Phone Number"
        //                         value={phoneNumber}
        //                         onChange={(event: any) => setPhoneNumber(event.target.value)}
        //                         leftSection={<Phone className="w-5 h-5 text-gray-400" />}
        //                         error={errors.phoneNumber}
        //                         autoComplete="off"
        //                     />
        //                 </div>

        //                 <div className="space-y-2">
        //                     <CustomTextInput
        //                         label="Password"
        //                         leftSection={<Lock className="w-5 h-5 text-gray-400" />}
        //                         name="password"
        //                         placeholder="Enter Password"
        //                         value={password}
        //                         onChange={(event: any) => setPassword(event.target.value)}
        //                         error={errors.password}
        //                         autoComplete="off"
        //                         rightSection={
        //                             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
        //                                 {showPassword ? <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" /> : <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
        //                             </button>
        //                         }
        //                     />
        //                 </div>

        //                 <div className="flex items-center justify-between">
        //                     <label className="flex items-center">
        //                         <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
        //                         <span className="ml-2 text-sm text-gray-600">Remember me</span>
        //                     </label>
        //                     <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700">
        //                         Forgot password?
        //                     </a>
        //                 </div>

        //                 {/* Submit Button */}
        //                 <button
        //                     type="submit"
        //                     disabled={isLoading}
        //                     className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        //                 >
        //                     {isLoading ? (
        //                         <>
        //                             <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        //                                 <path
        //                                     className="opacity-75"
        //                                     fill="currentColor"
        //                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        //                                 ></path>
        //                             </svg>
        //                             Signing in...
        //                         </>
        //                     ) : (
        //                         'Sign In'
        //                     )}
        //                 </button>
        //             </form>

        //             {/* Sign Up Link */}
        //             <div className="pt-4 text-center border-t border-gray-200">
        //                 <p className="text-sm text-gray-600">
        //                     Don't have an account?{' '}
        //                     <a href="#" className="font-semibold text-green-600 hover:text-green-700">
        //                         Sign up now
        //                     </a>
        //                 </p>
        //             </div>
        //         </div>

        //         {/* Footer Text */}
        //         <p className="mt-6 text-sm text-center text-gray-600">© 2025 Agricultural Platform. All rights reserved.</p>
        //     </div>
        // </div>
        <div
            className="relative flex items-center justify-center min-h-screen px-4 bg-center bg-no-repeat bg-cover lg:justify-start sm:px-6 lg:px-12"
            style={{
                backgroundImage: "url('/assets/images/fresh-space.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Login Container */}
            <div
                className="relative w-full max-w-sm mx-auto sm:max-w-md lg:max-w-md lg:mx-0 lg:ml-12"
            >
                <div className="p-6 space-y-6 shadow-xl bg-white/95 backdrop-blur-md rounded-2xl sm:p-8">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <Sprout className="text-green-600 w-9 h-9 sm:w-10 sm:h-10" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back</h1>
                        <p className="text-sm text-gray-600 sm:text-base">Sign in to your agricultural platform</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <CustomTextInput
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            leftSection={<Phone className="w-5 h-5 text-gray-400" />}
                            error={errors.phoneNumber}
                        />

                        <CustomTextInput
                            name="password"
                            label="Password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            leftSection={<Lock className="w-5 h-5 text-gray-400" />}
                            error={errors.password}
                            rightSection={
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                                </button>
                            }
                        />

                        {/* Remember / Forgot */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-right text-green-600">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={isLoading} className="w-full py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700">
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Signup */}
                    <div className="pt-4 text-center border-t">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <a href="#" className="font-semibold text-green-600">
                                Sign up now
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-4 text-xs text-center text-white lg:text-left sm:text-sm">© {new Date().getFullYear()} JDRS Agro All rights reserved.</p>
            </div>
        </div>
    );
};

export default ComponentsAuthLoginForm;
