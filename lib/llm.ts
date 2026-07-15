import OpenAI from "openai";

export type DocumentType = "Quick User Story" | "Standard Requirements Doc" | "Full Requirements Package";
export type Domain = "Generic" | "Healthcare" | "Finance & Banking" | "Retail & E-commerce" | "Logistics & Supply Chain" | "Technology & SaaS";
export type ProjectType = "New Feature" | "System Migration" | "Process Automation" | "Compliance & Regulatory" | "Integration Project";

export type AcceptanceCriterion = { given: string; when: string; then: string };
export type RequirementsResult = {
  executiveSummary?: string;
  userStories?: string[];
  acceptanceCriteria?: AcceptanceCriterion[];
  functionalRequirements?: string[];
  nonFunctionalRequirements?: string[];
  risks?: string[];
  assumptions?: string[];
  edgeCases?: string[];
  testScenarios?: string[];
  stakeholderQuestions?: string[];
};
export type GeneratePayload = {
  requirement: string;
  workspace?: string;
  domain: Domain;
  projectType: ProjectType;
  documentType: DocumentType;
  section?: keyof RequirementsResult;
};
export type QualityCriterionStatus = "present" | "partial" | "missing";
export type RawQualityCriterion = { name?: unknown; status?: unknown; note?: unknown };

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const keysByDocumentType: Record<DocumentType, (keyof RequirementsResult)[]> = {
  "Quick User Story": ["userStories", "acceptanceCriteria"],
  "Standard Requirements Doc": [
    "executiveSummary",
    "userStories",
    "acceptanceCriteria",
    "functionalRequirements",
    "nonFunctionalRequirements",
  ],
  "Full Requirements Package": [
    "executiveSummary",
    "userStories",
    "acceptanceCriteria",
    "functionalRequirements",
    "nonFunctionalRequirements",
    "risks",
    "assumptions",
    "edgeCases",
    "testScenarios",
    "stakeholderQuestions",
  ],
};

async function requestJson(system: string, user: string, temperature = 0.2) {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }
  return JSON.parse(content);
}

function pickDocumentSections(data: RequirementsResult, keys: (keyof RequirementsResult)[]): RequirementsResult {
  return keys.reduce<RequirementsResult>((result, key) => {
    if (data[key] !== undefined) {
      return { ...result, [key]: data[key] };
    }
    return result;
  }, {});
}

export async function generateRequirements(payload: GeneratePayload): Promise<RequirementsResult> {
  const keys = payload.section ? [payload.section] : keysByDocumentType[payload.documentType];
  const system = [
    `Act as a senior Business Analyst for ${payload.domain} and ${payload.projectType}.`,
    "Return ONLY valid JSON, no markdown fences, no commentary.",
    `Document type: ${payload.documentType}. Include exactly these keys and no others: ${keys.join(", ")}.`,
    payload.documentType === "Quick User Story"
      ? "Keep it concise and focus only on actionable user stories and testable acceptance criteria."
      : payload.documentType === "Standard Requirements Doc"
        ? "Create a delivery-ready requirements document without risks, assumptions, edge cases, test scenarios, or stakeholder questions."
        : "Create a complete requirements package with risks, assumptions, edge cases, test scenarios, stakeholder questions, and traceability-ready detail.",
    "Schema: executiveSummary string; userStories string[]; acceptanceCriteria {given,when,then}[]; functionalRequirements string[]; nonFunctionalRequirements string[]; risks string[]; assumptions string[]; edgeCases string[]; testScenarios string[]; stakeholderQuestions string[].",
  ].join(" ");
  const user = `Business requirement: ${payload.requirement}`;
  const data = await requestJson(system, user);
  return pickDocumentSections(data, keys);
}

export async function checkRequirementQualityCriteria(requirement: string): Promise<{ criteria: RawQualityCriterion[] }> {
  const system = [
    "You are a senior Business Analyst reviewing a single raw requirement.",
    "First, decide which quality criteria are RELEVANT to this specific requirement.",
    "Always include 'Actor' and 'Outcome'.",
    "Then choose 2 to 5 more from ONLY what genuinely applies, e.g.: Trigger, Channel, Threshold, Frequency, Data Source, Error Handling, Permissions, Performance, Scope.",
    "Do NOT include criteria that make no sense for this requirement type.",
    "Return ONLY JSON:",
    '{"criteria": [{ "name": string, "status": "present"|"partial"|"missing", "note": string (max 12 words, only needed for partial/missing) }]}',
    "Between 4 and 7 criteria total.",
    "Judge strictly: 'present' only if explicitly stated in the text, 'partial' if implied or vague, 'missing' if absent.",
  ].join(" ");
  const user = `Raw requirement: ${requirement}`;
  const data = await requestJson(system, user, 0);
  return { criteria: Array.isArray(data?.criteria) ? data.criteria : [] };
}
