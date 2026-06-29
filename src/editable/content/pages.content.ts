import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Discover curated bookmarks, resources & collections',
      description:
        'Browse a focused library of hand-picked bookmarks, trusted references, and downloadable resources in one clean experience.',
      openGraphTitle: 'Discover curated bookmarks, resources & collections',
      openGraphDescription:
        'A focused resource library built around quality over noise — bookmarks, collections, and references worth saving.',
      keywords: ['bookmarks', 'curated resources', 'resource library', 'collections', 'references'],
    },
    hero: {
      badge: 'A curated resource library',
      title: ['Save what matters.', 'Find it when it counts.'],
      description:
        'Explore hand-picked bookmarks, trusted references, and downloadable resources through one focused, well-organised library.',
      primaryCta: { label: 'Browse resources', href: '/sbm' },
      secondaryCta: { label: 'Explore library', href: '/pdf' },
      searchPlaceholder: 'Search resources, bookmarks, topics…',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription:
        'Recent images and stories stay at the center of the experience without changing any core platform behaviour.',
    },
    stats: [
      { label: 'Curated resources', value: '1,200+' },
      { label: 'Collections', value: '80+' },
      { label: 'Updated', value: 'Daily' },
    ],
    intro: {
      badge: 'Why this library',
      title: 'A calmer way to save, browse, and rediscover useful things.',
      paragraphs: [
        'Most bookmarks get lost in cluttered folders or browser tabs. This platform keeps every saved resource organised, searchable, and easy to return to.',
        'Whether you start from a curated collection, a single bookmark, or a downloadable guide — the experience keeps everything connected and simple to navigate.',
        'No noise. No endless feeds. Just the resources that have already been vetted and organised for you.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Hand-curated bookmarks with context and categories.',
        'Downloadable guides, reports, and reference documents.',
        'Clean search across the entire resource library.',
        'Lightweight, fast, and built for focused discovery.',
      ],
      primaryLink: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryLink: { label: 'Open PDF library', href: '/pdf' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Discover resources organised for clarity, not just volume.',
      description:
        'Browse curated bookmarks, downloadable guides, and trusted references through one clean and connected experience.',
      primaryCta: { label: 'Browse resources', href: '/sbm' },
      secondaryCta: { label: 'Get in touch', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer, cleaner way to save and rediscover useful resources.',
    description: `${slot4BrandConfig.siteName} is built around one idea: the best resources deserve a proper home, not a forgotten browser tab.`,
    paragraphs: [
      'We curate bookmarks, reference documents, and downloadable guides so that visitors can find useful material without wading through noise.',
      'The platform keeps related content connected — so moving from a saved link to a related document or collection feels natural, not jarring.',
    ],
    values: [
      {
        title: 'Quality over volume',
        description:
          'Every resource in the library has been reviewed. We prioritise depth and usefulness over filling pages with mediocre content.',
      },
      {
        title: 'Calm, focused discovery',
        description:
          'Clean navigation, clear categories, and consistent structure let visitors move through the library at their own pace.',
      },
      {
        title: 'Built for return visits',
        description:
          'Bookmarks are only useful if you can find them again. The library is organised to make every revisit faster than the last.',
      },
    ],
    highlights: [
      { value: '1,200+', label: 'Curated resources' },
      { value: '80+', label: 'Organised collections' },
      { value: '100%', label: 'Human-reviewed' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what you need — we route every request to the right place.',
    description:
      'Whether you want to suggest a resource, ask about a partnership, or just say hello — use the form and we will get back to you within one working day.',
    formTitle: 'Send a message',
    faq: [
      {
        q: 'How do I submit a resource?',
        a: 'Use the Contact form to suggest a bookmark, guide, or document. We review every submission before adding it to the library.',
      },
      {
        q: 'Can I contribute as a curator?',
        a: 'Yes — reach out via the form and describe what area you would like to help curate. We always welcome subject-matter experts.',
      },
      {
        q: 'Is the library free to use?',
        a: 'Yes, browsing the entire library is free. Some features require an account.',
      },
    ],
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, collections, and resources across the library.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find exactly what you are looking for.',
      description:
        'Search across every bookmark, collection, and downloadable resource by keyword, category, or topic.',
      placeholder: 'Search by keyword, topic, category, or title…',
    },
    resultsTitle: 'Latest resources',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Submit new content to the resource library.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in to submit content.',
      description:
        'Log in to your account to access the publishing workspace and add bookmarks or documents to the library.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Add a resource to the library.',
      description:
        'Choose a content type, add its details, and submit it for review. Bookmarks and documents are welcome.',
    },
    formTitle: 'Resource details',
    submitLabel: 'Submit resource',
    successTitle: 'Resource submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your account.',
      badge: 'Welcome back',
      title: 'Sign in to your account.',
      description:
        'Log in to continue managing your submissions and accessing the publishing workspace.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Join the library',
      title: 'Create your account and start contributing.',
      description:
        'Create an account to access the publishing workspace and submit resources to the library.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for your password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More resources',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
