import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
export const generateProjectDescription = async (title: string, tech: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing");
    return "API Key is missing. Please check your configuration.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Write a compelling, professional, and exciting project description for a game portfolio.
      Game Title: ${title}
      Technologies Used: ${tech}
      Target Audience: Gamers and Tech Recruiters.
      Tone: Professional, Innovative, Passionate.
      Length: About 2-3 sentences max.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const generateBio = async (experience: number, specialty: string): Promise<string> => {
    if (!process.env.API_KEY) return "API Key missing.";

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Write a short, punchy 'About Me' section for a game developer portfolio.
        Name: Elyazid Azri
        Experience: ${experience} years
        Specialty: ${specialty}
        Tone: Modern, confident, accessible. Max 50 words.`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt
        });

        return response.text || "Could not generate bio.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error generating bio.";
    }
}

export const generateProjectImage = async (prompt: string): Promise<string | null> => {
  if (!process.env.API_KEY) {
      console.warn("API Key missing");
      return null;
  }

  try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
              parts: [{ text: `A high quality, cinematic screenshot of a video game. Style: Cyberpunk/Sci-fi/Fantasy (depending on context). Context: ${prompt}` }]
          },
          config: {
              imageConfig: {
                  aspectRatio: "16:9",
              }
          }
      });

      // Iterate through parts to find the image
      if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                  return `data:image/png;base64,${part.inlineData.data}`;
              }
          }
      }
      return null;
  } catch (error) {
      console.error("Gemini Image Gen Error:", error);
      return null;
  }
};
