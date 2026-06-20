import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.firstName,
    description: siteConfig.role,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    icons: [
      {
        src: '/icon',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
  };
}
