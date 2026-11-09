import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group bg-[#181818] border border-[#262626] hover:border-[#E50914]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#E50914]/5 flex flex-col justify-between">
      <div>
        {/* Featured Image */}
        <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-[#111111]">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.image_alt || post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#707070] gap-2">
              <BookOpen className="w-8 h-8 text-[#E50914]" />
              <span className="text-xs uppercase tracking-wider">Eman Fatima Articles</span>
            </div>
          )}
        </Link>

        {/* Content Body */}
        <div className="p-6">
          {/* Metadata: Category and Publication Date */}
          <div className="flex items-center gap-2 text-xs text-[#888888] font-medium mb-3">
            <span className="text-[#E50914] font-semibold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {post.published_at}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#E50914] transition-colors line-clamp-2 mb-2 leading-snug">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-[#B3B3B3] line-clamp-3 leading-relaxed mb-4">
            {post.description}
          </p>
        </div>
      </div>

      {/* Footer Read More Link */}
      <div className="px-6 pb-6 pt-2">
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
