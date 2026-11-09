import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Sparkles,
  Award,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Eye,
  CheckCircle,
  ExternalLink,
  Save,
  Database,
  Copy,
  Check,
  Search,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/SEO';
import { dataService, isSupabaseConfigured } from '../lib/supabase';
import type { Profile, Skill, Certificate, BlogPost, ContactMessage, SiteSettings } from '../types';

type AdminTab =
  | 'overview'
  | 'profile'
  | 'skills'
  | 'certificates'
  | 'blog'
  | 'messages'
  | 'settings';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Core Data States
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Notification Banner
  const [saveBanner, setSaveBanner] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Modals & Form States
  // Skill Modal
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState<Omit<Skill, 'id'>>({
    title: '',
    description: '',
    category: 'Social Media',
    icon: 'Sparkles',
    proficiency: 'Intermediate',
    display_order: 1,
  });

  // Certificate Modal
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [certForm, setCertForm] = useState<Omit<Certificate, 'id'>>({
    title: '',
    organization: '',
    description: '',
    issue_date: new Date().toISOString().split('T')[0],
    file_url: '',
    credential_url: '',
  });

  // Blog Modal / Editor
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    slug: '',
    description: '',
    content: '',
    featured_image: '',
    image_alt: '',
    category: 'Digital Marketing',
    tags: ['Marketing', 'Strategy'],
    status: 'published',
    seo_title: '',
    meta_description: '',
    focus_keyword: '',
    published_at: new Date().toISOString().split('T')[0],
  });

  const loadAllData = async () => {
    try {
      const [p, s, c, b, m, set] = await Promise.all([
        dataService.getProfile(),
        dataService.getSkills(),
        dataService.getCertificates(),
        dataService.getBlogPosts(true), // include drafts for admin
        dataService.getContactMessages(),
        dataService.getSiteSettings(),
      ]);
      setProfile(p);
      setSkills(s);
      setCertificates(c);
      setBlogs(b);
      setMessages(m);
      setSettings(set);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showNotification = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // Helper for auto-slug generation
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // -------------------------------------------------------------
  // PROFILE SUBMIT
  // -------------------------------------------------------------
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    await dataService.updateProfile(profile);
    showNotification('Profile information updated successfully!');
  };

  // -------------------------------------------------------------
  // SKILL HANDLERS
  // -------------------------------------------------------------
  const handleOpenSkillModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({
        title: skill.title,
        description: skill.description,
        category: skill.category,
        icon: skill.icon,
        proficiency: skill.proficiency,
        display_order: skill.display_order,
      });
    } else {
      setEditingSkill(null);
      setSkillForm({
        title: '',
        description: '',
        category: 'Social Media',
        icon: 'Sparkles',
        proficiency: 'Intermediate',
        display_order: skills.length + 1,
      });
    }
    setSkillModalOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill) {
      await dataService.updateSkill(editingSkill.id, skillForm);
      showNotification('Skill updated successfully!');
    } else {
      await dataService.createSkill(skillForm);
      showNotification('New skill created successfully!');
    }
    setSkillModalOpen(false);
    const updated = await dataService.getSkills();
    setSkills(updated);
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await dataService.deleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
      showNotification('Skill removed.');
    }
  };

  // -------------------------------------------------------------
  // CERTIFICATE HANDLERS
  // -------------------------------------------------------------
  const handleOpenCertModal = (cert?: Certificate) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title,
        organization: cert.organization,
        description: cert.description || '',
        issue_date: cert.issue_date,
        file_url: cert.file_url || '',
        credential_url: cert.credential_url || '',
      });
    } else {
      setEditingCert(null);
      setCertForm({
        title: '',
        organization: '',
        description: '',
        issue_date: new Date().toISOString().split('T')[0],
        file_url: '',
        credential_url: '',
      });
    }
    setCertModalOpen(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCert) {
      await dataService.updateCertificate(editingCert.id, certForm);
      showNotification('Certificate updated successfully!');
    } else {
      await dataService.createCertificate(certForm);
      showNotification('New certificate published successfully!');
    }
    setCertModalOpen(false);
    const updated = await dataService.getCertificates();
    setCertificates(updated);
  };

  const handleDeleteCert = async (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      await dataService.deleteCertificate(id);
      setCertificates(certificates.filter((c) => c.id !== id));
      showNotification('Certificate deleted.');
    }
  };

  // -------------------------------------------------------------
  // BLOG HANDLERS
  // -------------------------------------------------------------
  const handleOpenBlogModal = (post?: BlogPost) => {
    if (post) {
      setEditingBlog(post);
      setBlogForm({
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        featured_image: post.featured_image,
        image_alt: post.image_alt,
        category: post.category,
        tags: post.tags,
        status: post.status,
        seo_title: post.seo_title,
        meta_description: post.meta_description,
        focus_keyword: post.focus_keyword,
        published_at: post.published_at,
      });
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: '',
        slug: '',
        description: '',
        content: '## Introduction\n\nWrite article content here...\n\n## Practical Insights\n\nKey takeaways...',
        featured_image: '/src/assets/images/blog_digital_marketing_1794240984471.jpg',
        image_alt: 'Featured visual for article',
        category: 'Digital Marketing',
        tags: ['Marketing', 'Strategy'],
        status: 'published',
        seo_title: '',
        meta_description: '',
        focus_keyword: '',
        published_at: new Date().toISOString().split('T')[0],
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = blogForm.slug || generateSlug(blogForm.title);
    const payload = {
      ...blogForm,
      slug: finalSlug,
      seo_title: blogForm.seo_title || `${blogForm.title} | Eman Fatima`,
      meta_description: blogForm.meta_description || blogForm.description,
    };

    if (editingBlog) {
      await dataService.updateBlogPost(editingBlog.id, payload);
      showNotification('Article updated successfully!');
    } else {
      await dataService.createBlogPost(payload);
      showNotification('New article created successfully!');
    }
    setBlogModalOpen(false);
    const updated = await dataService.getBlogPosts(true);
    setBlogs(updated);
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await dataService.deleteBlogPost(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      showNotification('Article removed.');
    }
  };

  // -------------------------------------------------------------
  // MESSAGE HANDLERS
  // -------------------------------------------------------------
  const handleToggleRead = async (id: string, current: boolean) => {
    await dataService.markMessageRead(id, !current);
    setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: !current } : m)));
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Delete this inquiry message?')) {
      await dataService.deleteContactMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
      showNotification('Message deleted.');
    }
  };

  // -------------------------------------------------------------
  // SETTINGS HANDLER
  // -------------------------------------------------------------
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await dataService.updateSiteSettings(settings);
    showNotification('Site settings updated successfully!');
  };

  const publishedBlogsCount = blogs.filter((b) => b.status === 'published').length;
  const draftBlogsCount = blogs.filter((b) => b.status === 'draft').length;

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col md:flex-row">
      <SEO
        title="Admin Control Center | Eman Fatima"
        description="Secure portfolio management panel for updating profile, skills, certificates, blogs, and settings."
      />

      {/* Floating Save Banner */}
      {saveBanner && (
        <div className="fixed top-6 right-6 z-50 bg-[#E50914] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 text-sm font-semibold">
          <CheckCircle className="w-5 h-5" />
          <span>{saveBanner}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#111111] border-r border-[#222222] flex flex-col justify-between shrink-0">
        <div>
          {/* Dashboard Header */}
          <div className="p-6 border-b border-[#222222]">
            <Link to="/" className="text-lg font-extrabold tracking-wider text-white flex items-center gap-2.5">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg"
                alt="Eman Fatima"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#E50914] shadow-md shadow-[#E50914]/20 shrink-0"
              />
              <span className="font-extrabold tracking-wider text-white">EMAN FATIMA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
            </Link>
            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-[#888888]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Admin Console</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-sm font-medium">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'profile', label: 'Profile Management', icon: UserCheck },
              { id: 'skills', label: 'Skills Management', icon: Sparkles },
              { id: 'certificates', label: 'Certificates Management', icon: Award },
              { id: 'blog', label: 'Blog Management', icon: BookOpen },
              { id: 'messages', label: 'Contact Messages', icon: MessageSquare, badge: messages.filter((m) => !m.is_read).length },
              { id: 'settings', label: 'Website Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#181818] text-[#E50914] font-semibold border border-[#303030]'
                      : 'text-[#B3B3B3] hover:text-white hover:bg-[#181818]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  {Boolean(tab.badge && tab.badge > 0) && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-[#E50914] text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#222222] space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-[#888888] hover:text-white rounded-lg hover:bg-[#181818] transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* ========================================================
            TAB 1: OVERVIEW
            ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
              <p className="text-sm text-[#888888] mt-1">
                Real-time portfolio metrics, content distribution, and database connection status.
              </p>
            </div>

            {/* Supabase Connection Status Card */}
            <div className="p-5 bg-[#181818] border border-[#2c2c2c] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSupabaseConfigured() ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-[#222222] text-[#E50914] border border-[#383838]'}`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isSupabaseConfigured() ? 'Supabase PostgreSQL: Connected' : 'Supabase: Ready for Connection'}
                  </h4>
                  <p className="text-xs text-[#888888]">
                    {isSupabaseConfigured()
                      ? 'Queries are reading and synchronizing directly with live Supabase database tables.'
                      : 'Running in resilient preview storage mode. Add your VITE_SUPABASE_URL in .env to link live PostgreSQL.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#222222] hover:bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg transition-colors"
              >
                View Schema & Keys
              </button>
            </div>

            {/* Dynamic Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 bg-[#181818] border border-[#262626] rounded-xl space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#888888] font-medium">Total Skills</span>
                <p className="text-3xl font-mono font-bold text-white">{skills.length}</p>
                <span className="text-xs text-[#E50914] font-semibold">Active Profile</span>
              </div>
              <div className="p-5 bg-[#181818] border border-[#262626] rounded-xl space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#888888] font-medium">Certificates</span>
                <p className="text-3xl font-mono font-bold text-white">{certificates.length}</p>
                <span className="text-xs text-[#888888]">Verified Records</span>
              </div>
              <div className="p-5 bg-[#181818] border border-[#262626] rounded-xl space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#888888] font-medium">Published Blogs</span>
                <p className="text-3xl font-mono font-bold text-white">{publishedBlogsCount}</p>
                <span className="text-xs text-emerald-400 font-semibold">Live on Website</span>
              </div>
              <div className="p-5 bg-[#181818] border border-[#262626] rounded-xl space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#888888] font-medium">Draft Blogs</span>
                <p className="text-3xl font-mono font-bold text-white">{draftBlogsCount}</p>
                <span className="text-xs text-[#888888]">Unpublished</span>
              </div>
              <div className="p-5 bg-[#181818] border border-[#262626] rounded-xl space-y-1 col-span-2 lg:col-span-1">
                <span className="text-xs uppercase tracking-wider text-[#888888] font-medium">Contact Messages</span>
                <p className="text-3xl font-mono font-bold text-white">{messages.length}</p>
                <span className="text-xs text-[#E50914] font-semibold">
                  {messages.filter((m) => !m.is_read).length} Unread
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#181818] border border-[#262626] rounded-2xl space-y-3">
                <h4 className="text-base font-bold text-white">Publish New Article</h4>
                <p className="text-xs text-[#B3B3B3]">
                  Draft a new blog post on digital marketing, social media algorithms, or engineering topics.
                </p>
                <button
                  onClick={() => {
                    handleOpenBlogModal();
                    setActiveTab('blog');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Article</span>
                </button>
              </div>

              <div className="p-6 bg-[#181818] border border-[#262626] rounded-2xl space-y-3">
                <h4 className="text-base font-bold text-white">Manage Skills</h4>
                <p className="text-xs text-[#B3B3B3]">
                  Add verified technical abilities, change categories, or refine proficiency descriptions.
                </p>
                <button
                  onClick={() => {
                    handleOpenSkillModal();
                    setActiveTab('skills');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#222222] hover:bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Add New Skill</span>
                </button>
              </div>

              <div className="p-6 bg-[#181818] border border-[#262626] rounded-2xl space-y-3">
                <h4 className="text-base font-bold text-white">Upload Certificate</h4>
                <p className="text-xs text-[#B3B3B3]">
                  Attach verified academic or course certificates with issuing organization credentials.
                </p>
                <button
                  onClick={() => {
                    handleOpenCertModal();
                    setActiveTab('certificates');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#222222] hover:bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Add Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PROFILE MANAGEMENT
            ======================================================== */}
        {activeTab === 'profile' && profile && (
          <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Profile Management</h1>
              <p className="text-sm text-[#888888] mt-1">
                Update full name, education, semester standing, personal biography, and social accounts.
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                    Education Degree
                  </label>
                  <input
                    type="text"
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                    Current Semester
                  </label>
                  <input
                    type="text"
                    value={profile.semester}
                    onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  Profile Image URL / Path
                </label>
                <input
                  type="text"
                  value={profile.profile_image}
                  onChange={(e) => setProfile({ ...profile, profile_image: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={profile.social_links?.linkedin || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social_links: { linkedin: e.target.value },
                    })
                  }
                  placeholder="https://www.linkedin.com/in/eman-fatima-a927683a2/"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  Homepage Hero Lead Introduction
                </label>
                <textarea
                  rows={3}
                  value={profile.hero_intro}
                  onChange={(e) => setProfile({ ...profile, hero_intro: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  Professional Biography
                </label>
                <textarea
                  rows={5}
                  value={profile.biography}
                  onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div className="pt-4 border-t border-[#262626] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-all shadow-lg shadow-[#E50914]/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            TAB 3: SKILLS MANAGEMENT
            ======================================================== */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Skills Management</h1>
                <p className="text-sm text-[#888888] mt-1">
                  Add, edit, reorder, and categorize your competencies. Changes immediately reflect on the public Skills page.
                </p>
              </div>
              <button
                onClick={() => handleOpenSkillModal()}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-colors flex items-center gap-2 self-start cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-5 bg-[#181818] border border-[#262626] rounded-xl flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#888888] mb-2">
                      <span className="text-[#E50914] font-semibold">{skill.category}</span>
                      <span className="font-mono">Order: #{skill.display_order}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{skill.title}</h3>
                    <p className="text-xs text-[#B3B3B3] leading-relaxed line-clamp-3">{skill.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                    <span className="text-xs text-[#888888]">{skill.proficiency}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenSkillModal(skill)}
                        className="p-1.5 text-[#B3B3B3] hover:text-white hover:bg-[#222222] rounded-md transition-colors"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition-colors"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CERTIFICATES MANAGEMENT
            ======================================================== */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Certificates Management</h1>
                <p className="text-sm text-[#888888] mt-1">
                  Manage verifiable certificates, issuing authorities, issue dates, and document URLs.
                </p>
              </div>
              <button
                onClick={() => handleOpenCertModal()}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-colors flex items-center gap-2 self-start cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certificate</span>
              </button>
            </div>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 bg-[#181818] border border-[#262626] rounded-xl flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#888888] mb-2">
                        <span className="text-white font-medium">{cert.organization}</span>
                        <span className="font-mono">{cert.issue_date}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{cert.title}</h3>
                      {cert.description && (
                        <p className="text-xs text-[#B3B3B3] line-clamp-2">{cert.description}</p>
                      )}
                    </div>
                    <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                      {cert.credential_url ? (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#E50914] hover:underline flex items-center gap-1"
                        >
                          <span>Verify Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-[#707070]">No external link</span>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenCertModal(cert)}
                          className="p-1.5 text-[#B3B3B3] hover:text-white hover:bg-[#222222] rounded-md transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCert(cert.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-12 text-center max-w-lg mx-auto space-y-3">
                <Award className="w-10 h-10 text-[#E50914] mx-auto" />
                <h3 className="text-lg font-bold text-white">No Certificates Added Yet</h3>
                <p className="text-xs text-[#B3B3B3]">
                  As you complete digital marketing courses or academic credentials, click "Add Certificate" above to upload and verify them.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 5: BLOG MANAGEMENT
            ======================================================== */}
        {activeTab === 'blog' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Blog Content Management</h1>
                <p className="text-sm text-[#888888] mt-1">
                  Create, edit, publish, draft, or delete portfolio articles with custom URL slugs and SEO metadata.
                </p>
              </div>
              <button
                onClick={() => handleOpenBlogModal()}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-colors flex items-center gap-2 self-start cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#262626] text-xs font-semibold uppercase tracking-wider text-[#888888] bg-[#141414]">
                    <th className="p-4">Title & Slug</th>
                    <th className="p-4 hidden md:table-cell">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 hidden sm:table-cell">Published Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222] text-sm">
                  {blogs.map((post) => (
                    <tr key={post.id} className="hover:bg-[#1f1f1f]/60 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white line-clamp-1">{post.title}</div>
                        <div className="text-xs text-[#888888] font-mono line-clamp-1">/blog/{post.slug}</div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-xs text-[#B3B3B3]">
                        {post.category}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded ${
                            post.status === 'published'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : 'bg-yellow-950/80 text-yellow-300 border border-yellow-800'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-xs text-[#888888] font-mono">
                        {post.published_at}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          className="inline-block p-1.5 text-[#B3B3B3] hover:text-white"
                          title="View Live"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenBlogModal(post)}
                          className="p-1.5 text-[#B3B3B3] hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-1.5 text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: CONTACT MESSAGES
            ======================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Contact Inquiries</h1>
              <p className="text-sm text-[#888888] mt-1">
                Direct submissions received through the public contact form. Protected by RLS policies.
              </p>
            </div>

            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-6 rounded-2xl border transition-colors ${
                      msg.is_read
                        ? 'bg-[#181818] border-[#262626] text-[#B3B3B3]'
                        : 'bg-[#1e1414] border-[#E50914]/40 text-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{msg.full_name}</h3>
                          {!msg.is_read && (
                            <span className="px-2 py-0.5 text-xs bg-[#E50914] text-white rounded font-semibold">
                              New
                            </span>
                          )}
                        </div>
                        <a href={`mailto:${msg.email}`} className="text-xs text-[#E50914] hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-xs font-mono text-[#888888]">{msg.created_at?.split('T')[0]}</span>
                    </div>

                    <div className="space-y-1 my-3">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                        Subject: {msg.subject}
                      </span>
                      <p className="text-sm leading-relaxed text-[#d0d0d0] whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                      <button
                        onClick={() => handleToggleRead(msg.id, msg.is_read)}
                        className="text-xs font-semibold text-[#888888] hover:text-white"
                      >
                        {msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-12 text-center max-w-lg mx-auto space-y-3">
                <MessageSquare className="w-10 h-10 text-[#E50914] mx-auto" />
                <h3 className="text-lg font-bold text-white">No Inquiries Submitted Yet</h3>
                <p className="text-xs text-[#B3B3B3]">
                  When visitors submit inquiries on the Contact page, they will appear securely here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 7: WEBSITE SETTINGS & SUPABASE SQL
            ======================================================== */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Website Settings & Backend</h1>
              <p className="text-sm text-[#888888] mt-1">
                Configure global metadata, contact email, and view the ready-to-run Supabase PostgreSQL schema.
              </p>
            </div>

            {/* Supabase Schema Box */}
            <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#E50914]" />
                  <h3 className="text-base font-bold text-white">Supabase PostgreSQL Schema (schema.sql)</h3>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`-- Eman Fatima Portfolio PostgreSQL Schema
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  biography TEXT NOT NULL,
  education TEXT NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2000);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#222222] hover:bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Schema Copied' : 'Copy SQL Script'}</span>
                </button>
              </div>
              <p className="text-xs text-[#B3B3B3]">
                The complete SQL migration script is stored in <code className="text-[#E50914] font-mono">supabase/schema.sql</code>.
                Execute it directly inside your Supabase project's SQL Editor to bootstrap all 6 tables and Row Level Security policies.
              </p>
            </div>

            {/* General Settings Form */}
            <form onSubmit={handleSettingsSubmit} className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                    Website Name
                  </label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                    Public Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  Default SEO Title
                </label>
                <input
                  type="text"
                  value={settings.seo_title}
                  onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  Default Meta Description
                </label>
                <textarea
                  rows={3}
                  value={settings.meta_description}
                  onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                  Footer Copyright Text
                </label>
                <input
                  type="text"
                  value={settings.footer_text}
                  onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
                />
              </div>

              <div className="pt-4 border-t border-[#262626] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-all shadow-lg shadow-[#E50914]/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Website Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL: SKILL EDITOR
          ======================================================== */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#303030] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white">
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Skill Title
                </label>
                <input
                  type="text"
                  required
                  value={skillForm.title}
                  onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })}
                  placeholder="e.g. Social Media Account Management"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Category
                  </label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Productivity Tools">Productivity Tools</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Proficiency Label
                  </label>
                  <select
                    value={skillForm.proficiency}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value as any })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Foundational">Foundational</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={skillForm.description}
                  onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                  placeholder="Meaningful description of the practical workflow..."
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Display Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={skillForm.display_order}
                  onChange={(e) => setSkillForm({ ...skillForm, display_order: Number(e.target.value) })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CERTIFICATE EDITOR
          ======================================================== */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#303030] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white">
              {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
            </h3>
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  placeholder="e.g. Meta Social Media Marketing Specialist"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={certForm.organization}
                    onChange={(e) => setCertForm({ ...certForm, organization: e.target.value })}
                    placeholder="e.g. Meta / Coursera"
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={certForm.issue_date}
                    onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Description / Topics Covered
                </label>
                <textarea
                  rows={2}
                  value={certForm.description}
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                  placeholder="Summary of skills or exam objectives verified..."
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Credential / Verification URL
                </label>
                <input
                  type="url"
                  value={certForm.credential_url}
                  onChange={(e) => setCertForm({ ...certForm, credential_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: BLOG EDITOR (With Rich Formatting & SEO Fields)
          ======================================================== */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#303030] rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-5 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <h3 className="text-xl font-bold text-white">
                {editingBlog ? 'Edit Article' : 'Write New Article'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#888888]">Status:</span>
                <select
                  value={blogForm.status}
                  onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })}
                  className="bg-[#111111] border border-[#303030] text-xs font-semibold text-white rounded-lg px-2.5 py-1"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setBlogForm({
                      ...blogForm,
                      title,
                      slug: editingBlog ? blogForm.slug : generateSlug(title),
                    });
                  }}
                  placeholder="e.g. Social Media Marketing: Guide for Beginners"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: generateSlug(e.target.value) })}
                    placeholder="e.g. social-media-marketing-guide"
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    placeholder="e.g. Digital Marketing"
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Short Description / Excerpt
                </label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.description}
                  onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                  placeholder="1-2 sentences summarizing the key takeaway..."
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Article Content (Supports Markdown Headings, Lists & Paragraphs)
                  </label>
                  <div className="flex items-center gap-1.5 text-xs text-[#888888]">
                    <span className="font-mono"># H1</span>
                    <span className="font-mono">## H2</span>
                    <span className="font-mono">- list</span>
                  </div>
                </div>
                <textarea
                  rows={8}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={blogForm.featured_image}
                    onChange={(e) => setBlogForm({ ...blogForm, featured_image: e.target.value })}
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={blogForm.focus_keyword}
                    onChange={(e) => setBlogForm({ ...blogForm, focus_keyword: e.target.value })}
                    placeholder="e.g. Social Media Management"
                    className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl shadow-lg shadow-[#E50914]/20"
                >
                  {editingBlog ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
