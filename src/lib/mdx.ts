import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_ROOT = path.join(process.cwd(), 'src/content/docs');

function getDocsDir(locale: string): string {
  return path.join(DOCS_ROOT, locale);
}

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  category: string;
}

export interface Doc extends DocMeta {
  content: string;
}

export function getAllDocs(locale: string = 'en'): DocMeta[] {
  const dir = getDocsDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug: filename.replace('.mdx', ''),
        title: (data.title as string) || filename.replace('.mdx', ''),
        description: (data.description as string) || '',
        order: (data.order as number) || 999,
        category: (data.category as string) || 'General',
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string, locale: string = 'en'): Doc | null {
  const filePath = path.join(getDocsDir(locale), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    order: (data.order as number) || 999,
    category: (data.category as string) || 'General',
    content,
  };
}

export function getDocSlugs(locale: string = 'en'): string[] {
  const dir = getDocsDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
