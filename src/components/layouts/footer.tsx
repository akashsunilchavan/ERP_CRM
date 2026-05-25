const Footer = () => {
    return (
        <footer className="bg-[#FFFFFF]">
            <div className="container px-4 py-4 mx-auto">
                <div className="flex flex-col items-center justify-between gap-2 text-sm text-gray-600 sm:flex-row sm:gap-4 dark:text-gray-400">
                    <span className="order-1 sm:order-none">© {new Date()?.getFullYear()} Samarth Enterprises. All rights reserved.</span>

                    <span className="order-2 sm:order-none">
                        Contact:{' '}
                        <a href="tel:+971508791777" className="hover:underline">
                            +971 50 8791777{' '}
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
