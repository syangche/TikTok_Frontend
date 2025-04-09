
import { AuthProvider } from '../contexts/authContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import MainLayout from '../components/layout/MainLayout';

export const metadata = {
  title: 'TikTok',
  description: 'A TikTok built with Next.js and Express',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster position="top-center" />
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}