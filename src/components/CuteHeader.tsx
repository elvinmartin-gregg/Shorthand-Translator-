import React from 'react';
import { BookOpen, Sparkles, Download, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenPdfModal?: () => void;
  onOpenAiModal?: () => void;
}

export const CuteHeader: React.FC<HeaderProps> = ({
  onOpenGuide,
  onOpenPdfModal,
  onOpenAiModal,
}) => {
  return (
    <header className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Edition */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight shadow-xs">
            DJ
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                Gregg Shorthand Translator
              </h1>
              <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-slate-500">
                · Diamond Jubilee (1963)
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Authentic phonetic transcription, brief forms, and stenographer plates
            </p>
          </div>
        </div>

        {/* Clean Utility Actions */}
        <div className="flex items-center gap-2">
          {onOpenAiModal && (
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-500" />
              <span>Plate Studio (1K·2K·4K)</span>
            </button>
          )}

          {onOpenPdfModal && (
            <button
              onClick={onOpenPdfModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export PDF</span>
            </button>
          )}

          <button
            onClick={onOpenGuide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Gregg Diamond Jubilee Alphabet & Rules Guide"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Alphabet & Rules</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export const StenoHeader = CuteHeader;
