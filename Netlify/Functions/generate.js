const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { topic } = JSON.parse(event.body || '{}');

  if (!topic) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Topic is required" }),
    };
  }

  const apiKey = process.env.TOGETHER_API_KEY;

  try {
    const apiResponse = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: "You are an expert social media hashtag generator. You ONLY generate real, trending hashtags for Instagram, TikTok, and YouTube Shorts. You never explain — just output hashtags in the exact format requested."
          },
          {
            role: "user",
            content: `Act like a real social media marketing expert. Find and generate exactly 20 REAL, short, popular hashtags for the topic "${topic}". 
Order them by highest relevance and popularity first. Only include hashtags that people actually use for this topic on Instagram, TikTok, or YouTube Shorts.
No pipes, commas, or extra text. Use only real words people search. Separate hashtags with a single space only.`
          }
        ]
      })
    });

    const data = await apiResponse.json();
    const hashtags = data.choices[0].message.content.trim()
      .replace(/\\#/g, '#')
      .replace(/\|/g, ' ')
      .replace(/,/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ hashtags }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error: " + err.message }),
    };
  }
};