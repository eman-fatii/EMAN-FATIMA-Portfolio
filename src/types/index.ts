export interface Profile {
  id: string;
  full_name: string;
  email: string;
  title: string;
  biography: string;
  education: string;
  semester: string;
  profile_image: string;
  social_links: {
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  hero_intro: string;
  created_at?: string;
  updated_at?: string;
}

export type SkillCategory = 'Social Media' | 'Digital Marketing' | 'Productivity Tools' | 'Technical';

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  icon: string;
  proficiency: 'Learning' | 'Foundational' | 'Intermediate' | 'Proficient' | 'Advanced';
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  description: string;
  issue_date: string;
  file_url?: string;
  credential_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image: string;
  image_alt: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  seo_title: string;
  meta_description: string;
  focus_keyword: string;
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id?: string;
  site_name: string;
  site_description: string;
  seo_title: string;
  meta_description: string;
  contact_email: string;
  footer_text: string;
  social_links: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
  };
}
