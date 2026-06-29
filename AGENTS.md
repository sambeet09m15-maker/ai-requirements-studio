# Business Analyst AI Studio Rules

- Use Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui components.
- Keep OpenAI calls isolated in `lib/llm.ts` and use `gpt-4o-mini`.
- Keep v1 stateless with no database.
- Make routine technical decisions without asking the user.
- Pause only for the OpenAI API key, local testing confirmation, GitHub push confirmation, or real blockers.
- Verify facts before stating them. If a command was not run, do not claim its result.
- Keep communication concise, plain English, and in bullets.
