'use client';
import ContentAnimation from '@/src/components/layouts/content-animation';
import Footer from '@/src/components/layouts/footer';
import Header from '@/src/components/layouts/header';
import MainContainer from '@/src/components/layouts/main-container';
import Overlay from '@/src/components/layouts/overlay';
import ScrollToTop from '@/src/components/layouts/scroll-to-top';
import Sidebar from '@/src/components/layouts/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { api } from '../apiMiddleware/ApiMiddleWare';
import Swal from 'sweetalert2';
import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { useAuth } from '@/src/components/auth/Auth';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { logout } = useAuth();

    // const showAlert = async (type: any) => {
    //     if (type === 1) {
    //         const toast = Swal.mixin({
    //             toast: true,
    //             position: 'center',
    //             showConfirmButton: false,
    //             timer: 3000,
    //         });
    //         toast.fire({
    //             icon: 'warning',
    //             title: 'Please Login first',
    //             padding: '20px 30px',
    //         });
    //     }
    // };

    useEffect(() => {
        const validateToken = async () => {
            const { token } = setupAxios();
            try {
                const response = await api?.post(`/auth/validate-token`, token, { body: JSON?.stringify({ authenticatetoken: token }) }, false);
                if (response?.statusCode !== 200) {
                    logout();

                    Swal.close();
                    await Swal?.fire({
                        icon: 'warning',
                        title: 'Your session has expired. So logging out',
                        heightAuto: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        timer: 3000,
                        willOpen: () => {
                            Swal?.showLoading();
                        },
                    });
                }
            } catch (error) {
                Swal.close();
                await Swal?.fire({
                    icon: 'warning',
                    title: 'Your session has expired. So logging out',
                    heightAuto: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    timer: 3000,
                    willOpen: () => {
                        Swal?.showLoading();
                    },
                });
            }
        };

        validateToken();
    }, [router]);

    useEffect(() => {
        const currentUserData = localStorage?.getItem('currentUser');
        const currentUser = currentUserData ? JSON?.parse(currentUserData) : null;
        const token = currentUser?.token;
        const user = currentUser?.user;
        const userId = user?.user_id;

        if (!token || !userId) {
            Swal.close();
            router?.push('/auth/login');
        }
    }, [router]);

    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                <Overlay />
                <ScrollToTop />

                <MainContainer>
                    {/* BEGIN SIDEBAR */}
                    <div className="fixed top-0 bottom-0 z-50">
                        <Sidebar />
                    </div>
                    {/* END SIDEBAR */}

                    {/* MAIN CONTENT AREA - flex-grow will make it take remaining space */}
                    <div className="main-content flex flex-col min-h-screen pl-[width-of-sidebar]">
                        {/* BEGIN TOP NAVBAR */}
                        <Header />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA - flex-grow will push footer down */}
                        <div className="flex-grow">
                            <ContentAnimation>{children}</ContentAnimation>
                        </div>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER - will now appear after content */}
                        <Footer />
                        {/* END FOOTER */}
                    </div>
                </MainContainer>
            </div>
        </>
    );
}
