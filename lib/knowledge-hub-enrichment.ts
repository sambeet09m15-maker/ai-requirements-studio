export const conceptMapNodes = [

  // ── SDLC HIERARCHY — cross-cutting
  { id: "sdlc",         label: "SDLC",                  category: "methodology", x: 50, y: 5,
    description: "Software Development Life Cycle — the complete journey used to plan, design, build, test, deploy, and improve a software product through clear, repeatable stages. Every other concept in this map fits somewhere inside the SDLC." },
  { id: "agile",        label: "Agile",                 category: "methodology", x: 36, y: 9,
    description: "A way of building software in small, repeated cycles instead of one long plan. Teams deliver a small working piece, get feedback, then adjust — rather than waiting until the end to show anything." },
  { id: "waterfall",    label: "Waterfall",             category: "methodology", x: 50, y: 9,
    description: "The traditional approach where each phase — requirements, design, build, test, deploy — finishes completely before the next one starts. Works well when requirements are well understood and unlikely to change." },
  { id: "hybrid",       label: "Hybrid",                category: "methodology", x: 65, y: 9,
    description: "A blend of Agile and Waterfall. High-level planning and budget approval follows a Waterfall-style upfront process, while day-to-day delivery runs in Agile sprints. Common in large enterprises and regulated industries." },
  { id: "scrum",        label: "Scrum",                 category: "methodology", x: 29, y: 14,
    description: "The most common way teams run Agile in practice. Work happens in fixed-length sprints (1–4 weeks) with defined roles — Product Owner, Scrum Master, and the Development Team — and four regular ceremonies." },
  { id: "kanban",       label: "Kanban",                category: "methodology", x: 45, y: 14,
    description: "A visual way to manage ongoing work without fixed time cycles. Work items move across columns (To Do, In Progress, Done) with limits on how many can be active at once. Suits support teams and continuous delivery flows." },

  // ── ROLES ROW 1 — strategic
  { id: "pm",           label: "Project Manager",       category: "roles",       x: 20, y: 18,
    description: "The person responsible for planning, executing, and closing the project on time and within budget. A PM coordinates across teams, manages risks, and reports progress to stakeholders. In Agile, PM responsibilities are often shared with the Product Owner and Scrum Master." },
  { id: "stakeholder",  label: "Stakeholder",           category: "roles",       x: 39, y: 18,
    description: "Anyone with an interest in or influence over the outcome of a project — including users, funders, regulators, and anyone whose work the system affects. Identifying all stakeholders early prevents late-stage surprises and missed requirements." },
  { id: "ba",           label: "Business Analyst",      category: "roles",       x: 59, y: 18,
    description: "The person who translates business needs into clear, buildable requirements. The BA bridges the gap between what stakeholders want and what the development team builds — through analysis, documentation, facilitation, and communication throughout the project." },
  { id: "po",           label: "Product Owner",         category: "roles",       x: 80, y: 18,
    description: "The person who owns the product backlog and decides what gets built next. The Product Owner represents business value and priority. In many teams the BA supports the PO by writing detailed user stories and acceptance criteria." },

  // ── ROLES ROW 2 — delivery
  { id: "scrum_master", label: "Scrum Master",          category: "roles",       x: 35, y: 21,
    description: "The person responsible for ensuring the Scrum framework is followed and the team can work without blockers. The Scrum Master facilitates ceremonies, removes impediments, and protects the team from interruptions — a servant-leader, not a traditional manager." },
  { id: "developer",    label: "Developer",             category: "roles",       x: 53, y: 21,
    description: "The person who builds the software from user stories and acceptance criteria. Developers are the primary consumers of requirements — unclear or incomplete requirements directly increase developer effort and rework. A strong BA-Developer relationship is one of the biggest factors in delivery quality." },
  { id: "tester",       label: "Tester",                category: "roles",       x: 69, y: 21,
    description: "The person responsible for verifying that the built software meets the agreed requirements. Testers write and execute test cases based on acceptance criteria and test scenarios. The quality of a BA's requirements directly determines how precisely a tester can verify the system." },

  // ── PROJECT PLANNING
  { id: "budget_plan",  label: "Budget Planning",       category: "discovery",   x: 30, y: 28,
    description: "The process of estimating and approving the financial resources needed to deliver a project. A BA contributes by defining the scope of work, which forms the basis for cost estimates. Budget approval typically gates the start of formal discovery and delivery." },
  { id: "resource_plan",label: "Resource Planning",     category: "discovery",   x: 52, y: 28,
    description: "The process of identifying and allocating the people, tools, and time needed to deliver a project. A BA helps by defining what skills are required, which roles need to be involved, and when each stakeholder's input is needed throughout the lifecycle." },
  { id: "raci",         label: "RACI Matrix",           category: "techniques",  x: 72, y: 28,
    description: "A matrix that clarifies who does what on a project. R = Responsible (does the work), A = Accountable (owns the outcome), C = Consulted (provides input), I = Informed (kept up to date). Prevents decisions falling through the cracks." },

  // ── DISCOVERY & REQUIREMENTS ROW 1 — activities
  { id: "req_gathering",label: "Requirement Gathering", category: "discovery",   x: 14, y: 35,
    description: "The process of finding out what the business actually needs, directly from the people who need it — through interviews, workshops, surveys, or observation. Poor gathering is the most common cause of building the wrong thing." },
  { id: "gap_analysis", label: "Gap Analysis",          category: "discovery",   x: 34, y: 35,
    description: "A technique that compares the current state (how things work now) against the desired future state (how things should work). The difference between the two becomes the list of requirements or work needed to close the gap." },
  { id: "asis_flow",    label: "As-Is Process Flow",    category: "discovery",   x: 53, y: 35,
    description: "A visual diagram showing how a current business process actually works today — its steps, decision points, and actors. A BA creates this during discovery to document the existing state before recommending changes. It forms one half of the Gap Analysis picture." },
  { id: "tobe_flow",    label: "To-Be Process Flow",    category: "discovery",   x: 74, y: 35,
    description: "A visual diagram showing how a business process should work after the new system is implemented. Created alongside the As-Is Process Flow to show the improvement. The difference between As-Is and To-Be becomes the scope of requirements." },
  { id: "use_case",     label: "Use Case",              category: "artifacts",   x: 91, y: 35,
    description: "A structured description of how a user interacts with a system to achieve a specific goal — including the main success path and what can go wrong. More detailed than a user story, suited to complex multi-step interactions with multiple actors involved." },

  // ── DISCOVERY & REQUIREMENTS ROW 2 — documentation
  { id: "brd",          label: "BRD",                   category: "artifacts",   x: 24, y: 39,
    description: "Business Requirements Document — captures what the business needs and why, at a high level, before any technical design begins. Answers 'what problem are we solving' rather than 'how will it be built'. Common in Waterfall and Hybrid projects." },
  { id: "frd",          label: "FRD",                   category: "artifacts",   x: 35, y: 39,
    description: "Functional Requirements Document — turns the business need from a BRD into specific, detailed system behaviour. Describes exactly what the system must do, screen by screen or function by function, in enough detail for developers to build from." },
  { id: "epic",         label: "Epic",                  category: "artifacts",   x: 46, y: 39,
    description: "A large body of work too big to deliver in one sprint, made up of several smaller user stories. Represents a broad goal — like 'Customer Order Tracking' — that gets broken down into Features and User Stories over multiple sprints." },
  { id: "feature",      label: "Feature",               category: "artifacts",   x: 58, y: 39,
    description: "A distinct piece of functionality that delivers value to the user, sitting between an Epic and a User Story in size. A Feature is something a user would recognise as 'a thing the product can do', like 'Real-time GPS tracking'." },
  { id: "user_story",   label: "User Story",            category: "artifacts",   x: 73, y: 39,
    description: "A short, plain-English description of functionality written from the user's point of view. Follows the format: 'As a [user], I want [goal], so that [benefit].' Small enough to build and test within a single sprint." },

  // ── DISCOVERY & REQUIREMENTS ROW 3 — quality and prioritisation
  { id: "ac",           label: "Acceptance Criteria",   category: "artifacts",   x: 19, y: 42,
    description: "The specific, testable conditions a user story must meet to be considered complete. Agreed before development starts so there is no ambiguity about what 'done' means. Often written in Given-When-Then (Gherkin) format." },
  { id: "gherkin",      label: "Gherkin",               category: "artifacts",   x: 38, y: 42,
    description: "A simple sentence structure for writing testable acceptance criteria. Given [starting condition], When [action taken], Then [expected result]. Forces requirements to be specific enough that a developer and tester read them identically." },
  { id: "moscow",       label: "MoSCoW",                category: "techniques",  x: 52, y: 42,
    description: "A prioritisation technique that sorts requirements into four buckets: Must have (critical), Should have (important), Could have (nice-to-have), and Won't have this time (explicitly out of scope). Prevents scope creep arguments." },
  { id: "invest",       label: "INVEST",                category: "techniques",  x: 66, y: 42,
    description: "A checklist for judging whether a user story is well written: Independent, Negotiable, Valuable, Estimable, Small, and Testable. A story that fails any of these letters needs to be rewritten before development begins." },
  { id: "backlog",      label: "Product Backlog",       category: "techniques",  x: 82, y: 42,
    description: "The single ranked list of everything that might get built — features, fixes, technical tasks, and ideas. Built during requirements by adding Epics, Features, and User Stories. Owned by the Product Owner and constantly refined throughout delivery." },

  // ── DESIGN
  { id: "arch_design",      label: "Architecture Design", category: "design",    x: 17, y: 51,
    description: "The high-level blueprint of how a system's components fit together — its layers, services, integrations, and data flows. A BA contributes by confirming that the proposed structure supports all the functional and non-functional requirements." },
  { id: "db_design",        label: "Database Design",     category: "design",    x: 40, y: 51,
    description: "The design of how data will be structured, stored, and related in the system. A BA contributes by defining the entities, attributes, and relationships implied by the requirements — what data needs to exist and how it connects." },
  { id: "interface_design", label: "Interface Design",    category: "design",    x: 61, y: 51,
    description: "The design of the user-facing screens and interactions. A BA contributes wireframes, user journey flows, and UI requirements that ensure the interface reflects how users actually work — not just what looks good on screen." },
  { id: "component_design", label: "Component Design",    category: "design",    x: 84, y: 51,
    description: "The detailed design of individual system components or modules. A BA ensures that each component is specified well enough for developers to build it correctly and for testers to verify it against the original requirements." },

  // ── DEVELOPMENT
  { id: "training_plan",label: "Training Plan",          category: "artifacts",  x: 9,  y: 57,
    description: "A document outlining how users will be trained on a new system before go-live — covering what will be taught, who will be trained, in what format, and when. Created during Development so training materials are ready before Deployment. BAs often own this artefact." },
  { id: "dor",          label: "Definition of Ready",    category: "techniques", x: 28, y: 57,
    description: "The checklist a user story must pass before the development team agrees to work on it. Typically requires a clear description, written acceptance criteria, and no unresolved open questions. The BA is usually responsible for getting a story to Ready before it enters a sprint." },
  { id: "sprint_plan",  label: "Sprint Planning",        category: "ceremonies", x: 48, y: 57,
    description: "The ceremony at the start of each sprint where the team decides what to build. Top-priority backlog items are selected, a sprint goal is agreed, and stories that are already clear and ready are committed to. A BA attends to answer any last-minute questions." },
  { id: "refinement",   label: "Backlog Refinement",     category: "ceremonies", x: 68, y: 57,
    description: "An ongoing ceremony where the team reviews upcoming backlog items. Vague stories get clarified, oversized stories get broken down, and estimates are discussed. This is where a BA does the bulk of their day-to-day work in an Agile team." },
  { id: "dod",          label: "Definition of Done",     category: "techniques", x: 89, y: 57,
    description: "The development team's checklist for when a user story is truly finished — typically: code complete, tested, reviewed, and meeting all acceptance criteria. Prevents 'done' from meaning different things to different people and ensures consistent quality across sprints." },

  // ── TESTING ROW 1: STLC → Test Scenario → Test Case → Functional → SIT
  { id: "stlc",          label: "STLC",                   category: "testing",   x: 10, y: 64,
    description: "Software Testing Life Cycle — the structured process testers follow to verify a system works correctly before go-live. Phases include test planning, test case design, environment setup, test execution, and closure reporting. All test types below sit within STLC." },
  { id: "test_scenario", label: "Test Scenario",          category: "testing",   x: 24, y: 64,
    description: "A high-level situation to test — for example, 'customer applies a discount code at checkout'. One scenario covers a broad situation. A BA typically defines the scenarios; testers write the detailed test cases from them." },
  { id: "test_case",     label: "Test Case",              category: "testing",   x: 41, y: 64,
    description: "The detailed, step-by-step version of a test scenario — including exact inputs, actions, and expected results. One scenario typically breaks into several test cases covering the happy path, error paths, and boundary conditions." },
  { id: "functional_test",label: "Functional Testing",   category: "testing",   x: 59, y: 64,
    description: "Verification that each feature of the system works exactly as specified in the requirements. Testers execute test cases against the acceptance criteria — a BA's quality of requirements directly determines how precisely functional testing can verify the system." },
  { id: "sit",           label: "Sys. Integration (SIT)", category: "testing",  x: 82, y: 64,
    description: "System Integration Testing — verifies that multiple systems or components work correctly together as an integrated whole. Especially important when a new system must connect to existing platforms such as ERP, payment gateway, or third-party APIs." },

  // ── TESTING ROW 2: Smoke → Regression → UAT → UAT Approval
  { id: "smoke_test",    label: "Smoke Testing",          category: "testing",   x: 23, y: 68,
    description: "A quick, preliminary test run after a new build is deployed to confirm that the most critical functions work at all before full testing begins. If smoke tests fail, the build is rejected and sent back for fixes without wasting the full testing cycle." },
  { id: "regression_test",label: "Regression Testing",   category: "testing",   x: 44, y: 68,
    description: "Testing that ensures new changes or bug fixes have not broken any existing functionality that previously worked. Run after every significant code change. A BA helps prioritise which regression scenarios matter most based on business impact." },
  { id: "uat",           label: "UAT",                    category: "testing",   x: 62, y: 68,
    description: "User Acceptance Testing — the final check where real business users confirm the system works for them, just before go-live. Performed by actual stakeholders, not developers. A BA typically coordinates UAT as they understand both the business need and the built solution." },
  { id: "uat_approval",  label: "UAT Approval",           category: "techniques",x: 76, y: 68,
    description: "The formal sign-off by business stakeholders confirming that the system meets their requirements and they are ready to go live. A BA facilitates and documents this approval, which acts as the gate between testing completion and deployment." },

  // ── DEPLOYMENT
  { id: "dep_planning",  label: "Deployment Planning",    category: "deployment",x: 22, y: 74,
    description: "The process of defining how the new system will be released — including timing, rollout approach (big bang vs phased), rollback plan, and stakeholder communication. A BA confirms all acceptance criteria have been met before the deployment date is committed." },
  { id: "env_setup",     label: "Environment Setup",      category: "deployment",x: 46, y: 74,
    description: "The preparation of staging, UAT, and production environments before deployment. A BA ensures these environments reflect real business conditions — correct data volumes, user permissions, and integrations — so testing and go-live are meaningful." },
  { id: "deployment_node",label: "Deployment",            category: "deployment",x: 67, y: 74,
    description: "The act of releasing the built and tested system to the live environment. A BA monitors this process to confirm the deployed system matches what was agreed in requirements and flags any discrepancies before users are impacted." },
  { id: "go_live",       label: "Go Live",                category: "deployment",x: 83, y: 74,
    description: "The moment the new system becomes available to real users. A BA coordinates readiness across business teams — confirming training is complete, support processes are in place, and stakeholders know what to expect — then monitors early adoption to catch issues quickly." },

  // ── PRODUCTION SUPPORT
  { id: "change_management",label: "Change Management",  category: "techniques",x: 25, y: 81,
    description: "The structured approach to transitioning users, teams, and processes to a new system or way of working. A BA helps prepare stakeholders by planning communications, coordinating training, and assessing readiness before and during go-live." },
  { id: "change_request",label: "Change Request",        category: "artifacts",  x: 48, y: 81,
    description: "A formal request to modify an existing live system. Triggers a mini-requirements cycle — the BA analyses the impact, documents the change, and adds approved items back to the product backlog for prioritisation." },
  { id: "continuous_improvement",label: "Continuous Improvement",category: "techniques",x: 73, y: 81,
    description: "The ongoing practice of reviewing how a live system performs against real business needs — then feeding improvements, fixes, and enhancements back into the product backlog. Closes the loop between go-live and long-term value realisation." },
];

export const conceptMapEdges = [
  { from: "sdlc",          to: "agile",         label: "includes"         },
  { from: "sdlc",          to: "waterfall",     label: "includes"         },
  { from: "sdlc",          to: "hybrid",        label: "includes"         },
  { from: "agile",         to: "scrum",         label: "implemented as"   },
  { from: "agile",         to: "kanban",        label: "implemented as"   },
  { from: "stakeholder",   to: "req_gathering", label: "provides input to"},
  { from: "ba",            to: "req_gathering", label: "leads"            },
  { from: "ba",            to: "user_story",    label: "writes"           },
  { from: "ba",            to: "raci",          label: "creates"          },
  { from: "po",            to: "backlog",       label: "owns"             },
  { from: "req_gathering", to: "brd",           label: "produces"         },
  { from: "req_gathering", to: "gap_analysis",  label: "uses"             },
  { from: "gap_analysis",  to: "brd",           label: "informs"          },
  { from: "raci",          to: "stakeholder",   label: "defines roles of" },
  { from: "brd",           to: "frd",           label: "elaborated into"  },
  { from: "brd",           to: "epic",          label: "broken into"      },
  { from: "epic",          to: "feature",       label: "broken into"      },
  { from: "feature",       to: "user_story",    label: "broken into"      },
  { from: "user_story",    to: "invest",        label: "validated by"     },
  { from: "user_story",    to: "ac",            label: "has"              },
  { from: "user_story",    to: "backlog",       label: "placed in"        },
  { from: "moscow",        to: "backlog",       label: "prioritises"      },
  { from: "ac",            to: "gherkin",       label: "written using"    },
  { from: "backlog",       to: "dor",           label: "filtered by"      },
  { from: "dor",           to: "sprint_plan",   label: "feeds into"       },
  { from: "backlog",       to: "refinement",    label: "prepared in"      },
  { from: "scrum",         to: "sprint_plan",   label: "includes"         },
  { from: "scrum",         to: "refinement",    label: "includes"         },
  { from: "dod",           to: "uat",           label: "verified by"      },
  { from: "stlc",          to: "uat",           label: "includes"         },
  { from: "uat",           to: "test_scenario", label: "uses"             },
  { from: "test_scenario", to: "test_case",     label: "broken into"      },
  { from: "ac",            to: "test_scenario", label: "drives"           },
  { from: "pm",            to: "raci",          label: "creates"          },
  { from: "pm",            to: "budget_plan",   label: "owns"             },
  { from: "pm",            to: "resource_plan", label: "owns"             },
  { from: "scrum_master",  to: "sprint_plan",   label: "facilitates"      },
  { from: "scrum_master",  to: "refinement",    label: "facilitates"      },
  { from: "developer",     to: "dor",           label: "checks"           },
  { from: "developer",     to: "dod",           label: "works toward"     },
  { from: "tester",        to: "uat",           label: "leads"            },
  { from: "tester",        to: "test_case",     label: "writes"           },
  { from: "req_gathering",  to: "asis_flow",          label: "produces"      },
  { from: "gap_analysis",   to: "tobe_flow",          label: "defines"       },
  { from: "stlc",           to: "functional_test",    label: "includes"      },
  { from: "stlc",           to: "sit",                label: "includes"      },
  { from: "stlc",           to: "smoke_test",         label: "includes"      },
  { from: "stlc",           to: "regression_test",    label: "includes"      },
  { from: "uat",            to: "uat_approval",       label: "leads to"      },
  { from: "dep_planning",   to: "env_setup",          label: "precedes"      },
  { from: "env_setup",      to: "deployment_node",    label: "enables"       },
  { from: "deployment_node",to: "go_live",            label: "leads to"      },
  { from: "change_request", to: "backlog",            label: "feeds into"    },
  { from: "continuous_improvement",to: "backlog",     label: "feeds into"    },
];

export const conceptMapCategories: Record<string, { label: string; color: string }> = {
  methodology: { label: "Methodology", color: "#0D9488" },
  roles: { label: "Roles", color: "#7C3AED" },
  discovery: { label: "Discovery", color: "#EA580C" },
  artifacts: { label: "Artifacts", color: "#1D4ED8" },
  techniques: { label: "Techniques", color: "#B45309" },
  ceremonies: { label: "Ceremonies", color: "#BE185D" },
  testing: { label: "Testing", color: "#065F46" },
  design: { label: "Design", color: "#4338CA" },
  deployment: { label: "Deployment", color: "#C2410C" },
  production: { label: "Production Support", color: "#374151" },
};

export const sdlcPhases = [
  { id: "hierarchy",   label: "SDLC Hierarchy",          yStart: 1,  yEnd: 23 },
  { id: "planning",    label: "Project Planning",         yStart: 24, yEnd: 31 },
  { id: "discovery",   label: "Discovery & Requirements", yStart: 32, yEnd: 45 },
  { id: "design",      label: "Design",                   yStart: 46, yEnd: 55 },
  { id: "development", label: "Development",              yStart: 56, yEnd: 60 },
  { id: "testing",     label: "Testing — within STLC ↓", yStart: 61, yEnd: 71 },
  { id: "deployment",  label: "Deployment",               yStart: 72, yEnd: 77 },
  { id: "production",  label: "Production Support",       yStart: 78, yEnd: 86 },
];

export const requirementAutopsy = {
  domain: "Logistics & Supply Chain",
  icon: "🚚",
  rawRequirement: "The system should track shipments in real time and notify the operations team when a delivery is delayed.",
  qualityCheck: {
    title: "Step 1 — Requirement Quality Check",
    subtitle: "What is vague and why it matters",
    vagueTerms: [
      {
        term: "real time",
        problem: "'Real time' has no defined threshold. Does it mean updates every 5 seconds, every 5 minutes, or every hour? A developer and a stakeholder will build two very different systems based on this.",
        fix: "Define the update frequency: 'The system must update shipment status within 5 minutes of a scan event at any courier checkpoint.'"
      },
      {
        term: "notify the operations team",
        problem: "'Notify' does not specify channel (email, SMS, in-app alert, dashboard flag), and 'operations team' does not specify who exactly — one person? A shared inbox? All team members?",
        fix: "Define the channel and recipient: 'The system must send an in-app alert and an email to the assigned operations coordinator when a delivery is flagged as delayed.'"
      },
      {
        term: "delayed",
        problem: "'Delayed' has no trigger condition. Delayed by how much? Compared to what — the original promised date, the courier's estimated time, or an internal SLA?",
        fix: "Define the trigger: 'A shipment is considered delayed when its current estimated arrival time exceeds the original promised delivery date by more than 2 hours.'"
      }
    ],
    improvedRequirement: "The system must update shipment status within 5 minutes of a courier checkpoint scan. When a shipment's estimated arrival time exceeds the promised delivery date by more than 2 hours, the system must automatically send an in-app alert and email to the assigned operations coordinator, including the shipment ID, current location, and new estimated arrival time."
  },
  gapAnalysis: {
    title: "Step 2 — Gap Analysis",
    subtitle: "Where things are now vs where they need to be",
    currentState: [
      "Operations staff manually check the courier partner's website every 2–3 hours to look for delays.",
      "When a delay is spotted, the team coordinator sends a manual WhatsApp message to the relevant team member.",
      "There is no central record of which shipments were delayed, when the alert was sent, or what action was taken.",
      "Average time between a delay occurring and the team becoming aware of it: 3–4 hours."
    ],
    desiredState: [
      "The system automatically receives status updates from courier partners via API every 5 minutes.",
      "When a delay threshold is breached, the system immediately notifies the assigned coordinator via in-app alert and email.",
      "Every delay event is logged with timestamp, shipment ID, coordinator notified, and resolution status.",
      "Average time between delay event and team awareness: under 10 minutes."
    ],
    gap: "The core gap is the absence of automated data ingestion from courier partners and an automated alerting mechanism. The manual process creates a 3–4 hour blind spot that causes customer escalations and missed SLAs. Building the tracking and notification feature closes this gap directly."
  },
  moscow: {
    title: "Step 3 — MoSCoW Prioritisation",
    subtitle: "What is in scope and what is not — and why",
    mustHave: [
      "Real-time shipment status ingestion from courier partner API (every 5 minutes)",
      "Automated delay detection when ETA exceeds promised delivery date by more than 2 hours",
      "In-app alert to assigned operations coordinator on delay detection",
      "Email notification to assigned coordinator with shipment ID, location, and new ETA"
    ],
    shouldHave: [
      "A delay log showing all delayed shipments, timestamps, and coordinators notified",
      "Ability to manually mark a delay as resolved with a resolution note",
      "Dashboard widget showing count of active delays at any moment"
    ],
    couldHave: [
      "SMS notification as a secondary channel alongside email",
      "Customer-facing delay notification separate from internal operations alert",
      "Predictive delay warning based on shipment history"
    ],
    wontHave: [
      "Integration with more than one courier partner in this release",
      "AI-based root cause analysis of delay patterns",
      "Automated rebooking or rerouting of delayed shipments"
    ]
  },
  userStory: {
    title: "Step 4 — User Story (INVEST-Validated)",
    subtitle: "Written from the user's perspective, small enough to build in one sprint",
    primaryStory: {
      text: "As an operations coordinator, I want to receive an automatic alert when a shipment I am responsible for is delayed by more than 2 hours, so that I can proactively contact the customer and take corrective action before they call us.",
      investCheck: [
        { letter: "I", word: "Independent", result: "Yes — this story can be built and deployed without depending on the predictive delay or SMS features." },
        { letter: "N", word: "Negotiable",  result: "Yes — the 2-hour threshold and notification channel are open for discussion with stakeholders before sprint start." },
        { letter: "V", word: "Valuable",    result: "Yes — directly reduces the 3–4 hour blind spot that currently causes customer escalations." },
        { letter: "E", word: "Estimable",   result: "Yes — the team can size this once the courier API specification is confirmed." },
        { letter: "S", word: "Small",       result: "Yes — one sprint (2 weeks) is sufficient for the detection logic and notification dispatch." },
        { letter: "T", word: "Testable",    result: "Yes — a test shipment can be manually flagged as delayed to trigger and verify the alert." }
      ]
    },
    splitStories: [
      "As an operations coordinator, I want to see the current status of all active shipments on a dashboard so that I can identify delays at a glance without checking the courier website.",
      "As an operations coordinator, I want to receive an in-app alert when a shipment I own is delayed by more than 2 hours so that I know immediately without having to check.",
      "As an operations coordinator, I want to receive an email with the shipment ID, current location, and new ETA when a delay is detected so that I have the information I need to act."
    ]
  },
  acceptanceCriteria: {
    title: "Step 5 — Acceptance Criteria (Gherkin Format)",
    subtitle: "Three testable conditions the feature must meet to be considered complete",
    criteria: [
      {
        id: "AC-01",
        title: "Delay detection triggers correctly",
        given: "A shipment's original promised delivery date is 30 June 2026 at 14:00",
        when: "The courier API returns an updated ETA of 30 June 2026 at 16:15 (2 hours and 15 minutes after the promised time)",
        then: "The system flags the shipment as Delayed and triggers the notification workflow within 5 minutes of receiving the updated ETA"
      },
      {
        id: "AC-02",
        title: "In-app alert reaches the correct coordinator",
        given: "Shipment SHP-00482 is assigned to operations coordinator Priya Sharma",
        when: "The system detects a delay of more than 2 hours on SHP-00482",
        then: "An in-app alert appears in Priya Sharma's notification panel showing shipment ID SHP-00482, current location, and new estimated arrival time — and no alert is sent to any other coordinator"
      },
      {
        id: "AC-03",
        title: "Email is sent with correct content",
        given: "A delay alert has been triggered for shipment SHP-00482",
        when: "The notification system dispatches the email",
        then: "Priya Sharma receives an email within 10 minutes containing: subject line Delay Alert: SHP-00482, the shipment ID, the current courier checkpoint location, the new estimated arrival time, and a direct link to the shipment detail page — and the email is not sent to any other recipient"
      }
    ]
  },
  raci: {
    title: "Step 6 — RACI Matrix",
    subtitle: "Who owns each decision — agreed before development starts",
    tasks: [
      { task: "Define the delay threshold (2 hours)",       responsible: "Business Analyst",       accountable: "Operations Manager",  consulted: "Tech Lead, Finance",      informed: "Development Team"       },
      { task: "Write user stories and acceptance criteria", responsible: "Business Analyst",       accountable: "Product Owner",       consulted: "Operations Coordinator",  informed: "QA Team"                },
      { task: "Integrate courier partner API",              responsible: "Tech Lead",              accountable: "Engineering Manager", consulted: "Business Analyst",         informed: "Operations Manager"     },
      { task: "Design in-app alert UI",                     responsible: "UI Developer",           accountable: "Product Owner",       consulted: "Operations Coordinator",  informed: "Business Analyst"       },
      { task: "Configure email notification template",      responsible: "Developer",              accountable: "Tech Lead",           consulted: "Business Analyst",         informed: "Operations Manager"     },
      { task: "Perform UAT sign-off",                       responsible: "Operations Coordinator", accountable: "Operations Manager",  consulted: "QA Team",                  informed: "Product Owner"          },
    ]
  },
  uat: {
    title: "Step 7 — UAT Scenarios",
    subtitle: "What the business user tests before sign-off — not the developer",
    scenarios: [
      {
        id: "UAT-01",
        scenario: "Normal shipment with no delay",
        steps: [
          "Create a test shipment with a promised delivery time of today at 17:00",
          "Simulate courier updates showing the shipment on track",
          "Confirm no delay alert is triggered",
          "Confirm the operations coordinator's notification panel shows no new alerts"
        ],
        expectedResult: "No alert is sent. Shipment shows as On Track on the dashboard."
      },
      {
        id: "UAT-02",
        scenario: "Shipment delayed by exactly 2 hours (boundary test)",
        steps: [
          "Create a test shipment with a promised delivery time of today at 17:00",
          "Simulate a courier update showing new ETA of today at 19:00 (exactly 2 hours later)",
          "Wait up to 5 minutes",
          "Check whether an alert was triggered"
        ],
        expectedResult: "No alert is triggered. The threshold is more than 2 hours — exactly 2 hours does not cross it."
      },
      {
        id: "UAT-03",
        scenario: "Shipment delayed by 2 hours and 1 minute (threshold crossed)",
        steps: [
          "Create a test shipment with a promised delivery time of today at 17:00",
          "Simulate a courier update showing new ETA of today at 19:01",
          "Wait up to 5 minutes",
          "Check the operations coordinator's in-app notification panel",
          "Check the coordinator's email inbox"
        ],
        expectedResult: "In-app alert appears with correct shipment ID, location, and ETA. Email arrives within 10 minutes with all required fields. No other coordinator receives an alert."
      },
      {
        id: "UAT-04",
        scenario: "Two simultaneous delays owned by different coordinators",
        steps: [
          "Create two test shipments — one assigned to Coordinator A, one to Coordinator B",
          "Trigger a delay on both simultaneously",
          "Check both coordinators' notification panels and email inboxes"
        ],
        expectedResult: "Coordinator A receives only their shipment's alert. Coordinator B receives only their shipment's alert. Neither receives the other's alert."
      }
    ]
  }
};

export const situationGuide = [
  {
    category: "Requirements",
    categoryIcon: "📋",
    situations: [
      {
        id: "SIT-01",
        question: "My stakeholder keeps changing the requirements every week. What do I do?",
        quickAnswer: "Changing requirements are a signal, not a problem. They usually mean the stakeholder did not have enough clarity upfront, or the business environment changed. Your job is to turn that churn into a structured process.",
        steps: [
          "Run a Gap Analysis immediately — document the current state, desired state, and the specific change being requested. This creates a paper trail and forces the stakeholder to articulate exactly what changed and why.",
          "Apply MoSCoW to the new request. Ask: is this a Must Have for the current release, or can it wait? If it is a Could Have, log it in the backlog and protect the current sprint.",
          "If using Agile, channel changes through Backlog Refinement — not through direct developer conversations. Uncontrolled scope changes that bypass the backlog are the root cause of most requirement churn.",
          "If the stakeholder is a high-authority one, check your RACI matrix. If they are listed as Consulted rather than Accountable, their change requests need to go through the Accountable person first."
        ],
        relatedConcepts: ["Gap Analysis", "MoSCoW Prioritization", "Backlog Refinement", "RACI Matrix", "Product Backlog"]
      },
      {
        id: "SIT-02",
        question: "My stakeholder says 'I will know what I want when I see it.' How do I get a real requirement?",
        quickAnswer: "This is one of the most common situations a BA faces. The stakeholder is not being difficult — they genuinely cannot articulate needs in the abstract. The solution is to give them something concrete to react to.",
        steps: [
          "Stop asking open-ended questions. Instead, show them an existing system, a competitor's product, or a rough wireframe and ask: Is this more or less what you are thinking? Their reaction to something concrete gives you far more information than a blank-page conversation.",
          "Use a process flow diagram to walk through their current process step by step. For each step, ask: What works here? What does not? What would you want to be different? This surfaces requirements from real pain points rather than abstract wishes.",
          "Run a Gap Analysis together in the meeting. Write the current state on one side and ask them to describe the ideal future state. The gap between the two becomes the requirement list.",
          "Write a very rough first draft of the User Story yourself and share it with them: I think what you are describing is this — is that right? Being wrong on purpose is faster than waiting for them to find the right words."
        ],
        relatedConcepts: ["Requirement Gathering", "Gap Analysis", "Process Flow", "User Story"]
      },
      {
        id: "SIT-03",
        question: "A developer says my requirement is too vague to build. What do I fix?",
        quickAnswer: "A vague requirement almost always lacks one of three things: a defined actor, a defined trigger, or a defined measurable outcome. Check your requirement against all three before going back to the developer.",
        steps: [
          "Check INVEST — specifically the T (Testable) and E (Estimable) criteria. If a developer cannot estimate it, it is almost always because the outcome is not measurable. Fast response time is not testable. Response time under 2 seconds on a 4G connection is.",
          "Rewrite the requirement using the Gherkin format: Given [starting condition], When [action], Then [specific measurable outcome]. If you cannot fill in all three, you do not have enough information yet — go back to the stakeholder.",
          "Check whether your Acceptance Criteria are specific enough. Each criterion should be falsifiable — a tester should be able to write a test that either passes or fails against it, with no interpretation needed.",
          "If the ambiguity is about a business rule, escalate to the stakeholder and get the rule in writing before continuing."
        ],
        relatedConcepts: ["INVEST Criteria", "Gherkin (Given-When-Then)", "Acceptance Criteria", "User Story"]
      },
      {
        id: "SIT-04",
        question: "I have 30 requirements and no idea which to do first. How do I prioritise?",
        quickAnswer: "Never prioritise alone. Prioritisation without stakeholder input is just a BA's guess — it has no authority. Your job is to facilitate the decision, not make it unilaterally.",
        steps: [
          "Apply MoSCoW with the stakeholders in the room, not by yourself. Go through each requirement and ask: What happens to the business if we launch without this? Must Have = the launch fails. Should Have = it hurts but we can cope. Could Have = nice to have. Won't Have = not this time.",
          "After MoSCoW, check for dependencies. A Could Have that is technically required before a Must Have can be built effectively becomes a Must Have by constraint. Identify these before committing to the order.",
          "Use the Product Backlog to formalise the output. Every requirement gets a priority ranking, not just a label. The top of the backlog is what gets built first.",
          "If two stakeholders disagree on priority, do not adjudicate. Escalate to the Accountable person in your RACI matrix — that is exactly what the Accountable role exists for."
        ],
        relatedConcepts: ["MoSCoW Prioritization", "Product Backlog", "RACI Matrix", "Stakeholder"]
      }
    ]
  },
  {
    category: "Stakeholders",
    categoryIcon: "🤝",
    situations: [
      {
        id: "SIT-05",
        question: "Two stakeholders want opposite things. Who do I listen to?",
        quickAnswer: "This is not a BA problem to solve — it is a governance problem. Your role is to surface the conflict clearly and escalate it to the right decision-maker, not to pick a side.",
        steps: [
          "Document both positions clearly and factually. Write down what Stakeholder A wants, what Stakeholder B wants, and specifically where they conflict. Keep emotion out of it.",
          "Check your RACI matrix. Who is Accountable for this feature or decision? That person — not you, not either stakeholder — is the one who breaks the tie.",
          "If the conflict is about scope, use MoSCoW to reframe the conversation. Move it from who wins to what does the business need to succeed in this release? That is a question both stakeholders can engage with more constructively.",
          "Document the final decision and who made it. Send a summary email confirming the agreed outcome. This protects you and creates accountability."
        ],
        relatedConcepts: ["RACI Matrix", "Stakeholder", "MoSCoW Prioritization"]
      },
      {
        id: "SIT-06",
        question: "I cannot get time in the diary with the key stakeholder. How do I move forward?",
        quickAnswer: "Blocked access to a key stakeholder is a project risk, not a personal problem. Escalate it as a risk — do not just keep sending meeting invites that get ignored.",
        steps: [
          "Log it as a formal risk in writing: Unable to confirm requirements for Feature X due to lack of access to [stakeholder name] since [date]. Risk: incorrect requirements built, rework required post-launch. Send this to the Accountable person in your RACI.",
          "Identify a proxy. Is there someone who works closely with the absent stakeholder — a delegate or deputy — who can answer requirement questions on their behalf?",
          "Use what you already have. Review existing process documents or previous project notes and draft your best interpretation of the requirements. Then send it to the stakeholder for written confirmation rather than waiting for a meeting.",
          "Set a clear deadline. In writing, state: If I do not receive confirmation by [date], I will proceed based on my current understanding as documented above. This creates a forcing function without being confrontational."
        ],
        relatedConcepts: ["RACI Matrix", "Stakeholder", "Requirement Gathering", "Gap Analysis"]
      }
    ]
  },
  {
    category: "Agile & Ceremonies",
    categoryIcon: "🔄",
    situations: [
      {
        id: "SIT-07",
        question: "The development team says a story is not ready to build. What did I miss?",
        quickAnswer: "A story rejected at Sprint Planning has almost always failed the Definition of Ready. Run through the DoR checklist against the story and you will find the gap within a few minutes.",
        steps: [
          "Check the Definition of Ready your team has agreed on. Common reasons a story fails DoR: no acceptance criteria written, open questions about a business rule, dependency on another story not yet built, or the story is too large to fit in one sprint.",
          "Check INVEST. A story rejected for being not clear enough almost always fails the T (Testable) check. Rewrite the acceptance criteria in Gherkin format and bring it back.",
          "If the story is too large, split it. Ask the team: What is the smallest piece of this that would still deliver value? That becomes the story for this sprint. The rest goes back into the backlog for refinement.",
          "If the gap is a missing business rule or data, take it back to the stakeholder immediately with a specific written question and a deadline for their answer."
        ],
        relatedConcepts: ["Definition of Ready", "INVEST Criteria", "Acceptance Criteria", "Gherkin (Given-When-Then)", "Backlog Refinement", "Sprint Planning"]
      },
      {
        id: "SIT-08",
        question: "The team completed a story but it does not match what the business expected. What went wrong?",
        quickAnswer: "This is almost always a Definition of Done or Acceptance Criteria failure. The story was built against the developer's interpretation rather than a testable, agreed specification.",
        steps: [
          "Compare the delivered output against the Acceptance Criteria. If the AC was met exactly, the problem is in how the AC was written. If the AC was not met, the problem is in the team's testing process before calling something done.",
          "Check whether UAT was performed by a business user. A developer marking their own story as done is not UAT. The Definition of Done should require business-side sign-off.",
          "For the immediate issue: document the gap between what was expected and what was delivered. Raise it as a new story in the backlog, not a bug if the AC was technically met.",
          "For future prevention: rewrite Acceptance Criteria for similar stories using Gherkin format. Given-When-Then forces a level of specificity that makes it very hard to interpret a requirement differently."
        ],
        relatedConcepts: ["Definition of Done", "Acceptance Criteria", "UAT", "Gherkin (Given-When-Then)", "Test Scenario"]
      },
      {
        id: "SIT-09",
        question: "My team is using Kanban but work keeps piling up and nothing gets finished. What is wrong?",
        quickAnswer: "A Kanban board where work piles up usually has one of two problems: no work-in-progress limits, or items are too large to move across the board in a reasonable time.",
        steps: [
          "Check whether your team has set WIP limits. Kanban's core discipline is limiting how many items can be In Progress at once. Without limits, people start new things instead of finishing existing ones.",
          "Check the size of items on your board. If individual items take more than a week to move from In Progress to Done, they are too large. Break them into pieces that complete within 2–3 days.",
          "Identify your bottleneck. Look at which column has the most items stuck in it — that is where your process is broken. The fix is always to address the bottleneck column, not to add more items to the board.",
          "Distinguish Kanban from chaos. Kanban has rules — WIP limits, pull-based flow, continuous improvement. If your team is using a visual board without the rules, it is not Kanban."
        ],
        relatedConcepts: ["Kanban", "Definition of Done", "Product Backlog"]
      }
    ]
  },
  {
    category: "Documentation",
    categoryIcon: "📄",
    situations: [
      {
        id: "SIT-10",
        question: "I do not know whether to write a BRD or user stories. Which one do I use?",
        quickAnswer: "The format follows the methodology. In Waterfall or Hybrid projects with formal sign-off gates, write a BRD. In Agile projects, write User Stories. In many real enterprises, you write both.",
        steps: [
          "Ask: does this project have a formal sign-off checkpoint before development begins? If yes, a BRD is likely required for steering committee or sponsor approval.",
          "Ask: is the team working in sprints? If yes, user stories are the currency of delivery — regardless of whether a BRD also exists.",
          "In a Hybrid project, write the BRD first to get approval, then decompose it into Epics, Features, and User Stories for sprint delivery. These are not competing formats — they serve different audiences at different stages.",
          "If you are unsure, ask your Project Manager or Product Owner what the delivery team needs to start building. Their answer tells you the format."
        ],
        relatedConcepts: ["BRD", "FRD", "User Story", "Epic", "Feature", "Waterfall", "Agile", "Hybrid (Agile + Waterfall)"]
      },
      {
        id: "SIT-11",
        question: "How detailed should my acceptance criteria be?",
        quickAnswer: "Detailed enough that a tester who has never spoken to the stakeholder can write a test that passes or fails against each criterion without making any assumptions.",
        steps: [
          "Use Gherkin format as your starting point. Given-When-Then forces you to specify a starting condition, an action, and a measurable outcome.",
          "Write at least one AC for each of these: the happy path, an error or failure path, and a boundary condition — what happens at the edge of a rule.",
          "Test your AC by asking: could a developer build two completely different things and both claim to meet this criterion? If yes, it is not specific enough.",
          "Avoid AC that describes the UI in detail unless the visual presentation is genuinely a business requirement. Focus on what the user experiences, not how it is built."
        ],
        relatedConcepts: ["Acceptance Criteria", "Gherkin (Given-When-Then)", "INVEST Criteria", "Test Scenario", "UAT"]
      }
    ]
  }
];
