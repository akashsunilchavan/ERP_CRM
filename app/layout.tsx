import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '@mantine/core/styles.css';
import ProviderComponent from '@/src/components/layouts/provider-component';
import 'react-phone-input-2/lib/style.css';

// import initDb from "@/database/dbConnect";

export const metadata: Metadata = {
    title: {
        template: 'Samarth Enterprises',
        default: 'Samarth Enterprises',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
    // adjustFontFallback: false,
});
// initDb();
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={nunito.variable}>
                <ProviderComponent>{children}</ProviderComponent>
            </body>
        </html>
    );
}
