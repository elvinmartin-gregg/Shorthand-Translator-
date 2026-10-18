import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, ArrowRight, Loader2, Trash2 } from 'lucide-react';

interface UploadSectionProps {
  text: string;
  onChangeText: (newText: string) => void;
  onTranslate: () => void;
  isTranslating: boolean;
}

const PRESETS = [
  {
    id: 'memo',
    label: 'Executive Memo',
    text: 'Dear Mr. Davis: Thank you for your recent letter regarding the order for our company. We will send the goods soon. Sincerely yours,',
  },
  {
    id: 'legal',
    label: 'Court Dictation',
    text: 'The witness testified that the agreement was executed in good faith before the board of directors.',
  },
  {
    id: 'speed_drill',
    label: 'Brief Forms Drill',
    text: 'Please write the letters and orders for our company today. We will do business with great care and attention.',
  },
  {
    id: 'principles',
    label: 'Stenography Practice',
    text: 'Gregg shorthand is written by sound. Silent letters are omitted and vowels are joined in natural order.',
  },
];

export const UploadSection: React.FC<UploadSectionProps> = ({
  text,
  onChangeText,
  onTranslate,
  isTranslating,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setUploadError(null);
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File exceeds 2MB limit. Please provide a standard text document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onChangeText(content);
      }
    };
    reader.onerror = () => {
      setUploadError('Unable to read file. Paste your text directly into the transcription field.');
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 transition-all">
      {/* Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center gap-2">
            <span>Input Text for Gregg Shorthand Transcription</span>
            <span className="text-xs font-mono text-slate-500 font-normal">
              [DJ 1963 Rules]
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Type transcription text or upload a plain text file (.txt, .md).
          </p>
        </div>

        {/* Benchmarks / Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-slate-400 mr-0.5">Dictation samples:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChangeText(preset.text)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* File Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border border-dashed rounded-lg p-3 mb-3 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-slate-600 bg-slate-50'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.text"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <UploadCloud className="w-4 h-4 text-slate-500" />
          <span className="font-medium text-slate-800">Upload text document</span>
          <span className="text-slate-400">or drag and drop (.txt, .md)</span>
        </div>
      </div>

      {uploadError && (
        <div className="mb-3 px-3 py-2 rounded-lg text-xs bg-red-50 text-red-700 border border-red-200">
          {uploadError}
        </div>
      )}

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Enter English text to transcribe into Gregg Diamond Jubilee shorthand..."
          rows={4}
          className="w-full rounded-lg p-3.5 text-sm border border-slate-200 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors placeholder:text-slate-400 resize-y bg-white text-slate-900 leading-relaxed font-sans"
        />

        {text && (
          <button
            onClick={() => onChangeText('')}
            className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Clear text"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
          <span>·</span>
          <span>{charCount} chars</span>
          {wordCount > 0 && (
            <>
              <span>·</span>
              <span className="text-emerald-700 font-sans font-medium">Ready</span>
            </>
          )}
        </div>

        <button
          onClick={onTranslate}
          disabled={!text.trim() || isTranslating}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isTranslating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transcribing Outlines...</span>
            </>
          ) : (
            <>
              <span>Transcribe to Gregg Shorthand</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
