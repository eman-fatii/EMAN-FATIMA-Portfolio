import React, { useEffect, useState } from 'react';
import { Search, Sparkles, BookOpen, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { BlogCard } from '../components/BlogCard';
import { dataService } from '../lib/supabase';
import type { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dataService.getBlogPosts(false).then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Blog & Articles | Eman Fatima Portfolio"
        description="Read articles by Eman Fatima exploring digital marketing frameworks, social media strategies, and email marketing workflows for students and professionals."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/blog"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-[#202020]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            <Sparkles className="w-4 h-4" />
            <span>Articles & Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Eman's <span className="text-[#E50914]">Blog</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#B3B3B3] max-w-2xl mx-auto">
            Practical strategies, technical breakdowns, and exploratory perspectives on digital marketing and technology.
          </p>

          {/* Search Bar */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full bg-[#181818] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-12 pr-4 py-3.5 text-sm text-white transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                    : 'bg-[#181818] text-[#B3B3B3] hover:text-white border border-[#262626]'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Listing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="py-20 text-center text-sm font-mono text-[#888888]">
              Loading published articles...
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-[#181818] border border-[#262626] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
              <BookOpen className="w-10 h-10 text-[#E50914] mx-auto" />
              <h3 className="text-xl font-bold text-white">No Articles Found</h3>
              <p className="text-sm text-[#B3B3B3]">
                {searchQuery
                  ? `No published articles matched your search query "${searchQuery}".`
                  : 'No published articles in this category currently.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#E50914] rounded-lg mt-2"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
