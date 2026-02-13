import './globals.css';
import { Providers } from './providers';
import { ThemeToggle } from '@/components/theme/theme-toggle';

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
          <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pt-4 md:px-6">
            <ThemeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
