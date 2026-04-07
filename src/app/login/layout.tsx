import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Puma Shop POS',
  description: 'Acceso al sistema Puma Shop POS',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
