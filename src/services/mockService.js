/**
 * Mock service for demonstration purposes
 * Returns simulated LLM responses to showcase the UI without requiring an API key
 */

/**
 * Generates a mock investment plan for demonstration
 * @param {number} balance - Current balance in USD
 * @param {number} horizon - Time horizon in weeks
 * @param {number} goal - Target balance in USD
 * @returns {Promise<Object>} Mock plan data
 */
export async function generateMockPlan(balance, horizon, goal) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Calculate required weekly return
  const weeklyReturnRate = Math.pow(goal / balance, 1 / horizon) - 1;
  const weeklyReturnPercent = (weeklyReturnRate * 100).toFixed(2);

  // Determine risk level based on weekly return
  let riskLevel;
  if (weeklyReturnPercent < 1) {
    riskLevel = 'Conservative';
  } else if (weeklyReturnPercent < 3) {
    riskLevel = 'Moderate';
  } else if (weeklyReturnPercent < 5) {
    riskLevel = 'Aggressive';
  } else {
    riskLevel = 'Very Aggressive';
  }

  // Mock response based on risk level
  const mockResponses = {
    'Conservative': {
      coins: ['BTC', 'ETH', 'USDC'],
      strategyNote: 'Focus on large-cap stability with stablecoins for capital preservation and modest growth.'
    },
    'Moderate': {
      coins: ['BTC', 'ETH', 'SOL', 'ADA'],
      strategyNote: 'Balanced approach with established cryptocurrencies offering growth potential with manageable risk.'
    },
    'Aggressive': {
      coins: ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC'],
      strategyNote: 'Growth-focused portfolio with large-cap anchors and high-potential layer-1 and layer-2 tokens.'
    },
    'Very Aggressive': {
      coins: ['ETH', 'SOL', 'AVAX', 'MATIC', 'DOT', 'ATOM'],
      strategyNote: 'High-risk, high-reward strategy emphasizing emerging protocols and altcoins with significant upside potential.'
    }
  };

  const mockData = mockResponses[riskLevel];

  return {
    success: true,
    data: {
      riskLevel,
      weeklyReturn: weeklyReturnPercent,
      coins: mockData.coins,
      strategyNote: mockData.strategyNote
    }
  };
}
