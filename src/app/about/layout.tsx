import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MKP Packers & Movers, our 10+ years of relocation excellence, and our dedicated team of packing and moving experts.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
