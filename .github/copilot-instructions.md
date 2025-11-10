Crypto Agent (Prototype)

What it is
A minimal, production-minded prototype that uses an LLM to transform a user’s financial goal (current balance → time horizon → target balance) into a crypto-only portfolio plan and a plain-English trade plan. It’s a guided, 3-step assistant that surfaces a few large-cap coins, explains the strategy, and proposes concrete orders—purely for learning and validation.

Who it’s for
Builders and PMs who want a thin, extensible baseline to experiment with LLM-assisted crypto allocation and trading logic—without exchange hookups or complex backtesting.

How it works (end-to-end)

Goal → Math → Risk Plan

User enters balance, horizon (weeks), and goal.

App computes the required weekly return and asks the LLM to propose a simple allocation (3–6 liquid tickers) consistent with implied risk.

Research → Strategy

With the plan as context, the LLM produces a clear market thesis and assigns roles to coins (core/satellite/hedge), drawing on high-level signals (news/sentiment/cycles—stubbed initially).

Trades → Execution Plan (paper)

App fetches recent OHLCV (stubbed) and sizes positions from the allocation.

LLM suggests entries, stops, and take-profits per coin, plus notes and global guidance.

Frontend renders a readable table (“what to do” and “why”).

Why an LLM here

Converts vague goals into a coherent plan with rationale.

Synthesizes multi-factor context (sentiment, trend, regime) into concise strategy text.

Produces structured outputs (JSON) that the UI can render directly and you can swap/promote later.

Extensibility hooks

Swap models per step (allocator/strategist/trader).

Plug in richer data (funding rates, dominance, fear/greed).

Add indicators pre-LLM (SMA/RSI) to tighten trade prompts.

Version prompts; log token usage; persist sessions later.

Non-goals (for this prototype)
No real trading, custody, auth, backtesting, or security hardening. No long-term storage. Educational output only.
