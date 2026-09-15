import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Real Estate Platform",
  description: 'Built with Xroga AI — ships to your GitHub + Vercel; data on your Supabase.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
