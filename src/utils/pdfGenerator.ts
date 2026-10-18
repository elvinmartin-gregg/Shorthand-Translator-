import { jsPDF } from 'jspdf';
import { GreggTranslationResult, GREGG_DJ_ALPHABET } from './greggEngine';

export interface PdfExportOptions {
  theme: 'steno_green' | 'monochrome' | 'warm_cream' | string;
  pageSize: 'a4' | 'letter';
  includeWordTable: boolean;
  includeAlphabetGuide: boolean;
  aiGeneratedImageUrl?: string | null;
  aiImageSize?: string;
}

export function generateShorthandPdf(
  translation: GreggTranslationResult,
  options: PdfExportOptions = {
    theme: 'steno_green',
    pageSize: 'letter',
    includeWordTable: true,
    includeAlphabetGuide: true,
  }
): jsPDF {
  const isA4 = options.pageSize === 'a4';
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: isA4 ? 'a4' : 'letter',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // Technical & executive document color palettes
  const palettes: Record<string, {
    primary: [number, number, number];
    secondary: [number, number, number];
    bgLight: [number, number, number];
    accent: [number, number, number];
    textDark: [number, number, number];
    ruledLine: [number, number, number];
    cardBg: [number, number, number];
  }> = {
    steno_green: {
      primary: [15, 61, 50],
      secondary: [70, 100, 90],
      bgLight: [244, 250, 246],
      accent: [190, 60, 60], // traditional red steno center divider
      textDark: [15, 23, 42],
      ruledLine: [210, 232, 222],
      cardBg: [255, 255, 255],
    },
    monochrome: {
      primary: [15, 23, 42],
      secondary: [71, 85, 105],
      bgLight: [250, 250, 250],
      accent: [100, 116, 139],
      textDark: [15, 23, 42],
      ruledLine: [226, 232, 240],
      cardBg: [255, 255, 255],
    },
    warm_cream: {
      primary: [55, 30, 15],
      secondary: [110, 80, 60],
      bgLight: [252, 249, 242],
      accent: [160, 90, 50],
      textDark: [40, 25, 18],
      ruledLine: [235, 226, 212],
      cardBg: [255, 255, 255],
    },
  };

  const themeKey = options.theme in palettes ? options.theme : 'steno_green';
  const themeColors = palettes[themeKey];

  // Background tint
  doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top accent bar
  doc.setFillColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
  doc.rect(margin, 24, contentWidth, 3, 'F');

  // Title & Header
  let y = 54;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
  doc.text('Gregg Shorthand Transcription', margin, y);

  // Subtitle
  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(themeColors.secondary[0], themeColors.secondary[1], themeColors.secondary[2]);
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  doc.text(`Diamond Jubilee Edition (1963) · Transcription Record · ${dateStr}`, margin, y);

  // Metrics Bar
  y += 18;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(themeColors.ruledLine[0], themeColors.ruledLine[1], themeColors.ruledLine[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, y, contentWidth, 32, 4, 4, 'FD');

  const colW = contentWidth / 4;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL OUTLINES', margin + 12, y + 12);
  doc.text('BRIEF FORMS (DJ)', margin + colW + 12, y + 12);
  doc.text('SILENT OMISSIONS', margin + colW * 2 + 12, y + 12);
  doc.text('TARGET SPEED', margin + colW * 3 + 12, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
  doc.text(String(translation.stats.totalWords), margin + 12, y + 25);
  doc.text(`${translation.stats.briefFormsCount} (${Math.round((translation.stats.briefFormsCount / Math.max(1, translation.stats.totalWords)) * 100)}%)`, margin + colW + 12, y + 25);
  doc.text(String(translation.stats.silentLettersOmittedCount), margin + colW * 2 + 12, y + 25);
  doc.text(`${translation.stats.estimatedShorthandSpeedWpm} WPM`, margin + colW * 3 + 12, y + 25);

  // Original English Text Box
  y += 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(themeColors.textDark[0], themeColors.textDark[1], themeColors.textDark[2]);
  doc.text('Original Dictation Text', margin, y);

  y += 6;
  const wrappedOriginal = doc.splitTextToSize(translation.originalText, contentWidth - 24);
  const textHeight = Math.max(wrappedOriginal.length * 13 + 14, 38);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, textHeight, 4, 4, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(wrappedOriginal, margin + 12, y + 15);

  y += textHeight + 16;

  // Steno Pad Section (Authentic Diamond Jubilee Ruled Steno Notebook)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(themeColors.textDark[0], themeColors.textDark[1], themeColors.textDark[2]);
  doc.text('Stenographer Notebook Plate', margin, y);

  y += 8;
  const stenoBoxHeight = 180;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, stenoBoxHeight, 4, 4, 'FD');

  // Classic steno center vertical division line
  const centerX = margin + contentWidth / 2;
  doc.setDrawColor(themeColors.accent[0], themeColors.accent[1], themeColors.accent[2]);
  doc.setLineWidth(1);
  doc.line(centerX, y + 4, centerX, y + stenoBoxHeight - 4);

  // Ruled lines
  doc.setDrawColor(themeColors.ruledLine[0], themeColors.ruledLine[1], themeColors.ruledLine[2]);
  doc.setLineWidth(0.5);
  const lineSpacing = 30;
  for (let ly = y + lineSpacing; ly < y + stenoBoxHeight; ly += lineSpacing) {
    doc.line(margin + 6, ly, margin + contentWidth - 6, ly);
  }

  // Draw Words with Shorthand sound & English gloss on the steno lines
  let curX = margin + 16;
  let curLine = y + lineSpacing - 10;
  const colBound = centerX - 12;

  translation.words.slice(0, 24).forEach((wordObj) => {
    const wordWidth = Math.max(doc.getTextWidth(wordObj.word) + 20, 42);

    if (curX + wordWidth > colBound) {
      if (curX < centerX) {
        curX = centerX + 16;
      } else if (curX + wordWidth > margin + contentWidth - 12) {
        curX = margin + 16;
        curLine += lineSpacing;
        if (curLine > y + stenoBoxHeight - 14) return;
      }
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
    const displaySound = wordObj.isBrief ? `[${wordObj.phonetic}]*` : wordObj.phonetic;
    doc.text(displaySound, curX, curLine);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(wordObj.cleanWord, curX, curLine + 10);

    curX += wordWidth;
  });

  y += stenoBoxHeight + 16;

  // AI-Generated High Resolution Plate (if present)
  if (options.aiGeneratedImageUrl) {
    if (y + 240 > pageHeight - margin) {
      doc.addPage();
      doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      y = 40;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
    doc.text(`High-Resolution Stenographer Plate (${options.aiImageSize || '1K'})`, margin, y);

    y += 8;
    const imgSize = Math.min(contentWidth, 220);
    const imgX = margin + (contentWidth - imgSize) / 2;

    try {
      doc.addImage(options.aiGeneratedImageUrl, 'PNG', imgX, y, imgSize, imgSize);
      y += imgSize + 20;
    } catch (err) {
      console.warn('Could not embed AI image into PDF:', err);
    }
  }

  // Word-by-Word Diamond Jubilee Breakdown Table
  if (options.includeWordTable && translation.words.length > 0) {
    if (y + 140 > pageHeight - margin) {
      doc.addPage();
      doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      y = 40;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
    doc.text('Diamond Jubilee Word-by-Word Specification', margin, y);

    y += 8;

    // Table Header
    doc.setFillColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
    doc.rect(margin, y, contentWidth, 18, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('WORD', margin + 8, y + 12);
    doc.text('PHONETIC (DJ)', margin + 110, y + 12);
    doc.text('CLASSIFICATION', margin + 220, y + 12);
    doc.text('RULE NOTES', margin + 330, y + 12);

    y += 18;

    translation.words.forEach((w, index) => {
      if (y + 16 > pageHeight - margin) {
        doc.addPage();
        doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        y = 40;
      }

      // Alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
      }
      doc.rect(margin, y, contentWidth, 16, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(themeColors.textDark[0], themeColors.textDark[1], themeColors.textDark[2]);
      doc.text(w.cleanWord, margin + 8, y + 11);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
      doc.text(`/${w.phonetic}/`, margin + 110, y + 11);

      doc.setFontSize(7.5);
      doc.setTextColor(w.isBrief ? themeColors.primary[0] : 100);
      doc.text(w.isBrief ? 'Brief Form' : 'Phonetic', margin + 220, y + 11);

      doc.setTextColor(71, 85, 105);
      const note = (w.briefExplanation || w.ruleNotes || 'Standard phonetic transcription').slice(0, 48);
      doc.text(note, margin + 330, y + 11);

      y += 16;
    });

    y += 16;
  }

  // Gregg Alphabet Reference Appendix
  if (options.includeAlphabetGuide) {
    if (y + 140 > pageHeight - margin) {
      doc.addPage();
      doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      y = 40;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
    doc.text('Gregg Shorthand Diamond Jubilee Alphabet Reference', margin, y);

    y += 8;
    const gridCols = 4;
    const cellW = contentWidth / gridCols;
    const cellH = 26;

    GREGG_DJ_ALPHABET.slice(0, 16).forEach((item, idx) => {
      const col = idx % gridCols;
      if (col === 0 && idx > 0) {
        y += cellH;
        if (y + cellH > pageHeight - margin) {
          doc.addPage();
          doc.setFillColor(themeColors.bgLight[0], themeColors.bgLight[1], themeColors.bgLight[2]);
          doc.rect(0, 0, pageWidth, pageHeight, 'F');
          y = 40;
        }
      }

      const cellX = margin + col * cellW;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(themeColors.ruledLine[0], themeColors.ruledLine[1], themeColors.ruledLine[2]);
      doc.roundedRect(cellX, y, cellW - 4, cellH - 3, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(themeColors.primary[0], themeColors.primary[1], themeColors.primary[2]);
      doc.text(item.character, cellX + 6, y + 11);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(item.description, cellX + 6, y + 19);
    });

    y += cellH + 16;
  }

  // Document Footer on all pages
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Gregg Shorthand (Diamond Jubilee 1963) · Page ${i} of ${totalPages}`,
      margin,
      pageHeight - 20
    );
  }

  return doc;
}
