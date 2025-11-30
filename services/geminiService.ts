import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ChatMessage, StudyPlanItem, QuizQuestion } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_FLASH = 'gemini-2.5-flash';

// Helper to convert File to Base64 for Gemini
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const chatWithTutor = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: MODEL_FLASH,
      history: formattedHistory,
      config: {
        systemInstruction: "You are ZIVO, a friendly and intelligent AI tutor for students. Explain concepts simply, use examples, and be encouraging. If asked about diagrams, describe them in detail or use ASCII art if appropriate.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Tutor Error:", error);
    return "Sorry, I encountered an error connecting to ZIVO servers. Please check your connection.";
  }
};

export const generateNotes = async (topic: string, file?: File): Promise<string> => {
  try {
    let contents: any[] = [];
    
    if (file) {
      const imagePart = await fileToGenerativePart(file);
      contents = [
        { role: 'user', parts: [imagePart, { text: `Create comprehensive study notes based on this image. Include a summary, key points (bullet points), and a glossary of terms. Format with Markdown.` }] }
      ];
    } else {
      contents = [
        { role: 'user', parts: [{ text: `Create comprehensive study notes for the topic: "${topic}". Include a summary, key points (bullet points), and a glossary of terms. Format with Markdown.` }] }
      ];
    }

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: contents,
    });

    return response.text || "Could not generate notes.";
  } catch (error) {
    console.error("Notes Error:", error);
    throw error;
  }
};

export const generateStudyPlan = async (subjects: string, hours: number, difficulty: string): Promise<StudyPlanItem[]> => {
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        day: { type: Type.STRING },
        subject: { type: Type.STRING },
        topic: { type: Type.STRING },
        duration: { type: Type.STRING },
        activity: { type: Type.STRING, enum: ['Study', 'Practice', 'Revision', 'Break'] },
      },
      required: ['day', 'subject', 'topic', 'duration', 'activity'],
    },
  };

  try {
    const prompt = `Create a 5-day study plan for a student focusing on these subjects: ${subjects}. 
    They have ${hours} hours available per day. The difficulty level they requested is: ${difficulty}.
    Ensure a mix of learning and revision.`;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as StudyPlanItem[];
  } catch (error) {
    console.error("Planner Error:", error);
    return [];
  }
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.INTEGER },
        question: { type: Type.STRING },
        options: { 
          type: Type.ARRAY,
          items: { type: Type.STRING } 
        },
        correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
        explanation: { type: Type.STRING },
      },
      required: ['id', 'question', 'options', 'correctAnswer', 'explanation'],
    }
  };

  try {
    const prompt = `Generate 5 multiple-choice questions about "${topic}" for a high school student. 
    Provide 4 options for each question.`;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as QuizQuestion[];
  } catch (error) {
    console.error("Quiz Error:", error);
    return [];
  }
};