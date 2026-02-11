import Sidebar from '@/components/docs/Sidebar';
import { getAllDocs } from '@/lib/mdx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DocsLayout({ children, params }: Props) {
  const { locale } = await params;
  const docs = getAllDocs(locale);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16">
      <div className="flex gap-12">
        <Sidebar docs={docs} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
