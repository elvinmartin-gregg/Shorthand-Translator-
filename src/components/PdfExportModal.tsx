import React, { useState } from 'react';
import { GreggTranslationResult } from '../utils/greggEngine';
import { generateShorthandPdf, PdfExportOptions } from '../utils/pdfGenerator';
import { Download, X, Check, FileText } from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  translation: GreggTranslationResult;
  aiImageUrl?: string | null;
  aiImageSize?: '1K' | '2K' | '4K';
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  translation,
  aiImageUrl,
  aiImageSize,
}) => {
  const [theme, setTheme] = useState<'steno_green' | 'monochrome' | 'warm_cream'>('steno_green');
  const [pageSize, setPageSize] = useState<'letter' | 'a4'>('letter');
  const [includeWordTable, setIncludeWordTable] = useState(true);
  const [includeAlphabetGuide, setIncludeAlphabetGuide] = useState(true);
  const [includeAiImage, setIncludeAiImage] = useState(Boolean(aiImageUrl));
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    try {
      const options: PdfExportOptions = {
        theme,
        pageSize,
        includeWordTable,
        includeAlphabetGuide,
        aiGeneratedImageUrl: includeAiImage ? aiImageUrl : undefined,
        aiImageSize,
      };

      const doc = generateShorthandPdf(translation, options);
      const safeTitle = translation.words[0]?.cleanWord || 'Gregg_Shorthand';
      doc.save(`${safeTitle}_Diamond_Jubilee_Translation.pdf`);

      setExportedSuccess(true);
      setTimeout(() => {
        setExportedSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Export Gregg Shorthand Document
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Diamond Jubilee Edition (1963)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options Form */}
        <div className="p-5 space-y-4">
          {/* Document Theme */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
              Document Palette
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'steno_green', name: 'Steno Green', desc: 'Standard green notebook rule' },
                { id: 'monochrome', name: 'Monochrome', desc: 'Crisp black & white technical' },
                { id: 'warm_cream', name: 'Archival Cream', desc: 'Sepia legal document tone' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    theme === t.id
                      ? 'border-slate-800 bg-slate-900 text-white'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="block text-xs font-semibold">{t.name}</span>
                  <span className={`block text-[10px] mt-0.5 ${theme === t.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Paper Format */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
              Paper Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setPageSize('letter')}
                className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                  pageSize === 'letter'
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                US Letter (8.5 × 11 in)
              </button>
              <button
                onClick={() => setPageSize('a4')}
                className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                  pageSize === 'a4'
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ISO A4 (210 × 297 mm)
              </button>
            </div>
          </div>

          {/* Sections to include */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Document Sections
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer p-1.5 rounded hover:bg-slate-50">
              <input
                type="checkbox"
                checked={includeWordTable}
                onChange={(e) => setIncludeWordTable(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-400"
              />
              <span>Word-by-word transcription dictionary table</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer p-1.5 rounded hover:bg-slate-50">
              <input
                type="checkbox"
                checked={includeAlphabetGuide}
                onChange={(e) => setIncludeAlphabetGuide(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-400"
              />
              <span>Gregg Diamond Jubilee alphabet reference appendix</span>
            </label>

            {aiImageUrl && (
              <label className="flex items-center gap-2.5 text-xs text-slate-800 cursor-pointer p-1.5 rounded bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  checked={includeAiImage}
                  onChange={(e) => setIncludeAiImage(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <span>Include high-resolution plate image ({aiImageSize || '1K'})</span>
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting || exportedSuccess}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {exportedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>PDF Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating Document...' : 'Download PDF'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
