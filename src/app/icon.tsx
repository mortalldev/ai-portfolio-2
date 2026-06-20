import { ImageResponse } from 'next/og';
import { siteConfig } from '@/shared/config/site';

export const size = { width: 256, height: 256 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8b7bff, #22d3ee)',
        color: '#0a0a0f',
        fontSize: 150,
        fontWeight: 800,
        fontFamily: 'sans-serif',
        borderRadius: '56px',
      }}
    >
      {siteConfig.firstName[0]}
    </div>,
    { ...size },
  );
}
