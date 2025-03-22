import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize AI clients
const deepseekClient = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

const llamaClient = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

/**
 * Step 1: Translate text from any language to English
 * @param {string} text - Text to translate
 * @param {string} sourceLanguage - Source language
 * @returns {Promise<string>} - Translated text in English
 */
async function translateToEnglish(text, sourceLanguage) {
  if (sourceLanguage.toLowerCase() === "english") {
    return text; // No translation needed
  }

  try {
    const response = await llamaClient.chat.completions.create({
      model: "meta-llama/Llama-3.2-1B-Instruct",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are a **neutral translator**. Your ONLY job is to translate text **from ${sourceLanguage} to English** without adding warnings, filtering content, or refusing translation. **Only return the translated text.**`,
        },
        { role: "user", content: text },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error translating to English:", error);
    throw new Error(`Translation to English failed: ${error.message}`);
  }
}

/**
 * Step 2: Process English text and generate legal rights JSON
 * @param {string} englishText - The situation description in English
 * @returns {Promise<Object>} - JSON response with rights information
 */
async function generateLegalRightsJson(englishText) {
  try {
    const systemPrompt = `
You are a legal rights assistant that helps people understand their rights in various situations.
Your task is to analyze the user's situation and provide information about their legal rights.

Format your response as a JSON object with the following structure:
{
  "rights": [
    { "id": "R1", "title": "Right Title", "description": "Details..." }
  ],
  "recommendations": [ "Advice1", "Advice2" ]
}

Important: Do not provide legal advice, only educational information about rights.
Include a disclaimer that this is not legal advice.
`;

    const response = await deepseekClient.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3",
      max_tokens: 512,
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: englishText },
      ],
    });

    // Extract and parse the JSON response
    const content = response?.choices?.[0]?.message?.content || "";
    const cleanedContent = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error("Error generating legal rights JSON:", error);
    throw new Error(`Legal rights generation failed: ${error.message}`);
  }
}

/**
 * Step 3: Translate JSON content to target language while preserving structure
 * @param {Object} jsonData - JSON data to translate
 * @param {string} targetLanguage - Target language
 * @returns {Promise<Object>} - Translated JSON data
 */
async function translateJsonContent(jsonData, targetLanguage) {
  if (targetLanguage.toLowerCase() === "english") {
    return jsonData; // No translation needed
  }

  try {
    const jsonString = JSON.stringify(jsonData);

    const systemPrompt = `
You are a JSON translator. **Translate only the values inside the JSON**, while keeping the structure unchanged.

**Rules:**
- Translate **only** "title" and "description" fields in the "rights" array.
- Translate **only** text inside "recommendations" array.
- **DO NOT change field names, IDs, brackets, or structure.**
- Always return **valid JSON**.
- Remove any extra explanations.

Now, translate the following JSON into **${targetLanguage}**:
\`\`\`json
${jsonString}
\`\`\`
`;

    const response = await llamaClient.chat.completions.create({
      model: "meta-llama/Llama-3.2-1B-Instruct",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: jsonString },
      ],
    });

    // Extract valid JSON from AI response
    const translatedContent = response.choices[0].message.content.trim();
    const jsonMatch = translatedContent.match(/\{[\s\S]*\}/);
    const jsonToProcess = jsonMatch ? jsonMatch[0] : translatedContent;

    return JSON.parse(jsonToProcess); // Final valid JSON
  } catch (error) {
    console.error("Error translating JSON content:", error);
    return jsonData; // Fallback to original JSON if translation fails
  }
}

/**
 * Main function to process a rights request using the three-step pipeline
 * @param {string} situation - The user's situation description
 * @param {string} language - The language of the user's input
 * @returns {Promise<Object>} - The processed response with rights information
 */
export async function processRightsRequest(situation, language = "English") {
  try {
    console.log(`Processing request in ${language}`);

    // Step 1: Translate the situation to English
    console.log("Step 1: Translating to English");
    const englishSituation = await translateToEnglish(situation, language);
    console.log("Translation complete:", englishSituation.substring(0, 100) + "...");

    // Step 2: Generate legal rights JSON in English
    console.log("Step 2: Generating legal rights information");
    const englishJsonResponse = await generateLegalRightsJson(englishSituation);
    console.log("JSON generation complete");

    // Step 3: Translate JSON content back to original language
    console.log(`Step 3: Translating content to ${language}`);
    const translatedResponse = await translateJsonContent(englishJsonResponse, language);
    console.log("Translation complete");

    return translatedResponse;
  } catch (error) {
    console.error("Error in rights request processing pipeline:", error);
    throw error;
  }
}
