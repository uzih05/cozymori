import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getDocBySlug, getDocSlugs } from '@/lib/mdx';
import mdxComponents from '@/components/docs/MDXComponents';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[]; locale: string }>;
}

export async function generateStaticParams() {
  const enSlugs = getDocSlugs('en');
  const koSlugs = getDocSlugs('ko');
  const allSlugs = [...new Set([...enSlugs, ...koSlugs])];
  return allSlugs.map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const docSlug = slug.join('/');
  const doc = getDocBySlug(docSlug, locale);

  if (!doc) return { title: 'Not Found' };

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocPage({ params }: Props) {
  const { slug, locale } = await params;
  const docSlug = slug.join('/');
  const doc = getDocBySlug(docSlug, locale);

  if (!doc) notFound();

  return (
    <article className="max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
          {doc.category}
        </p>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-3">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-text-secondary">{doc.description}</p>
        )}
      </div>

      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={doc.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
