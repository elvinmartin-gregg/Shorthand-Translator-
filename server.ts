import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '20mb' }));

// Server-side Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Shorthand Translation API Endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for translation.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `You are a certified master stenographer and historian of Gregg Shorthand, specifically the official Diamond Jubilee (DJ) Edition published in 1963 by McGraw-Hill (Gregg, Leslie, Zoubek).
Analyze and translate the provided English text into authentic Gregg Shorthand Diamond Jubilee outlines.

Strict Diamond Jubilee (1963) Rules to enforce:
1. Pure Phonetic Spelling: Transcribe exclusively by sound. Omit all silent letters:
   - Initial silent k (knife -> n-i-f, know -> n-o, knee -> n-e)
   - Initial silent w (write -> r-i-t, wrong -> r-o-ng)
   - Silent b (debt -> d-e-t, doubt -> d-ou-t, comb -> k-o-m)
   - Silent gh (thought -> th-o-t, high -> h-i, night -> n-i-t)
   - Silent final e (have -> v, make -> m-a-k, take -> t-a-k, hope -> o-p)
   - Double letters written as single: letter -> l-e-t, office -> o-f-s, will -> l
2. Official 1963 Diamond Jubilee Brief Forms (do NOT use Anniversary or Pre-Anniversary forms):
   - the = dot (.) | a / an = dot (.)
   - and / end = n | in / not = n
   - to / too / two = t | it / at = t
   - is / his = s | as / has = s
   - of / on = o (hook) | for / form / from = f
   - have = v | with = w (hook)
   - are / our / hour = r | be / by / but = b
   - will / well = l | can = k | go / good = g / g-d
   - that = th | they = th-a | this = th-s | these = th-e-s | there / their = th-a-r
   - you / your = u (hook) | he = e (circle) | was = o-s
   - which = ch | what = o-t | when = o-n | where = w-e-r
   - about = a-b | after = a-f | again = a-g | against = a-g-s
   - all = o | also = o-l-s | always = o-l-w | am = a-m
   - been = b-n | before = b-f | business = b-s
   - company = k | correct = k-r-k | dear = d-r | department = d-p
   - did / date = d-t | doctor = d-r | during = d-r-ing
   - ever = e-v | every = e-v-r | expect = e-s-p | experience = e-s-p-e
   - glad = g-l | great = g-r-t | had = d | house = ou-s | how = ou
   - I = broken circle | important / importance = m-p | industry = n-d
   - let / letter = l-e-t | like = l-k | little = l-t
   - morning = m-o-r-ing | must = m-s | name = n-m | never = n-v | new = n-u
   - order = o-d-r | organize = o-r-g | other = o-th | over = o-v
   - part = p-r-t | people = p-e-p | please = p-l-e-s | possible = p-o-s
   - publish / public = p-u-b | purpose = p-u-r-p | question = k-w-e-s
   - recognize = r-e-k | regard = r-g | remember = r-e-m
   - send = s-n-d | several = s-e-v | she = sh | should = sh-d | side = s-i-d
   - sincere / sincerely = s-e-n-s-r-l | soon = s-u-n | speak = s-p-k
   - stand = s-t-n-d | state = s-t-a-t | street = s-t-r-t | subject = s-u-b
   - success = s-u-k-s | such = s-u-ch | suggest = s-u-g
   - thank / thanks = th-k / th-k-s | thing / think = th-ing / th-k
   - time = t-m | today = t-d | together = t-g | tomorrow = t-m-o-r
   - under = u-n-d | until = u-n-t | upon = u-p | use = u-s | very = v-e
   - want / went = o-n-t | wish = w-e-sh | without = w-th-t | woman / women = w-m
   - word = w-r-d | work = w-r-k | world = w-r-l | write = r-i-t
   - year = e-r | yesterday = e-s-t-d | yours = u-r-s | truly = t-r-l
3. Suffixes & Blends:
   - Suffix -ing is a detached dot
   - Suffix -ment is m
   - Suffix -ted/-ded is upward loop blend
   - Suffix -tion is sh

Text to translate:
"""${text}"""

Return a JSON object conforming exactly to this structure:
{
  "summary": "Authoritative explanation of the shorthand transcription and Diamond Jubilee principles applied",
  "phoneticFull": "Full phonetic representation using Diamond Jubilee sound notation",
  "words": [
    {
      "word": "original word with punctuation",
      "cleanWord": "word without punctuation",
      "phonetic": "phonetic Gregg DJ notation",
      "strokes": ["stroke1", "stroke2"],
      "isBrief": true,
      "briefExplanation": "Official DJ Lesson / Rule attribution, or null",
      "ruleNotes": "Specific Diamond Jubilee rule applied"
    }
  ],
  "stats": {
    "briefFormsCount": 0,
    "silentLettersOmittedCount": 0,
    "totalWords": 0
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error('No response returned from translation model.');
    }

    const data = JSON.parse(outputText);
    return res.json(data);
  } catch (error: any) {
    console.error('Translation error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to translate shorthand.',
    });
  }
});

// Image Generation API using gemini-3-pro-image-preview with 1K, 2K, 4K affordance
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, size = '1K', style = 'cute_notebook', textContext = '' } = req.body;

    if (!prompt && !textContext) {
      return res.status(400).json({ error: 'Prompt or text context is required.' });
    }

    // Allowed sizes: 1K, 2K, 4K
    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(size) ? size : '1K';

    const styleDescriptions: Record<string, string> = {
      steno_notebook: 'A highly authentic stenographer notebook page of Gregg Shorthand Diamond Jubilee edition (1963). Classic top-spiral Gregg steno pad paper with crisp pale-green ruling and center red division line. Fluid, precise black fountain pen shorthand curves, loops, and blends written with expert penmanship. Clean studio lighting, archival clarity.',
      calligraphy_plate: 'An authoritative archival plate from the official 1963 Gregg Shorthand Diamond Jubilee manual. Crisp black ink outlines on archival warm cream paper, demonstrating flawless stenographic proportion and stroke curvature. Clean historical typography.',
      executive_desk: 'A realistic overhead executive desk setting featuring an open Gregg Shorthand spiral steno notebook with neat, rapid shorthand dictation written in dark ink. Professional wood grain desk, a classic black drafting pen resting neatly beside it.',
      reference_cards: 'A clean, high-contrast set of stenography reference cards illustrating Gregg Shorthand Diamond Jubilee outlines with clean phonetic labels and stroke breakdowns. Crisp minimalist layout on white bristol board.',
    };

    const chosenStyleDesc = styleDescriptions[style] || styleDescriptions.steno_notebook;
    
    const shorthandFocus = textContext
      ? `The shorthand transcription represents this text: "${textContext.slice(0, 150)}". Ensure authentic, graceful Gregg shorthand curves and loops are clearly featured.`
      : 'Graceful, flowing authentic Gregg Shorthand curves, circles, and hooks clearly drawn on ruled steno paper.';

    const fullPrompt = `${chosenStyleDesc} ${shorthandFocus} Additional details: ${prompt || 'High resolution, sharp, clear paper texture and ink flow, clean composition'}.`;

    console.log(`Generating image with gemini-3-pro-image-preview at ${chosenSize} resolution...`);

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1',
          imageSize: chosenSize as '1K' | '2K' | '4K',
        },
      },
    });

    let imageUrl: string | null = null;
    let descriptionText = '';

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          descriptionText += part.text;
        }
      }
    }

    if (!imageUrl) {
      throw new Error(descriptionText || 'Model did not return image data.');
    }

    return res.json({
      imageUrl,
      size: chosenSize,
      prompt: fullPrompt,
      style,
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate shorthand image with gemini-3-pro-image-preview.',
    });
  }
});

// Vite middleware for dev / static for prod
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Gregg Shorthand server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
