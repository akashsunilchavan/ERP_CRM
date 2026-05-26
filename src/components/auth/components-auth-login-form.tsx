'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Lock, Eye, EyeOff, Phone, ArrowRight } from 'lucide-react';
import CustomTextInput from '../customComponents/CustomTextInput';
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

    const DUMMY_CREDENTIALS = {
        phoneNumber: '1234567890',
        password: 'password123'
    };

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

            setTimeout(() => {
                if (phoneNumber === DUMMY_CREDENTIALS.phoneNumber && password === DUMMY_CREDENTIALS.password) {
                    const features = [
                        { dashboard: ['view', 'edit'] },
                        { crops: ['view', 'create', 'edit', 'delete'] },
                        { reports: ['view', 'download'] }
                    ];

                    const userData = {
                        role: 'farmer',
                        token: 'dummy-token-12345',
                        user: {
                            user_id: '1',
                            first_name: 'John',
                            last_name: 'Doe',
                            email: 'john.doe@example.com',
                        },
                    };

                    const token = {
                        accessToken: 'dummy-token-12345',
                    };

                    localStorage?.setItem('isLoggedIn', 'true');
                    localStorage?.setItem(
                        'currentUserRole',
                        JSON.stringify({
                            features: features,
                        }),
                    );
                    
                    setCurrentUser(userData);
                    saveAuth(token);

                  

                    router.push('/superadminDashboard');
                } else {
                    const errorMessage = 
                        phoneNumber !== DUMMY_CREDENTIALS.phoneNumber 
                            ? 'Invalid phone number' 
                            : 'Invalid password';
                    
                    alert(errorMessage);
                }
                
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="absolute inset-0 bg-[url('/assets/images/grain-pattern.png')] opacity-5"></div>
            
            <div className="relative w-full max-w-md px-4 sm:px-6">
                <div className="p-6 border border-gray-100 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl sm:p-8">
                    <div className="mb-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3">
                                <Image 
                                    src="/assets/images/logo.png" 
                                    alt="Samarth Enterprises" 
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                    onError={(e) => {
                                        const imgElement = e.target as HTMLImageElement;
                                        imgElement.src = 'https://via.placeholder.com/96x96?text=SE';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <CustomTextInput
                                name="phoneNumber"
                                label="Phone Number"
                                placeholder="Enter your registered phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                leftSection={<Phone className="w-5 h-5 text-gray-400" />}
                                error={errors.phoneNumber}
                            />
                        </div>

                        <div>
                            <CustomTextInput
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                leftSection={<Lock className="w-5 h-5 text-gray-400" />}
                                error={errors.password}
                                rightSection={
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 transition hover:opacity-70"
                                    >
                                        {showPassword ? 
                                            <EyeOff className="w-5 h-5 text-gray-400" /> : 
                                            <Eye className="w-5 h-5 text-gray-400" />
                                        }
                                    </button>
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-green-600 transition hover:text-green-700">
                                Forgot password?
                            </a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-xs text-center text-gray-500">
                    © {new Date().getFullYear()} Samarth Enterprises. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ComponentsAuthLoginForm;