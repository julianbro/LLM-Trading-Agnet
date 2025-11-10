import OpenAI from 'openai';

// Initialize OpenAI client
// In a real app, this should be handled on the backend to keep the API key secure
// For this prototype, the API key can be set via environment variable
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for prototype! In production, use a backend
});

/**
 * Generates an initial investment plan based on user's financial goals
 * @param {number} balance - Current balance in USD
 * @param {number} horizon - Time horizon in weeks
 * @param {number} goal - Target balance in USD
 * @returns {Promise<Object>} Plan data with risk assessment, weekly return, and coin suggestions
 */
export async function generateInitialPlan(balance, horizon, goal) {
  try {
    // Calculate required weekly return
    const weeklyReturnRate = Math.pow(goal / balance, 1 / horizon) - 1;
    const weeklyReturnPercent = (weeklyReturnRate * 100).toFixed(2);

    const prompt = `You are the best crypto investment strategist and advisor. A user wants to invest in cryptocurrency with the following goal:

Current Balance: $${balance} USD
Time Horizon: ${horizon} weeks
Target Balance: $${goal} USD
Required Weekly Return: ${weeklyReturnPercent}%

Provide a high-level investment plan assessment. Your response must include:

1. Risk Assessment: Categorize the risk level as one of: "Conservative", "Moderate", "Aggressive", or "Very Aggressive" based on the required weekly return.

2. Expected Weekly Return: Confirm the required weekly return percentage needed to achieve this goal.

3. Initial Coin Ideas: Suggest 3-6 major cryptocurrencies that could be part of this portfolio strategy. Keep it very high-level - just mention the coin names/symbols. This is just a first idea, details will come later.

4. Brief Strategy Note: One sentence explaining your overall approach (e.g., "Focus on large-cap stability with some growth potential" or "High-risk altcoins for aggressive growth").

Respond in JSON format with this exact structure:
{
  "riskLevel": "Conservative|Moderate|Aggressive|Very Aggressive",
  "weeklyReturn": "${weeklyReturnPercent}",
  "coins": ["BTC", "ETH", "..."],
  "strategyNote": "Brief one-sentence approach"
}

Keep your response focused and concise. This is just the initial overview - detailed allocation and strategy will come in later steps.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert crypto investment strategist. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    const planData = JSON.parse(responseText);

    // Validate the response structure
    if (!planData.riskLevel || !planData.weeklyReturn || !planData.coins || !planData.strategyNote) {
      throw new Error('Invalid response structure from OpenAI');
    }

    return {
      success: true,
      data: planData
    };
  } catch (error) {
    console.error('Error generating plan:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate investment plan'
    };
  }
}
