import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ryosukesuzuki.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          ja: 'https://ryosukesuzuki.com/ja',
        },
      },
    },
  ]
}