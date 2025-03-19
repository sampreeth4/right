import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    baseURL: "https://api.studio.nebius.com/v1/",
    apiKey: process.env.NEBIUS_API_KEY,
});

export async function processRightsRequest(situation) {
    try {
        const systemPrompt = `
          You are a legal rights assistant that helps people understand their rights in various situations.
          Your task is to analyze the user's situation and provide information about their legal rights.
          
          Format response as a JSON object:
          {
            "rights": [
              { "id": "R1", "title": "Right Title", "description": "Details..." }
            ],
            "recommendations": [ "Advice1", "Advice2" ]
          }
        `;

        const response = await client.chat.completions.create({
            model: "deepseek-ai/DeepSeek-V3",
            max_tokens: 512,
            temperature: 0.3,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: situation },
            ],
        });

        console.log("Full AI Response:", response);

        const content = response?.choices?.[0]?.message?.content || "";


        const cleanedContent = content.replace(/```json|```/g, "").trim();

        return JSON.parse(cleanedContent);
    } catch (error) {
        console.error("Error calling AI service:", error);
        throw error;
    }
}
