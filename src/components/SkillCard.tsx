import React from 'react';
import {
  Share2,
  TrendingUp,
  Mail,
  Store,
  Globe,
  FileText,
  Table,
  Presentation,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import type { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

const iconMap: Record<string, React.ElementType> = {
  Share2,
  TrendingUp,
  Mail,
  Store,
  Globe,
  FileText,
  Table,
  Presentation,
  Sparkles,
  Layers,
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const IconComponent = iconMap[skill.icon] || Sparkles;

  return (
    <div className="group relative bg-[#181818] border border-[#262626] hover:border-[#E50914]/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#E50914]/5 flex flex-col justify-between">
      <div>
        {/* Top Header: Icon & Category */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-all duration-200 shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Clean unboxed metadata separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#888888] font-medium">
            <span>{skill.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#B3B3B3]">{skill.proficiency}</span>
          </div>
        </div>

        {/* Skill Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#E50914] transition-colors mb-2">
          {skill.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#B3B3B3] leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Subtle indicator bar */}
      <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs text-[#707070]">
        <span className="flex items-center gap-1.5 text-[#B3B3B3]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Active Competency</span>
        </span>
        <span className="font-mono text-[#888888]">#{skill.display_order}</span>
      </div>
    </div>
  );
};
