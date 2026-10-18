/**
 * Official Gregg Shorthand Diamond Jubilee (1963) Engine
 * Faithful to the official "Gregg Shorthand Dictionary: Diamond Jubilee Series"
 * and "Gregg Shorthand: Diamond Jubilee Series" by John Robert Gregg,
 * Louis A. Leslie, and Charles E. Zoubek (McGraw-Hill Book Company, 1963).
 */

export interface GreggWord {
  word: string;
  cleanWord: string;
  phonetic: string;
  strokes: string[];
  isBrief: boolean;
  briefExplanation: string | null;
  ruleNotes: string | null;
  svgPath: string;
  svgWidth: number;
  svgHeight: number;
}

export interface GreggTranslationResult {
  originalText: string;
  phoneticFull: string;
  summary: string;
  words: GreggWord[];
  stats: {
    totalWords: number;
    briefFormsCount: number;
    silentLettersOmittedCount: number;
    estimatedShorthandSpeedWpm: number;
  };
}

export interface GreggOutlineEntry {
  phonetic: string;
  strokes: string[];
  explanation: string;
  path: string;
  width: number;
  height: number;
  isBrief: boolean;
}

// ============================================================================
// 1. OFFICIAL 1963 GREGG DIAMOND JUBILEE BRIEF FORMS (129 Textbook Briefs)
// ============================================================================
export const DIAMOND_JUBILEE_BRIEFS: Record<string, GreggOutlineEntry> = {
  // A
  a: { phonetic: '·', strokes: ['dot'], explanation: 'DJ Lesson 1: Dot on the line of writing', path: 'M 16,24 a 2.5,2.5 0 1,0 0.1,0', width: 32, height: 44, isBrief: true },
  an: { phonetic: '·', strokes: ['dot'], explanation: 'DJ Lesson 1: Dot on the line of writing', path: 'M 16,24 a 2.5,2.5 0 1,0 0.1,0', width: 32, height: 44, isBrief: true },
  the: { phonetic: '·', strokes: ['dot'], explanation: 'DJ Lesson 1: Dot on the line of writing', path: 'M 16,24 a 2.5,2.5 0 1,0 0.1,0', width: 32, height: 44, isBrief: true },
  about: { phonetic: 'a-b', strokes: ['a', 'b'], explanation: 'DJ Lesson 13: Large circle "a" joined to downward "b"', path: 'M 8,18 a 5,5 0 1,0 0.1,0 M 13,18 Q 23,28 23,42', width: 36, height: 46, isBrief: true },
  after: { phonetic: 'a-f', strokes: ['a', 'f'], explanation: 'DJ Lesson 13: Large circle "a" joined to downward "f"', path: 'M 8,16 a 5,5 0 1,0 0.1,0 M 13,16 Q 20,26 24,38', width: 34, height: 44, isBrief: true },
  again: { phonetic: 'a-g', strokes: ['a', 'g'], explanation: 'DJ Lesson 17: Circle "a" joined to horizontal curve "g"', path: 'M 8,24 a 5,5 0 1,0 0.1,0 M 13,24 Q 26,14 42,24', width: 48, height: 44, isBrief: true },
  against: { phonetic: 'a-g-s', strokes: ['a', 'g', 's'], explanation: 'DJ Lesson 17: "a-g" joined to comma "s"', path: 'M 8,24 a 5,5 0 1,0 0.1,0 M 13,24 Q 24,14 38,24 Q 44,20 42,28', width: 50, height: 44, isBrief: true },
  all: { phonetic: 'o', strokes: ['o'], explanation: 'DJ Lesson 9: Deep downward under-hook "o"', path: 'M 10,18 Q 18,32 26,18', width: 36, height: 44, isBrief: true },
  also: { phonetic: 'o-l-s', strokes: ['o', 'l', 's'], explanation: 'DJ Lesson 21: "o-l" with comma "s"', path: 'M 6,24 Q 12,32 18,24 Q 28,18 36,8 Q 42,12 40,18', width: 48, height: 44, isBrief: true },
  always: { phonetic: 'o-l-w', strokes: ['o', 'l', 'w'], explanation: 'DJ Lesson 21: "o-l" with "w" hook', path: 'M 6,24 Q 12,32 18,24 Q 28,18 36,8 Q 42,4 46,10', width: 52, height: 44, isBrief: true },
  am: { phonetic: 'a-m', strokes: ['a', 'm'], explanation: 'DJ Lesson 1: Circle "a" joined to long line "m"', path: 'M 8,24 a 5,5 0 1,0 0.1,0 M 13,24 L 42,24', width: 48, height: 44, isBrief: true },
  and: { phonetic: 'n', strokes: ['n'], explanation: 'DJ Lesson 1: Short horizontal straight line "n"', path: 'M 6,24 L 28,24', width: 34, height: 44, isBrief: true },
  end: { phonetic: 'n', strokes: ['n'], explanation: 'DJ Lesson 1: Short horizontal straight line "n"', path: 'M 6,24 L 28,24', width: 34, height: 44, isBrief: true },
  are: { phonetic: 'r', strokes: ['r'], explanation: 'DJ Lesson 1: Short upward shallow curve "r"', path: 'M 8,30 Q 18,26 28,18', width: 36, height: 44, isBrief: true },
  our: { phonetic: 'r', strokes: ['r'], explanation: 'DJ Lesson 1: Short upward curve "r"', path: 'M 8,30 Q 18,26 28,18', width: 36, height: 44, isBrief: true },
  hour: { phonetic: 'r', strokes: ['r'], explanation: 'DJ Lesson 1: Short upward curve "r"', path: 'M 8,30 Q 18,26 28,18', width: 36, height: 44, isBrief: true },
  as: { phonetic: 's', strokes: ['s'], explanation: 'DJ Lesson 5: Right comma curve "s"', path: 'M 14,18 Q 22,14 20,24 Q 18,30 14,28', width: 32, height: 44, isBrief: true },
  his: { phonetic: 's', strokes: ['s'], explanation: 'DJ Lesson 5: Right comma curve "s"', path: 'M 14,18 Q 22,14 20,24 Q 18,30 14,28', width: 32, height: 44, isBrief: true },
  is: { phonetic: 's', strokes: ['s'], explanation: 'DJ Lesson 5: Right comma curve "s"', path: 'M 14,18 Q 22,14 20,24 Q 18,30 14,28', width: 32, height: 44, isBrief: true },
  at: { phonetic: 't', strokes: ['t'], explanation: 'DJ Lesson 1: Short upward straight slant "t"', path: 'M 12,32 L 20,14', width: 32, height: 44, isBrief: true },
  it: { phonetic: 't', strokes: ['t'], explanation: 'DJ Lesson 1: Short upward straight slant "t"', path: 'M 12,32 L 20,14', width: 32, height: 44, isBrief: true },

  // B
  be: { phonetic: 'b', strokes: ['b'], explanation: 'DJ Lesson 5: Long downward curve "b"', path: 'M 12,8 Q 22,24 22,40', width: 34, height: 48, isBrief: true },
  by: { phonetic: 'b', strokes: ['b'], explanation: 'DJ Lesson 5: Long downward curve "b"', path: 'M 12,8 Q 22,24 22,40', width: 34, height: 48, isBrief: true },
  but: { phonetic: 'b', strokes: ['b'], explanation: 'DJ Lesson 5: Long downward curve "b"', path: 'M 12,8 Q 22,24 22,40', width: 34, height: 48, isBrief: true },
  been: { phonetic: 'b-n', strokes: ['b', 'n'], explanation: 'DJ Lesson 5: Downward "b" joined to line "n"', path: 'M 10,8 Q 18,22 18,34 L 38,34', width: 44, height: 48, isBrief: true },
  before: { phonetic: 'b-f', strokes: ['b', 'f'], explanation: 'DJ Lesson 13: "b" joined into downward curve "f"', path: 'M 8,6 Q 16,18 16,28 Q 22,34 26,44', width: 36, height: 50, isBrief: true },
  between: { phonetic: 'b-t-w', strokes: ['b', 't'], explanation: 'DJ Lesson 25: "b" joined to upward "t"', path: 'M 8,8 Q 16,20 16,34 L 24,18', width: 34, height: 48, isBrief: true },
  big: { phonetic: 'b-g', strokes: ['b', 'g'], explanation: 'DJ Lesson 17: "b" joined to curve "g"', path: 'M 8,8 Q 16,22 16,34 Q 28,24 44,34', width: 50, height: 48, isBrief: true },
  business: { phonetic: 'b-s', strokes: ['b', 's'], explanation: 'DJ Lesson 5: "b" with final right comma "s"', path: 'M 8,10 Q 18,24 18,38 Q 26,32 26,40', width: 36, height: 46, isBrief: true },

  // C
  can: { phonetic: 'k', strokes: ['k'], explanation: 'DJ Lesson 1: Short shallow horizontal curve "k"', path: 'M 6,24 Q 18,16 32,24', width: 38, height: 44, isBrief: true },
  change: { phonetic: 'ch-a', strokes: ['ch', 'a'], explanation: 'DJ Lesson 17: Downward line "ch" with loop "a"', path: 'M 8,10 L 18,28 a 5,5 0 1,0 0.1,0', width: 36, height: 44, isBrief: true },
  circle: { phonetic: 's-r-k', strokes: ['s', 'r', 'k'], explanation: 'DJ Lesson 29: Comma "s" with "r-k"', path: 'M 6,20 Q 12,16 12,24 Q 20,20 28,14 Q 36,8 46,16', width: 52, height: 44, isBrief: true },
  company: { phonetic: 'k', strokes: ['k'], explanation: 'DJ Lesson 9: Short horizontal curve "k"', path: 'M 6,24 Q 18,16 32,24', width: 38, height: 44, isBrief: true },
  correct: { phonetic: 'k-r-k', strokes: ['k', 'r', 'k'], explanation: 'DJ Lesson 21: "k" curve + upward "r" + "k"', path: 'M 6,26 Q 14,20 22,26 Q 28,20 34,14 Q 42,8 52,16', width: 58, height: 44, isBrief: true },
  could: { phonetic: 'k-d', strokes: ['k', 'd'], explanation: 'DJ Lesson 9: Short curve "k" with long upward slant "d"', path: 'M 6,32 Q 16,24 24,32 L 34,8', width: 42, height: 46, isBrief: true },

  // D
  dear: { phonetic: 'd-r', strokes: ['d', 'r'], explanation: 'DJ Lesson 5: Upward slant "d" joined to curve "r"', path: 'M 8,36 L 18,12 Q 28,12 38,8', width: 46, height: 44, isBrief: true },
  department: { phonetic: 'd-p', strokes: ['d', 'p'], explanation: 'DJ Lesson 33: Upward slant "d" with downward "p"', path: 'M 8,34 L 18,12 Q 12,22 16,32', width: 32, height: 44, isBrief: true },
  did: { phonetic: 'd-t', strokes: ['d', 't'], explanation: 'DJ Lesson 5: Upward slant "d" with "t"', path: 'M 8,36 L 18,10 L 24,18', width: 34, height: 44, isBrief: true },
  date: { phonetic: 'd-t', strokes: ['d', 't'], explanation: 'DJ Lesson 5: Long slant "d" joined to short slant "t"', path: 'M 8,36 L 18,10 L 24,18', width: 34, height: 44, isBrief: true },
  do: { phonetic: 'd', strokes: ['d'], explanation: 'DJ Lesson 1: Long upward straight slant "d"', path: 'M 10,38 L 22,8', width: 34, height: 46, isBrief: true },
  doctor: { phonetic: 'd-r', strokes: ['d', 'r'], explanation: 'DJ Lesson 5: Upward slant "d" with curve "r"', path: 'M 8,36 L 18,12 Q 28,12 38,8', width: 46, height: 44, isBrief: true },
  during: { phonetic: 'd-r-ing', strokes: ['d', 'r', 'dot'], explanation: 'DJ Lesson 33: "d-r" with detached -ing dot', path: 'M 8,36 L 18,12 Q 28,12 36,8 M 42,8 a 2,2 0 1,0 0.1,0', width: 48, height: 44, isBrief: true },

  // E
  envelope: { phonetic: 'e-n-v', strokes: ['e', 'n', 'v'], explanation: 'DJ Lesson 37: Loop "e" + "n" + downward "v"', path: 'M 6,24 a 3,3 0 1,0 0.1,0 L 22,24 Q 28,30 32,44', width: 40, height: 48, isBrief: true },
  ever: { phonetic: 'e-v', strokes: ['e', 'v'], explanation: 'DJ Lesson 13: Loop "e" joined to downward "v"', path: 'M 8,14 a 3.5,3.5 0 1,0 0.1,0 Q 18,26 22,42', width: 32, height: 48, isBrief: true },
  every: { phonetic: 'e-v-r', strokes: ['e', 'v', 'r'], explanation: 'DJ Lesson 13: "e-v" with upward curve "r"', path: 'M 8,10 a 3.5,3.5 0 1,0 0.1,0 Q 18,22 20,36 Q 28,32 38,24', width: 44, height: 46, isBrief: true },
  expect: { phonetic: 'e-s-p', strokes: ['e', 's', 'p'], explanation: 'DJ Lesson 29: "e-s" joined to downward curve "p"', path: 'M 6,18 a 3,3 0 1,0 0.1,0 Q 14,14 14,22 Q 10,28 12,38', width: 32, height: 46, isBrief: true },
  experience: { phonetic: 'e-s-p-e', strokes: ['e', 's', 'p', 'e'], explanation: 'DJ Lesson 29: "e-s-p" with final "e" loop', path: 'M 6,18 a 3,3 0 1,0 0.1,0 Q 14,14 14,22 Q 10,28 12,38 a 3,3 0 1,0 0.1,0', width: 36, height: 46, isBrief: true },

  // F
  for: { phonetic: 'f', strokes: ['f'], explanation: 'DJ Lesson 1: Short downward shallow curve "f"', path: 'M 10,12 Q 18,24 24,36', width: 34, height: 44, isBrief: true },
  from: { phonetic: 'f', strokes: ['f'], explanation: 'DJ Lesson 1: Downward curve "f"', path: 'M 10,12 Q 18,24 24,36', width: 34, height: 44, isBrief: true },
  form: { phonetic: 'f', strokes: ['f'], explanation: 'DJ Lesson 1: Downward curve "f"', path: 'M 10,12 Q 18,24 24,36', width: 34, height: 44, isBrief: true },

  // G
  glad: { phonetic: 'g-l', strokes: ['g', 'l'], explanation: 'DJ Lesson 21: Long curve "g" joined to long curve "l"', path: 'M 6,30 Q 20,20 34,30 Q 46,24 56,10', width: 62, height: 44, isBrief: true },
  go: { phonetic: 'g', strokes: ['g'], explanation: 'DJ Lesson 1: Long shallow horizontal curve "g"', path: 'M 6,24 Q 22,14 38,24', width: 44, height: 44, isBrief: true },
  good: { phonetic: 'g-d', strokes: ['g', 'd'], explanation: 'DJ Lesson 1: "g" curve joined to upward slant "d"', path: 'M 6,32 Q 22,22 36,32 L 44,8', width: 50, height: 44, isBrief: true },
  great: { phonetic: 'g-r-t', strokes: ['g', 'r', 't'], explanation: 'DJ Lesson 5: "g-r" joined to upward slant "t"', path: 'M 6,30 Q 18,22 28,30 Q 36,24 44,16 L 48,6', width: 54, height: 44, isBrief: true },

  // H
  had: { phonetic: 'd', strokes: ['d'], explanation: 'DJ Lesson 1: Long upward slant "d" (h omitted)', path: 'M 10,38 L 22,8', width: 34, height: 46, isBrief: true },
  have: { phonetic: 'v', strokes: ['v'], explanation: 'DJ Lesson 1: Long downward curve "v"', path: 'M 10,6 Q 22,24 22,42', width: 34, height: 48, isBrief: true },
  he: { phonetic: 'e', strokes: ['e'], explanation: 'DJ Lesson 1: Tiny circle loop "e"', path: 'M 14,24 a 3.5,3.5 0 1,0 0.1,0', width: 30, height: 44, isBrief: true },
  house: { phonetic: 'ou-s', strokes: ['ou', 's'], explanation: 'DJ Lesson 25: Upward hook "ou" with comma "s"', path: 'M 8,24 Q 14,16 20,24 Q 28,20 26,28', width: 34, height: 44, isBrief: true },
  how: { phonetic: 'ou', strokes: ['ou'], explanation: 'DJ Lesson 25: Upward diphthong hook "ou"', path: 'M 8,24 Q 16,14 24,24', width: 32, height: 44, isBrief: true },

  // I
  i: { phonetic: 'i', strokes: ['i'], explanation: 'DJ Lesson 13: Large circle with broken loop/slash inside', path: 'M 14,24 a 6,6 0 1,0 0.1,0 M 11,21 L 17,27', width: 32, height: 44, isBrief: true },
  important: { phonetic: 'i-m-p', strokes: ['m', 'p'], explanation: 'DJ Lesson 33: Horizontal "m" with downward "p"', path: 'M 6,20 L 26,20 Q 20,28 24,38', width: 36, height: 46, isBrief: true },
  importance: { phonetic: 'i-m-p', strokes: ['m', 'p'], explanation: 'DJ Lesson 33: Horizontal "m" with downward "p"', path: 'M 6,20 L 26,20 Q 20,28 24,38', width: 36, height: 46, isBrief: true },
  in: { phonetic: 'n', strokes: ['n'], explanation: 'DJ Lesson 1: Short horizontal straight line "n"', path: 'M 6,24 L 28,24', width: 34, height: 44, isBrief: true },
  not: { phonetic: 'n', strokes: ['n'], explanation: 'DJ Lesson 1: Short horizontal straight line "n"', path: 'M 6,24 L 28,24', width: 34, height: 44, isBrief: true },
  industry: { phonetic: 'i-n-d', strokes: ['n', 'd'], explanation: 'DJ Lesson 37: Horizontal "n" with long upward slant "d"', path: 'M 6,34 L 24,34 L 34,8', width: 42, height: 44, isBrief: true },

  // L
  let: { phonetic: 'l-e-t', strokes: ['l', 'e', 't'], explanation: 'DJ Lesson 5: Long upward curve "l" + loop "e" + "t"', path: 'M 6,36 Q 16,34 22,24 a 3,3 0 1,0 0.1,0 L 28,12', width: 36, height: 44, isBrief: true },
  letter: { phonetic: 'l-e-t', strokes: ['l', 'e', 't'], explanation: 'DJ Lesson 5: Long upward curve "l" + loop "e" + "t"', path: 'M 6,36 Q 16,34 22,24 a 3,3 0 1,0 0.1,0 L 28,12', width: 36, height: 44, isBrief: true },
  like: { phonetic: 'l-k', strokes: ['l', 'k'], explanation: 'DJ Lesson 9: Upward curve "l" joined to shallow curve "k"', path: 'M 6,36 Q 16,32 24,18 Q 34,14 44,22', width: 50, height: 44, isBrief: true },
  little: { phonetic: 'l-t', strokes: ['l', 't'], explanation: 'DJ Lesson 5: Long upward curve "l" with upward slant "t"', path: 'M 6,36 Q 16,32 22,18 L 26,8', width: 34, height: 44, isBrief: true },

  // M
  morning: { phonetic: 'm-o-r-ing', strokes: ['m', 'o', 'r', 'dot'], explanation: 'DJ Lesson 17: "m-o-r" with detached -ing dot', path: 'M 6,24 L 28,24 Q 34,30 38,24 Q 44,20 50,14 M 54,12 a 2,2 0 1,0 0.1,0', width: 60, height: 44, isBrief: true },
  must: { phonetic: 'm-s', strokes: ['m', 's'], explanation: 'DJ Lesson 9: Horizontal "m" with comma "s"', path: 'M 6,24 L 28,24 Q 34,20 32,28', width: 40, height: 44, isBrief: true },

  // N
  name: { phonetic: 'n-m', strokes: ['n', 'm'], explanation: 'DJ Lesson 1: Short horizontal line "n" joined to long line "m"', path: 'M 6,24 L 20,24 L 46,24', width: 52, height: 44, isBrief: true },
  never: { phonetic: 'n-v', strokes: ['n', 'v'], explanation: 'DJ Lesson 9: Short line "n" with downward curve "v"', path: 'M 6,20 L 22,20 Q 28,28 32,42', width: 38, height: 48, isBrief: true },
  new: { phonetic: 'n-u', strokes: ['n', 'u'], explanation: 'DJ Lesson 25: Horizontal "n" with upward hook "u"', path: 'M 6,24 L 24,24 Q 30,16 36,24', width: 42, height: 44, isBrief: true },
  next: { phonetic: 'n-e-s-t', strokes: ['n', 's'], explanation: 'DJ Lesson 29: Line "n" with comma "s"', path: 'M 6,24 L 22,24 Q 28,20 26,28', width: 34, height: 44, isBrief: true },

  // O
  object: { phonetic: 'o-b', strokes: ['o', 'b'], explanation: 'DJ Lesson 33: Under-hook "o" with downward "b"', path: 'M 6,20 Q 12,28 16,20 Q 24,30 24,42', width: 34, height: 46, isBrief: true },
  of: { phonetic: 'o', strokes: ['o'], explanation: 'DJ Lesson 9: Small downward under-hook "o"', path: 'M 10,20 Q 16,30 22,20', width: 32, height: 44, isBrief: true },
  on: { phonetic: 'o', strokes: ['o'], explanation: 'DJ Lesson 9: Downward under-hook "o"', path: 'M 10,20 Q 16,30 22,20', width: 32, height: 44, isBrief: true },
  one: { phonetic: 'w-u-n', strokes: ['w', 'n'], explanation: 'DJ Lesson 21: Hook "w" with horizontal line "n"', path: 'M 8,24 Q 14,16 18,24 L 38,24', width: 44, height: 44, isBrief: true },
  won: { phonetic: 'w-u-n', strokes: ['w', 'n'], explanation: 'DJ Lesson 21: Hook "w" with line "n"', path: 'M 8,24 Q 14,16 18,24 L 38,24', width: 44, height: 44, isBrief: true },
  opportunity: { phonetic: 'o-p', strokes: ['o', 'p'], explanation: 'DJ Lesson 33: Under-hook "o" with downward "p"', path: 'M 6,18 Q 12,26 16,18 Q 12,26 14,36', width: 32, height: 44, isBrief: true },
  order: { phonetic: 'o-d-r', strokes: ['o', 'd', 'r'], explanation: 'DJ Lesson 9: Under-hook "o" + upward "d" + curve "r"', path: 'M 6,34 Q 12,42 16,34 L 22,10 Q 30,12 38,8', width: 46, height: 46, isBrief: true },
  organize: { phonetic: 'o-r-g', strokes: ['o', 'r', 'g'], explanation: 'DJ Lesson 41: "o-r" curve with horizontal "g"', path: 'M 6,30 Q 14,24 22,16 Q 34,10 46,20', width: 52, height: 44, isBrief: true },
  other: { phonetic: 'o-th', strokes: ['o', 'th'], explanation: 'DJ Lesson 17: Hook "o" with steep downward "th"', path: 'M 8,16 Q 14,24 18,16 Q 22,24 26,34', width: 34, height: 44, isBrief: true },
  over: { phonetic: 'o-v', strokes: ['o', 'v'], explanation: 'DJ Lesson 21: Hook "o" with long downward curve "v"', path: 'M 8,14 Q 14,22 16,14 Q 24,28 24,42', width: 34, height: 48, isBrief: true },

  // P
  part: { phonetic: 'p-r-t', strokes: ['p', 'r', 't'], explanation: 'DJ Lesson 13: Downward "p" + upward "r" + upward "t"', path: 'M 8,8 Q 4,20 8,30 Q 16,26 24,18 L 28,8', width: 36, height: 44, isBrief: true },
  people: { phonetic: 'p-e-p', strokes: ['p', 'e', 'p'], explanation: 'DJ Lesson 13: Downward "p" + loop "e" + downward "p"', path: 'M 8,6 Q 4,16 8,24 a 3,3 0 1,0 0.1,0 Q 8,34 12,44', width: 32, height: 50, isBrief: true },
  please: { phonetic: 'p-l-e-s', strokes: ['p', 'l', 'e', 's'], explanation: 'DJ Lesson 13: Downward "p" + long curve "l" + loop "e" + "s"', path: 'M 8,10 Q 4,22 8,32 Q 18,30 26,16 a 3,3 0 1,0 0.1,0 Q 32,22 30,28', width: 44, height: 44, isBrief: true },
  possible: { phonetic: 'p-o-s', strokes: ['p', 's'], explanation: 'DJ Lesson 29: Downward "p" with comma "s"', path: 'M 8,10 Q 4,22 8,32 Q 16,28 14,36', width: 32, height: 44, isBrief: true },
  probable: { phonetic: 'p-r-o-b', strokes: ['p', 'r', 'b'], explanation: 'DJ Lesson 29: Downward "p" + upward "r" + downward "b"', path: 'M 8,12 Q 4,22 8,32 Q 16,26 22,18 Q 28,30 28,44', width: 38, height: 48, isBrief: true },
  probably: { phonetic: 'p-r-o-b', strokes: ['p', 'r', 'b'], explanation: 'DJ Lesson 29: "p-r" with downward "b"', path: 'M 8,12 Q 4,22 8,32 Q 16,26 22,18 Q 28,30 28,44', width: 38, height: 48, isBrief: true },
  progress: { phonetic: 'p-r-o-g', strokes: ['p', 'r', 'g'], explanation: 'DJ Lesson 41: "p-r" joined to long curve "g"', path: 'M 8,16 Q 4,26 8,34 Q 16,28 22,20 Q 34,12 48,22', width: 54, height: 44, isBrief: true },
  public: { phonetic: 'p-u-b', strokes: ['p', 'b'], explanation: 'DJ Lesson 33: Short downward "p" with long downward "b"', path: 'M 8,6 Q 4,16 8,24 Q 16,34 16,46', width: 30, height: 50, isBrief: true },
  publish: { phonetic: 'p-u-b', strokes: ['p', 'b'], explanation: 'DJ Lesson 33: "p" with long downward "b"', path: 'M 8,6 Q 4,16 8,24 Q 16,34 16,46', width: 30, height: 50, isBrief: true },
  purpose: { phonetic: 'p-u-r-p', strokes: ['p', 'r', 'p'], explanation: 'DJ Lesson 33: "p-r" with downward "p"', path: 'M 8,10 Q 4,20 8,30 Q 16,24 22,16 Q 16,26 18,36', width: 34, height: 44, isBrief: true },

  // Q
  question: { phonetic: 'k-w-e-s', strokes: ['k', 'w', 's'], explanation: 'DJ Lesson 25: Shallow curve "k" with "w" hook and comma "s"', path: 'M 6,24 Q 14,16 22,22 Q 26,18 28,24 Q 34,20 32,28', width: 44, height: 44, isBrief: true },

  // R
  recognize: { phonetic: 'r-e-k', strokes: ['r', 'k'], explanation: 'DJ Lesson 41: Upward curve "r" joined to curve "k"', path: 'M 6,32 Q 14,28 20,20 Q 30,16 42,24', width: 48, height: 44, isBrief: true },
  regard: { phonetic: 'r-g', strokes: ['r', 'g'], explanation: 'DJ Lesson 41: Upward curve "r" joined to long curve "g"', path: 'M 6,32 Q 14,28 20,20 Q 32,10 46,20', width: 52, height: 44, isBrief: true },
  remember: { phonetic: 'r-e-m', strokes: ['r', 'm'], explanation: 'DJ Lesson 41: Upward curve "r" with long horizontal line "m"', path: 'M 6,32 Q 14,28 22,18 L 48,18', width: 54, height: 44, isBrief: true },

  // S
  send: { phonetic: 's-n-d', strokes: ['s', 'n', 'd'], explanation: 'DJ Lesson 9: Comma "s" + line "n" + upward slant "d"', path: 'M 6,28 Q 12,24 12,30 L 26,30 L 34,6', width: 42, height: 44, isBrief: true },
  several: { phonetic: 's-e-v', strokes: ['s', 'v'], explanation: 'DJ Lesson 29: Comma "s" with downward curve "v"', path: 'M 6,14 Q 12,10 12,18 Q 20,30 20,44', width: 32, height: 48, isBrief: true },
  she: { phonetic: 'sh', strokes: ['sh'], explanation: 'DJ Lesson 17: Short downward straight slant "sh"', path: 'M 10,12 L 18,28', width: 30, height: 44, isBrief: true },
  should: { phonetic: 'sh-d', strokes: ['sh', 'd'], explanation: 'DJ Lesson 17: Downward slant "sh" with upward slant "d"', path: 'M 10,14 L 18,30 L 26,6', width: 34, height: 44, isBrief: true },
  side: { phonetic: 's-i-d', strokes: ['s', 'i', 'd'], explanation: 'DJ Lesson 13: Comma "s" + broken circle "i" + upward "d"', path: 'M 6,30 Q 12,26 12,32 a 4,4 0 1,0 0.1,0 L 24,8', width: 34, height: 44, isBrief: true },
  sincere: { phonetic: 's-e-n-s-r-l', strokes: ['s', 'n', 's', 'r', 'l'], explanation: 'DJ Lesson 45: Closing outline "s-n-s-r-l"', path: 'M 6,20 Q 12,16 12,22 L 22,22 Q 26,18 26,24 Q 32,20 38,14 Q 46,14 54,4', width: 62, height: 44, isBrief: true },
  sincerely: { phonetic: 's-e-n-s-r-l', strokes: ['s', 'n', 's', 'r', 'l'], explanation: 'DJ Lesson 45: Standard closing outline "s-n-s-r-l"', path: 'M 6,20 Q 12,16 12,22 L 22,22 Q 26,18 26,24 Q 32,20 38,14 Q 46,14 54,4', width: 62, height: 44, isBrief: true },
  soon: { phonetic: 's-u-n', strokes: ['s', 'u', 'n'], explanation: 'DJ Lesson 25: Comma "s" + upward hook "u" + line "n"', path: 'M 6,26 Q 12,22 12,28 Q 18,20 22,28 L 40,28', width: 46, height: 44, isBrief: true },
  speak: { phonetic: 's-p-k', strokes: ['s', 'p', 'k'], explanation: 'DJ Lesson 29: Comma "s" + downward "p" + curve "k"', path: 'M 6,14 Q 12,10 12,18 Q 8,28 12,36 Q 22,32 32,38', width: 40, height: 44, isBrief: true },
  stand: { phonetic: 's-t-n-d', strokes: ['s', 't', 'n', 'd'], explanation: 'DJ Lesson 9: "s-t" upward + "n" line + upward "d"', path: 'M 6,32 Q 10,26 10,32 L 14,20 L 26,20 L 34,4', width: 42, height: 44, isBrief: true },
  state: { phonetic: 's-t-a-t', strokes: ['s', 't', 'a', 't'], explanation: 'DJ Lesson 5: "s-t" + circle "a" + upward "t"', path: 'M 6,32 Q 10,26 10,32 L 14,18 a 4,4 0 1,0 0.1,0 L 22,6', width: 34, height: 44, isBrief: true },
  street: { phonetic: 's-t-r-t', strokes: ['s', 't', 'r', 't'], explanation: 'DJ Lesson 21: "s-t-r" with upward "t"', path: 'M 6,34 Q 10,28 10,34 L 14,22 Q 22,20 28,14 L 32,4', width: 40, height: 44, isBrief: true },
  subject: { phonetic: 's-u-b', strokes: ['s', 'b'], explanation: 'DJ Lesson 33: Comma "s" with downward curve "b"', path: 'M 6,10 Q 12,6 12,14 Q 20,28 20,42', width: 30, height: 46, isBrief: true },
  success: { phonetic: 's-u-k-s', strokes: ['s', 'k', 's'], explanation: 'DJ Lesson 29: Comma "s" + curve "k" + comma "s"', path: 'M 6,24 Q 10,20 10,26 Q 20,20 28,26 Q 34,22 32,28', width: 40, height: 44, isBrief: true },
  such: { phonetic: 's-u-ch', strokes: ['s', 'ch'], explanation: 'DJ Lesson 17: Comma "s" with downward straight "ch"', path: 'M 6,12 Q 12,8 12,16 L 22,38', width: 32, height: 44, isBrief: true },
  suggest: { phonetic: 's-u-g', strokes: ['s', 'g'], explanation: 'DJ Lesson 41: Comma "s" with long curve "g"', path: 'M 6,24 Q 10,20 10,26 Q 24,14 40,24', width: 46, height: 44, isBrief: true },
  suggestion: { phonetic: 's-u-g', strokes: ['s', 'g'], explanation: 'DJ Lesson 41: Comma "s" with long curve "g"', path: 'M 6,24 Q 10,20 10,26 Q 24,14 40,24', width: 46, height: 44, isBrief: true },

  // T
  thank: { phonetic: 'th-k', strokes: ['th', 'k'], explanation: 'DJ Lesson 17: Steep downward curve "th" joined to shallow curve "k"', path: 'M 8,14 Q 14,24 18,32 Q 28,24 40,32', width: 48, height: 44, isBrief: true },
  thanks: { phonetic: 'th-k-s', strokes: ['th', 'k', 's'], explanation: 'DJ Lesson 17: "th-k" with comma "s"', path: 'M 8,14 Q 14,24 18,32 Q 28,24 36,32 Q 42,28 40,34', width: 50, height: 44, isBrief: true },
  that: { phonetic: 'th', strokes: ['th'], explanation: 'DJ Lesson 17: Short steep downward curve "th"', path: 'M 12,14 Q 18,22 22,34', width: 32, height: 44, isBrief: true },
  their: { phonetic: 'th-a-r', strokes: ['th', 'a', 'r'], explanation: 'DJ Lesson 17: "th" joined to circle "a" and upward "r"', path: 'M 8,14 Q 14,24 18,30 Q 26,20 36,16', width: 44, height: 44, isBrief: true },
  there: { phonetic: 'th-a-r', strokes: ['th', 'a', 'r'], explanation: 'DJ Lesson 17: "th" joined to circle "a" and upward "r"', path: 'M 8,14 Q 14,24 18,30 Q 26,20 36,16', width: 44, height: 44, isBrief: true },
  they: { phonetic: 'th-a', strokes: ['th', 'a'], explanation: 'DJ Lesson 17: "th" joined smoothly into large circle "a"', path: 'M 8,14 Q 14,22 18,30 C 22,32 26,28 26,22 C 26,16 20,16 18,22', width: 38, height: 44, isBrief: true },
  thing: { phonetic: 'th-ing', strokes: ['th', 'dot'], explanation: 'DJ Lesson 17: "th" with detached -ing dot', path: 'M 10,14 Q 16,22 18,32 M 24,30 a 2,2 0 1,0 0.1,0', width: 34, height: 44, isBrief: true },
  think: { phonetic: 'th-k', strokes: ['th', 'k'], explanation: 'DJ Lesson 17: "th" joined to shallow curve "k"', path: 'M 8,14 Q 14,24 18,32 Q 28,24 40,32', width: 48, height: 44, isBrief: true },
  this: { phonetic: 'th-s', strokes: ['th', 's'], explanation: 'DJ Lesson 17: "th" with comma "s"', path: 'M 10,12 Q 16,22 18,30 Q 24,26 24,34', width: 36, height: 44, isBrief: true },
  these: { phonetic: 'th-e-s', strokes: ['th', 'e', 's'], explanation: 'DJ Lesson 17: "th" + loop "e" + comma "s"', path: 'M 8,10 Q 14,18 16,26 a 3,3 0 1,0 0.1,0 Q 24,22 22,30', width: 34, height: 44, isBrief: true },
  time: { phonetic: 't-m', strokes: ['t', 'm'], explanation: 'DJ Lesson 1: Short upward slant "t" with horizontal line "m"', path: 'M 8,32 L 14,14 L 38,14', width: 44, height: 44, isBrief: true },
  to: { phonetic: 't', strokes: ['t'], explanation: 'DJ Lesson 1: Short upward straight slant "t"', path: 'M 12,32 L 20,14', width: 32, height: 44, isBrief: true },
  too: { phonetic: 't', strokes: ['t'], explanation: 'DJ Lesson 1: Short upward straight slant "t"', path: 'M 12,32 L 20,14', width: 32, height: 44, isBrief: true },
  two: { phonetic: 't', strokes: ['t'], explanation: 'DJ Lesson 1: Short upward straight slant "t"', path: 'M 12,32 L 20,14', width: 32, height: 44, isBrief: true },
  today: { phonetic: 't-d', strokes: ['t', 'd'], explanation: 'DJ Lesson 5: Short upward slant "t" with long upward slant "d"', path: 'M 8,36 L 14,20 L 22,6', width: 32, height: 44, isBrief: true },
  together: { phonetic: 't-g', strokes: ['t', 'g'], explanation: 'DJ Lesson 5: Short upward slant "t" with long curve "g"', path: 'M 6,32 L 12,18 Q 24,10 40,20', width: 46, height: 44, isBrief: true },
  tomorrow: { phonetic: 't-m-o-r', strokes: ['t', 'm'], explanation: 'DJ Lesson 5: Short upward slant "t" with line "m"', path: 'M 8,32 L 14,14 L 38,14', width: 44, height: 44, isBrief: true },
  trust: { phonetic: 't-r-s', strokes: ['t', 'r', 's'], explanation: 'DJ Lesson 21: Upward "t" + curve "r" + comma "s"', path: 'M 6,32 L 12,18 Q 20,16 26,10 Q 32,14 30,20', width: 38, height: 44, isBrief: true },
  truly: { phonetic: 't-r-l', strokes: ['t', 'r', 'l'], explanation: 'DJ Lesson 45: Upward "t" + curve "r" + long curve "l"', path: 'M 8,30 L 14,16 Q 22,14 28,10 Q 38,10 44,2', width: 52, height: 44, isBrief: true },

  // U
  under: { phonetic: 'u-n-d', strokes: ['u', 'n', 'd'], explanation: 'DJ Lesson 37: Upward hook "u" + line "n" + upward "d"', path: 'M 6,30 Q 12,22 16,30 L 28,30 L 36,6', width: 42, height: 44, isBrief: true },
  until: { phonetic: 'u-n-t', strokes: ['u', 'n', 't'], explanation: 'DJ Lesson 37: Hook "u" + line "n" + upward slant "t"', path: 'M 6,30 Q 12,22 16,30 L 28,30 L 34,14', width: 40, height: 44, isBrief: true },
  upon: { phonetic: 'u-p', strokes: ['u', 'p'], explanation: 'DJ Lesson 33: Upward hook "u" with downward curve "p"', path: 'M 6,20 Q 12,12 16,20 Q 10,28 14,38', width: 32, height: 44, isBrief: true },
  use: { phonetic: 'u-s', strokes: ['u', 's'], explanation: 'DJ Lesson 25: Upward hook "u" with right comma "s"', path: 'M 6,24 Q 14,14 20,24 Q 28,20 26,28', width: 34, height: 44, isBrief: true },

  // V
  very: { phonetic: 'v-e', strokes: ['v', 'e'], explanation: 'DJ Lesson 13: Long downward curve "v" with tiny circle "e"', path: 'M 8,6 Q 20,22 20,38 a 3.5,3.5 0 1,0 0.1,0', width: 32, height: 48, isBrief: true },

  // W
  want: { phonetic: 'o-n-t', strokes: ['o', 'n', 't'], explanation: 'DJ Lesson 21: Hook "o" + line "n" + upward "t"', path: 'M 6,26 Q 12,34 16,26 L 28,26 L 34,12', width: 40, height: 44, isBrief: true },
  was: { phonetic: 'o-s', strokes: ['o', 's'], explanation: 'DJ Lesson 9: Downward under-hook "o" with comma "s"', path: 'M 8,18 Q 14,28 20,18 Q 26,14 24,22', width: 32, height: 44, isBrief: true },
  well: { phonetic: 'l', strokes: ['l'], explanation: 'DJ Lesson 1: Long upward curve "l"', path: 'M 6,36 Q 20,34 34,12', width: 40, height: 46, isBrief: true },
  went: { phonetic: 'o-e-n-t', strokes: ['o', 'n', 't'], explanation: 'DJ Lesson 21: Hook "o" + line "n" + upward slant "t"', path: 'M 6,26 Q 12,34 16,26 L 28,26 L 34,12', width: 40, height: 44, isBrief: true },
  were: { phonetic: 'w-e-r', strokes: ['w', 'r'], explanation: 'DJ Lesson 21: Hook "w" with upward curve "r"', path: 'M 6,28 Q 12,20 16,28 Q 24,24 32,16', width: 38, height: 44, isBrief: true },
  what: { phonetic: 'o-t', strokes: ['o', 't'], explanation: 'DJ Lesson 21: Downward hook "o" with upward slant "t"', path: 'M 8,24 Q 14,32 18,24 L 24,8', width: 32, height: 44, isBrief: true },
  when: { phonetic: 'o-n', strokes: ['o', 'n'], explanation: 'DJ Lesson 21: Downward under-hook "o" with line "n"', path: 'M 6,22 Q 12,30 16,22 L 36,22', width: 42, height: 44, isBrief: true },
  where: { phonetic: 'w-e-r', strokes: ['w', 'r'], explanation: 'DJ Lesson 21: Hook "w" with upward curve "r"', path: 'M 6,28 Q 12,20 16,28 Q 24,24 32,16', width: 38, height: 44, isBrief: true },
  which: { phonetic: 'ch', strokes: ['ch'], explanation: 'DJ Lesson 17: Medium downward straight slant "ch"', path: 'M 10,10 L 20,34', width: 32, height: 44, isBrief: true },
  why: { phonetic: 'o-i', strokes: ['o', 'i'], explanation: 'DJ Lesson 25: Hook "o" with large circle "i"', path: 'M 6,22 Q 12,30 16,22 a 5,5 0 1,0 0.1,0', width: 34, height: 44, isBrief: true },
  will: { phonetic: 'l', strokes: ['l'], explanation: 'DJ Lesson 1: Long upward curve "l"', path: 'M 6,36 Q 20,34 34,12', width: 40, height: 46, isBrief: true },
  wish: { phonetic: 'w-e-sh', strokes: ['w', 'sh'], explanation: 'DJ Lesson 21: Hook "w" with downward straight "sh"', path: 'M 8,16 Q 14,8 18,16 L 24,34', width: 32, height: 44, isBrief: true },
  with: { phonetic: 'w', strokes: ['w'], explanation: 'DJ Lesson 21: Small right-opening upward hook "w"', path: 'M 10,24 Q 16,16 22,24', width: 32, height: 44, isBrief: true },
  without: { phonetic: 'w-th-t', strokes: ['w', 'th', 't'], explanation: 'DJ Lesson 21: Hook "w" + downward "th" + upward "t"', path: 'M 6,24 Q 12,16 16,24 Q 20,30 22,38 L 28,20', width: 36, height: 44, isBrief: true },
  woman: { phonetic: 'w-m', strokes: ['w', 'm'], explanation: 'DJ Lesson 21: Hook "w" with long line "m"', path: 'M 6,24 Q 12,16 16,24 L 44,24', width: 50, height: 44, isBrief: true },
  women: { phonetic: 'w-m', strokes: ['w', 'm'], explanation: 'DJ Lesson 21: Hook "w" with line "m"', path: 'M 6,24 Q 12,16 16,24 L 44,24', width: 50, height: 44, isBrief: true },
  wonder: { phonetic: 'w-u-n-d', strokes: ['w', 'n', 'd'], explanation: 'DJ Lesson 21: Hook "w" + line "n" + upward "d"', path: 'M 6,32 Q 12,24 16,32 L 28,32 L 36,8', width: 42, height: 44, isBrief: true },
  wonderful: { phonetic: 'w-u-n-d', strokes: ['w', 'n', 'd'], explanation: 'DJ Lesson 21: Brief form "w-u-n-d"', path: 'M 6,32 Q 12,24 16,32 L 28,32 L 36,8', width: 42, height: 44, isBrief: true },
  word: { phonetic: 'w-r-d', strokes: ['w', 'r', 'd'], explanation: 'DJ Lesson 21: Hook "w" + upward curve "r" + upward "d"', path: 'M 6,34 Q 12,26 16,34 Q 22,30 28,22 L 34,4', width: 42, height: 44, isBrief: true },
  work: { phonetic: 'w-r-k', strokes: ['w', 'r', 'k'], explanation: 'DJ Lesson 21: Hook "w" + curve "r" + shallow curve "k"', path: 'M 6,30 Q 12,22 16,30 Q 24,26 30,18 Q 38,14 48,22', width: 54, height: 44, isBrief: true },
  world: { phonetic: 'w-r-l', strokes: ['w', 'r', 'l'], explanation: 'DJ Lesson 21: Hook "w" + curve "r" + long curve "l"', path: 'M 6,34 Q 12,26 16,34 Q 24,30 30,22 Q 40,20 50,6', width: 56, height: 44, isBrief: true },
  worth: { phonetic: 'w-r-th', strokes: ['w', 'r', 'th'], explanation: 'DJ Lesson 21: Hook "w" + curve "r" + steep downward "th"', path: 'M 6,28 Q 12,20 16,28 Q 24,24 30,16 Q 34,24 36,36', width: 42, height: 44, isBrief: true },
  would: { phonetic: 'o-d', strokes: ['o', 'd'], explanation: 'DJ Lesson 9: Downward hook "o" with long upward slant "d"', path: 'M 6,34 Q 12,42 16,34 L 24,8', width: 32, height: 44, isBrief: true },
  write: { phonetic: 'r-i-t', strokes: ['r', 'i', 't'], explanation: 'DJ Lesson 13: Silent "w" omitted; upward "r" + broken circle "i" + upward slant "t"', path: 'M 6,32 Q 14,28 20,20 a 4,4 0 1,0 0.1,0 L 28,6', width: 36, height: 44, isBrief: true },

  // Y
  year: { phonetic: 'e-r', strokes: ['e', 'r'], explanation: 'DJ Lesson 13: Tiny circle "e" joined to upward curve "r"', path: 'M 8,30 a 3.5,3.5 0 1,0 0.1,0 Q 18,26 28,18', width: 36, height: 44, isBrief: true },
  yesterday: { phonetic: 'e-s-t-d', strokes: ['e', 's', 't', 'd'], explanation: 'DJ Lesson 45: Loop "e" + "s-t" + upward "d"', path: 'M 6,32 a 3,3 0 1,0 0.1,0 Q 14,26 14,32 L 18,20 L 26,4', width: 34, height: 44, isBrief: true },
  you: { phonetic: 'u', strokes: ['u'], explanation: 'DJ Lesson 9: Tiny upward hook "u"', path: 'M 10,26 Q 16,18 22,26', width: 32, height: 44, isBrief: true },
  your: { phonetic: 'u', strokes: ['u'], explanation: 'DJ Lesson 9: Tiny upward hook "u"', path: 'M 10,26 Q 16,18 22,26', width: 32, height: 44, isBrief: true },
  yours: { phonetic: 'u-r-s', strokes: ['u', 's'], explanation: 'DJ Lesson 9: Hook "u" with right comma "s"', path: 'M 8,24 Q 14,16 20,24 Q 26,20 24,28', width: 32, height: 44, isBrief: true },
};

// ============================================================================
// 2. EXTENSIVE OFFICIAL STANDARD DICTIONARY OUTLINES (Official DJ Manual)
// ============================================================================
export const DIAMOND_JUBILEE_STANDARDS: Record<string, GreggOutlineEntry> = {
  // Salutations, Correspondence & Business
  mr: { phonetic: 'm-r', strokes: ['m', 'r'], explanation: 'Standard salutation outline: horizontal "m" joined to upward curve "r"', path: 'M 6,24 L 28,24 Q 38,22 46,12', width: 52, height: 44, isBrief: false },
  mrs: { phonetic: 'm-r-s', strokes: ['m', 'r', 's'], explanation: 'Standard salutation: "m-r" with final comma "s"', path: 'M 6,24 L 26,24 Q 36,22 42,14 Q 48,18 46,24', width: 54, height: 44, isBrief: false },
  miss: { phonetic: 'm-e-s', strokes: ['m', 'e', 's'], explanation: 'Line "m" + tiny loop "e" + comma "s"', path: 'M 6,24 L 28,24 a 3,3 0 1,0 0.1,0 Q 36,20 34,28', width: 42, height: 44, isBrief: false },
  davis: { phonetic: 'd-a-v-s', strokes: ['d', 'a', 'v', 's'], explanation: 'Proper name: upward "d" + large circle "a" + downward "v" + comma "s"', path: 'M 8,36 L 16,12 a 5,5 0 1,0 0.1,0 Q 26,26 26,40 Q 32,36 32,44', width: 40, height: 48, isBrief: false },
  office: { phonetic: 'o-f-s', strokes: ['o', 'f', 's'], explanation: 'Hook "o" + downward curve "f" + comma "s"', path: 'M 6,18 Q 12,26 16,18 Q 22,28 26,38 Q 32,34 30,42', width: 38, height: 46, isBrief: false },
  schedule: { phonetic: 's-k-e-j-u-l', strokes: ['s', 'k', 'j', 'l'], explanation: 'DJ simplified: comma "s" + curve "k" + long downward slant "j" + upward curve "l"', path: 'M 6,20 Q 12,16 12,24 Q 22,18 30,24 L 38,44 Q 46,40 54,20', width: 60, height: 48, isBrief: false },
  delivered: { phonetic: 'd-l-v-r-d', strokes: ['d', 'l', 'v', 'r', 'd'], explanation: 'Upward "d" + curve "l" + downward "v" + upward "d"', path: 'M 6,34 L 14,14 Q 22,16 28,24 Q 32,34 32,44 L 40,18', width: 48, height: 48, isBrief: false },
  deliver: { phonetic: 'd-l-v-r', strokes: ['d', 'l', 'v', 'r'], explanation: 'Upward "d" + curve "l" + downward "v" + curve "r"', path: 'M 6,34 L 14,14 Q 22,16 28,24 Q 32,34 32,44 Q 38,40 44,32', width: 50, height: 48, isBrief: false },
  delivery: { phonetic: 'd-l-v-r-e', strokes: ['d', 'l', 'v', 'r', 'e'], explanation: '"deliver" with final "e" loop', path: 'M 6,34 L 14,14 Q 22,16 28,24 Q 32,34 32,44 Q 38,40 44,32 a 3,3 0 1,0 0.1,0', width: 52, height: 48, isBrief: false },
  shipment: { phonetic: 'sh-p-m', strokes: ['sh', 'p', 'm'], explanation: 'Downward slant "sh" + downward "p" + suffix -ment represented by "m"', path: 'M 8,8 L 16,22 Q 12,32 16,42 L 40,42', width: 46, height: 48, isBrief: false },
  inquiry: { phonetic: 'i-n-k-w-r-e', strokes: ['n', 'k', 'r'], explanation: 'Line "n" + curve "k" + upward curve "r" with loop "e"', path: 'M 6,26 L 22,26 Q 32,20 40,26 Q 48,22 54,12 a 3,3 0 1,0 0.1,0', width: 62, height: 44, isBrief: false },
  recent: { phonetic: 'r-e-s-n-t', strokes: ['r', 'e', 's', 'n', 't'], explanation: 'Upward curve "r" + loop "e" + comma "s" + line "n" + upward "t"', path: 'M 6,32 Q 14,28 20,20 a 3,3 0 1,0 0.1,0 Q 26,16 26,24 L 38,24 L 44,8', width: 50, height: 44, isBrief: false },
  friday: { phonetic: 'f-r-i-d-a', strokes: ['f', 'r', 'i', 'd', 'a'], explanation: 'Downward "f" + upward "r" + loop "i" + upward "d" + circle "a"', path: 'M 6,10 Q 14,20 18,30 Q 24,24 30,16 a 4,4 0 1,0 0.1,0 L 38,2 a 5,5 0 1,0 0.1,0', width: 50, height: 44, isBrief: false },
  monday: { phonetic: 'm-u-n-d-a', strokes: ['m', 'n', 'd', 'a'], explanation: 'Line "m" + line "n" + upward "d" + circle "a"', path: 'M 6,30 L 24,30 L 36,30 L 44,6 a 5,5 0 1,0 0.1,0', width: 54, height: 44, isBrief: false },
  witness: { phonetic: 'w-e-t-n-s', strokes: ['w', 't', 'n', 's'], explanation: 'Hook "w" + upward "t" + line "n" + comma "s"', path: 'M 6,32 Q 12,24 16,32 L 20,16 L 34,16 Q 40,12 38,20', width: 46, height: 44, isBrief: false },
  agreement: { phonetic: 'a-g-r-m', strokes: ['a', 'g', 'r', 'm'], explanation: 'Circle "a" + curve "g" + curve "r" + suffix -ment "m"', path: 'M 6,24 a 4,4 0 1,0 0.1,0 Q 18,16 30,24 Q 38,20 44,12 L 64,12', width: 70, height: 44, isBrief: false },
  evidence: { phonetic: 'e-v-d-n-s', strokes: ['e', 'v', 'd', 'n', 's'], explanation: 'Loop "e" + downward "v" + upward "d" + line "n" + comma "s"', path: 'M 6,10 a 3,3 0 1,0 0.1,0 Q 16,22 18,36 L 26,14 L 38,14 Q 44,10 42,18', width: 50, height: 44, isBrief: false },
  court: { phonetic: 'k-o-r-t', strokes: ['k', 'o', 'r', 't'], explanation: 'Curve "k" + hook "o" + upward curve "r" + upward slant "t"', path: 'M 6,26 Q 16,18 26,26 Q 30,32 34,26 Q 40,22 46,16 L 50,6', width: 56, height: 44, isBrief: false },
  jury: { phonetic: 'j-u-r-e', strokes: ['j', 'u', 'r', 'e'], explanation: 'Long downward slant "j" + hook "u" + upward curve "r" with loop "e"', path: 'M 6,6 L 18,34 Q 24,26 28,34 Q 34,30 40,20 a 3,3 0 1,0 0.1,0', width: 48, height: 44, isBrief: false },
  board: { phonetic: 'b-o-r-d', strokes: ['b', 'o', 'r', 'd'], explanation: 'Downward "b" + hook "o" + upward "r" + upward "d"', path: 'M 8,8 Q 16,22 16,34 Q 22,40 26,34 Q 32,30 38,22 L 44,4', width: 50, height: 44, isBrief: false },
  directors: { phonetic: 'd-r-k-t-r-s', strokes: ['d', 'r', 'k', 't', 'r', 's'], explanation: 'Upward "d" + curve "r" + curve "k" + upward "t" + curve "r" + comma "s"', path: 'M 6,34 L 14,14 Q 20,16 26,22 Q 34,16 42,22 L 46,10 Q 52,14 56,8 Q 62,12 60,18', width: 66, height: 44, isBrief: false },
  contract: { phonetic: 'k-o-n-t-r-k-t', strokes: ['k', 't', 'r', 'k', 't'], explanation: 'Prefix con- (omitted/k) + upward "t" + curve "r" + curve "k" + upward "t"', path: 'M 6,30 Q 16,22 24,30 L 28,14 Q 36,16 42,22 Q 50,16 58,22 L 62,8', width: 68, height: 44, isBrief: false },
  faith: { phonetic: 'f-a-th', strokes: ['f', 'a', 'th'], explanation: 'Downward "f" + large circle "a" + steep downward "th"', path: 'M 8,8 Q 16,20 18,30 a 5,5 0 1,0 0.1,0 Q 28,38 32,48', width: 40, height: 52, isBrief: false },
  parties: { phonetic: 'p-a-r-t-e-s', strokes: ['p', 'r', 't', 'e', 's'], explanation: 'Downward "p" + upward "r" + upward "t" + loop "e" + comma "s"', path: 'M 8,8 Q 4,18 8,28 Q 16,24 22,16 L 26,6 a 3,3 0 1,0 0.1,0 Q 32,10 30,16', width: 38, height: 44, isBrief: false },
  party: { phonetic: 'p-a-r-t-e', strokes: ['p', 'r', 't', 'e'], explanation: 'Downward "p" + upward "r" + upward "t" with loop "e"', path: 'M 8,8 Q 4,18 8,28 Q 16,24 22,16 L 26,6 a 3,3 0 1,0 0.1,0', width: 36, height: 44, isBrief: false },
  signed: { phonetic: 's-i-n-d', strokes: ['s', 'i', 'n', 'd'], explanation: 'Comma "s" + loop "i" + line "n" + upward "d"', path: 'M 6,28 Q 12,24 12,30 a 4,4 0 1,0 0.1,0 L 26,30 L 34,6', width: 42, height: 44, isBrief: false },
  sign: { phonetic: 's-i-n', strokes: ['s', 'i', 'n'], explanation: 'Comma "s" + loop "i" + line "n"', path: 'M 6,24 Q 12,20 12,26 a 4,4 0 1,0 0.1,0 L 34,26', width: 40, height: 44, isBrief: false },
  speed: { phonetic: 's-p-e-d', strokes: ['s', 'p', 'e', 'd'], explanation: 'Comma "s" + downward "p" + loop "e" + upward "d"', path: 'M 6,14 Q 12,10 12,18 Q 8,28 12,36 a 3,3 0 1,0 0.1,0 L 22,8', width: 32, height: 44, isBrief: false },
  rapid: { phonetic: 'r-a-p-d', strokes: ['r', 'a', 'p', 'd'], explanation: 'Upward curve "r" + large circle "a" + downward "p" + upward "d"', path: 'M 6,28 Q 14,24 20,16 a 5,5 0 1,0 0.1,0 Q 22,26 24,36 L 32,12', width: 40, height: 44, isBrief: false },
  secretary: { phonetic: 's-e-k-r-t-r-e', strokes: ['s', 'k', 'r', 't', 'r'], explanation: 'Comma "s" + curve "k" + upward "r" + upward "t" + curve "r"', path: 'M 6,24 Q 12,20 12,26 Q 22,20 30,26 Q 36,22 42,14 L 46,6 Q 52,10 56,4', width: 62, height: 44, isBrief: false },
  practice: { phonetic: 'p-r-a-k-t-s', strokes: ['p', 'r', 'a', 'k', 't', 's'], explanation: 'Downward "p" + upward "r" + circle "a" + curve "k" + upward "t" + comma "s"', path: 'M 6,10 Q 2,20 6,30 Q 14,26 20,18 a 5,5 0 1,0 0.1,0 Q 30,22 38,28 L 42,14 Q 48,18 46,24', width: 54, height: 44, isBrief: false },
  thought: { phonetic: 'th-o-t', strokes: ['th', 'o', 't'], explanation: 'Silent "gh" omitted: steep downward "th" + hook "o" + upward slant "t"', path: 'M 8,14 Q 14,22 18,32 Q 24,38 28,30 L 34,14', width: 40, height: 44, isBrief: false },
  know: { phonetic: 'n-o', strokes: ['n', 'o'], explanation: 'Silent "k" omitted: line "n" + downward hook "o"', path: 'M 6,22 L 24,22 Q 30,30 36,20', width: 42, height: 44, isBrief: false },
  see: { phonetic: 's-e', strokes: ['s', 'e'], explanation: 'Right comma "s" with tiny loop "e"', path: 'M 8,16 Q 16,12 14,22 a 3.5,3.5 0 1,0 0.1,0', width: 28, height: 44, isBrief: false },
  come: { phonetic: 'k-u-m', strokes: ['k', 'm'], explanation: 'Shallow horizontal curve "k" joined smoothly into line "m"', path: 'M 6,24 Q 18,16 30,24 L 56,24', width: 62, height: 44, isBrief: false },
  make: { phonetic: 'm-a-k', strokes: ['m', 'a', 'k'], explanation: 'Horizontal line "m" + large circle "a" + shallow curve "k"', path: 'M 6,24 L 28,24 a 5,5 0 1,0 0.1,0 Q 40,16 52,24', width: 58, height: 44, isBrief: false },
  take: { phonetic: 't-a-k', strokes: ['t', 'a', 'k'], explanation: 'Short upward slant "t" + large circle "a" + curve "k"', path: 'M 8,30 L 14,14 a 5,5 0 1,0 0.1,0 Q 26,10 38,18', width: 44, height: 44, isBrief: false },
  give: { phonetic: 'g-e-v', strokes: ['g', 'e', 'v'], explanation: 'Long curve "g" + loop "e" + downward curve "v"', path: 'M 6,20 Q 22,10 36,20 a 3,3 0 1,0 0.1,0 Q 44,30 46,44', width: 52, height: 48, isBrief: false },
  look: { phonetic: 'l-u-k', strokes: ['l', 'u', 'k'], explanation: 'Long upward curve "l" + hook "u" + curve "k"', path: 'M 6,34 Q 18,32 26,18 Q 32,10 38,18 Q 46,14 54,22', width: 60, height: 44, isBrief: false },
  find: { phonetic: 'f-i-n-d', strokes: ['f', 'i', 'n', 'd'], explanation: 'Downward "f" + loop "i" + line "n" + upward "d"', path: 'M 8,10 Q 16,20 18,30 a 4,4 0 1,0 0.1,0 L 32,30 L 40,6', width: 46, height: 44, isBrief: false },
  tell: { phonetic: 't-e-l', strokes: ['t', 'e', 'l'], explanation: 'Short upward slant "t" + loop "e" + long upward curve "l"', path: 'M 8,32 L 14,16 a 3,3 0 1,0 0.1,0 Q 26,14 36,2', width: 42, height: 44, isBrief: false },
  ask: { phonetic: 'a-s-k', strokes: ['a', 's', 'k'], explanation: 'Large circle "a" + comma "s" + shallow curve "k"', path: 'M 8,24 a 5,5 0 1,0 0.1,0 Q 18,20 16,28 Q 26,22 36,30', width: 42, height: 44, isBrief: false },
  need: { phonetic: 'n-e-d', strokes: ['n', 'e', 'd'], explanation: 'Line "n" + loop "e" + long upward slant "d"', path: 'M 6,32 L 22,32 a 3,3 0 1,0 0.1,0 L 32,6', width: 38, height: 44, isBrief: false },
  feel: { phonetic: 'f-e-l', strokes: ['f', 'e', 'l'], explanation: 'Downward "f" + loop "e" + long upward curve "l"', path: 'M 8,8 Q 16,18 18,28 a 3,3 0 1,0 0.1,0 Q 30,26 40,12', width: 46, height: 44, isBrief: false },
  leave: { phonetic: 'l-e-v', strokes: ['l', 'e', 'v'], explanation: 'Long upward curve "l" + loop "e" + downward curve "v"', path: 'M 6,34 Q 18,32 26,18 a 3.5,3.5 0 1,0 0.1,0 Q 34,28 36,44', width: 44, height: 48, isBrief: false },
  put: { phonetic: 'p-u-t', strokes: ['p', 'u', 't'], explanation: 'Downward curve "p" + upward hook "u" + upward slant "t"', path: 'M 8,8 Q 4,18 8,28 Q 14,20 18,28 L 24,12', width: 32, height: 44, isBrief: false },
  mean: { phonetic: 'm-e-n', strokes: ['m', 'e', 'n'], explanation: 'Horizontal line "m" + loop "e" + line "n"', path: 'M 6,24 L 28,24 a 3,3 0 1,0 0.1,0 L 46,24', width: 52, height: 44, isBrief: false },
  keep: { phonetic: 'k-e-p', strokes: ['k', 'e', 'p'], explanation: 'Shallow curve "k" + loop "e" + downward curve "p"', path: 'M 6,22 Q 16,14 26,22 a 3,3 0 1,0 0.1,0 Q 24,32 28,42', width: 36, height: 46, isBrief: false },
  begin: { phonetic: 'b-e-g-n', strokes: ['b', 'e', 'g', 'n'], explanation: 'Downward "b" + loop "e" + long curve "g" + line "n"', path: 'M 8,8 Q 16,20 16,30 a 3,3 0 1,0 0.1,0 Q 28,22 42,32 L 58,32', width: 64, height: 46, isBrief: false },
  help: { phonetic: 'e-l-p', strokes: ['l', 'p'], explanation: 'Initial h omitted: upward curve "l" with downward curve "p"', path: 'M 6,34 Q 18,32 26,18 Q 20,28 24,38', width: 34, height: 44, isBrief: false },
  talk: { phonetic: 't-o-k', strokes: ['t', 'o', 'k'], explanation: 'Upward slant "t" + hook "o" + curve "k"', path: 'M 8,30 L 14,14 Q 20,22 24,14 Q 34,10 44,18', width: 50, height: 44, isBrief: false },
  turn: { phonetic: 't-e-r-n', strokes: ['t', 'r', 'n'], explanation: 'Upward slant "t" + curve "r" + horizontal line "n"', path: 'M 8,32 L 14,16 Q 22,14 28,10 L 48,10', width: 54, height: 44, isBrief: false },
  start: { phonetic: 's-t-a-r-t', strokes: ['s', 't', 'a', 'r', 't'], explanation: 'Comma "s" + upward "t" + circle "a" + curve "r" + upward "t"', path: 'M 6,34 Q 10,28 10,34 L 14,20 a 5,5 0 1,0 0.1,0 Q 24,16 30,10 L 34,0', width: 42, height: 44, isBrief: false },
  show: { phonetic: 'sh-o', strokes: ['sh', 'o'], explanation: 'Downward slant "sh" + hook "o"', path: 'M 8,12 L 16,28 Q 22,36 28,26', width: 34, height: 44, isBrief: false },
  hear: { phonetic: 'e-r', strokes: ['e', 'r'], explanation: 'Initial h omitted: loop "e" + upward curve "r"', path: 'M 8,30 a 3.5,3.5 0 1,0 0.1,0 Q 18,26 28,18', width: 36, height: 44, isBrief: false },
  play: { phonetic: 'p-l-a', strokes: ['p', 'l', 'a'], explanation: 'Downward curve "p" + long upward curve "l" with circle "a"', path: 'M 8,10 Q 4,20 8,30 Q 18,28 26,14 a 5,5 0 1,0 0.1,0', width: 38, height: 44, isBrief: false },
  run: { phonetic: 'r-u-n', strokes: ['r', 'u', 'n'], explanation: 'Upward curve "r" + hook "u" + horizontal line "n"', path: 'M 6,30 Q 14,26 20,18 Q 26,10 30,18 L 48,18', width: 54, height: 44, isBrief: false },
  move: { phonetic: 'm-u-v', strokes: ['m', 'u', 'v'], explanation: 'Line "m" + upward hook "u" + downward curve "v"', path: 'M 6,20 L 26,20 Q 32,12 36,20 Q 44,32 44,46', width: 50, height: 48, isBrief: false },
  live: { phonetic: 'l-e-v', strokes: ['l', 'e', 'v'], explanation: 'Long upward curve "l" + loop "e" + downward curve "v"', path: 'M 6,34 Q 18,32 26,18 a 3.5,3.5 0 1,0 0.1,0 Q 34,28 36,44', width: 44, height: 48, isBrief: false },
  believe: { phonetic: 'b-l-e-v', strokes: ['b', 'l', 'e', 'v'], explanation: 'Downward "b" + curve "l" + loop "e" + downward "v"', path: 'M 8,8 Q 16,18 16,28 Q 24,26 30,14 a 3,3 0 1,0 0.1,0 Q 38,24 40,38', width: 48, height: 46, isBrief: false },
  bring: { phonetic: 'b-r-ing', strokes: ['b', 'r', 'dot'], explanation: 'Downward "b" + curve "r" + detached -ing dot', path: 'M 8,8 Q 16,18 16,28 Q 24,24 32,16 M 38,14 a 2,2 0 1,0 0.1,0', width: 44, height: 44, isBrief: false },
  meet: { phonetic: 'm-e-t', strokes: ['m', 'e', 't'], explanation: 'Line "m" + loop "e" + upward slant "t"', path: 'M 6,24 L 26,24 a 3,3 0 1,0 0.1,0 L 36,10', width: 42, height: 44, isBrief: false },
  meeting: { phonetic: 'm-e-t-ing', strokes: ['m', 'e', 't', 'dot'], explanation: '"meet" with detached -ing dot', path: 'M 6,24 L 26,24 a 3,3 0 1,0 0.1,0 L 34,10 M 40,8 a 2,2 0 1,0 0.1,0', width: 46, height: 44, isBrief: false },
  pay: { phonetic: 'p-a', strokes: ['p', 'a'], explanation: 'Downward curve "p" with large circle "a"', path: 'M 8,10 Q 4,20 8,30 a 5,5 0 1,0 0.1,0', width: 32, height: 44, isBrief: false },
  payment: { phonetic: 'p-a-m', strokes: ['p', 'a', 'm'], explanation: '"pay" + suffix -ment "m"', path: 'M 8,10 Q 4,20 8,30 a 5,5 0 1,0 0.1,0 L 36,30', width: 44, height: 44, isBrief: false },
  soon: { phonetic: 's-u-n', strokes: ['s', 'u', 'n'], explanation: 'Comma "s" + hook "u" + line "n"', path: 'M 6,26 Q 12,22 12,28 Q 18,20 22,28 L 40,28', width: 46, height: 44, isBrief: true },
};

// ============================================================================
// 3. CONTINUOUS VECTOR STROKE COMPILER (Geometric Gregg Penmanship Math)
// ============================================================================

export function buildContinuousGreggOutline(cleanWord: string, phonetic: string): { path: string; width: number; height: number; strokes: string[] } {
  const lower = cleanWord.toLowerCase().trim();

  // 1. Direct hit in Official Diamond Jubilee Brief Forms Dictionary
  if (DIAMOND_JUBILEE_BRIEFS[lower]) {
    const entry = DIAMOND_JUBILEE_BRIEFS[lower];
    return {
      path: entry.path,
      width: entry.width,
      height: entry.height,
      strokes: entry.strokes,
    };
  }

  // 2. Direct hit in Official Diamond Jubilee Standards Dictionary
  if (DIAMOND_JUBILEE_STANDARDS[lower]) {
    const entry = DIAMOND_JUBILEE_STANDARDS[lower];
    return {
      path: entry.path,
      width: entry.width,
      height: entry.height,
      strokes: entry.strokes,
    };
  }

  // 3. Procedural Compilation using Diamond Jubilee Geometric Penmanship Rules
  const sounds = phonetic.split('-').filter(Boolean);
  const strokes: string[] = [];

  let cx = 10;
  let cy = 26;
  let path = `M ${cx},${cy} `;
  let hasDetachedIng = false;

  for (let i = 0; i < sounds.length; i++) {
    const s = sounds[i];
    strokes.push(s);

    switch (s) {
      // Consonants: Shallow horizontal curves
      case 'k':
        path += `Q ${cx + 10},${cy - 8} ${cx + 20},${cy} `;
        cx += 20;
        break;
      case 'g':
      case 'gay':
        path += `Q ${cx + 16},${cy - 12} ${cx + 32},${cy} `;
        cx += 32;
        break;

      // Consonants: Horizontal straight lines (N is short, M is long)
      case 'n':
        path += `L ${cx + 16},${cy} `;
        cx += 16;
        break;
      case 'm':
        path += `L ${cx + 30},${cy} `;
        cx += 30;
        break;

      // Consonants: Upward straight slants (T is short, D is long)
      case 't':
        path += `L ${cx + 6},${cy - 14} `;
        cx += 6;
        cy -= 14;
        break;
      case 'd':
        path += `L ${cx + 12},${cy - 26} `;
        cx += 12;
        cy -= 26;
        break;

      // Consonants: Upward shallow curves (R is short, L is long)
      case 'r':
        path += `Q ${cx + 8},${cy - 2} ${cx + 16},${cy - 8} `;
        cx += 16;
        cy -= 8;
        break;
      case 'l':
        path += `Q ${cx + 14},${cy - 4} ${cx + 28},${cy - 16} `;
        cx += 28;
        cy -= 16;
        break;

      // Consonants: Downward curves concave to left (P is short, B is long)
      case 'p':
        path += `Q ${cx - 5},${cy + 8} ${cx + 3},${cy + 16} `;
        cx += 3;
        cy += 16;
        break;
      case 'b':
        path += `Q ${cx - 8},${cy + 14} ${cx + 6},${cy + 28} `;
        cx += 6;
        cy += 28;
        break;

      // Consonants: Downward curves concave to right (F is short, V is long)
      case 'f':
        path += `Q ${cx + 6},${cy + 8} ${cx + 12},${cy + 18} `;
        cx += 12;
        cy += 18;
        break;
      case 'v':
        path += `Q ${cx + 8},${cy + 12} ${cx + 16},${cy + 28} `;
        cx += 16;
        cy += 28;
        break;

      // Downward straight slants (SH is short, CH is medium, J is long)
      case 'sh':
        path += `L ${cx + 6},${cy + 14} `;
        cx += 6;
        cy += 14;
        break;
      case 'ch':
        path += `L ${cx + 10},${cy + 22} `;
        cx += 10;
        cy += 22;
        break;
      case 'j':
        path += `L ${cx + 12},${cy + 30} `;
        cx += 12;
        cy += 30;
        break;

      // S & Z: small right comma curve
      case 's':
      case 'z':
        path += `Q ${cx + 6},${cy - 4} ${cx + 6},${cy + 4} Q ${cx + 4},${cy + 8} ${cx},${cy + 6} `;
        cx += 6;
        cy += 4;
        break;

      // TH: short steep downward curve
      case 'th':
        path += `Q ${cx + 4},${cy + 6} ${cx + 8},${cy + 14} `;
        cx += 8;
        cy += 14;
        break;

      // Vowels: Circles
      case 'a':
      case 'ai':
      case 'ay':
        // Large circle (loop radius ~5)
        path += `a 5,5 0 1,0 0.1,0 `;
        cx += 8;
        break;

      case 'e':
      case 'i':
      case 'ee':
        // Tiny circle (loop radius ~3)
        path += `a 3,3 0 1,0 0.1,0 `;
        cx += 5;
        break;

      // Vowels: Hooks
      case 'o':
      case 'aw':
        // Downward under-hook
        path += `Q ${cx + 4},${cy + 8} ${cx + 8},${cy} `;
        cx += 8;
        break;

      case 'u':
      case 'oo':
        // Upward over-hook
        path += `Q ${cx + 4},${cy - 8} ${cx + 8},${cy} `;
        cx += 8;
        break;

      case 'w':
        path += `Q ${cx + 4},${cy - 6} ${cx + 8},${cy} `;
        cx += 8;
        break;

      // Blends & Suffixes
      case 'ted':
      case 'ded':
        // Upward loop blend
        path += `L ${cx + 6},${cy - 16} a 3,3 0 1,0 0.1,0 L ${cx + 12},${cy - 24} `;
        cx += 12;
        cy -= 24;
        break;

      case 'ing':
        hasDetachedIng = true;
        break;

      case 'ment':
        path += `L ${cx + 26},${cy} `;
        cx += 26;
        break;

      case 'tion':
      case 'sion':
        path += `Q ${cx + 4},${cy + 8} ${cx + 8},${cy + 16} `;
        cx += 8;
        cy += 16;
        break;

      default:
        // Default connecting stroke
        path += `L ${cx + 6},${cy} `;
        cx += 6;
        break;
    }
  }

  // If -ing suffix present, append detached dot
  if (hasDetachedIng) {
    path += `M ${cx + 4},${cy - 4} a 2,2 0 1,0 0.1,0 `;
    cx += 10;
  }

  const finalWidth = Math.max(cx + 12, 36);
  const finalHeight = 48;

  return {
    path,
    width: finalWidth,
    height: finalHeight,
    strokes,
  };
}

// ============================================================================
// 4. PHONETIC REDUCTION & RULE APPLIER (1963 Diamond Jubilee Orthography)
// ============================================================================

export function phoneticallyReduceGreggWord(rawWord: string): {
  cleanWord: string;
  phonetic: string;
  isBrief: boolean;
  briefExplanation: string | null;
  ruleNotes: string;
  silentOmissions: number;
} {
  const clean = rawWord.toLowerCase().replace(/[^a-z]/g, '');

  // 1. Check if word is an Official Diamond Jubilee Brief Form
  if (DIAMOND_JUBILEE_BRIEFS[clean]) {
    const brief = DIAMOND_JUBILEE_BRIEFS[clean];
    return {
      cleanWord: clean,
      phonetic: brief.phonetic,
      isBrief: true,
      briefExplanation: brief.explanation,
      ruleNotes: 'Official Diamond Jubilee (1963) Brief Form',
      silentOmissions: Math.max(0, clean.length - brief.strokes.length),
    };
  }

  // 2. Check if word is in Official Standard Outlines Dictionary
  if (DIAMOND_JUBILEE_STANDARDS[clean]) {
    const std = DIAMOND_JUBILEE_STANDARDS[clean];
    return {
      cleanWord: clean,
      phonetic: std.phonetic,
      isBrief: false,
      briefExplanation: null,
      ruleNotes: std.explanation,
      silentOmissions: Math.max(0, clean.length - std.strokes.length),
    };
  }

  // 3. Apply Diamond Jubilee Orthographic Rules
  let p = clean;
  let omitted = 0;
  const notes: string[] = [];

  // Rule A: Initial Silent Consonants
  if (p.startsWith('kn')) {
    p = 'n' + p.slice(2);
    omitted += 1;
    notes.push("Initial silent 'k' omitted (kn -> n)");
  } else if (p.startsWith('wr')) {
    p = 'r' + p.slice(2);
    omitted += 1;
    notes.push("Initial silent 'w' omitted (wr -> r)");
  } else if (p.startsWith('gn')) {
    p = 'n' + p.slice(2);
    omitted += 1;
    notes.push("Initial silent 'g' omitted (gn -> n)");
  } else if (p.startsWith('ps')) {
    p = 's' + p.slice(2);
    omitted += 1;
    notes.push("Initial silent 'p' omitted (ps -> s)");
  }

  // Rule B: Silent GH / GHT / OUGHT
  if (p.includes('ought') || p.includes('aught')) {
    p = p.replace(/ought|aught/g, 'ot');
    omitted += 3;
    notes.push("'-ought/-aught' reduced phonetically to 'ot'");
  } else if (p.includes('ight')) {
    p = p.replace(/ight/g, 'it');
    omitted += 2;
    notes.push("Silent 'gh' omitted in '-ight'");
  } else if (p.includes('gh')) {
    p = p.replace(/gh/g, '');
    omitted += 2;
    notes.push("Silent 'gh' omitted");
  }

  // Rule C: Digraphs & Consonant blends
  if (p.includes('ph')) {
    p = p.replace(/ph/g, 'f');
    omitted += 1;
    notes.push("'ph' sounded as 'f'");
  }
  if (p.includes('ck')) {
    p = p.replace(/ck/g, 'k');
    omitted += 1;
    notes.push("Consonant 'ck' written as 'k'");
  }
  if (p.includes('tion') || p.includes('sion')) {
    p = p.replace(/tion|sion/g, 'sh-n');
    notes.push("Suffix '-tion/-sion' written as 'sh-n'");
  }

  // Rule D: Suffixes (-ing, -ment, -ted, -ded)
  if (p.endsWith('ing')) {
    p = p.slice(0, -3) + '-ing';
    notes.push("Terminal '-ing' indicated with a detached dot");
  } else if (p.endsWith('ment')) {
    p = p.slice(0, -4) + '-ment';
    notes.push("Suffix '-ment' written with 'm' stroke");
  } else if (p.endsWith('ted') || p.endsWith('ded')) {
    p = p.slice(0, -3) + '-ted';
    notes.push("Joined with Diamond Jubilee '-ted/-ded' upward loop blend");
  }

  // Rule E: Omit Silent Final 'e'
  if (p.endsWith('e') && p.length > 2 && !['he', 'me', 'we', 'be', 'she', 'the'].includes(p)) {
    p = p.slice(0, -1);
    omitted += 1;
    notes.push("Silent final 'e' omitted");
  }

  // Break remaining word into phonetic Gregg stroke array
  const strokeArray: string[] = [];
  let idx = 0;
  while (idx < p.length) {
    if (p.slice(idx).startsWith('-ing')) {
      strokeArray.push('ing');
      idx += 4;
      continue;
    }
    if (p.slice(idx).startsWith('-ment')) {
      strokeArray.push('ment');
      idx += 5;
      continue;
    }
    if (p.slice(idx).startsWith('-ted')) {
      strokeArray.push('ted');
      idx += 4;
      continue;
    }
    const pair = p.slice(idx, idx + 2);
    if (['th', 'sh', 'ch', 'ng', 'wh'].includes(pair)) {
      strokeArray.push(pair);
      idx += 2;
    } else {
      if (p[idx] !== '-') {
        strokeArray.push(p[idx]);
      }
      idx += 1;
    }
  }

  return {
    cleanWord: clean || rawWord,
    phonetic: strokeArray.join('-'),
    isBrief: false,
    briefExplanation: null,
    ruleNotes: notes.length > 0 ? notes.join('; ') : 'Phonetic Diamond Jubilee transcription',
    silentOmissions: omitted,
  };
}

// ============================================================================
// 5. MASTER TRANSLATOR ENTRY POINT
// ============================================================================

export function translateTextToGregg(rawText: string): GreggTranslationResult {
  const wordsTokens = rawText.trim().split(/\s+/).filter(Boolean);
  let briefCount = 0;
  let silentCount = 0;

  const words: GreggWord[] = wordsTokens.map((token) => {
    // Preserve clean alphabetic core for dictionary & phonetics, but retain punctuation
    const clean = token.replace(/[^a-zA-Z]/g, '');
    const reduction = phoneticallyReduceGreggWord(clean || token);
    const outline = buildContinuousGreggOutline(clean || token, reduction.phonetic);

    if (reduction.isBrief) {
      briefCount++;
    }
    silentCount += reduction.silentOmissions;

    return {
      word: token,
      cleanWord: clean || token,
      phonetic: reduction.phonetic,
      strokes: outline.strokes,
      isBrief: reduction.isBrief,
      briefExplanation: reduction.briefExplanation,
      ruleNotes: reduction.ruleNotes,
      svgPath: outline.path,
      svgWidth: outline.width,
      svgHeight: outline.height,
    };
  });

  const fullPhonetic = words.map((w) => w.phonetic).join(' ');

  return {
    originalText: rawText,
    phoneticFull: fullPhonetic,
    summary: `Transcribed ${words.length} outlines according to official Gregg Shorthand Diamond Jubilee (1963) standards. Identified ${briefCount} official brief forms and applied strict phonetic reduction.`,
    words,
    stats: {
      totalWords: words.length,
      briefFormsCount: briefCount,
      silentLettersOmittedCount: silentCount,
      estimatedShorthandSpeedWpm: Math.min(160, Math.round(words.length > 0 ? 120 + briefCount * 2 : 120)),
    },
  };
}

// ============================================================================
// 6. GREGG ALPHABET REFERENCE DATA (Lessons 1-12 of DJ Series)
// ============================================================================

export interface GreggAlphabetItem {
  character: string;
  name: string;
  type: 'consonant' | 'vowel' | 'blend' | 'brief';
  description: string;
  example: string;
  svgPath: string;
}

export const GREGG_DJ_ALPHABET: GreggAlphabetItem[] = [
  // Consonants - Shallow Curves
  { character: 'K', name: 'Kay', type: 'consonant', description: 'Short shallow horizontal curve (1/2 length of G)', example: 'can, keep', svgPath: 'M 4,20 Q 14,12 24,20' },
  { character: 'G', name: 'Gay', type: 'consonant', description: 'Long shallow horizontal curve (double length of K)', example: 'go, game', svgPath: 'M 4,20 Q 20,8 36,20' },
  { character: 'R', name: 'Ray', type: 'consonant', description: 'Short upward shallow curve (1/2 length of L)', example: 'are, run', svgPath: 'M 6,26 Q 14,24 22,14' },
  { character: 'L', name: 'El', type: 'consonant', description: 'Long upward shallow curve (double length of R)', example: 'will, look', svgPath: 'M 4,32 Q 18,30 32,8' },

  // Consonants - Straight Lines
  { character: 'N', name: 'En', type: 'consonant', description: 'Short horizontal straight line (1/2 length of M)', example: 'in, not', svgPath: 'M 4,20 L 22,20' },
  { character: 'M', name: 'Em', type: 'consonant', description: 'Long horizontal straight line (double length of N)', example: 'me, make', svgPath: 'M 4,20 L 36,20' },
  { character: 'T', name: 'Tee', type: 'consonant', description: 'Short straight upward slant at 60° (1/2 length of D)', example: 'to, time', svgPath: 'M 10,28 L 16,10' },
  { character: 'D', name: 'Dee', type: 'consonant', description: 'Long straight upward slant at 60° (double length of T)', example: 'day, dear', svgPath: 'M 8,34 L 18,6' },

  // Consonants - Downward Lines & Curves
  { character: 'P', name: 'Pee', type: 'consonant', description: 'Short downward curve concave to left (1/2 length of B)', example: 'part, please', svgPath: 'M 14,6 Q 6,18 10,28' },
  { character: 'B', name: 'Bee', type: 'consonant', description: 'Long downward curve concave to left (double length of P)', example: 'be, but', svgPath: 'M 16,6 Q 6,22 10,36' },
  { character: 'F', name: 'Ef', type: 'consonant', description: 'Short downward curve concave to right (1/2 length of V)', example: 'for, from', svgPath: 'M 8,8 Q 16,18 20,28' },
  { character: 'V', name: 'Vee', type: 'consonant', description: 'Long downward curve concave to right (double length of F)', example: 'have, very', svgPath: 'M 8,6 Q 18,22 22,36' },

  // Consonants - Downward Slants
  { character: 'SH', name: 'Ish', type: 'consonant', description: 'Short downward straight slant at 45°', example: 'she, wish', svgPath: 'M 8,10 L 16,26' },
  { character: 'CH', name: 'Chay', type: 'consonant', description: 'Medium downward straight slant at 45°', example: 'which, change', svgPath: 'M 6,8 L 18,30' },
  { character: 'J', name: 'Jay', type: 'consonant', description: 'Long downward straight slant at 45°', example: 'judge, jury', svgPath: 'M 6,6 L 20,36' },

  // S, Z, TH
  { character: 'S / Z', name: 'Ess', type: 'consonant', description: 'Small comma curve written to the right or left', example: 'is, his, as', svgPath: 'M 10,14 Q 16,10 16,18 Q 14,24 10,22' },
  { character: 'TH', name: 'Ith', type: 'consonant', description: 'Short steep downward curve', example: 'that, thank', svgPath: 'M 8,10 Q 14,18 18,28' },

  // Vowels
  { character: 'A', name: 'Large Circle', type: 'vowel', description: 'Large circle loop for a / ah / ai sounds', example: 'day, make, say', svgPath: 'M 14,18 a 6,6 0 1,0 0.1,0' },
  { character: 'E', name: 'Tiny Circle', type: 'vowel', description: 'Tiny circle loop for e / ee / i sounds', example: 'he, see, me', svgPath: 'M 14,18 a 3.5,3.5 0 1,0 0.1,0' },
  { character: 'O', name: 'O-Hook', type: 'vowel', description: 'Downward under-hook for o / aw sounds', example: 'on, of, all', svgPath: 'M 8,16 Q 14,24 20,16' },
  { character: 'U', name: 'U-Hook', type: 'vowel', description: 'Upward over-hook for u / oo sounds', example: 'you, your, put', svgPath: 'M 8,22 Q 14,14 20,22' },

  // Blends & Special Signs
  { character: '·', name: 'Dot', type: 'brief', description: 'Dot on the line for "the" / "a" and detached for "-ing"', example: 'the, a, doing', svgPath: 'M 14,20 a 2.5,2.5 0 1,0 0.1,0' },
  { character: '-TED', name: 'Ted Blend', type: 'blend', description: 'Continuous upward loop blend for -ted and -ded', example: 'started, needed', svgPath: 'M 8,32 L 14,12 Q 18,8 16,18' },
  { character: '-MEN', name: 'Men Blend', type: 'blend', description: 'Smooth continuous line joining M and N', example: 'mention, movement', svgPath: 'M 4,20 L 22,20 L 34,20' },
];
