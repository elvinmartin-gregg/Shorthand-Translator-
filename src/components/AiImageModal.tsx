import React, { useState } from 'react';
import { Sparkles, Download, X, Image as ImageIcon, Loader2, ZoomIn, AlertCircle } from 'lucide-react';

interface AiImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  textContext: string;
  generatedImage: string | null;
  generatedSize: '1K' | '2K' | '4K';
  onImageGenerated: (imageUrl: string, size: '1K' | '2K' | '4K') => void;
  includeInPdf: boolean;
  onToggleIncludeInPdf: (val: boolean) => void;
}

export const AiImageModal: React.FC<AiImageModalProps> = ({
  isOpen,
  onClose,
  textContext,
  generatedImage,
  generatedSize,
  onImageGenerated,
  includeInPdf,
  onToggleIncludeInPdf,
}) => {
  const [size, setSize] = useState<'1K' | '2K' | '4K'>(generatedSize || '1K');
  const [style, setStyle] = useState<string>('steno_notebook');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          size,
          style,
          textContext: textContext.slice(0, 200),
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate image plate.');
      }

      if (data.imageUrl) {
        onImageGenerated(data.imageUrl, size);
        onToggleIncludeInPdf(true);
      }
    } catch (err: any) {
      console.error('Image generation failed:', err);
      setErrorMsg(
        err.message || 'Image generation could not complete. Check your connection or API configuration.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `Gregg_Shorthand_Plate_${size}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
              Generate High-Resolution Stenographer Plate
            </h3>
            <p className="text-[11px] font-mono text-slate-500">
              Gemini 3 Pro Image (1K · 2K · 4K Resolution Support)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Resolution Selector: 1K, 2K, 4K */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Plate Resolution</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                gemini-3-pro-image-preview
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['1K', '2K', '4K'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                    size === s
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-sm font-bold font-mono">{s}</span>
                  <span className="block text-[10px] opacity-75 mt-0.5 font-mono">
                    {s === '1K' ? '1024 × 1024' : s === '2K' ? '2048 × 2048' : '4096 × 4096'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 mb-2">
              Stenographic Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'steno_notebook', label: 'Steno Notebook', desc: 'Authentic green-ruled steno pad' },
                { id: 'calligraphy_plate', label: 'Archival Plate', desc: '1963 manual black ink engraving' },
                { id: 'executive_desk', label: 'Executive Desk', desc: 'Dictation notebook & drafting pen' },
                { id: 'reference_cards', label: 'Technical Cards', desc: 'Crisp outline reference charts' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setStyle(item.id)}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    style === item.id
                      ? 'border-slate-800 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="block text-xs font-semibold">{item.label}</span>
                  <span className={`block text-[10px] mt-0.5 ${style === item.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt customization */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-600 mb-1.5">
              Specific Directives (Optional)
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Focus on sharp pen strokes and accurate Diamond Jubilee brief form outlines..."
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Notice:</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Image Display Area */}
          {generatedImage ? (
            <div className="space-y-3">
              <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center">
                <img
                  src={generatedImage}
                  alt="Generated Gregg Shorthand Plate"
                  referrerPolicy="no-referrer"
                  className={`w-full max-h-[320px] object-contain transition-transform duration-200 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                  {generatedSize} RESOLUTION
                </div>
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-2.5 right-2.5 p-1.5 bg-slate-900/90 text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Toggle Zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PDF & Download Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInPdf}
                    onChange={(e) => onToggleIncludeInPdf(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  <span>Attach plate to PDF exports</span>
                </label>

                <button
                  onClick={handleDownloadImage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image ({generatedSize})</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center">
              <ImageIcon className="w-6 h-6 text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-700">No plate generated yet</p>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-sm">
                Generate a visual Gregg Shorthand plate at 1K, 2K, or 4K resolution using Gemini 3 Pro.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating {size} Plate...</span>
              </>
            ) : (
              <>
                <span>Generate {size} Plate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
