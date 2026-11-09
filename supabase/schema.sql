-- ==============================================================================
-- Eman Fatima Portfolio – PostgreSQL Schema & Seed Data for Supabase
-- Run this complete script in the Supabase SQL Editor:
-- Supabase Dashboard -> Project -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. CREATE TABLES
-- ==============================================================================

-- 2.1 Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT ('eman-profile-01'),
    full_name TEXT NOT NULL DEFAULT 'Eman Fatima',
    email TEXT NOT NULL DEFAULT 'emanfatima9300@gmail.com',
    title TEXT NOT NULL DEFAULT 'Computer Engineering Student | Digital Marketing Enthusiast',
    biography TEXT NOT NULL,
    education TEXT NOT NULL DEFAULT 'BS Computer Engineering',
    semester TEXT NOT NULL DEFAULT '3rd Semester',
    profile_image TEXT DEFAULT '/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg',
    social_links JSONB DEFAULT '{"linkedin": "https://www.linkedin.com/in/eman-fatima-a927683a2/"}'::jsonb,
    hero_intro TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.2 Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Social Media', 'Digital Marketing', 'Productivity Tools', 'Technical')),
    icon TEXT NOT NULL DEFAULT 'Share2',
    proficiency TEXT NOT NULL DEFAULT 'Intermediate' CHECK (proficiency IN ('Learning', 'Foundational', 'Intermediate', 'Proficient', 'Advanced')),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.3 Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    description TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    file_url TEXT,
    credential_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.4 Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    image_alt TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    seo_title TEXT,
    meta_description TEXT,
    focus_keyword TEXT,
    published_at TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.5 Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.6 Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    setting_key TEXT PRIMARY KEY,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Authenticated/Admin can manage profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Anon can manage profiles" ON public.profiles;

    DROP POLICY IF EXISTS "Public can view skills" ON public.skills;
    DROP POLICY IF EXISTS "Authenticated/Admin can manage skills" ON public.skills;
    DROP POLICY IF EXISTS "Anon can manage skills" ON public.skills;

    DROP POLICY IF EXISTS "Public can view certificates" ON public.certificates;
    DROP POLICY IF EXISTS "Authenticated/Admin can manage certificates" ON public.certificates;
    DROP POLICY IF EXISTS "Anon can manage certificates" ON public.certificates;

    DROP POLICY IF EXISTS "Public can view published blogs" ON public.blog_posts;
    DROP POLICY IF EXISTS "Authenticated/Admin can manage blogs" ON public.blog_posts;
    DROP POLICY IF EXISTS "Anon can manage blogs" ON public.blog_posts;

    DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
    DROP POLICY IF EXISTS "Authenticated/Admin can manage contact messages" ON public.contact_messages;
    DROP POLICY IF EXISTS "Anon can manage contact messages" ON public.contact_messages;

    DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
    DROP POLICY IF EXISTS "Authenticated/Admin can manage site settings" ON public.site_settings;
    DROP POLICY IF EXISTS "Anon can manage site settings" ON public.site_settings;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Policies for public reading & admin writing
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Anon can manage profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Anon can manage skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Anon can manage certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published blogs" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Anon can manage blogs" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon can manage contact messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anon can manage site settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 4. SEED INITIAL DATA
-- ==============================================================================

-- 4.1 Seed Profile
INSERT INTO public.profiles (
    id, full_name, email, title, biography, education, semester, profile_image, social_links, hero_intro
) VALUES (
    'eman-profile-01',
    'Eman Fatima',
    'emanfatima9300@gmail.com',
    'Computer Engineering Student | Digital Marketing Enthusiast',
    'Hello! I''m Eman Fatima, a BS Computer Engineering student currently in my 3rd semester. I am interested in digital marketing, social media management, and technology. I enjoy learning new digital skills, exploring creative marketing strategies, and developing my professional capabilities.',
    'BS Computer Engineering',
    '3rd Semester',
    '/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg',
    '{"linkedin": "https://www.linkedin.com/in/eman-fatima-a927683a2/"}'::jsonb,
    'I''m Eman Fatima, a BS Computer Engineering student passionate about digital marketing, social media management, and creating meaningful digital experiences.'
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    title = EXCLUDED.title,
    biography = EXCLUDED.biography,
    education = EXCLUDED.education,
    semester = EXCLUDED.semester,
    profile_image = EXCLUDED.profile_image,
    social_links = EXCLUDED.social_links,
    hero_intro = EXCLUDED.hero_intro,
    updated_at = NOW();

-- 4.2 Seed Skills
INSERT INTO public.skills (id, title, description, category, icon, proficiency, display_order)
VALUES
    ('skill-1', 'Social Media Account Management', 'Curating consistent brand presence, content calendar planning, audience engagement, and community interaction workflows.', 'Social Media', 'Share2', 'Intermediate', 1),
    ('skill-2', 'Social Media Marketing', 'Crafting targeted promotional campaigns, creative visual copywriting, and multi-channel audience growth strategies.', 'Social Media', 'TrendingUp', 'Intermediate', 2),
    ('skill-3', 'Email Marketing', 'Designing structured email newsletters, subscriber segmentation, subject line optimization, and deliverability monitoring.', 'Digital Marketing', 'Mail', 'Foundational', 3),
    ('skill-4', 'Facebook Marketplace Marketing', 'Product listing optimization, customer inquiry communication, buyer trust cultivation, and local marketplace lead generation.', 'Digital Marketing', 'Store', 'Intermediate', 4),
    ('skill-5', 'Facebook Marketing', 'Page administration, organic post scheduling, Meta Business Suite campaign setup, and brand community management.', 'Digital Marketing', 'Globe', 'Intermediate', 5),
    ('skill-6', 'Microsoft Word', 'Comprehensive report formatting, structured documentation, academic papers, typography hierarchy, and professional styling.', 'Productivity Tools', 'FileText', 'Proficient', 6),
    ('skill-7', 'Microsoft Excel', 'Data entry structuring, fundamental formula operations, spreadsheets organization, conditional formatting, and summary tables.', 'Productivity Tools', 'Table', 'Intermediate', 7),
    ('skill-8', 'Microsoft PowerPoint', 'High-impact visual slide deck design, academic presentations, marketing pitches, structured visual flow, and animations.', 'Productivity Tools', 'Presentation', 'Proficient', 8)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    icon = EXCLUDED.icon,
    proficiency = EXCLUDED.proficiency,
    display_order = EXCLUDED.display_order,
    updated_at = NOW();

-- 4.3 Seed Certificates
INSERT INTO public.certificates (id, title, organization, description, issue_date, file_url, credential_url)
VALUES
    (
        'cert-1',
        'Certificate of Participation – IEEE STEP Program',
        'IEEE KFUEIT Chapter & IEEE Education Society',
        'Awarded to Eman Fatima for actively participating in the IEEE Step Program "Campus to Career: The IEEE STEP journey", held on 15 October 2026 at Civil Auditorium, KFUEIT.',
        '2026-10-15',
        '/assets/aistudio/image_41ba8fb8.png',
        'https://www.linkedin.com/in/eman-fatima-a927683a2/'
    ),
    (
        'cert-2',
        'Building Digital Clones with AI Masterclass',
        'DataCrumbs',
        'Proudly presented to Emaan Fatima for successfully participating in the masterclass "Building Digital Clones with AI", demonstrating initiative and commitment to deepening AI and digital capabilities. Signed by Abis Hussain Syed, CEO & Founder.',
        '2026-07-10',
        '/assets/aistudio/image_a5d6518b.png',
        'https://www.linkedin.com/in/eman-fatima-a927683a2/'
    ),
    (
        'cert-3',
        'Certificate of Attendance – Integrating IEEE Xplore Resources',
        'IEEE (Asia-IEEE)',
        'Attended the comprehensive online training session on "Integrating IEEE Xplore Resources into your teaching: A dedicated session for lecturers" (Certificate ID: IEEE260818148). Signed by Alex Liu Yupeng, Manager Client Services for Asia-IEEE.',
        '2026-08-18',
        '/assets/aistudio/image_fd153459.png',
        'https://www.linkedin.com/in/eman-fatima-a927683a2/'
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    organization = EXCLUDED.organization,
    description = EXCLUDED.description,
    issue_date = EXCLUDED.issue_date,
    file_url = EXCLUDED.file_url,
    credential_url = EXCLUDED.credential_url,
    updated_at = NOW();

-- 4.4 Seed Blog Posts
INSERT INTO public.blog_posts (
    id, title, slug, description, content, featured_image, image_alt, category, tags, status, seo_title, meta_description, focus_keyword, published_at
) VALUES
    (
        'blog-1',
        'Digital Marketing Fundamentals for Engineering Students',
        'digital-marketing-fundamentals-for-engineering-students',
        'How analytical engineering problem-solving complements digital marketing frameworks, customer acquisition, and modern technology.',
        '# Digital Marketing Fundamentals for Engineering Students\n\nAs a **BS Computer Engineering student in my 3rd semester**, people frequently ask why I dedicate significant time to digital marketing alongside circuit analysis and programming algorithms.\n\nThe reality is that **engineering and digital marketing share the same core foundation: systems thinking, data analysis, and iterative optimization**.\n\n## The Intersection of Technology and Marketing\n\nTraditional marketing relied heavily on intuitive guesses. Modern digital marketing, by contrast, is driven by:\n- **Conversion rate metrics & analytics funnels**\n- **Algorithmic distribution across social platforms**\n- **Automated customer communication workflows**\n- **A/B split testing of creative copy and visuals**\n\nWhen you study computer engineering, you learn how data flows through systems. When you apply that to social media campaigns or email marketing, you build structured processes that can be measured and continuously improved.\n\n## Key Disciplines Every Student Should Explore\n\n1. **Audience Research**: Understanding the exact demographic, pain points, and behavior of potential users or customers.\n2. **Channel Strategy**: Choosing whether Facebook, LinkedIn, Email, or Search provides the highest ROI for your specific objective.\n3. **Content Consistency**: Creating valuable, authentic content rather than spammy sales pitches.\n\n## Looking Ahead\n\nDeveloping digital marketing capabilities early gives students an immense edge. Whether launching personal projects, managing accounts for businesses, or building technological solutions, understanding how to reach people is invaluable.',
        '/src/assets/images/blog_digital_marketing_1794240984471.jpg',
        'Digital marketing analytics on laptop with sleek red ambiance',
        'Digital Marketing',
        ARRAY['Digital Marketing', 'Computer Engineering', 'Strategy'],
        'published',
        'Digital Marketing Fundamentals for Engineering Students | Eman Fatima',
        'Discover how computer engineering students can leverage systems thinking and analytical logic to excel in modern digital marketing.',
        'Digital Marketing for Engineering Students',
        '2026-10-15'
    ),
    (
        'blog-2',
        'Social Media Management: Strategy and Consistency for Beginners',
        'social-media-management-strategy-beginners',
        'A structured guide on how to build, organize, and maintain social media presence with consistent scheduling and meaningful engagement.',
        '# Social Media Management: Strategy and Consistency for Beginners\n\nSocial media account management is more than posting pictures; it is the deliberate cultivation of a brand''s voice and community.\n\nFor small businesses, creators, and professionals, having an active, trustworthy digital storefront on platforms like Facebook and Instagram is non-negotiable.\n\n## 1. Defining Clear Content Pillars\n\nNever sit down to create content without knowing what category it belongs to. Healthy accounts balance:\n- **Educational / Value posts**: Teaching your audience something practical\n- **Behind-the-Scenes / Process**: Showing how services are executed or products are made\n- **Community & Social Proof**: Answering questions, highlighting buyer feedback\n- **Direct Offers**: Clear, polite invitations to connect or purchase\n\n## 2. The Power of a Weekly Calendar\n\nConsistency is the single hardest element for beginners. Planning weekly batches removes daily anxiety:\n- Batch write captions on designated days\n- Prepare creative assets in advance\n- Monitor analytics at the end of the week to see what resonated\n\n## 3. Engagement Over Follower Vanity\n\nA smaller, active, responsive audience is infinitely more valuable than thousands of inactive followers. Replying to comments, addressing direct inquiries promptly, and treating followers with respect builds authentic long-term equity.',
        '/src/assets/images/blog_social_media_1794240985996.jpg',
        'Social media planning workspace with smartphone and content journal',
        'Social Media',
        ARRAY['Social Media Management', 'Content Strategy', 'Growth'],
        'published',
        'Social Media Management Strategy for Beginners | Eman Fatima',
        'Learn actionable social media account management strategies, weekly planning frameworks, and audience engagement practices.',
        'Social Media Management',
        '2026-10-28'
    ),
    (
        'blog-3',
        'Email Marketing Automation: Best Practices and Practical Workflows',
        'email-marketing-automation-best-practices',
        'Why email marketing remains the highest ROI digital channel and how structured workflows create lasting customer relationships.',
        '# Email Marketing Automation: Best Practices and Practical Workflows\n\nWhile algorithms on social networks change continually, **email represents an owned channel where you maintain direct communication with your audience**.\n\n## Why Email Marketing Excels\n\n1. **Direct Access**: Your message arrives directly in a personal inbox without an algorithm suppressing reach.\n2. **Measurable Performance**: Open rates, click-through rates, and unsubscribes provide transparent feedback on your messaging.\n3. **Personalization**: Subscribers can receive messages tailored to their exact preferences and sign-up dates.\n\n## Foundational Email Sequences\n\n- **The Welcome Series**: Introduce your mission, set expectations on email frequency, and provide immediate value.\n- **Value Newsletters**: Share curated tips, industry breakdowns, or educational insights.\n- **Re-engagement Reminders**: Friendly check-ins to keep subscriber lists clean and active.\n\n## Crafting Subject Lines that Get Opened\n\nThe best subject lines are:\n- Honest and clear about the email contents\n- Concise (ideally under 50 characters)\n- Devoid of misleading clickbait or excessive punctuation\n\nBuilding discipline in email marketing gives any digital marketer a reliable superpower for long-term audience trust.',
        '/src/assets/images/blog_email_marketing_1794240986561.jpg',
        'Email marketing builder on modern workstation monitor with red ambient glow',
        'Digital Marketing',
        ARRAY['Email Marketing', 'Automation', 'Digital Strategy'],
        'published',
        'Email Marketing Automation Best Practices | Eman Fatima',
        'Explore core email marketing frameworks, welcome sequence automation, and subject line optimization for consistent conversions.',
        'Email Marketing Automation',
        '2026-11-04'
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    content = EXCLUDED.content,
    featured_image = EXCLUDED.featured_image,
    image_alt = EXCLUDED.image_alt,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags,
    status = EXCLUDED.status,
    seo_title = EXCLUDED.seo_title,
    meta_description = EXCLUDED.meta_description,
    focus_keyword = EXCLUDED.focus_keyword,
    published_at = EXCLUDED.published_at,
    updated_at = NOW();

-- 4.5 Seed Site Settings
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES (
    'general',
    '{
        "site_name": "Eman Fatima",
        "site_description": "Official personal portfolio of Eman Fatima. BS Computer Engineering student with digital marketing and social media management skills.",
        "seo_title": "Eman Fatima | Personal Portfolio & Digital Marketing Skills",
        "meta_description": "Welcome to Eman Fatima''s official portfolio. Explore her Computer Engineering education, digital marketing interests, social media management skills, email marketing, and professional profile.",
        "contact_email": "emanfatima9300@gmail.com",
        "footer_text": "© 2026 Eman Fatima. All rights reserved. Crafted with clean engineering standards and black-and-red aesthetics.",
        "social_links": {
            "linkedin": "https://www.linkedin.com/in/eman-fatima-a927683a2/"
        }
    }'::jsonb
) ON CONFLICT (setting_key) DO UPDATE SET
    setting_value = EXCLUDED.setting_value,
    updated_at = NOW();

-- ==============================================================================
-- 5. VERIFY COUNTS
-- ==============================================================================
SELECT 'profiles' AS tbl, count(*) FROM public.profiles
UNION ALL
SELECT 'skills', count(*) FROM public.skills
UNION ALL
SELECT 'certificates', count(*) FROM public.certificates
UNION ALL
SELECT 'blog_posts', count(*) FROM public.blog_posts
UNION ALL
SELECT 'contact_messages', count(*) FROM public.contact_messages
UNION ALL
SELECT 'site_settings', count(*) FROM public.site_settings;
