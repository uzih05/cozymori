import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="font-heading text-3xl font-bold text-text-primary mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="font-heading text-2xl font-semibold text-text-primary mt-8 mb-3 pb-2 border-b border-glass-border" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-heading text-lg font-semibold text-text-primary mt-6 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  em: (props) => (
    <em className="italic text-text-secondary" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-1" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 text-text-secondary mb-4 space-y-1" {...props} />
  ),
  li: (props) => (
    <li className="text-text-secondary leading-relaxed" {...props} />
  ),
  code: (props) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code className="bg-accent-subtle text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
      );
    }
    return <code className="font-mono text-sm" {...props} />;
  },
  pre: (props) => (
    <pre className="glass-card rounded-xl p-4 overflow-x-auto mb-4 text-sm leading-relaxed" {...props} />
  ),
  a: (props) => (
    <a className="text-accent hover:text-accent-hover transition-colors border-b border-accent-glow hover:border-accent" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-2 border-accent pl-4 italic text-text-tertiary mb-4" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-text-secondary" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead {...props} />
  ),
  tbody: (props) => (
    <tbody {...props} />
  ),
  tr: (props) => (
    <tr className="border-b border-glass-border/50" {...props} />
  ),
  th: (props) => (
    <th className="text-left font-heading font-semibold text-text-primary px-4 py-2 border-b border-glass-border" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-2 border-b border-glass-border/50" {...props} />
  ),
  hr: () => <hr className="border-glass-border my-8" />,
};

export default components;
