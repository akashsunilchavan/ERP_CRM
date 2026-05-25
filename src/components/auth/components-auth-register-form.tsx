'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import CustomTextInput from '../customComponents/CustomTextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { handleInputChange, handleOtherInputChange } from '../CommonFunction';
import { APIStatusType, InputErrorType } from '../types/OthersTypes';
import { validateRegisterForm } from './LoginFunction';
import { APIStatusData } from '../data/OtherDefalutData';
import { Message } from '@/app/helpers/AssetHelpers';
import { Button, Image, Title, Box, Card, Flex, LoadingOverlay, Grid, SimpleGrid, Modal, Group, TextInput, Divider, rem } from '@mantine/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import InputErrorBox from '../customComponents/InputErrorBox';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { generateOTPForRegistration, verifyOTPForRegistration } from '@/app/api/Requests';

const ComponentsAuthRegisterForm = () => {
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' };
    const [formField, setFormField] = useState(initialState);
    const [inputError, setInputError] = useState<InputErrorType>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitAPIStatus, setSubmitAPIStatus] = useState<APIStatusType>(APIStatusData);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();

    const [otp, setOtp] = useState<string[]>(new Array(6)?.fill(''));
    const [otpError, setOtpError] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpModalOpened, { open: openOtpModal, close: closeOtpModal }] = useDisclosure(false);
    const [otpSessionId, setOtpSessionId] = useState('');
    const [modalAnimation, setModalAnimation] = useState('hidden');
    const [otpResendTime, setOtpResendTime] = useState(0);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const colors = {
        primary: '#6366f1',
        primaryLight: '#818cf8',
        from_blue_600: '#2563EB',
        to_indigo_700: '#4338CA',
        primaryDark: '#4f46e5',
        secondary: '#a855f7',
        background: '#f8fafc',
        darkBackground: '#1e293b',
        text: '#334155',
        lightText: '#64748b',
        darkText: '#f1f5f9',
        error: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const { error } = validateRegisterForm(formField);
        setInputError((prevErrors: any) => ({ ...prevErrors, [name]: error[name as keyof InputErrorType] }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let { cnt, error } = validateRegisterForm(formField);
        setInputError(error);

        if (cnt === 0) {
            setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: true }));

            await generateOTPForRegistration(formField?.firstName, formField?.lastName?.trim(), formField?.email?.trim(), formField?.password?.trim(), formField?.phone?.trim())?.then((res) => {
                if (res?.statusCode == 200) {
                    setOtpSessionId(res?.data?.sessionId);
                    setModalAnimation('visible');
                    openOtpModal();
                    setOtpResendTime(30);
                    setSubmitAPIStatus((prev: APIStatusType) => ({
                        ...prev,
                        loading: false,
                    }));
                } else {
                    Message(res?.message, 'error');
                    setSubmitAPIStatus((prev: APIStatusType) => ({
                        ...prev,
                        loading: false,
                    }));
                }
            });
        }
    };

    useEffect(() => {
        if (otpModalOpened && otpRefs?.current[0]) {
            otpRefs?.current[0]?.focus();
        }
    }, [otpModalOpened]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (otpResendTime > 0) {
            timer = setTimeout(() => setOtpResendTime(otpResendTime - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpResendTime]);

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        setOtpError('');

        if (element.value && index < otp.length - 1 && otpRefs.current[index + 1]) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            otpRefs.current[index - 1]?.focus();
        } else if (e.key === 'Backspace' && otp[index]) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp?.some((digit) => !digit)) {
            setOtpError('Please enter the complete OTP.');
            return;
        }

        setOtpLoading(true);

        await verifyOTPForRegistration({
            email: formField?.email?.trim(),
            otp: otp?.join(''),
            phone: formField?.phone,
        })
            ?.then((res) => {
                if (res?.statusCode === 200) {
                    Message(res?.message, 'success');
                    setModalAnimation('exit');
                    closeOtpModal();
                    router?.push('/auth/login');
                } else {
                    Message(res?.message, 'error');
                    setOtpError(res.message || 'Invalid OTP');
                }
            })
            .catch(() => {
                Message('Verification failed', 'error');
            })
            .finally(() => {
                setOtpLoading(false);
            });
    };

    const resendOtp = async () => {
        setOtpLoading(true);
        await generateOTPForRegistration(formField?.firstName, formField?.lastName?.trim(), formField?.email?.trim(), formField?.password?.trim(), formField?.phone?.trim())
            ?.then((res) => {
                if (res?.statusCode == 200) {
                    setOtpSessionId(res?.data?.sessionId);
                    Message('New OTP sent successfully', 'success');
                    setOtpResendTime(30);

                    setModalAnimation('resend');
                    setTimeout(() => setModalAnimation('visible'), 500);
                } else {
                    Message(res?.message, 'error');
                }
            })
            .finally(() => {
                setOtpLoading(false);
            });
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.95 },
        resend: {
            opacity: 1,
            y: [0, -10, 0],
            transition: { duration: 0.5 },
        },
    };

    const otpInputVariants = {
        initial: { scale: 1 },
        focus: { scale: 1.05, boxShadow: `0 0 10px ${colors.primaryLight}` },
        error: { x: [0, -5, 5, -5, 0], transition: { duration: 0.5 } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <div className="inset-0 min-h-screen overflow-hidden">
            <div className="flex flex-col w-full min-h-screen md:flex-row">
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex-1 hidden md:flex"
                        style={{
                            backgroundImage: "url('/assets/images/businessWorld/joinUs.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-md">
                                <Title order={1} className="mb-6 text-5xl font-bold" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                                    Join Our Platform
                                </Title>
                                <p className="mb-10 text-xl opacity-90" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                                    Create your account and start your journey with us today.
                                </p>

                                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                                    <motion.div variants={itemVariants} className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 mr-4 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                                            <span className="text-lg font-bold text-white">1</span>
                                        </div>
                                        <p className="text-lg">Secure authentication</p>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 mr-4 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                                            <span className="text-lg font-bold text-white">2</span>
                                        </div>
                                        <p className="text-lg">Personalized dashboard</p>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="flex items-center">
                                        <div className="flex items-center justify-center w-12 h-12 mr-4 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                                            <span className="text-lg font-bold text-white">3</span>
                                        </div>
                                        <p className="text-lg">24/7 customer support</p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
                <div className="flex items-center justify-center flex-1 p-6 overflow-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-xl mx-auto">
                        <Card
                            withBorder
                            shadow="xl"
                            radius="xl"
                            padding="xl"
                            className="relative bg-white/90 backdrop-blur-sm dark:bg-gray-800/90"
                            style={{
                                borderColor: colors.from_blue_600,
                                boxShadow: `0 10px 30px -10px ${colors.primaryLight}40`,
                                padding: '2.5rem',
                            }}
                        >
                            <LoadingOverlay visible={submitAPIStatus.loading} overlayProps={{ blur: 2 }} loaderProps={{ color: colors.primary, type: 'bars' }} />

                            <Box className="mb-8 text-center">
                                <Title
                                    order={2}
                                    className="mb-2 text-3xl font-bold text-gray-800 dark:text-white"
                                    style={{
                                        background: `linear-gradient(45deg, ${colors.from_blue_600}, ${colors.to_indigo_700})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Create Account
                                </Title>
                                <p className="text-gray-600 dark:text-gray-300">Fill in your details to get started</p>
                            </Box>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                                    <motion.div variants={itemVariants}>
                                        <CustomTextInput
                                            label="First Name"
                                            placeholder="First name"
                                            leftSection={<FontAwesomeIcon icon={faUser} style={{ color: colors.from_blue_600 }} />}
                                            name="firstName"
                                            value={formField?.firstName}
                                            onChange={(e) => handleInputChange(e, setFormField, inputError, setInputError)}
                                            onBlur={handleBlur}
                                            error={inputError?.firstName}
                                            variant="filled"
                                            radius="lg"
                                            classNames={{
                                                input: 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-600',
                                                label: 'text-gray-700 dark:text-gray-300 mb-1 font-medium',
                                                error: 'text-red-500 dark:text-red-400',
                                            }}
                                            autoComplete="off"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <CustomTextInput
                                            label="Last Name"
                                            placeholder="Last name"
                                            leftSection={<FontAwesomeIcon icon={faUser} style={{ color: colors.from_blue_600 }} />}
                                            name="lastName"
                                            value={formField?.lastName}
                                            onChange={(e) => handleInputChange(e, setFormField, inputError, setInputError)}
                                            onBlur={handleBlur}
                                            error={inputError?.lastName}
                                            variant="filled"
                                            radius="lg"
                                            classNames={{
                                                input: 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-600',
                                                label: 'text-gray-700 dark:text-gray-300 mb-1 font-medium',
                                                error: 'text-red-500 dark:text-red-400',
                                            }}
                                            autoComplete="off"
                                        />
                                    </motion.div>
                                </SimpleGrid>

                                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                                    <motion.div variants={itemVariants}>
                                        <CustomTextInput
                                            label="Email"
                                            placeholder="Enter your email"
                                            leftSection={<FontAwesomeIcon icon={faEnvelope} style={{ color: colors.from_blue_600 }} />}
                                            name="email"
                                            value={formField?.email}
                                            onChange={(e) => handleInputChange(e, setFormField, inputError, setInputError)}
                                            onBlur={handleBlur}
                                            error={inputError?.email}
                                            variant="filled"
                                            radius="lg"
                                            classNames={{
                                                input: 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-600',
                                                label: 'text-gray-700 dark:text-gray-300 mb-1 font-medium',
                                                error: 'text-red-500 dark:text-red-400',
                                            }}
                                            autoComplete="off"
                                        />
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <div className="mt-1 mb-1">
                                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <PhoneInput
                                                country={'ae'}
                                                value={formField?.phone}
                                                onChange={(phone) => {
                                                    handleOtherInputChange(phone, 'phone', setFormField, inputError, setInputError);
                                                }}
                                                containerStyle={{
                                                    width: '100%', // Set container width
                                                }}
                                                inputStyle={{
                                                    width: '100%',
                                                    height: '40px',
                                                    fontSize: '16px',
                                                    paddingLeft: '48px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: 'lg',
                                                }}
                                                buttonStyle={{
                                                    height: '40px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: 'lg',
                                                }}
                                                dropdownStyle={{
                                                    borderRadius: 'lg',
                                                }}
                                                containerClass="w-full"
                                                inputClass="w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Enter phone number"
                                            />
                                            <InputErrorBox Message={inputError?.phone} />
                                        </div>
                                    </motion.div>
                                </SimpleGrid>

                                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                                    <motion.div variants={itemVariants}>
                                        <CustomTextInput
                                            label="Password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={formField?.password}
                                            type={showPassword ? 'text' : 'password'}
                                            leftSection={<FontAwesomeIcon icon={faKey} style={{ color: colors.from_blue_600 }} />}
                                            rightSection={
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="text-gray-500 transition-colors hover:text-indigo-600"
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </button>
                                            }
                                            onChange={(e) => handleInputChange(e, setFormField, inputError, setInputError)}
                                            onBlur={handleBlur}
                                            error={inputError?.password}
                                            variant="filled"
                                            radius="lg"
                                            classNames={{
                                                input: 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-600',
                                                label: 'text-gray-700 dark:text-gray-300 mb-1 font-medium',
                                                error: 'text-red-500 dark:text-red-400',
                                            }}
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <CustomTextInput
                                            label="Confirm Password"
                                            placeholder="Confirm password"
                                            name="confirmPassword"
                                            value={formField?.confirmPassword}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            leftSection={<FontAwesomeIcon icon={faKey} style={{ color: colors.from_blue_600 }} />}
                                            rightSection={
                                                <button
                                                    type="button"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    className="text-gray-500 transition-colors hover:text-indigo-600"
                                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                                </button>
                                            }
                                            onChange={(e) => handleInputChange(e, setFormField, inputError, setInputError)}
                                            onBlur={handleBlur}
                                            error={inputError?.confirmPassword}
                                            variant="filled"
                                            radius="lg"
                                            classNames={{
                                                input: 'bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-600',
                                                label: 'text-gray-700 dark:text-gray-300 mb-1 font-medium',
                                                error: 'text-red-500 dark:text-red-400',
                                            }}
                                        />
                                    </motion.div>
                                </SimpleGrid>

                                <motion.div variants={itemVariants} className="pt-2">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="md"
                                        radius="xl"
                                        loading={submitAPIStatus?.loading}
                                        variant="gradient"
                                        gradient={{ from: colors.from_blue_600, to: colors.to_indigo_700 }}
                                        className="h-12 text-lg font-medium"
                                        style={{
                                            boxShadow: `0 4px 15px ${colors.primary}40`,
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </motion.div>

                                <motion.div variants={itemVariants} className="mt-6 text-sm text-center">
                                    <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                                    <Link href="/auth/login" className="font-medium transition hover:underline" style={{ color: colors.primary }}>
                                        Sign in
                                    </Link>
                                </motion.div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Modal
                opened={otpModalOpened}
                onClose={() => {
                    setModalAnimation('exit');
                    setTimeout(closeOtpModal, 500);
                }}
                centered
                size={isMobile ? 'sm' : 'lg'}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{
                    transition: 'fade',
                    duration: 400,
                    timingFunction: 'ease',
                }}
                title={
                    <Title order={3} className="w-full text-center">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                background: `linear-gradient(45deg, ${colors.from_blue_600}, ${colors.to_indigo_700})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Verify Your Email
                        </motion.span>
                    </Title>
                }
                radius="md"
                padding="xl"
                className="[&_.mantine-Modal-title]:w-full"
                closeOnClickOutside={false}
                withCloseButton={false}
                styles={{
                    content: {
                        border: `1px solid ${colors.primaryLight}`,
                        boxShadow: `0 10px 30px -10px ${colors.primaryLight}40`,
                    },
                }}
            >
                <motion.div initial="hidden" animate={modalAnimation} variants={modalVariants} transition={{ duration: 0.3, ease: 'easeOut' }}>
                    <div className="space-y-6">
                        <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                            <Image src="/assets/images/businessWorld/enterOTP.svg" alt="OTP Verification" h={isMobile ? 180 : 220} w="auto" fit="contain" className="mb-4" />
                        </motion.div>

                        <motion.p className="text-sm text-center" style={{ color: colors.lightText }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            We have sent a 6-digit verification code to your email{' '}
                            <span className="font-semibold" style={{ color: colors.primary }}>
                                {formField?.email}
                            </span>
                        </motion.p>

                        <Group justify="center" gap="sm">
                            {otp?.map((data, index) => (
                                <motion.div
                                    key={index}
                                    variants={otpInputVariants}
                                    initial="initial"
                                    whileFocus="focus"
                                    animate={otpError && index === otp?.length - 1 ? 'error' : ''}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    <TextInput
                                        ref={(el) => {
                                            if (el) otpRefs.current[index] = el;
                                        }}
                                        type="text"
                                        value={data}
                                        onChange={(e) => handleOtpChange(e?.target as HTMLInputElement, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                        maxLength={1}
                                        size="xl"
                                        className="w-12 text-center me-2"
                                        styles={{
                                            input: {
                                                fontSize: rem(24),
                                                textAlign: 'center',
                                                height: rem(60),
                                                width: rem(60),
                                                borderRadius: '12px',
                                                border: `2px solid ${colors.primaryLight}30`,
                                                backgroundColor: 'transparent',
                                                transition: 'all 0.3s ease',
                                                '&:focus': {
                                                    borderColor: colors.primary,
                                                    boxShadow: `0 0 0 3px ${colors.primary}20`,
                                                },
                                            },
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </Group>

                        <AnimatePresence>
                            {otpError && (
                                <motion.p className="text-sm text-center" style={{ color: colors.error }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    {otpError}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <Button
                                fullWidth
                                size="md"
                                loading={otpLoading}
                                onClick={handleVerifyOtp}
                                className="mt-4"
                                radius="xl"
                                variant="gradient"
                                gradient={{ from: colors.from_blue_600, to: colors.to_indigo_700 }}
                                style={{
                                    boxShadow: `0 4px 15px ${colors.primary}40`,
                                }}
                            >
                                Verify OTP
                            </Button>
                        </motion.div>

                        <Divider
                            label="OR"
                            labelPosition="center"
                            className="my-4"
                            styles={{
                                label: {
                                    color: colors.lightText,
                                    fontSize: rem(12),
                                    padding: `0 ${rem(8)}`,
                                },
                            }}
                        />

                        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            <p className="text-sm" style={{ color: colors?.lightText }}>
                                {otpResendTime > 0 ? (
                                    `Resend OTP in ${otpResendTime}s`
                                ) : (
                                    <>
                                        Didn&apos;t receive code?{' '}
                                        <motion.button
                                            onClick={resendOtp}
                                            className="font-medium focus:outline-none"
                                            disabled={otpLoading}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ color: colors?.primary }}
                                        >
                                            Resend OTP
                                        </motion.button>
                                    </>
                                )}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </Modal>
        </div>
    );
};

export default ComponentsAuthRegisterForm;
