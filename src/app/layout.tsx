import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Product Dashboard',
  description: 'Next.js Product Analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
