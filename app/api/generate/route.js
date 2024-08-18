import { NextResponse } from "next/server";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": str,
      "back": str
    }
  ]
}
`;

export async function POST(req) {
  const data = await req.text();

  try {
    // Make a POST request to OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}` // Ensure this is set in your environment variables
      },
      body: JSON.stringify({
        prompt: systemPrompt + "\n" + data, // Concatenate systemPrompt with the user data
        max_tokens: 1500, // Adjust based on expected response length
        model: "gpt-3.5-turbo" // Ensure this model is supported by OpenRouter
      })
    });

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API request failed:", errorText);
      return NextResponse.json({ error: 'Failed to fetch from OpenRouter API' }, { status: response.status });
    }

    // Parse the JSON response from the OpenRouter API
    const completion = await response.json();

    // Log the response for debugging
    console.log("API response:", completion);

    // Ensure 'choices' array and its first element are present
    if (!completion.choices || !completion.choices.length || !completion.choices[0].text) {
      return NextResponse.json({ error: 'Unexpected API response structure' }, { status: 500 });
    }

    // Parse the flashcards from the response
    let flashcards;
    try {
      flashcards = JSON.parse(completion.choices[0].text);
    } catch (error) {
      console.error("Failed to parse flashcards JSON:", error);
      return NextResponse.json({ error: 'Failed to parse flashcards JSON' }, { status: 500 });
    }

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
