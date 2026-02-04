import { Metadata } from 'next';
 
export default function Sitemap() {
  return [
    {
      url: 'https://mahmoud-attia.dev',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://mahmoud-attia.dev/#projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://mahmoud-attia.dev/#experience',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
