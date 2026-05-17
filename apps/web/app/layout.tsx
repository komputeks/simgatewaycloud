import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIM Gateway Cloud — Android SMS Gateway Platform',
  description: 'Turn Android phones into enterprise SMS gateways. Bulk messaging, real-time delivery, dual SIM support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}