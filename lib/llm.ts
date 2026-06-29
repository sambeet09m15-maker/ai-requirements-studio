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
export type CoverageIssue = { item: string; issue: string };
export type GeneratePayload = {
  requirement: string;
  domain: Domain;
  projectType: ProjectType;
  documentType: DocumentType;
  section?: keyof RequirementsResult;
};

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

async function requestJson(system: string, user: string) {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
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

export async function generateRequirements(payload: GeneratePayload): Promise<RequirementsResult> {
  const keys = payload.section ? [payload.section] : keysByDocumentType[payload.documentType];
  const system = [
    `Act as a senior Business Analyst for ${payload.domain} and ${payload.projectType}.`,
    "Return ONLY valid JSON, no markdown fences, no commentary.",
    `Include only these keys: ${keys.join(", ")}.`,
    "Schema: executiveSummary string; userStories string[]; acceptanceCriteria {given,when,then}[]; functionalRequirements string[]; nonFunctionalRequirements string[]; risks string[]; assumptions string[]; edgeCases string[]; testScenarios string[]; stakeholderQuestions string[].",
  ].join(" ");
  const user = `Business requirement: ${payload.requirement}`;
  return requestJson(system, user);
}

export async function checkCoverage(requirements: RequirementsResult): Promise<CoverageIssue[]> {
  const system = "Act as a senior Business Analyst QA reviewer. Return ONLY valid JSON shaped as {\"issues\":[{\"item\":\"string\",\"issue\":\"string\"}]}. No markdown or commentary.";
  const user = [
    "Check this generated requirements package for gaps and consistency issues.",
    "Flag acceptance criteria with no related test scenario, risks with no related assumption or mitigation, and user stories with no acceptance criteria.",
    `Requirements package: ${JSON.stringify(requirements)}`,
  ].join(" ");
  const data = await requestJson(system, user);
  return Array.isArray(data.issues) ? data.issues : [];
}
