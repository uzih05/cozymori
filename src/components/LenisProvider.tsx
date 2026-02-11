'use client';

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, ReactNode } from 'react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
