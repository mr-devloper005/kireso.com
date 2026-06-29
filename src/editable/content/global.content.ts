import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated resource library',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated resources & bookmarks',
    primaryLinks: [
      { label: 'Resources', href: '/sbm' },
      { label: 'Library', href: '/pdf' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
    actions: {
      primary: { label: 'Browse resources', href: '/sbm' },
      secondary: { label: 'Submit a resource', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Save what matters. Find it when it counts.',
    description:
      'A focused, well-organised library of bookmarks, curated collections, and downloadable resources — built for people who value quality over noise.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Resources', href: '/sbm' },
          { label: 'PDF Library', href: '/pdf' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for calm discovery and purposeful publishing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
