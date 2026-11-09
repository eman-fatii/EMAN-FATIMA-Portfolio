import { createClient } from '@supabase/supabase-js';
import type {
  Profile,
  Skill,
  Certificate,
  BlogPost,
  ContactMessage,
  SiteSettings,
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    supabaseUrl !== 'https://your-project.supabase.co'
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial Seed Data accurately aligned with Eman Fatima's Profile
const INITIAL_PROFILE: Profile = {
  id: 'eman-profile-01',
  full_name: 'Eman Fatima',
  email: 'emanfatima9300@gmail.com',
  title: 'Computer Engineering Student | Digital Marketing Enthusiast',
  biography:
    "Hello! I'm Eman Fatima, a BS Computer Engineering student currently in my 3rd semester. I am interested in digital marketing, social media management, and technology. I enjoy learning new digital skills, exploring creative marketing strategies, and developing my professional capabilities.",
  education: 'BS Computer Engineering',
  semester: '3rd Semester',
  profile_image: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg',
  social_links: {
    linkedin: 'https://www.linkedin.com/in/eman-fatima-a927683a2/',
  },
  hero_intro:
    "I'm Eman Fatima, a BS Computer Engineering student passionate about digital marketing, social media management, and creating meaningful digital experiences.",
};

const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    title: 'Social Media Account Management',
    description:
      'Curating consistent brand presence, content calendar planning, audience engagement, and community interaction workflows.',
    category: 'Social Media',
    icon: 'Share2',
    proficiency: 'Intermediate',
    display_order: 1,
  },
  {
    id: 'skill-2',
    title: 'Social Media Marketing',
    description:
      'Crafting targeted promotional campaigns, creative visual copywriting, and multi-channel audience growth strategies.',
    category: 'Social Media',
    icon: 'TrendingUp',
    proficiency: 'Intermediate',
    display_order: 2,
  },
  {
    id: 'skill-3',
    title: 'Email Marketing',
    description:
      'Designing structured email newsletters, subscriber segmentation, subject line optimization, and deliverability monitoring.',
    category: 'Digital Marketing',
    icon: 'Mail',
    proficiency: 'Foundational',
    display_order: 3,
  },
  {
    id: 'skill-4',
    title: 'Facebook Marketplace Marketing',
    description:
      'Product listing optimization, customer inquiry communication, buyer trust cultivation, and local marketplace lead generation.',
    category: 'Digital Marketing',
    icon: 'Store',
    proficiency: 'Intermediate',
    display_order: 4,
  },
  {
    id: 'skill-5',
    title: 'Facebook Marketing',
    description:
      'Page administration, organic post scheduling, Meta Business Suite campaign setup, and brand community management.',
    category: 'Digital Marketing',
    icon: 'Globe',
    proficiency: 'Intermediate',
    display_order: 5,
  },
  {
    id: 'skill-6',
    title: 'Microsoft Word',
    description:
      'Comprehensive report formatting, structured documentation, academic papers, typography hierarchy, and professional styling.',
    category: 'Productivity Tools',
    icon: 'FileText',
    proficiency: 'Proficient',
    display_order: 6,
  },
  {
    id: 'skill-7',
    title: 'Microsoft Excel',
    description:
      'Data entry structuring, fundamental formula operations, spreadsheets organization, conditional formatting, and summary tables.',
    category: 'Productivity Tools',
    icon: 'Table',
    proficiency: 'Intermediate',
    display_order: 7,
  },
  {
    id: 'skill-8',
    title: 'Microsoft PowerPoint',
    description:
      'High-impact visual slide deck design, academic presentations, marketing pitches, structured visual flow, and animations.',
    category: 'Productivity Tools',
    icon: 'Presentation',
    proficiency: 'Proficient',
    display_order: 8,
  },
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Digital Marketing Fundamentals for Engineering Students',
    slug: 'digital-marketing-fundamentals-for-engineering-students',
    description:
      'How analytical engineering problem-solving complements digital marketing frameworks, customer acquisition, and modern technology.',
    content: `
# Digital Marketing Fundamentals for Engineering Students

As a **BS Computer Engineering student in my 3rd semester**, people frequently ask why I dedicate significant time to digital marketing alongside circuit analysis and programming algorithms.

The reality is that **engineering and digital marketing share the same core foundation: systems thinking, data analysis, and iterative optimization**.

## The Intersection of Technology and Marketing

Traditional marketing relied heavily on intuitive guesses. Modern digital marketing, by contrast, is driven by:
- **Conversion rate metrics & analytics funnels**
- **Algorithmic distribution across social platforms**
- **Automated customer communication workflows**
- **A/B split testing of creative copy and visuals**

When you study computer engineering, you learn how data flows through systems. When you apply that to social media campaigns or email marketing, you build structured processes that can be measured and continuously improved.

## Key Disciplines Every Student Should Explore

1. **Audience Research**: Understanding the exact demographic, pain points, and behavior of potential users or customers.
2. **Channel Strategy**: Choosing whether Facebook, LinkedIn, Email, or Search provides the highest ROI for your specific objective.
3. **Content Consistency**: Creating valuable, authentic content rather than spammy sales pitches.

## Looking Ahead

Developing digital marketing capabilities early gives students an immense edge. Whether launching personal projects, managing accounts for businesses, or building technological solutions, understanding how to reach people is invaluable.
    `.trim(),
    featured_image: '/src/assets/images/blog_digital_marketing_1794240984471.jpg',
    image_alt: 'Digital marketing analytics on laptop with sleek red ambiance',
    category: 'Digital Marketing',
    tags: ['Digital Marketing', 'Computer Engineering', 'Strategy'],
    status: 'published',
    seo_title: 'Digital Marketing Fundamentals for Engineering Students | Eman Fatima',
    meta_description:
      'Discover how computer engineering students can leverage systems thinking and analytical logic to excel in modern digital marketing.',
    focus_keyword: 'Digital Marketing for Engineering Students',
    published_at: '2026-10-15',
  },
  {
    id: 'blog-2',
    title: 'Social Media Management: Strategy and Consistency for Beginners',
    slug: 'social-media-management-strategy-beginners',
    description:
      'A structured guide on how to build, organize, and maintain social media presence with consistent scheduling and meaningful engagement.',
    content: `
# Social Media Management: Strategy and Consistency for Beginners

Social media account management is more than posting pictures; it is the deliberate cultivation of a brand's voice and community.

For small businesses, creators, and professionals, having an active, trustworthy digital storefront on platforms like Facebook and Instagram is non-negotiable.

## 1. Defining Clear Content Pillars

Never sit down to create content without knowing what category it belongs to. Healthy accounts balance:
- **Educational / Value posts**: Teaching your audience something practical
- **Behind-the-Scenes / Process**: Showing how services are executed or products are made
- **Community & Social Proof**: Answering questions, highlighting buyer feedback
- **Direct Offers**: Clear, polite invitations to connect or purchase

## 2. The Power of a Weekly Calendar

Consistency is the single hardest element for beginners. Planning weekly batches removes daily anxiety:
- Batch write captions on designated days
- Prepare creative assets in advance
- Monitor analytics at the end of the week to see what resonated

## 3. Engagement Over Follower Vanity

A smaller, active, responsive audience is infinitely more valuable than thousands of inactive followers. Replying to comments, addressing direct inquiries promptly, and treating followers with respect builds authentic long-term equity.
    `.trim(),
    featured_image: '/src/assets/images/blog_social_media_1794240985996.jpg',
    image_alt: 'Social media planning workspace with smartphone and content journal',
    category: 'Social Media',
    tags: ['Social Media Management', 'Content Strategy', 'Growth'],
    status: 'published',
    seo_title: 'Social Media Management Strategy for Beginners | Eman Fatima',
    meta_description:
      'Learn actionable social media account management strategies, weekly planning frameworks, and audience engagement practices.',
    focus_keyword: 'Social Media Management',
    published_at: '2026-10-28',
  },
  {
    id: 'blog-3',
    title: 'Email Marketing Automation: Best Practices and Practical Workflows',
    slug: 'email-marketing-automation-best-practices',
    description:
      'Why email marketing remains the highest ROI digital channel and how structured workflows create lasting customer relationships.',
    content: `
# Email Marketing Automation: Best Practices and Practical Workflows

While algorithms on social networks change continually, **email represents an owned channel where you maintain direct communication with your audience**.

## Why Email Marketing Excels

1. **Direct Access**: Your message arrives directly in a personal inbox without an algorithm suppressing reach.
2. **Measurable Performance**: Open rates, click-through rates, and unsubscribes provide transparent feedback on your messaging.
3. **Personalization**: Subscribers can receive messages tailored to their exact preferences and sign-up dates.

## Foundational Email Sequences

- **The Welcome Series**: Introduce your mission, set expectations on email frequency, and provide immediate value.
- **Value Newsletters**: Share curated tips, industry breakdowns, or educational insights.
- **Re-engagement Reminders**: Friendly check-ins to keep subscriber lists clean and active.

## Crafting Subject Lines that Get Opened

The best subject lines are:
- Honest and clear about the email contents
- Concise (ideally under 50 characters)
- Devoid of misleading clickbait or excessive punctuation

Building discipline in email marketing gives any digital marketer a reliable superpower for long-term audience trust.
    `.trim(),
    featured_image: '/src/assets/images/blog_email_marketing_1794240986561.jpg',
    image_alt: 'Email marketing builder on modern workstation monitor with red ambient glow',
    category: 'Digital Marketing',
    tags: ['Email Marketing', 'Automation', 'Digital Strategy'],
    status: 'published',
    seo_title: 'Email Marketing Automation Best Practices | Eman Fatima',
    meta_description:
      'Explore core email marketing frameworks, welcome sequence automation, and subject line optimization for consistent conversions.',
    focus_keyword: 'Email Marketing Automation',
    published_at: '2026-11-04',
  },
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Certificate of Participation – IEEE STEP Program',
    organization: 'IEEE KFUEIT Chapter & IEEE Education Society',
    description:
      'Awarded to Eman Fatima for actively participating in the IEEE Step Program "Campus to Career: The IEEE STEP journey", held on 15 October 2026 at Civil Auditorium, KFUEIT.',
    issue_date: '2026-10-15',
    file_url: '/assets/aistudio/image_41ba8fb8.png',
    credential_url: 'https://www.linkedin.com/in/eman-fatima-a927683a2/',
  },
  {
    id: 'cert-2',
    title: 'Building Digital Clones with AI Masterclass',
    organization: 'DataCrumbs',
    description:
      'Proudly presented to Emaan Fatima for successfully participating in the masterclass "Building Digital Clones with AI", demonstrating initiative and commitment to deepening AI and digital capabilities. Signed by Abis Hussain Syed, CEO & Founder.',
    issue_date: '2026-07-10',
    file_url: '/assets/aistudio/image_a5d6518b.png',
    credential_url: 'https://www.linkedin.com/in/eman-fatima-a927683a2/',
  },
  {
    id: 'cert-3',
    title: 'Certificate of Attendance – Integrating IEEE Xplore Resources',
    organization: 'IEEE (Asia-IEEE)',
    description:
      'Attended the comprehensive online training session on "Integrating IEEE Xplore Resources into your teaching: A dedicated session for lecturers" (Certificate ID: IEEE260818148). Signed by Alex Liu Yupeng, Manager Client Services for Asia-IEEE.',
    issue_date: '2026-08-18',
    file_url: '/assets/aistudio/image_fd153459.png',
    credential_url: 'https://www.linkedin.com/in/eman-fatima-a927683a2/',
  },
];

const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'Eman Fatima',
  site_description:
    "Official personal portfolio of Eman Fatima. BS Computer Engineering student with digital marketing and social media management skills.",
  seo_title: 'Eman Fatima | Personal Portfolio & Digital Marketing Skills',
  meta_description:
    "Welcome to Eman Fatima's official portfolio. Explore her Computer Engineering education, digital marketing interests, social media management skills, email marketing, and professional profile.",
  contact_email: 'emanfatima9300@gmail.com',
  footer_text: '© 2026 Eman Fatima. All rights reserved. Crafted with clean engineering standards and black-and-red aesthetics.',
  social_links: {
    linkedin: 'https://www.linkedin.com/in/eman-fatima-a927683a2/',
  },
};

// STORAGE HELPERS (with local persistence fallback)
const getLocal = <T>(key: string, defaultValue: T): T => {
  try {
    const val = localStorage.getItem(`ef_${key}`);
    return val ? JSON.parse(val) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocal = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`ef_${key}`, JSON.stringify(value));
  } catch {
    // ignore local storage quota error
  }
};

// DATA SERVICE
export const dataService = {
  // PROFILE
  async getProfile(): Promise<Profile> {
    if (supabase) {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
      if (!error && data) return data;
    }
    return getLocal<Profile>('profile', INITIAL_PROFILE);
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ ...profile, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (!error && data) return data;
    }
    const current = getLocal<Profile>('profile', INITIAL_PROFILE);
    const updated = { ...current, ...profile, updated_at: new Date().toISOString() };
    setLocal('profile', updated);
    return updated;
  },

  // SKILLS
  async getSkills(): Promise<Skill[]> {
    if (supabase) {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    return getLocal<Skill[]>('skills', INITIAL_SKILLS);
  },

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const newSkill: Skill = {
      ...skill,
      id: `skill-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (supabase) {
      const { data, error } = await supabase.from('skills').insert([newSkill]).select().single();
      if (!error && data) return data;
    }
    const current = getLocal<Skill[]>('skills', INITIAL_SKILLS);
    const updated = [...current, newSkill];
    setLocal('skills', updated);
    return newSkill;
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    if (supabase) {
      const { data, error } = await supabase
        .from('skills')
        .update({ ...skill, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    }
    const current = getLocal<Skill[]>('skills', INITIAL_SKILLS);
    const updated = current.map((s) => (s.id === id ? { ...s, ...skill, updated_at: new Date().toISOString() } : s));
    setLocal('skills', updated);
    return updated.find((s) => s.id === id)!;
  },

  async deleteSkill(id: string): Promise<void> {
    if (supabase) {
      await supabase.from('skills').delete().eq('id', id);
    }
    const current = getLocal<Skill[]>('skills', INITIAL_SKILLS);
    setLocal('skills', current.filter((s) => s.id !== id));
  },

  // CERTIFICATES
  async getCertificates(): Promise<Certificate[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch {
        // Fallback to local
      }
    }
    const stored = getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    return stored && stored.length > 0 ? stored : INITIAL_CERTIFICATES;
  },

  async createCertificate(cert: Omit<Certificate, 'id'>): Promise<Certificate> {
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (supabase) {
      const { data, error } = await supabase.from('certificates').insert([newCert]).select().single();
      if (!error && data) return data;
    }
    const current = getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    const updated = [newCert, ...current];
    setLocal('certificates', updated);
    return newCert;
  },

  async updateCertificate(id: string, cert: Partial<Certificate>): Promise<Certificate> {
    if (supabase) {
      const { data, error } = await supabase
        .from('certificates')
        .update({ ...cert, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    }
    const current = getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    const updated = current.map((c) => (c.id === id ? { ...c, ...cert, updated_at: new Date().toISOString() } : c));
    setLocal('certificates', updated);
    return updated.find((c) => c.id === id)!;
  },

  async deleteCertificate(id: string): Promise<void> {
    if (supabase) {
      await supabase.from('certificates').delete().eq('id', id);
    }
    const current = getLocal<Certificate[]>('certificates', INITIAL_CERTIFICATES);
    setLocal('certificates', current.filter((c) => c.id !== id));
  },

  // BLOG POSTS
  async getBlogPosts(includeDrafts = false): Promise<BlogPost[]> {
    if (supabase) {
      try {
        let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        if (!includeDrafts) {
          query = query.eq('status', 'published');
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch {
        // Fallback to local
      }
    }
    const all = getLocal<BlogPost[]>('blogs', INITIAL_BLOGS);
    return includeDrafts ? all : all.filter((b) => b.status === 'published');
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const cleanSlug = (slug || '').trim().toLowerCase().replace(/\/$/, '');
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .ilike('slug', cleanSlug)
          .single();
        if (!error && data) return data;
      } catch {
        // Fallback to local
      }
    }
    const all = getLocal<BlogPost[]>('blogs', INITIAL_BLOGS);
    return (
      all.find(
        (b) => b.slug.trim().toLowerCase() === cleanSlug
      ) || null
    );
  },

  async createBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (supabase) {
      const { data, error } = await supabase.from('blog_posts').insert([newPost]).select().single();
      if (!error && data) return data;
    }
    const current = getLocal<BlogPost[]>('blogs', INITIAL_BLOGS);
    const updated = [newPost, ...current];
    setLocal('blogs', updated);
    return newPost;
  },

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    if (supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...post, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    }
    const current = getLocal<BlogPost[]>('blogs', INITIAL_BLOGS);
    const updated = current.map((b) => (b.id === id ? { ...b, ...post, updated_at: new Date().toISOString() } : b));
    setLocal('blogs', updated);
    return updated.find((b) => b.id === id)!;
  },

  async deleteBlogPost(id: string): Promise<void> {
    if (supabase) {
      await supabase.from('blog_posts').delete().eq('id', id);
    }
    const current = getLocal<BlogPost[]>('blogs', INITIAL_BLOGS);
    setLocal('blogs', current.filter((b) => b.id !== id));
  },

  // CONTACT MESSAGES
  async submitContactMessage(msg: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>): Promise<boolean> {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    if (supabase) {
      const { error } = await supabase.from('contact_messages').insert([newMsg]);
      if (!error) return true;
    }
    const current = getLocal<ContactMessage[]>('messages', []);
    setLocal('messages', [newMsg, ...current]);
    return true;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    if (supabase) {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getLocal<ContactMessage[]>('messages', []);
  },

  async markMessageRead(id: string, is_read: boolean): Promise<void> {
    if (supabase) {
      await supabase.from('contact_messages').update({ is_read }).eq('id', id);
    }
    const current = getLocal<ContactMessage[]>('messages', []);
    setLocal(
      'messages',
      current.map((m) => (m.id === id ? { ...m, is_read } : m))
    );
  },

  async deleteContactMessage(id: string): Promise<void> {
    if (supabase) {
      await supabase.from('contact_messages').delete().eq('id', id);
    }
    const current = getLocal<ContactMessage[]>('messages', []);
    setLocal('messages', current.filter((m) => m.id !== id));
  },

  // SITE SETTINGS
  async getSiteSettings(): Promise<SiteSettings> {
    if (supabase) {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('setting_key', 'general')
        .single();
      if (!error && data?.setting_value) return data.setting_value;
    }
    return getLocal<SiteSettings>('settings', INITIAL_SETTINGS);
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = getLocal<SiteSettings>('settings', INITIAL_SETTINGS);
    const updated = { ...current, ...settings };
    if (supabase) {
      await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'general',
          setting_value: updated,
          updated_at: new Date().toISOString(),
        });
    }
    setLocal('settings', updated);
    return updated;
  },
};
