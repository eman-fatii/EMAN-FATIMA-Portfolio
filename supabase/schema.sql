-- ========================================================
-- EMAN FATIMA PERSONAL PORTFOLIO – SUPABASE POSTGRESQL SCHEMA
-- Official Website: https://emanfatimaportfolio.vercel.app
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL DEFAULT 'Eman Fatima',
  email TEXT NOT NULL DEFAULT 'emanfatima9300@gmail.com',
  title TEXT NOT NULL DEFAULT 'Computer Engineering Student | Digital Marketing Enthusiast',
  biography TEXT NOT NULL,
  education TEXT NOT NULL DEFAULT 'BS Computer Engineering',
  semester TEXT NOT NULL DEFAULT '3rd Semester',
  profile_image TEXT,
  social_links JSONB DEFAULT '{"linkedin":"","facebook":"","instagram":"","github":"","twitter":""}'::jsonb,
  hero_intro TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Social Media', 'Digital Marketing', 'Productivity Tools', 'Technical', 'Other')),
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  proficiency TEXT NOT NULL DEFAULT 'Intermediate',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT,
  issue_date DATE NOT NULL,
  file_url TEXT,
  credential_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  image_alt TEXT DEFAULT 'Blog post featured visual',
  category TEXT NOT NULL DEFAULT 'Digital Marketing',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  seo_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for blog search and slug lookup
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);

-- 5. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PROFILES: Everyone can read, authenticated admin can update
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin can update profile" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SKILLS: Everyone can read, authenticated admin can manage
CREATE POLICY "Public skills are readable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin can manage skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- CERTIFICATES: Everyone can read, authenticated admin can manage
CREATE POLICY "Public certificates are readable by everyone" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admin can manage certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- BLOG POSTS: Everyone can read published posts, authenticated admin can manage all
CREATE POLICY "Public can view published blogs" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admin can manage all blogs" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- CONTACT MESSAGES: Anyone can submit (insert), only authenticated admin can view/manage
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view and manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SITE SETTINGS: Everyone can read, authenticated admin can update
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========================================================
-- STORAGE BUCKETS SETUP
-- ========================================================
-- Run in Supabase SQL editor:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
