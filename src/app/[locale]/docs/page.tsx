import { getAllDocs } from '@/lib/mdx';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function DocsIndex({ params }: Props) {
  const { locale } = await params;
  const docs = getAllDocs(locale);
  const t = await getTranslations('docs');

  const grouped = docs.reduce<Record<string, typeof docs>>((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-medium mb-4">
          <BookOpen size={12} />
          {t('badge')}
        </div>
        <h1 className="font-heading text-4xl font-bold text-text-primary mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-text-secondary max-w-lg">
          {t('description')}
        </p>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-text-tertiary">
            {t('emptyMessage')}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, categoryDocs]) => (
            <div key={category}>
              <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryDocs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="group glass-card rounded-xl p-5 hover:border-glass-border-hover transition-all duration-200"
                  >
                    <h3 className="font-heading text-base font-semibold text-text-primary mb-1 flex items-center gap-2">
                      {doc.title}
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-text-tertiary">{doc.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
