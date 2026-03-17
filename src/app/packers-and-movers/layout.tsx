import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packers and Movers',
  description: 'Top-rated packers and movers services ensuring seamless, zero-risk, and smooth relocation of your household and corporate goods.',
};

export default function PackersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
