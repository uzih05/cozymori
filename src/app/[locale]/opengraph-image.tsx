import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'cozymori — AI Observability Framework';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tagline =
    locale === 'ko'
      ? '관측하고, 캐싱하고, 치유합니다.'
      : 'Simpler, Easier, For Developers.';

  const sub =
    locale === 'ko'
      ? 'AI 관측 프레임워크'
      : 'AI Observability Framework';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0b',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '200px',
            right: '100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #06b6d4, #8b5cf6)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: '#f59e0b',
              lineHeight: 1,
            }}
          >
            cozymori
          </div>

          {/* Dot */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.15)',
              marginTop: '-24px',
              lineHeight: 1,
            }}
          >
            .
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.7)',
              marginTop: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            {tagline}
          </div>

          {/* Sub */}
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.35)',
              marginTop: '8px',
            }}
          >
            {sub}
          </div>
        </div>

        {/* Product badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '99px',
              border: '1px solid rgba(6,182,212,0.3)',
              backgroundColor: 'rgba(6,182,212,0.08)',
              fontSize: 14,
              color: '#22d3ee',
            }}
          >
            VectorWave
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '99px',
              border: '1px solid rgba(139,92,246,0.3)',
              backgroundColor: 'rgba(139,92,246,0.08)',
              fontSize: 14,
              color: '#a78bfa',
            }}
          >
            VectorSurfer
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '99px',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Open Source
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            fontSize: 14,
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          cozymori.com
        </div>
      </div>
    ),
    { ...size }
  );
}
