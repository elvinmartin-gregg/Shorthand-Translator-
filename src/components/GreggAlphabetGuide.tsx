import React, { useState } from 'react';
import { GREGG_DJ_ALPHABET, DIAMOND_JUBILEE_BRIEFS, DIAMOND_JUBILEE_STANDARDS } from '../utils/greggEngine';
import { BookOpen, X, Search } from 'lucide-react';

interface GreggAlphabetGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GreggAlphabetGuide: React.FC<GreggAlphabetGuideProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'briefs' | 'dictionary' | 'rules'>('alphabet');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredAlphabet = GREGG_DJ_ALPHABET.filter(
    (item) =>
      item.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const briefsList = Object.entries(DIAMOND_JUBILEE_BRIEFS).filter(([word, data]) =>
    word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const standardsList = Object.entries(DIAMOND_JUBILEE_STANDARDS).filter(([word, data]) =>
    word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-slate-700" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                Gregg Shorthand · Diamond Jubilee Reference Manual (1963)
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                Official strokes, brief forms, and phonetic principles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab & Search Bar */}
        <div className="p-3.5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 text-xs font-medium w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('alphabet')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'alphabet'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alphabet & Curves ({GREGG_DJ_ALPHABET.length})
            </button>
            <button
              onClick={() => setActiveTab('briefs')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'briefs'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brief Forms ({Object.keys(DIAMOND_JUBILEE_BRIEFS).length})
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'dictionary'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Official Outlines ({Object.keys(DIAMOND_JUBILEE_STANDARDS).length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              DJ Rules & System
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symbols, sounds, words..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-white focus:outline-none focus:border-slate-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'alphabet' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredAlphabet.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-slate-400 transition-colors flex flex-col items-center text-center"
                >
                  <div className="h-12 flex items-center justify-center">
                    <svg width="46" height="40" viewBox="0 0 46 40">
                      <path
                        d={item.svgPath}
                        fill="none"
                        stroke="#0f3d32"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-full pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{item.character}</span>
                      <span className="text-[10px] text-slate-500">({item.name})</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5 line-clamp-1">{item.description}</p>
                    <p className="text-[10px] font-mono text-emerald-800 mt-1">e.g. {item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'briefs' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {briefsList.map(([word, data], idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-slate-400 transition-colors flex flex-col items-center text-center"
                >
                  <div className="h-12 flex items-center justify-center">
                    <svg width={data.width || 38} height={data.height || 40} viewBox={`0 0 ${data.width || 38} ${data.height || 40}`}>
                      <path
                        d={data.path}
                        fill="none"
                        stroke="#0f3d32"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-full pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900 text-sm block">
                      "{word}"
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 block">
                      Sound: /{data.phonetic}/
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {data.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dictionary' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {standardsList.map(([word, data], idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs hover:border-slate-400 transition-colors flex flex-col items-center text-center"
                >
                  <div className="h-12 flex items-center justify-center">
                    <svg width={data.width || 38} height={data.height || 40} viewBox={`0 0 ${data.width || 38} ${data.height || 40}`}>
                      <path
                        d={data.path}
                        fill="none"
                        stroke="#0f3d32"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-full pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900 text-sm block">
                      "{word}"
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 block">
                      Sound: /{data.phonetic}/
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {data.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                <h4 className="font-semibold text-slate-900 text-sm">
                  The Diamond Jubilee (1963) Revision
                </h4>
                <p className="text-slate-600">
                  Published in 1963 for the 75th anniversary of Gregg Shorthand, the Diamond Jubilee Series streamlined the system by removing seldom-used brief forms and arbitrary abbreviations from earlier editions (such as Anniversary 1929). The result is greater phonetic consistency, higher legibility, and faster transcription accuracy for modern secretaries, students, and court reporters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <h5 className="font-semibold text-slate-900">
                    1. Phonetic Orthography
                  </h5>
                  <p className="text-slate-600">
                    Gregg outlines record sounds, never standard English spelling. All silent letters are discarded: silent <em>k</em> in "knee", silent <em>w</em> in "write", silent <em>gh</em> in "thought", and silent final <em>e</em> in "have".
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <h5 className="font-semibold text-slate-900">
                    2. Natural Cursive Slant
                  </h5>
                  <p className="text-slate-600">
                    Strokes share the familiar slant of standard cursive script. Curves and straight lines connect organically without requiring awkward angles or line reversals.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <h5 className="font-semibold text-slate-900">
                    3. Essential Brief Forms
                  </h5>
                  <p className="text-slate-600">
                    High-frequency words ("the", "and", "to", "for", "in", "is", "can", "will") are written with single rapid characters, allowing stenographers to comfortably exceed 120-150 words per minute.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1">
                  <h5 className="font-semibold text-slate-900">
                    4. Continuous Joining
                  </h5>
                  <p className="text-slate-600">
                    Vowels are integrated directly into outline curves as small or large circles, loops, and hooks, eliminating pen lifts within word boundaries.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
