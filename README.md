# Crypto Agent (Prototype)

## What it is
A minimal, production-minded prototype that uses an LLM to transform a user's financial goal (current balance → time horizon → target balance) into a crypto-only portfolio plan and a plain-English trade plan. It's a guided, 4-step assistant that surfaces a few large-cap coins, explains the strategy, and proposes concrete orders—purely for learning and validation.

## Who it's for
Builders and PMs who want a thin, extensible baseline to experiment with LLM-assisted crypto allocation and trading logic—without exchange hookups or complex backtesting.

## User Flow

The application guides users through a 4-step process:

### Step 1: Your Goal
Users enter three inputs:
- **Current Balance (USD)**: The amount they want to invest
- **Time Horizon (weeks)**: How many weeks they plan to invest for
- **Target Balance (USD)**: Their desired end balance

The form includes inline validation to ensure:
- All fields are filled with positive numbers
- Target balance is greater than current balance

### Step 2: Plan Preview
Based on the user's goal, this step will display:
- **Required Weekly Return**: Calculated percentage return needed per week to reach the goal
- **Allocation**: 3-6 cryptocurrency assets with their allocation percentages (displayed as chips)

*Note: In this UI shell, placeholders indicate where LLM-generated plan data will appear.*

### Step 3: Strategy
This step presents the investment strategy:
- **Market Thesis**: High-level market view and rationale for the allocation
- **Coin Roles**: Each coin's role (core/satellite/hedge) with reasoning

*Note: Placeholders show where LLM-generated strategy content will be injected.*

### Step 4: Trades
The final step shows actionable trade suggestions in a table format:
- Coin symbol
- Entry price
- Stop loss
- Take profit
- Position size
- Notes

Plus **Global Guidance**: Overall recommendations and risk management notes.

*Note: Table structure is ready to receive trade data from the logic service.*

## Navigation

- **Next/Back buttons**: Navigate between steps
- **Keyboard navigation**: Full tab order and focus management
- **Progress indicator**: Visual stepper shows current position and completed steps
- **Validation**: Step 1 prevents advancement until all fields are valid
- **Disabled states**: Steps 2-4 have disabled Next buttons when data is not yet generated

## Visual States

Each step can display three states:
- **Empty**: Placeholder content with helpful copy
- **Loading**: Skeleton blocks indicate data is being generated
- **Error**: Alert with error message and guidance
- **Populated**: Actual data from the logic service (ready for future integration)

## Accessibility

- ARIA labels and roles for screen readers
- `aria-current="step"` on active step
- Proper focus management throughout the flow
- Visible focus rings on interactive elements
- Form inputs linked to labels and error messages

## Design Language

- Clean, minimal aesthetic with generous whitespace
- High contrast for readability
- Blue accent color (#3b82f6) used sparingly
- Subtle shadows and hover effects
- Responsive layout that works on mobile
- Modern sans-serif typography with clear hierarchy

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Next Steps

With the UI shell complete, the next phase will:
1. Define data contracts for plan, strategy, and trade responses
2. Integrate the logic service that computes required returns and calls LLM endpoints
3. Bind placeholder areas to real data
4. Add loading/error state handling for API calls

## How it works (end-to-end)

### Goal → Math → Risk Plan

User enters balance, horizon (weeks), and goal.

App computes the required weekly return and asks the LLM to propose a simple allocation (3–6 liquid tickers) consistent with implied risk.

### Research → Strategy

With the plan as context, the LLM produces a clear market thesis and assigns roles to coins (core/satellite/hedge), drawing on high-level signals (news/sentiment/cycles—stubbed initially).

### Trades → Execution Plan (paper)

App fetches recent OHLCV (stubbed) and sizes positions from the allocation.

LLM suggests entries, stops, and take-profits per coin, plus notes and global guidance.

Frontend renders a readable table ("what to do" and "why").

## Why an LLM here

- Converts vague goals into a coherent plan with rationale
- Synthesizes multi-factor context (sentiment, trend, regime) into concise strategy text
- Produces structured outputs (JSON) that the UI can render directly and you can swap/promote later

## Extensibility hooks

- Swap models per step (allocator/strategist/trader)
- Plug in richer data (funding rates, dominance, fear/greed)
- Add indicators pre-LLM (SMA/RSI) to tighten trade prompts
- Version prompts; log token usage; persist sessions later

## Non-goals (for this prototype)
No real trading, custody, auth, backtesting, or security hardening. No long-term storage. Educational output only.

