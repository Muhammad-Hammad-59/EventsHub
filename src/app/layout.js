 
import Footer from '@/components/navbar/Footer';
import './globals.css';
import {Providers} from "./providers";
import Navbard from '@/components/navbar/navbar';
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Next.js Auth App',
  description: 'A simple authentication app with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
 
        <Providers>
          <Navbard />
          {children}
          <ToastContainer 
           position="bottom-right"
           newestOnTop
           hideProgressBar={false}
           autoClose={3000} />
          <Footer/>
        </Providers>
    
      </body>
    </html>
  );
}