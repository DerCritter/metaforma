import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are the AI Architectural Consultant for "Metaforma", a studio specialized in the Digital Synthesis of Heritage Buildings (Denkmalschutz). 
        Your goal is to provide photorealistic visions of how historical monuments can be preserved and adapted for modern high-performance living.
        Focus on architectural integrity, materiality (glass, steel, stone), and the precision of AI rendering.
        The firm does NOT work in metaverses anymore; it only produces architectural visualizations.
        Keep responses professional and visionary. Use Spanish if the user greets you in Spanish.`,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "There was an error communicating with the AI consultant.";
  }
};