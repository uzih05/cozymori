import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlowCard({
  children,
  className = '',
}: GlowCardProps) {
  return (
    <div className={`glass-card rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
