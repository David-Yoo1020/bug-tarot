import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bug-tarot.vercel.app', // 본인의 Vercel 주소
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}