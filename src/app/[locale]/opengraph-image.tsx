import { ImageResponse } from 'next/og';
import { siteConfig } from '@/shared/config/site';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #16121f 60%, #0a0a0f 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #8b7bff, #22d3ee)',
              color: '#0a0a0f',
              fontSize: '34px',
              fontWeight: 800,
            }}
          >
            {siteConfig.firstName[0]}
            {siteConfig.lastName[0]}
          </div>
          <div style={{ display: 'flex', fontSize: '26px', color: '#a1a1aa' }}>
            {siteConfig.url.replace('https://', '')}
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
        >
          <div
            style={{ display: 'flex', fontSize: '78px', fontWeight: 800, lineHeight: 1.05 }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{ display: 'flex', fontSize: '40px', fontWeight: 600, color: '#8b7bff' }}
          >
            {siteConfig.role}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: '28px', color: '#a1a1aa' }}>
          React · Next.js · TypeScript · Node.js · 4+ years
        </div>
      </div>
    ),
    { ...size },
  );
}
