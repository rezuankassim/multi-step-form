import {Ubuntu} from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'Frontend Mentor | Multi-step form',
  description: 'Multi-step form challenge from Frontend Mentor, attemped by Rezuan Kassim',
};

const ubuntu = Ubuntu({weight: ['400', '500', '700'], subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </head>

      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
