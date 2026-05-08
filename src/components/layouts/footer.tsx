const Footer = () => {
    return (
        <footer className="bg-[#FFFFFF]">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="order-1 sm:order-none">© {new Date()?.getFullYear()} QuickTax. All rights reserved.</span>

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
