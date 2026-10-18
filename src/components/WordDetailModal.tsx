import React from 'react';
import { GreggWord } from '../utils/greggEngine';
import { X, Layers, BookOpen } from 'lucide-react';

interface WordDetailModalProps {
  word: GreggWord | null;
  onClose: () => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({ word, onClose }) => {
  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Gregg Outline Specification
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Diamond Jubilee (1963)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Main Stroke Plate */}
          <div className="flex flex-col items-center justify-center py-6 px-4 bg-steno-ruled rounded-lg border border-slate-300 relative">
            <div className="absolute top-2 left-3 text-[10px] uppercase font-mono tracking-wider text-slate-600">
              SHORTHAND OUTLINE
            </div>
            {word.isBrief && (
              <span className="absolute top-2 right-3 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                BRIEF FORM
              </span>
            )}

            <div className="h-20 flex items-center justify-center">
              <svg
                width={Math.max(word.svgWidth * 1.6, 70)}
                height={Math.max(word.svgHeight * 1.6, 70)}
                viewBox={`0 0 ${word.svgWidth || 42} ${word.svgHeight || 44}`}
              >
                <path
                  d={word.svgPath}
                  fill="none"
                  stroke="#0f3d32"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xl font-bold text-slate-900 font-serif">"{word.cleanWord}"</span>
              <span className="block text-sm font-mono text-emerald-800 font-semibold mt-0.5">
                /{word.phonetic}/
              </span>
            </div>
          </div>

          {/* Stroke breakdown components */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Stroke Breakdown</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {word.strokes.map((stroke, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200"
                >
                  {stroke}
                </span>
              ))}
            </div>
          </div>

          {/* Rule Reference */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>1963 Diamond Jubilee Rule</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">
              {word.briefExplanation || word.ruleNotes || 'Standard phonetic transcription. Silent letters omitted.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
