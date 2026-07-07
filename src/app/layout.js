 
import './globals.css';
import {Providers} from "./providers";
import LayoutShell from '@/components/LayoutShell';

export const metadata = {
  title: 'EventHub — Discover & Create Events',
  description: 'Discover and create unforgettable events. From workshops to concerts, conferences to parties — all in one place.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}