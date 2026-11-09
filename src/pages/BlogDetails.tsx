import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Twitter,
  Linkedin,
  Facebook,
  BookOpen,
  Tag,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { BlogCard } from '../components/BlogCard';
import { dataService } from '../lib/supabase';
import type { BlogPost } from '../types';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    const loadPost = async () => {
      const current = await dataService.getBlogPostBySlug(slug);
      setPost(current);

      if (current) {
        const all = await dataService.getBlogPosts(false);
        const related = all.filter((p) => p.id !== current.id).slice(0, 3);
        setRelatedPosts(related);
      }
      setIsLoading(false);
    };
    loadPost();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-[#888888] font-mono">Loading article...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#181818] border border-[#262626] rounded-2xl p-8 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-[#E50914] mx-auto" />
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="text-sm text-[#B3B3B3]">
            The requested article could not be located or may currently be in draft status.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://emanfatimaportfolio.vercel.app/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);

  // Schema.org BlogPosting
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.featured_image,
    datePublished: post.published_at,
    author: {
      '@type': 'Person',
      name: 'Eman Fatima',
      url: 'https://emanfatimaportfolio.vercel.app',
    },
    publisher: {
      '@type': 'Person',
      name: 'Eman Fatima',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl,
    },
  };

  // Basic markdown-like paragraph and heading renderer
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-3xl sm:text-4xl font-extrabold text-white mt-8 mb-4">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-[#B3B3B3] my-1 text-base leading-relaxed">
            {trimmed.replace(/^[-*]\s+/, '')}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} className="ml-6 list-decimal text-[#B3B3B3] my-1 text-base leading-relaxed">
            {trimmed.replace(/^\d+\.\s+/, '')}
          </li>
        );
      }
      return (
        <p key={idx} className="text-[#B3B3B3] text-base sm:text-lg leading-relaxed my-3">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title={post.seo_title || `${post.title} | Eman Fatima`}
        description={post.meta_description || post.description}
        canonicalUrl={shareUrl}
        ogImage={post.featured_image}
        ogType="article"
        schemaData={blogPostingSchema}
      />

      {/* Top Header / Back */}
      <section className="pt-10 pb-6 border-b border-[#202020]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#888888] hover:text-[#E50914] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </section>

      {/* Main Article Container */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#888888]">
            <span className="text-[#E50914] font-semibold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Published on {post.published_at}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#E50914]" />
              By Eman Fatima
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          {/* Short Lead Summary */}
          <p className="text-lg sm:text-xl text-[#B3B3B3] leading-relaxed italic border-l-2 border-[#E50914] pl-4">
            {post.description}
          </p>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#111111] border border-[#303030]">
              <img
                src={post.featured_image}
                alt={post.image_alt || post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Rendered Article Body */}
          <div className="prose prose-invert max-w-none pt-4 text-[#B3B3B3]">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-[#262626] flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-[#888888]" />
              <span className="text-xs text-[#888888] font-semibold">Topics:</span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs text-[#B3B3B3] bg-[#181818] border border-[#2c2c2c] px-3 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="mt-10 p-6 bg-[#181818] border border-[#262626] rounded-2xl flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg"
              alt="Eman Fatima"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#E50914] shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h4 className="text-base font-bold text-white">Eman Fatima</h4>
                <span className="text-xs text-[#E50914] font-medium">Author & Engineering Student</span>
              </div>
              <p className="text-xs text-[#B3B3B3] leading-relaxed">
                3rd semester BS Computer Engineering student exploring digital marketing, social media account management,
                and technical workflows.
              </p>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="pt-8 border-t border-[#262626] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Share this article:
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="p-2.5 bg-[#181818] hover:bg-[#222222] border border-[#303030] rounded-lg text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
              </button>

              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X / Twitter"
                className="p-2.5 bg-[#181818] hover:bg-[#222222] border border-[#303030] rounded-lg text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="p-2.5 bg-[#181818] hover:bg-[#222222] border border-[#303030] rounded-lg text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on Facebook"
                className="p-2.5 bg-[#181818] hover:bg-[#222222] border border-[#303030] rounded-lg text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-[#202020] bg-[#0c0c0c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h3 className="text-2xl font-bold text-white">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
