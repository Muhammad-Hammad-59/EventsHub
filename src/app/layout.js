 
import './globals.css';
import {Providers} from "./providers";

export const metadata = {
  title: 'Next.js Auth App',
  description: 'A simple authentication app with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
 
        <Providers>
          {children}
        </Providers>
    
      </body>
    </html>
  );
}