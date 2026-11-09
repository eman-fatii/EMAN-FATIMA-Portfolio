import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  articleMeta?: {
    publishedTime: string;
    author: string;
    tags?: string[];
  };
  schemaData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Eman Fatima | Personal Portfolio & Digital Marketing Skills',
  description = "Welcome to Eman Fatima's official portfolio. Explore her Computer Engineering education, digital marketing interests, social media management skills, email marketing, and professional profile.",
  canonicalUrl,
  ogImage = '/src/assets/images/eman_fatima_portrait_1794240983912.jpg',
  ogType = 'website',
  schemaData,
}) => {
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://emanfatimaportfolio.vercel.app');

  useEffect(() => {
    // Document Title
    document.title = title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // OpenGraph Tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': currentUrl,
      'og:type': ogType,
      'og:image': ogImage,
      'og:site_name': 'Eman Fatima Portfolio',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(ogTags).forEach(([key, val]) => {
      const isProperty = key.startsWith('og:');
      const selector = isProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', key);
        } else {
          tag.setAttribute('name', key);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', val);
    });

    // Default Person + WebSite Structured Data (Schema.org JSON-LD)
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://emanfatimaportfolio.vercel.app/#person',
          name: 'Eman Fatima',
          url: 'https://emanfatimaportfolio.vercel.app',
          email: 'emanfatima9300@gmail.com',
          jobTitle: 'Computer Engineering Student & Digital Marketing Practitioner',
          description:
            'BS Computer Engineering student in 3rd semester specializing in digital marketing, social media account management, email marketing, and technology.',
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'BS Computer Engineering',
          },
          knowsAbout: [
            'Social Media Account Management',
            'Social Media Marketing',
            'Digital Marketing',
            'Email Marketing',
            'Facebook Marketplace Marketing',
            'Facebook Marketing',
            'Microsoft Word',
            'Microsoft Excel',
            'Microsoft PowerPoint',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': 'https://emanfatimaportfolio.vercel.app/#website',
          url: 'https://emanfatimaportfolio.vercel.app',
          name: 'Eman Fatima Portfolio',
          description:
            'Official portfolio and knowledge base of Eman Fatima covering Computer Engineering and digital marketing expertise.',
          publisher: {
            '@id': 'https://emanfatimaportfolio.vercel.app/#person',
          },
        },
      ],
    };

    const targetJsonLd = schemaData || defaultSchema;

    let scriptTag = document.querySelector('script#portfolio-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'portfolio-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(targetJsonLd);
  }, [title, description, currentUrl, ogImage, ogType, schemaData]);

  return null;
};
