import { NextResponse } from 'next/server';
import { generateMockAnalysis } from '@/lib/aiHelper';

export async function POST(request: Request) {
  try {
    const { input, modeId, apiKey } = await request.json();

    if (!input || !modeId) {
      return NextResponse.json({ error: 'Input and Mode ID are required.' }, { status: 400 });
    }

    // Determine if we should attempt a live OpenRouter/Gemini request
    const effectiveApiKey = apiKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

    if (effectiveApiKey) {
      // Assemble structured system prompt for viral content analysis
      const systemPrompt = `You are a professional TikTok and YouTube Shorts viral strategist.
Analyze the following transcript/dialogue or content metadata and output a JSON array representing the top 2 viral clips.
You MUST output raw JSON matching this schema exactly (do not output any conversational wrapper text, only the raw JSON):
{
  "viralScore": 92,
  "moments": [
    {
      "timestamp": "00:10 - 00:35",
      "duration": "25s",
      "viralScore": 94,
      "title": "A short descriptive name of this highlight moment",
      "hook": "An energetic, curiosity-inducing opening hook (max 12 words)",
      "rationale": "Detailed explanation of why this moment will capture viewer attention",
      "subtitleStyle": "Custom subtitle description style",
      "edits": [
        {"time": "00:02", "action": "Zoom-in", "description": "Quick frame focus adjustment"},
        {"time": "00:08", "action": "Sound Effect Drop", "description": "Trigger audio drop"}
      ],
      "sounds": ["Vine boom", "Retro click"],
      "subtitlePreview": "SAMPLE CAPTION TEXT GOES HERE"
    }
  ]
}`;

      // Call OpenRouter / Gemini API
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${effectiveApiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://clipmind.ai",
            "X-Title": "ClipMind AI"
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Analyze this content for ${modeId} Mode:\n\n${input}` }
            ],
            response_format: { type: "json_object" }
          })
        });

        if (response.ok) {
          const apiData = await response.json();
          const jsonText = apiData.choices?.[0]?.message?.content;
          if (jsonText) {
            const parsed = JSON.parse(jsonText);
            return NextResponse.json(parsed);
          }
        }
      } catch (e) {
        console.error("Live API route request failed, falling back to mock:", e);
      }
    }

    // Offline / Mock response fallback
    const mockData = generateMockAnalysis(input, modeId);
    return NextResponse.json(mockData);

  } catch (error: any) {
    console.error("Analyzer API error:", error);
    return NextResponse.json({ error: error.message || 'Server error occurred during analysis.' }, { status: 500 });
  }
}
