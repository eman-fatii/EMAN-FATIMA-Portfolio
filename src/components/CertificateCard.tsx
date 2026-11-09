import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, X, Building2 } from 'lucide-react';
import type { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group cursor-pointer bg-[#181818] border border-[#262626] hover:border-[#E50914]/50 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-[#E50914]/5 flex flex-col justify-between"
      >
        <div>
          {/* Certificate Thumbnail or Fallback */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#111111] border border-[#303030] mb-4 flex items-center justify-center">
            {certificate.file_url ? (
              <img
                src={certificate.file_url}
                alt={certificate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 p-6 text-[#707070]">
                <Award className="w-10 h-10 text-[#E50914]" />
                <span className="text-xs uppercase tracking-wider font-semibold">Verified Credential</span>
              </div>
            )}
          </div>

          {/* Issuer & Date */}
          <div className="flex items-center justify-between text-xs text-[#888888] mb-2">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Building2 className="w-3.5 h-3.5 text-[#E50914]" />
              {certificate.organization}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {certificate.issue_date}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-white group-hover:text-[#E50914] transition-colors line-clamp-1 mb-2">
            {certificate.title}
          </h4>

          {/* Description */}
          {certificate.description && (
            <p className="text-xs text-[#B3B3B3] line-clamp-2 leading-relaxed">
              {certificate.description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-[#E50914]">
          <span className="font-semibold group-hover:underline">View Certificate Details</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Lightbox / Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#181818] border border-[#303030] rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 text-[#B3B3B3] hover:text-white hover:bg-[#252525] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#E50914] uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Official Certification</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">{certificate.title}</h3>
            <div className="flex items-center gap-3 text-xs text-[#888888] mb-6">
              <span>Issued by {certificate.organization}</span>
              <span aria-hidden="true">·</span>
              <span>Date: {certificate.issue_date}</span>
            </div>

            {certificate.file_url && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#303030] mb-6">
                <img
                  src={certificate.file_url}
                  alt={certificate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {certificate.description && (
              <p className="text-sm text-[#B3B3B3] leading-relaxed mb-6">
                {certificate.description}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
              {certificate.credential_url && (
                <a
                  href={certificate.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg transition-colors"
                >
                  <span>Verify at Issuer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#B3B3B3] hover:text-white bg-[#222222] rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
