'use client';

import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { DocMeta } from '@/lib/mdx';

interface SidebarProps {
  docs: DocMeta[];
}

export default function Sidebar({ docs }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('docs');

  const grouped = docs.reduce<Record<string, DocMeta[]>>((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 pb-8">
        <nav className="space-y-6">
          <Link
            href="/docs"
            className={`block text-sm font-medium transition-colors ${
              pathname === '/docs'
                ? 'text-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {t('overview')}
          </Link>

          {Object.entries(grouped).map(([category, categoryDocs]) => (
            <div key={category}>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">
                {category}
              </h4>
              <ul className="space-y-1">
                {categoryDocs.map((doc) => {
                  const href = `/docs/${doc.slug}` as const;
                  const isActive = pathname === href;
                  return (
                    <li key={doc.slug}>
                      <Link
                        href={href}
                        className={`block text-sm py-1 pl-3 border-l-2 transition-colors ${
                          isActive
                            ? 'border-accent text-accent'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-glass-border-hover'
                        }`}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
