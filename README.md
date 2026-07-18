# Business Analyst AI Studio

A stateless Next.js app that turns raw business requirements into structured Business Analyst documentation using OpenAI.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI `gpt-4o-mini`

## Local Setup

1. Copy `.env.local.example` to `.env.local`.
2. Add your OpenAI API key.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Quality scoring eval gate

`lib/quality.ts` drives both the authed `/api/quality` route and the public
homepage demo. Run `npm run eval` after ANY change to prompts or quality
logic, before pushing — it runs the golden set of calibration cases through
the real pipeline and fails (non-zero exit) if any case falls outside its
expected score range or is missing an expected flag.
