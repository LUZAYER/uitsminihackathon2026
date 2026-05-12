import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ForensicResult {
  trustScore: number;
  verdict: string;
  summary: string;
  artifacts: {
    type: string;
    description: string;
    confidence: number;
    coordinates?: string;
  }[];
  explanation: string;
}

export const analyzeMedia = async (
  fileData: string, // base64
  mimeType: string,
  analysisType: "image" | "video" | "audio"
): Promise<ForensicResult> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    You are a world-class senior AI cyber-forensics analyst. 
    Analyze the provided ${analysisType} and determine if it is AI-generated, manipulated, or authentic.
    
    CRITICAL: You must provide a highly technical, evidence-based decomposition.
    Do NOT just say "real" or "fake". Explain artifacts like GAN-signatures, diffusion inconsistencies, 
    chromatic Aberration, metadata poisoning, neural vocoder artifacts, or lip-sync desync.
    
    Output MUST be in JSON format matching the schema provided.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { data: fileData, mimeType } }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          trustScore: { type: Type.NUMBER, description: "Authenticity score 0-100." },
          verdict: { type: Type.STRING, description: "Classification: Authentic, Likely Authentic, Suspicious, Manipulated, AI-Generated, High-Risk." },
          summary: { type: Type.STRING, description: "One-sentence executive summary." },
          artifacts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                description: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                coordinates: { type: Type.STRING, description: "Normalized coordinates or timestamp if applicable." }
              },
              required: ["type", "description", "confidence"]
            }
          },
          explanation: { type: Type.STRING, description: "Detailed investigative breakdown." }
        },
        required: ["trustScore", "verdict", "summary", "artifacts", "explanation"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Empty response from AI Analyst");
  }

  return JSON.parse(response.text.trim());
};

export const runFollowUpChat = async (
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  userMessage: string,
  fileData?: string,
  mimeType?: string
) => {
  const model = ai.models.get("gemini-3-flash-preview");
  const chat = model.startChat({
    history,
  });

  const parts: any[] = [{ text: userMessage }];
  if (fileData && mimeType) {
    parts.push({ inlineData: { data: fileData, mimeType } });
  }

  const result = await chat.sendMessage(parts);
  return result.response.text();
};
