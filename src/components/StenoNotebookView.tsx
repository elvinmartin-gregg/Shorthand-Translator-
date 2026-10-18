import React, { useState } from 'react';
import { GreggTranslationResult, GreggWord } from '../utils/greggEngine';
import { Sparkles, Download, Info, Check, Copy } from 'lucide-react';

interface StenoNotebookViewProps {
  translation: GreggTranslationResult;
  onSelectWord: (word: GreggWord) => void;
  onOpenPdfModal: () => void;
  onOpenAiImageModal: () => void;
  hasGeneratedImage: boolean;
}

export const StenoNotebookView: React.FC<StenoNotebookViewProps> = ({
  translation,
  onSelectWord,
  onOpenPdfModal,
  onOpenAiImageModal,
  hasGeneratedImage,
}) => {
  const [viewMode, setViewMode] = useState<'notebook' | 'table' | 'cards'>('notebook');
  const [padTheme, setPadTheme] = useState<'steno_green' | 'warm_cream' | 'clean_white'>('steno_green');
  const [copied, setCopied] = useState(false);
  const [filterBriefsOnly, setFilterBriefsOnly] = useState(false);

  const themeClasses = {
    steno_green: {
      bg: 'bg-steno-ruled',
      border: 'border-slate-300',
      header: 'bg-slate-800 text-slate-200',
      strokeColor: '#0f3d32',
      centerLine: 'border-rose-400',
      label: 'Classic Steno Green',
    },
    warm_cream: {
      bg: 'bg-cream-ruled',
      border: 'border-slate-300',
      header: 'bg-stone-800 text-stone-200',
      strokeColor: '#29180f',
      centerLine: 'border-amber-700/50',
      label: 'Archival Cream',
    },
    clean_white: {
      bg: 'bg-white-ruled',
      border: 'border-slate-300',
      header: 'bg-slate-900 text-slate-200',
      strokeColor: '#090d16',
      centerLine: 'border-slate-300',
      label: 'Crisp White',
    },
  };

  const currentTheme = themeClasses[padTheme];

  const handleCopyPhonetic = () => {
    navigator.clipboard.writeText(translation.phoneticFull);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayedWords = filterBriefsOnly
    ? translation.words.filter((w) => w.isBrief)
    : translation.words;

  return (
    <div className="space-y-4">
      {/* Control Bar: View switcher, pad style, actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        {/* Segmented View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
          <button
            onClick={() => setViewMode('notebook')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'notebook'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Steno Pad
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dictionary Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Outline Cards
          </button>
        </div>

        {/* Paper style selector */}
        {viewMode === 'notebook' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Paper:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'steno_green', label: 'Steno Green', color: '#e5f3eb' },
                { id: 'warm_cream', label: 'Archival Cream', color: '#fbf5e9' },
                { id: 'clean_white', label: 'White Bond', color: '#ffffff' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setPadTheme(style.id as any)}
                  className={`px-2 py-1 rounded text-[11px] font-medium border transition-all cursor-pointer ${
                    padTheme === style.id
                      ? 'border-slate-800 bg-slate-900 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiImageModal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              hasGeneratedImage
                ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-500" />
            <span>{hasGeneratedImage ? 'View AI Plate' : 'Generate High-Res Plate'}</span>
          </button>

          <button
            onClick={onOpenPdfModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Outlines</p>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">{translation.stats.totalWords}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Brief Forms (DJ)</p>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
            {translation.stats.briefFormsCount}{' '}
            <span className="text-xs font-normal text-slate-500">
              ({Math.round((translation.stats.briefFormsCount / Math.max(1, translation.stats.totalWords)) * 100)}%)
            </span>
          </p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Silent Omissions</p>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">{translation.stats.silentLettersOmittedCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Target Writing Speed</p>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
            {translation.stats.estimatedShorthandSpeedWpm}{' '}
            <span className="text-xs font-normal text-slate-500">WPM</span>
          </p>
        </div>
      </div>

      {/* Mode 1: Steno Pad */}
      {viewMode === 'notebook' && (
        <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white">
          {/* Authentic Stenographer Spiral Top */}
          <div className="bg-slate-900 text-slate-300 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="w-2.5 h-3.5 rounded-xs bg-slate-600 border border-slate-700" />
                ))}
              </div>
            </div>
            <div className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
              Gregg Shorthand · Diamond Jubilee Edition (1963)
            </div>
          </div>

          {/* Steno Ruled Sheet */}
          <div className={`p-4 sm:p-8 min-h-[360px] ${currentTheme.bg} relative transition-colors`}>
            {/* Traditional Center Dividing Red Line */}
            <div className={`absolute top-0 bottom-0 left-1/2 w-0 border-r border-dashed ${currentTheme.centerLine} z-0 pointer-events-none hidden sm:block`} />

            {/* Outlines Flow */}
            <div className="relative z-10 flex flex-wrap gap-x-6 gap-y-7 sm:gap-x-8 sm:gap-y-9 items-end">
              {translation.words.map((wordObj, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectWord(wordObj)}
                  className="group relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-0.5"
                  title="Click to inspect stroke breakdown and DJ rules"
                >
                  {/* Brief indicator */}
                  {wordObj.isBrief && (
                    <span className="absolute -top-3.5 -right-2 text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-white shadow-2xs">
                      BRIEF
                    </span>
                  )}

                  {/* SVG Stroke */}
                  <div className="h-12 flex items-end justify-center px-2">
                    <svg
                      width={wordObj.svgWidth || 42}
                      height={wordObj.svgHeight || 44}
                      viewBox={`0 0 ${wordObj.svgWidth || 42} ${wordObj.svgHeight || 44}`}
                      className="overflow-visible"
                    >
                      <path
                        d={wordObj.svgPath}
                        fill="none"
                        stroke={currentTheme.strokeColor}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all group-hover:stroke-blue-700 group-hover:stroke-[2.8]"
                      />
                    </svg>
                  </div>

                  {/* Word and Phonetics */}
                  <div className="mt-1 text-center">
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-800 transition-colors">
                      {wordObj.word}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono">
                      /{wordObj.phonetic}/
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Pad Annotation */}
            <div className="mt-8 pt-3 border-t border-slate-300/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Select any outline to inspect phonetic components and Diamond Jubilee rules.</span>
              </span>
              <button
                onClick={handleCopyPhonetic}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs transition-colors cursor-pointer font-mono"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Phonetics'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Dictionary Table */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/60">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Diamond Jubilee Word-by-Word Specification
            </h3>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filterBriefsOnly}
                onChange={(e) => setFilterBriefsOnly(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-400"
              />
              <span>Filter to Brief Forms Only</span>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 text-slate-600 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 w-20">Outline</th>
                  <th className="py-2.5 px-4">Word</th>
                  <th className="py-2.5 px-4">Phonetic (DJ)</th>
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Rule Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {displayedWords.map((w, idx) => (
                  <tr
                    key={idx}
                    onClick={() => onSelectWord(w)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-2 px-4">
                      <div className="w-12 h-9 flex items-center justify-center">
                        <svg
                          width={w.svgWidth || 38}
                          height={w.svgHeight || 38}
                          viewBox={`0 0 ${w.svgWidth || 38} ${w.svgHeight || 38}`}
                        >
                          <path
                            d={w.svgPath}
                            fill="none"
                            stroke="#0f3d32"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:stroke-blue-700 transition-colors"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="py-2 px-4 font-semibold text-slate-900">{w.cleanWord}</td>
                    <td className="py-2 px-4 font-mono text-emerald-800">{w.phonetic || '—'}</td>
                    <td className="py-2 px-4">
                      {w.isBrief ? (
                        <span className="font-mono text-[11px] font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          BRIEF FORM
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Phonetic</span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-xs text-slate-600">
                      {w.briefExplanation || w.ruleNotes || 'Standard phonetic transcription'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mode 3: Flashcards */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {translation.words.map((w, idx) => (
            <div
              key={idx}
              onClick={() => onSelectWord(w)}
              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-400 transition-all cursor-pointer flex flex-col items-center justify-between min-h-[140px] text-center group"
            >
              <div className="h-16 flex items-center justify-center">
                <svg
                  width={w.svgWidth || 42}
                  height={w.svgHeight || 44}
                  viewBox={`0 0 ${w.svgWidth || 42} ${wordObjHeight(w)}`}
                >
                  <path
                    d={w.svgPath}
                    fill="none"
                    stroke="#0f3d32"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-blue-700 transition-colors"
                  />
                </svg>
              </div>

              <div className="w-full pt-2 border-t border-slate-100">
                <span className="block text-sm font-semibold text-slate-900 group-hover:text-blue-800 transition-colors">
                  {w.cleanWord}
                </span>
                <span className="text-[11px] font-mono text-emerald-800">
                  /{w.phonetic}/
                </span>
                {w.isBrief && (
                  <span className="block mt-0.5 text-[10px] font-mono font-semibold text-slate-600">
                    DJ BRIEF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function wordObjHeight(w: GreggWord): number {
  return w.svgHeight || 44;
}
