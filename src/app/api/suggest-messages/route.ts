import { google } from '@ai-sdk/google'; // Import the Google provider
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

// Ensure you have the @ai-sdk/google package installed:
// npm install @ai-sdk/google
// or
// yarn add @ai-sdk/google
// or
// pnpm add @ai-sdk/google

export async function GET() {


  
  try {
    // The Vercel AI SDK's Google provider automatically looks for
    // the GOOGLE_GENERATIVE_AI_API_KEY environment variable.
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'Google Generative AI API key not configured. Please set GOOGLE_GENERATIVE_AI_API_KEY.' },
        { status: 500 }
      );
    }

    // You can also get the prompt from the request body if needed
    // const { userPrompt } = await req.json();

    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const { text, usage, finishReason, logprobs, toolCalls, toolResults } = await generateText({
      // model: google('models/gemini-pro'), // Example: Using gemini-pro
      // model: google('models/gemini-1.0-pro'), // Another option
      model: google('models/gemini-1.5-flash-latest'), // Using the latest flash model for speed and capability
      prompt,
      // You can add other parameters here if needed, e.g.,
      // maxTokens: 100,
      temperature: 1,
    });

    // The 'text' variable will contain the generated content from Gemini.
    return NextResponse.json({ result: text });

  } catch (error) {
    console.error('Gemini API error:', error);
    // It's helpful to log the specific error for debugging
    let errorMessage = 'Error generating response from Gemini API.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage, details: error }, // Send more details for debugging if appropriate
      { status: 500 }
    );
  }
}