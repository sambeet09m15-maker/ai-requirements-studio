"use client";

import { useMemo, useState } from "react";
import { BookOpenText, CheckCircle2, ChevronDown, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type KnowledgeCategory = "Methodology" | "Requirements Artifacts" | "Techniques" | "Roles & Ceremonies" | "Testing-Adjacent";

type KnowledgeTopic = {
  category: KnowledgeCategory;
  title: string;
  intro: string;
  bullets: string[];
  example: string;
};

const categories: KnowledgeCategory[] = ["Methodology", "Requirements Artifacts", "Techniques", "Roles & Ceremonies", "Testing-Adjacent"];

const topics: KnowledgeTopic[] = [
  {
    category: "Methodology",
    title: "Agile",
    intro: "Agile is a way of building software in small, repeated cycles instead of one long plan.",
    bullets: [
      "Work is broken into short cycles (often called sprints) instead of one big upfront plan.",
      "Teams build a small piece, get feedback, then adjust — rather than waiting until the end to show anything.",
      "It values working software and customer feedback over rigid documentation and fixed plans.",
      "It suits projects where requirements are likely to change as the business learns more.",
    ],
    example: "A logistics company wants a new driver tracking app. Instead of building the whole app over 6 months, the team delivers \"live GPS pin on map\" in week 2, gets driver feedback, then adds \"estimated arrival time\" in week 4 based on what was actually useful.",
  },
  {
    category: "Methodology",
    title: "How Agile Connects to BA Work",
    intro: "A Business Analyst's job doesn't disappear in Agile — it just happens continuously instead of all at once.",
    bullets: [
      "Instead of writing one big requirements document upfront, the BA writes and refines user stories throughout the project.",
      "The BA often takes on (or supports) the Product Owner's job of managing the backlog and clarifying priorities.",
      "The BA stays closely involved in sprint ceremonies — clarifying stories, refining the backlog, and accepting finished work.",
      "Requirements are expected to evolve, so the BA's role shifts from \"gatekeeper of one fixed document\" to \"ongoing translator\" between the business and the team.",
    ],
    example: "Instead of handing developers a 50-page BRD on day one, the BA writes \"As a warehouse manager, I want to see low-stock alerts\" as a story this week, then refines \"As a manager, I want to set custom stock thresholds per item\" as a follow-up story next sprint, once the basic version is in use.",
  },
  {
    category: "Methodology",
    title: "Scrum",
    intro: "Scrum is the most common way teams actually run Agile in practice.",
    bullets: [
      "Work happens in fixed-length sprints, usually one to four weeks.",
      "Defined roles exist: Product Owner (owns priorities), Scrum Master (removes blockers), and the Development Team.",
      "Regular ceremonies structure the work: Sprint Planning, Daily Standup, Sprint Review, and Retrospective.",
      "A Business Analyst typically supports the Product Owner by writing and refining stories ahead of each sprint.",
    ],
    example: "A team commits to a 2-week sprint to build \"order cancellation\" functionality. Every morning's 15-minute standup, each developer says what they did yesterday, what they'll do today, and any blockers — the BA might flag \"still waiting on finance team to confirm refund rules.\"",
  },
  {
    category: "Methodology",
    title: "Kanban",
    intro: "Kanban is a visual way to manage ongoing work without fixed time cycles.",
    bullets: [
      "Work items move across columns on a board, typically To Do, In Progress, and Done.",
      "There's no fixed sprint length — work flows continuously rather than in time-boxed batches.",
      "Limits are placed on how many items can be \"In Progress\" at once, to avoid overload and bottlenecks.",
      "It suits support teams, maintenance work, or any steady stream of incoming requests rather than big planned releases.",
    ],
    example: "An IT support team uses a Kanban board for incoming bug tickets. A ticket like \"payment page crashing on mobile\" moves from To Do, to In Progress once a developer picks it up, to Done once fixed — with no fixed two-week cycle, since tickets arrive at random times.",
  },
  {
    category: "Methodology",
    title: "Waterfall",
    intro: "Waterfall is the traditional approach where each phase finishes before the next one starts.",
    bullets: [
      "Phases run in strict sequence: requirements, design, build, test, deploy.",
      "All requirements are typically gathered and signed off upfront, before any development begins.",
      "It works well when requirements are well understood and unlikely to change, like regulatory or compliance projects.",
      "Changes mid-project are harder and costlier to absorb than in Agile, since later phases depend on earlier ones being locked.",
    ],
    example: "A bank building a system to comply with a new RBI regulation gathers and signs off all requirements upfront with legal and compliance teams, since the rules are fixed and there's no room for \"we'll figure it out as we go.\"",
  },
  {
    category: "Methodology",
    title: "Hybrid (Agile + Waterfall)",
    intro: "Many real organizations don't use a pure model — they blend the two.",
    bullets: [
      "High-level planning and budgeting may follow a Waterfall-style upfront approval process.",
      "Day-to-day delivery within that plan often runs in Agile sprints.",
      "This is common in large enterprises and regulated industries that need upfront sign-off but still want iterative delivery.",
      "A BA in a hybrid setup needs to be comfortable producing both a formal BRD and ongoing sprint-level user stories.",
    ],
    example: "A logistics company gets annual budget approval for \"Warehouse Modernization\" as one fixed Waterfall-style business case, but once approved, the actual features (barcode scanning, inventory dashboard, etc.) are built and delivered in Agile sprints throughout the year.",
  },
  {
    category: "Requirements Artifacts",
    title: "BRD (Business Requirements Document)",
    intro: "A BRD captures what the business needs and why, at a high level, before any technical design begins.",
    bullets: [
      "It focuses on business goals and problems, not technical implementation details.",
      "It's typically reviewed and signed off by business stakeholders, not developers.",
      "It answers \"what problem are we solving and why does it matter,\" not \"how will it be built.\"",
      "It's most common in Waterfall or hybrid projects with formal sign-off steps.",
    ],
    example: "\"The company needs a way to track delayed shipments in real time because customers are calling support 200 times a day asking where their order is\" — that's a BRD-level statement, with no mention yet of which app or database will be used.",
  },
  {
    category: "Requirements Artifacts",
    title: "FRD (Functional Requirements Document)",
    intro: "An FRD turns the business need from a BRD into specific, detailed system behavior.",
    bullets: [
      "It describes exactly what the system should do, screen by screen or function by function.",
      "It's detailed enough for developers to actually build from.",
      "It usually follows the BRD, translating \"what we need\" into \"what the system must do.\"",
      "It often includes inputs, outputs, validation rules, and system behavior for each function.",
    ],
    example: "Following the BRD above, the FRD specifies: \"The system must display shipment status as one of: Order Placed, Picked Up, In Transit, Out for Delivery, Delivered. Status must update within 5 minutes of a scan event from the courier partner's system.\"",
  },
  {
    category: "Requirements Artifacts",
    title: "Product Backlog",
    intro: "The Product Backlog is the single ranked list of everything that might get built.",
    bullets: [
      "It holds all known work: features, fixes, technical tasks, and ideas, not yet committed to a sprint.",
      "Items are ranked by priority, with the most valuable or urgent work near the top.",
      "It's a living list — items get added, removed, re-prioritized constantly as the business learns more.",
      "A BA often helps keep this list clear, well-described, and properly ordered.",
    ],
    example: "A product backlog for a delivery app might have \"SMS delivery notifications\" ranked above \"dark mode for the app\" — because customer complaints about lack of notifications are currently a bigger business problem than the visual theme.",
  },
  {
    category: "Requirements Artifacts",
    title: "Definition of Ready",
    intro: "Definition of Ready is the checklist a story must pass before a team agrees to work on it.",
    bullets: [
      "It typically requires a clear description, acceptance criteria, and no unresolved open questions.",
      "It exists to stop teams from starting work on vague or incomplete requirements.",
      "Each team defines its own version, but the goal is always the same: no surprises once work begins.",
      "A BA is usually responsible for getting a story to \"Ready\" before it enters a sprint.",
    ],
    example: "A story titled \"Improve checkout\" is NOT ready — it's vague. It becomes ready once the BA rewrites it as \"Add a 'save card for later' checkbox at checkout, visible only to logged-in users,\" with clear acceptance criteria attached.",
  },
  {
    category: "Requirements Artifacts",
    title: "Definition of Done",
    intro: "Definition of Done is the checklist that decides when a piece of work is actually finished.",
    bullets: [
      "It commonly includes: code complete, tested, reviewed, and meeting all acceptance criteria.",
      "It prevents \"done\" from meaning different things to different people on the same team.",
      "It's agreed by the whole team in advance, not decided case-by-case at the end.",
      "A BA often validates against this list during acceptance, alongside the specific acceptance criteria for that story.",
    ],
    example: "A developer says \"the login feature is done\" after writing the code, but it's not actually Done by the team's standard until it's also been tested on mobile, reviewed by another developer, and confirmed against the agreed acceptance criteria.",
  },
  {
    category: "Techniques",
    title: "MoSCoW Prioritization",
    intro: "MoSCoW is a simple way to sort requirements by how essential they are.",
    bullets: [
      "Must have: the project fails without it.",
      "Should have: important, but the project can launch without it if needed.",
      "Could have: a nice-to-have if time and budget allow.",
      "Won't have (this time): explicitly out of scope for now, to avoid scope creep arguments later.",
    ],
    example: "For a new order-tracking app: \"Show order status\" is a Must have. \"SMS notifications\" is a Should have. \"Map animation of the delivery truck\" is a Could have. \"Voice assistant integration\" is a Won't have for this release.",
  },
  {
    category: "Techniques",
    title: "INVEST Criteria",
    intro: "INVEST is a checklist for judging whether a user story is well written.",
    bullets: [
      "Independent: it can be worked on without being blocked by other stories.",
      "Negotiable: details can still be discussed, it isn't a rigid contract.",
      "Valuable: it delivers real value to a user or the business.",
      "Small and Testable: the rest of the letters (Estimable, Small, Testable) ensure it can be sized and verified, not vague or oversized.",
    ],
    example: "\"As a customer, I want to track my order\" is too big and vague. Splitting it into \"As a customer, I want to see my order's current status\" and, separately, \"As a customer, I want to see estimated delivery date\" makes each story independent, small, and testable on its own.",
  },
  {
    category: "Techniques",
    title: "RACI Matrix",
    intro: "A RACI matrix clarifies exactly who does what on a project.",
    bullets: [
      "Responsible: the person who actually does the work.",
      "Accountable: the person who owns the outcome and signs off.",
      "Consulted: people whose input is needed before decisions are made.",
      "Informed: people who just need to be kept up to date.",
    ],
    example: "For a new refund policy feature: the BA is Responsible for writing requirements, the Product Manager is Accountable for the final decision, the Finance team is Consulted on refund rules, and Customer Support is Informed once it's live.",
  },
  {
    category: "Techniques",
    title: "Gap Analysis",
    intro: "Gap Analysis compares where things are now against where they need to be.",
    bullets: [
      "It starts by clearly documenting the current state of a process or system.",
      "Then it documents the desired future state.",
      "The difference between the two becomes the list of requirements or work needed.",
      "It's especially useful at the start of a project to justify why a change is needed at all.",
    ],
    example: "Current state: \"Customers call support to check order status, taking 5 minutes per call.\" Desired state: \"Customers self-check status in an app within 10 seconds.\" The gap between these two states becomes the justification and requirement list for building the tracking app.",
  },
  {
    category: "Techniques",
    title: "Gherkin (Given-When-Then)",
    intro: "Gherkin is a simple sentence structure for writing testable acceptance criteria.",
    bullets: [
      "Given sets up the starting condition (e.g., \"Given a user is logged in\").",
      "When describes the action taken (e.g., \"When they click Submit\").",
      "Then describes the expected result (e.g., \"Then a confirmation message appears\").",
      "It forces requirements to be specific enough that both a developer and a tester read them the same way.",
    ],
    example: "\"Given a customer has items in their cart, When they apply an expired discount code, Then the system shows an error message 'This code has expired' and the cart total stays unchanged.\"",
  },
  {
    category: "Roles & Ceremonies",
    title: "Product Owner vs Business Analyst",
    intro: "These two roles overlap heavily but aren't identical.",
    bullets: [
      "The Product Owner owns the \"what\" and \"why\" — deciding priorities and representing business value.",
      "The Business Analyst focuses on the \"how\" in detail — breaking down requirements, edge cases, and process flows.",
      "In many companies, especially smaller ones, one person does both jobs.",
      "Where both roles exist, the BA typically supports the Product Owner with detailed analysis rather than making final priority calls.",
    ],
    example: "The Product Owner decides \"real-time tracking is our top priority this quarter, ahead of the loyalty program.\" The BA then writes the detailed user stories, edge cases (what happens if GPS signal is lost), and acceptance criteria needed to actually build that tracking feature.",
  },
  {
    category: "Roles & Ceremonies",
    title: "Sprint Planning",
    intro: "Sprint Planning is the meeting where a team decides what to build in the upcoming sprint.",
    bullets: [
      "The team reviews top-priority backlog items and decides what's realistic to commit to.",
      "Stories need to already be clear and ready going into this meeting — last-minute clarification slows the whole team down.",
      "The team agrees on a sprint goal, not just an arbitrary list of tasks.",
      "A BA usually attends to answer questions and confirm requirements are correctly understood.",
    ],
    example: "At the start of a 2-week sprint, the team agrees on the goal \"enable customers to cancel an order within 1 hour of placing it,\" and picks 5 related stories from the backlog that together deliver that goal, rather than grabbing 5 unrelated random tasks.",
  },
  {
    category: "Roles & Ceremonies",
    title: "Backlog Refinement",
    intro: "Backlog Refinement is an ongoing meeting to keep upcoming work clear and ready.",
    bullets: [
      "The team reviews upcoming (not current sprint) backlog items together.",
      "Vague stories get clarified, oversized stories get broken down into smaller ones.",
      "It happens regularly throughout a sprint, not just once at the end.",
      "This is usually where a BA does the bulk of their day-to-day work.",
    ],
    example: "A story called \"Improve search\" sitting in the backlog gets refined into three clearer stories: \"Add filter by price range,\" \"Add filter by delivery speed,\" and \"Show 'no results' message with suggestions\" — each now small enough to actually estimate and build.",
  },
  {
    category: "Roles & Ceremonies",
    title: "Retrospective",
    intro: "A Retrospective is a regular meeting where the team reflects on how they're working, not what they built.",
    bullets: [
      "It typically covers: what went well, what didn't, and what to change next time.",
      "It focuses on team process and collaboration, separate from product features.",
      "It's meant to be a safe space for honest feedback, not a blame exercise.",
      "Action items from it should be tracked and revisited, not just discussed once and forgotten.",
    ],
    example: "After a rough sprint where a major bug reached production, the retrospective surfaces \"we skipped testing on the payment flow because we were rushing\" — and the team agrees to add a mandatory payment-flow test checklist before every release going forward.",
  },
  {
    category: "Testing-Adjacent",
    title: "UAT (User Acceptance Testing)",
    intro: "UAT is the final check where real business users confirm the system actually works for them.",
    bullets: [
      "It happens after technical testing is complete, just before go-live.",
      "It's performed by actual business users or stakeholders, not the development/testing team.",
      "It checks against real-world business scenarios, not just the written acceptance criteria.",
      "A BA often coordinates UAT, since they understand both the business need and the built solution.",
    ],
    example: "Before launching a new refund feature, the actual finance team (not developers) processes 10 real-style refund requests in a test environment to confirm the amounts, timelines, and approval steps all work the way their department actually needs them to.",
  },
  {
    category: "Testing-Adjacent",
    title: "Test Case vs Test Scenario",
    intro: "These two terms are often confused but serve different levels of detail.",
    bullets: [
      "A Test Scenario is a high-level situation to test (e.g., \"user logs in with valid credentials\").",
      "A Test Case is the detailed, step-by-step version of that scenario, including exact inputs and expected results.",
      "One scenario can break down into several detailed test cases.",
      "A BA typically defines scenarios; a tester usually writes the detailed test cases from them.",
    ],
    example: "Scenario: \"Customer applies a discount code at checkout.\" This breaks into test cases like: \"Apply a valid code → 10% discount applied,\" \"Apply an expired code → error shown,\" \"Apply a code on an empty cart → button disabled.\"",
  },
  {
    category: "Methodology",
    title: "SDLC (Software Development Life Cycle)",
    intro: "SDLC is the complete journey used to plan, design, build, test, deploy, and improve a software product.",
    bullets: [
      "Common phases include discovery, requirements, design, development, testing, deployment, and maintenance.",
      "Good SDLC practice reduces confusion because every team member understands what happens next and who owns it.",
      "It helps teams move from a business problem to a released solution through clear, repeatable stages.",
      "For BA work, SDLC is the map that connects stakeholder goals, solution scope, and final product value.",
    ],
    example: "A retail company wants a \"buy now, pay later\" option. The SDLC takes it from discovery (why customers are asking for this), through requirements (BA defines eligibility rules), design, build, testing, and finally deployment to live customers.",
  },
  {
    category: "Testing-Adjacent",
    title: "STLC (Software Testing Life Cycle)",
    intro: "STLC is the structured process testers follow to verify a system works correctly before it goes live.",
    bullets: [
      "It typically includes: requirement analysis, test planning, test case design, test execution, and closure.",
      "It runs alongside or after the build phase of the SDLC, depending on the project's methodology.",
      "Each phase has a clear deliverable, such as a test plan document or a test execution report.",
      "A BA's requirements and acceptance criteria are usually the starting point testers use to design their test cases.",
    ],
    example: "Before releasing a new \"apply discount code\" feature, testers use the BA's acceptance criteria to write test cases covering valid codes, expired codes, and codes on empty carts, then execute and log the results before sign-off.",
  },
  {
    category: "Requirements Artifacts",
    title: "Requirement Gathering",
    intro: "Requirement Gathering is the process of finding out what the business actually needs, directly from the people who need it.",
    bullets: [
      "It involves talking to stakeholders through interviews, workshops, surveys, or observing how they currently work.",
      "The goal is to uncover the real underlying need, not just what someone initially asks for.",
      "It often surfaces requirements stakeholders didn't think to mention until directly asked.",
      "Poor requirement gathering is one of the most common causes of projects that build the wrong thing.",
    ],
    example: "A stakeholder asks for \"a faster search bar.\" Through requirement gathering, the BA discovers the real issue is that search results don't include out-of-stock filtering — so users keep clicking on items they can't actually buy, which \"faster\" alone wouldn't fix.",
  },
  {
    category: "Requirements Artifacts",
    title: "Epic",
    intro: "An Epic is a large body of work too big to deliver in one go, made up of several smaller user stories.",
    bullets: [
      "It represents a broad goal or theme, not a single specific feature.",
      "It gets broken down into smaller, independently deliverable user stories over time.",
      "It often spans multiple sprints or even multiple releases.",
      "A BA typically owns breaking an Epic down into well-defined, sized stories.",
    ],
    example: "\"Customer Order Tracking\" is an Epic. It breaks down into stories like \"show order status,\" \"send SMS on dispatch,\" \"show estimated delivery date,\" and \"allow delivery date rescheduling\" — each shippable on its own.",
  },
  {
    category: "Requirements Artifacts",
    title: "Feature",
    intro: "A Feature is a distinct piece of functionality that delivers value to the user, sitting between an Epic and a User Story in size.",
    bullets: [
      "It's smaller than an Epic but often still made up of more than one user story.",
      "It represents something a user would recognize as \"a thing the product can do.\"",
      "It's commonly used in product roadmaps to communicate at a level non-technical stakeholders understand.",
      "A BA helps define what's actually included in a feature's scope versus what's a separate future feature.",
    ],
    example: "Within the \"Customer Order Tracking\" Epic, \"Real-time GPS tracking\" is one Feature, and \"Delivery notifications\" is a separate Feature — each made up of its own smaller user stories.",
  },
  {
    category: "Requirements Artifacts",
    title: "User Story",
    intro: "A User Story is a short, plain-English description of a piece of functionality, written from the user's point of view.",
    bullets: [
      "It typically follows the format: \"As a [user], I want [goal], so that [benefit].\"",
      "It deliberately leaves out technical detail, focusing on user need and value instead.",
      "It's meant to be small enough to build and test within a single sprint.",
      "A BA writes these to keep the team focused on user value, not just technical tasks.",
    ],
    example: "\"As a customer, I want to receive an SMS when my order is out for delivery, so that I know when to expect it at my door.\"",
  },
  {
    category: "Requirements Artifacts",
    title: "Acceptance Criteria",
    intro: "Acceptance Criteria are the specific, testable conditions a user story must meet to be considered complete.",
    bullets: [
      "They define the boundaries of what is and isn't included in a story.",
      "They're agreed before development starts, so there's no ambiguity about what \"done\" means for that story.",
      "They're often written in Given-When-Then (Gherkin) format for clarity.",
      "A BA writes these alongside the user story, and testers use them directly to verify the finished work.",
    ],
    example: "For the SMS notification story above: \"Given an order's status changes to 'Out for Delivery,' When the status update is saved, Then an SMS is sent to the customer's registered number within 2 minutes.\"",
  },
  {
    category: "Requirements Artifacts",
    title: "Use Case",
    intro: "A Use Case describes, step by step, how a user interacts with a system to achieve a specific goal, including what can go wrong.",
    bullets: [
      "It includes the main flow (the expected, successful path).",
      "It also includes alternate or exception flows (what happens when something goes differently than expected).",
      "It identifies the actors involved, such as the user and any other systems.",
      "It's more detailed and structured than a user story, often used for complex interactions.",
    ],
    example: "Use Case: \"Customer cancels an order.\" Main flow: customer opens order, taps Cancel, confirms, order is cancelled and refund initiated. Alternate flow: if the order has already been dispatched, the system shows \"This order can no longer be cancelled\" instead.",
  },
  {
    category: "Requirements Artifacts",
    title: "Process Flow",
    intro: "A Process Flow is a visual diagram showing the sequence of steps and decision points in a business process.",
    bullets: [
      "It typically uses boxes for steps and diamonds for decision points (yes/no branches).",
      "It helps everyone — business and technical — see the full picture of a process in one view.",
      "It's especially useful for spotting gaps, bottlenecks, or unnecessary steps in a current process.",
      "A BA creates these to document both the current (\"as-is\") and proposed (\"to-be\") versions of a process.",
    ],
    example: "A process flow for \"Order Returns\" might show: Customer requests return → System checks if within 7-day window → If yes, generate return label → If no, show \"Return window expired\" message.",
  },
  {
    category: "Roles & Ceremonies",
    title: "Stakeholder",
    intro: "A Stakeholder is anyone with an interest in, or influence over, the outcome of a project.",
    bullets: [
      "This includes people who will use the system, people who fund it, and people whose work it affects.",
      "Stakeholders can be internal (employees, management) or external (customers, regulators, partners).",
      "Different stakeholders often have different, sometimes conflicting, priorities that a BA must balance.",
      "Identifying all relevant stakeholders early helps avoid late-stage surprises or missed requirements.",
    ],
    example: "For a new refund feature, stakeholders include: customers (want fast refunds), the finance team (wants fraud controls), customer support (wants fewer manual escalations), and compliance (wants an audit trail) — each with a different, valid priority the BA needs to account for.",
  },
];

function topicMatches(topic: KnowledgeTopic, query: string) {
  const haystack = [topic.title, topic.intro, topic.category, ...topic.bullets, topic.example].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function getTopicKey(topic: KnowledgeTopic) {
  return `${topic.category}-${topic.title}`;
}

function TopicCard({
  topic,
  expanded,
  onToggle,
}: {
  topic: KnowledgeTopic;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="rounded-md border border-slate-100 bg-slate-50">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <h3 className="text-base font-semibold text-slate-950">{topic.title}</h3>
        <ChevronDown className={`size-4 shrink-0 text-slate-500 transition ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded ? (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          <p className="mb-3 text-sm leading-6 text-slate-700">{topic.intro}</p>
          <ul className="grid gap-2 text-sm leading-6 text-slate-700 md:grid-cols-2">
            {topic.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-md border-l-4 border-blue-500 bg-white p-3 text-sm leading-6 text-slate-700">
            <span className="font-semibold text-slate-950">Example:</span> {topic.example}
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function KnowledgeArtifacts() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory>(categories[0]);
  const [expandedTopicKey, setExpandedTopicKey] = useState<string | null>(null);
  const trimmedQuery = query.trim();
  const matchingTopics = useMemo(() => topics.filter((topic) => topicMatches(topic, trimmedQuery)), [trimmedQuery]);
  const visibleTopics = useMemo(
    () => topics.filter((topic) => topic.category === selectedCategory && (!trimmedQuery || topicMatches(topic, trimmedQuery))),
    [selectedCategory, trimmedQuery],
  );

  function handleQueryChange(value: string) {
    setQuery(value);
    const nextQuery = value.trim();
    if (!nextQuery) {
      setExpandedTopicKey(null);
      return;
    }

    const firstMatch = topics.find((topic) => topicMatches(topic, nextQuery));
    if (!firstMatch) {
      setExpandedTopicKey(null);
      return;
    }

    setSelectedCategory(firstMatch.category);
    setExpandedTopicKey(getTopicKey(firstMatch));
  }

  function handleCategoryChange(value: KnowledgeCategory | null) {
    if (!value) return;
    setSelectedCategory(value as KnowledgeCategory);
    setExpandedTopicKey(null);
  }

  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
            <BookOpenText className="size-4" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">BA Knowledge Hub</p>
            <h2 className="text-lg font-semibold text-slate-950">Knowledge Artifacts</h2>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">Keep the core BA concepts visible while writing requirements, stories, criteria, and traceability notes.</p>
      </div>
      <div className="mb-5 flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50/70 px-3">
        <Search className="size-4 shrink-0 text-blue-700" />
        <input
          id="glossary-search"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Search categories, topics, or examples..."
          className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
        />
      </div>
      <div className="mb-5 grid gap-2 sm:max-w-xs">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="h-10 w-full border-blue-100 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        {trimmedQuery ? (
          <div className="text-sm font-medium text-slate-600">
            {matchingTopics.length} matching topic{matchingTopics.length === 1 ? "" : "s"}
          </div>
        ) : null}
        {visibleTopics.length ? (
          visibleTopics.map((topic) => {
            const topicKey = getTopicKey(topic);
            return (
              <TopicCard
                key={topicKey}
                topic={topic}
                expanded={expandedTopicKey === topicKey}
                onToggle={() => setExpandedTopicKey(expandedTopicKey === topicKey ? null : topicKey)}
              />
            );
          })
        ) : (
          <p className="rounded-md border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">No matching topics found in this category.</p>
        )}
        </div>
    </section>
  );
}
