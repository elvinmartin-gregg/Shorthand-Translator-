import React, { useState } from 'react';
import { CuteHeader } from './components/CuteHeader';
import { UploadSection } from './components/UploadSection';
import { StenoNotebookView } from './components/StenoNotebookView';
import { WordDetailModal } from './components/WordDetailModal';
import { AiImageModal } from './components/AiImageModal';
import { PdfExportModal } from './components/PdfExportModal';
import { GreggAlphabetGuide } from './components/GreggAlphabetGuide';
import {
  translateTextToGregg,
  buildContinuousGreggOutline,
  DIAMOND_JUBILEE_BRIEFS,
  DIAMOND_JUBILEE_STANDARDS,
  GreggTranslationResult,
  GreggWord,
} from './utils/greggEngine';
import { Sparkles, Download, BookOpen, FileCheck } from 'lucide-react';

const INITIAL_TEXT = 'Dear Mr. Davis: Thank you for your inquiry regarding our new shipment schedule. The goods will be delivered to your office by Friday morning. Sincerely yours,';

export default function App() {
  const [inputText, setInputText] = useState(INITIAL_TEXT);
  const [translation, setTranslation] = useState<GreggTranslationResult>(() =>
    translateTextToGregg(INITIAL_TEXT)
  );
  const [isTranslating, setIsTranslating] = useState(false);

  // Modals state
  const [selectedWord, setSelectedWord] = useState<GreggWord | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isAiImageModalOpen, setIsAiImageModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // AI-generated image state
  const [generatedAiImage, setGeneratedAiImage] = useState<string | null>(null);
  const [generatedAiSize, setGeneratedAiSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [includeAiImageInPdf, setIncludeAiImageInPdf] = useState(true);

  // Handle Translation
  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      // First attempt server-side Gemini translation
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.words && Array.isArray(data.words)) {
          // Build complete outlines faithful to official Diamond Jubilee dictionary
          const enrichedWords: GreggWord[] = data.words.map((w: any) => {
            const rawWord = w.word || '';
            const cleanWord = (w.cleanWord || rawWord.replace(/[^a-zA-Z]/g, '')).toLowerCase();
            const outline = buildContinuousGreggOutline(cleanWord || rawWord, w.phonetic || cleanWord);

            const isBrief = Boolean(w.isBrief || DIAMOND_JUBILEE_BRIEFS[cleanWord]);
            const briefExplanation = isBrief
              ? (w.briefExplanation || DIAMOND_JUBILEE_BRIEFS[cleanWord]?.explanation || 'Official Diamond Jubilee (1963) Brief Form')
              : null;
            const ruleNotes = w.ruleNotes || (DIAMOND_JUBILEE_STANDARDS[cleanWord]?.explanation || 'Diamond Jubilee standard phonetic spelling');

            return {
              word: rawWord,
              cleanWord: w.cleanWord || rawWord.replace(/[^a-zA-Z]/g, ''),
              phonetic: w.phonetic || outline.strokes.join('-'),
              strokes: outline.strokes,
              isBrief,
              briefExplanation,
              ruleNotes,
              svgPath: outline.path,
              svgWidth: outline.width,
              svgHeight: outline.height,
            };
          });

          const briefCount = enrichedWords.filter((w) => w.isBrief).length;
          const localEngineData = translateTextToGregg(inputText);

          setTranslation({
            originalText: inputText,
            phoneticFull: data.phoneticFull || localEngineData.phoneticFull,
            summary: data.summary || localEngineData.summary,
            words: enrichedWords,
            stats: {
              totalWords: enrichedWords.length,
              briefFormsCount: briefCount,
              silentLettersOmittedCount: localEngineData.stats.silentLettersOmittedCount,
              estimatedShorthandSpeedWpm: Math.min(160, 120 + briefCount * 2),
            },
          });
          setIsTranslating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend translation failed, using high-precision local Diamond Jubilee engine:', err);
    }

    // High-precision local fallback
    const result = translateTextToGregg(inputText);
    setTranslation(result);
    setIsTranslating(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col text-slate-900 antialiased selection:bg-slate-800 selection:text-white">
      {/* Header */}
      <CuteHeader
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        onOpenAiModal={() => setIsAiImageModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-7 space-y-5">
        {/* Editorial Executive Banner */}
        <div className="rounded-xl bg-white p-5 sm:p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="font-semibold text-slate-900">Gregg Shorthand Transcription System</span>
                <span>·</span>
                <span>Diamond Jubilee (1963)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-editorial">
                High-Precision Gregg Shorthand Transcriber & Document Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                Transcribe business correspondence, court dictation, or personal notes into authentic 1963 Diamond Jubilee shorthand outlines. Features silent-letter omission, brief form substitution, vector stroke rendering, and archival PDF export.
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col items-stretch gap-2 shrink-0">
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Document</span>
              </button>

              <button
                onClick={() => setIsAiImageModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                <span>Plate Studio (1K·2K·4K)</span>
              </button>

              <button
                onClick={() => setIsGuideModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Alphabet Reference</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upload & Input Section */}
        <UploadSection
          text={inputText}
          onChangeText={setInputText}
          onTranslate={handleTranslate}
          isTranslating={isTranslating}
        />

        {/* Translation Results View */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              <span>Shorthand Transcription Results</span>
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                {translation.words.length} outlines
              </span>
            </h3>
          </div>

          <StenoNotebookView
            translation={translation}
            onSelectWord={(word) => setSelectedWord(word)}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
            onOpenAiImageModal={() => setIsAiImageModalOpen(true)}
            hasGeneratedImage={Boolean(generatedAiImage)}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-5 border-t border-slate-200 bg-white text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-[11px]">
            <span>Gregg Shorthand · Diamond Jubilee Edition (1963)</span>
            <span>·</span>
            <span className="text-slate-400">Standard Phonetic Orthography</span>
          </p>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Alphabet & Rules
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAiImageModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              High-Res Plate Studio
            </button>
            <span>·</span>
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Export PDF
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WordDetailModal
        word={selectedWord}
        onClose={() => setSelectedWord(null)}
      />

      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        translation={translation}
        aiImageUrl={generatedAiImage}
        aiImageSize={generatedAiSize}
      />

      <AiImageModal
        isOpen={isAiImageModalOpen}
        onClose={() => setIsAiImageModalOpen(false)}
        textContext={translation.originalText}
        generatedImage={generatedAiImage}
        generatedSize={generatedAiSize}
        onImageGenerated={(url, size) => {
          setGeneratedAiImage(url);
          setGeneratedAiSize(size);
        }}
        includeInPdf={includeAiImageInPdf}
        onToggleIncludeInPdf={setIncludeAiImageInPdf}
      />

      <GreggAlphabetGuide
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
