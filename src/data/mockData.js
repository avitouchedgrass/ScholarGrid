export const INITIAL_SAVED_SCHOLARSHIPS = [
  {
    id: "sch-01",
    title: "Apex Tech Innovators Fellowship",
    provider: "Apex Foundation & NVIDIA",
    amount: 15000,
    matchScore: 98,
    deadline: "2026-08-20", // 7 days from current date
    status: "In Progress", // Saved | In Progress | Submitted | Awarded
    effortLevel: "High", // Low | Med | High
    essayCount: 2,
    reqLetterCount: 2,
    tags: ["Computer Science", "STEM", "Undergraduate", "Merit-Based"],
    verifiedCriteria: [
      { label: "Major: Computer Science / AI", passed: true },
      { label: "Minimum GPA: 3.50 (Current: 3.82)", passed: true },
      { label: "Demographic Tag: STEM Focus", passed: true },
      { label: "Required Essay: 750w Tech Innovation Narrative", passed: true, note: "Draft attached from Essay Vault" },
      { label: "Action Needed: 2 Recommendation Letters", passed: false, note: "1 of 2 letters requested" }
    ],
    workspace: {
      checklists: [
        { id: "c1", text: "Upload official college transcript (PDF)", completed: true },
        { id: "c2", text: "Attach 'STEM Innovation Pitch' essay (750w)", completed: true },
        { id: "c3", text: "Confirm Prof. Vance recommendation letter", completed: true },
        { id: "c4", text: "Confirm Dr. Aris recommendation letter", completed: false },
        { id: "c5", text: "Final review & submission portal link", completed: false }
      ],
      notes: "Submitted draft to Prof Vance for feedback. Needs final submission before Aug 20 midnight EST.",
      attachedEssayId: "ess-01"
    }
  },
  {
    id: "sch-02",
    title: "Quantum Leap Diversity Leadership Award",
    provider: "Google & IEEE Education Society",
    amount: 10000,
    matchScore: 94,
    deadline: "2026-08-16", // 3 days left (High Priority Urgent Alert!)
    status: "In Progress",
    effortLevel: "Med",
    essayCount: 1,
    reqLetterCount: 1,
    tags: ["First-Gen", "Underrepresented", "STEM", "National"],
    verifiedCriteria: [
      { label: "Eligibility: First-Generation College Student", passed: true },
      { label: "Major: Computer Engineering / CS", passed: true },
      { label: "Minimum GPA: 3.20 (Current: 3.82)", passed: true },
      { label: "Required Essay: 500w Leadership & Resilience", passed: true },
      { label: "Action Needed: FAFSA Verification Form", passed: true }
    ],
    workspace: {
      checklists: [
        { id: "c1", text: "Verify FAFSA SAI report attachment", completed: true },
        { id: "c2", text: "Attach 'Leadership Narrative' essay (500w)", completed: true },
        { id: "c3", text: "Submit via IEEE portal link", completed: false }
      ],
      notes: "Deadline in 3 days! Complete submission by tomorrow afternoon.",
      attachedEssayId: "ess-02"
    }
  },
  {
    id: "sch-03",
    title: "Pacific Horizon Community Impact Grant",
    provider: "California Higher Ed Trust",
    amount: 7500,
    matchScore: 91,
    deadline: "2026-08-15", // 2 days left (High Priority Urgent Alert!)
    status: "Saved",
    effortLevel: "Low",
    essayCount: 1,
    reqLetterCount: 0,
    tags: ["California Resident", "Community Service", "Need-Based"],
    verifiedCriteria: [
      { label: "State Residency: California Resident", passed: true },
      { label: "Verified Income Bracket: Under $60,000", passed: true },
      { label: "Minimum GPA: 3.00 (Current: 3.82)", passed: true },
      { label: "Community Service: 50+ Logged Hours", passed: true }
    ],
    workspace: {
      checklists: [
        { id: "c1", text: "Confirm CA State Residency proof", completed: true },
        { id: "c2", text: "Attach 'Community Service' essay (250w)", completed: false }
      ],
      notes: "Quick 250w essay needed. High match rate.",
      attachedEssayId: "ess-03"
    }
  },
  {
    id: "sch-04",
    title: "National Merit Future Founders Grant",
    provider: "Y Combinator & Thiel Foundation",
    amount: 25000,
    matchScore: 88,
    deadline: "2026-09-01",
    status: "Saved",
    effortLevel: "High",
    essayCount: 3,
    reqLetterCount: 2,
    tags: ["Entrepreneurship", "Merit-Based", "National"],
    verifiedCriteria: [
      { label: "Founding Experience or Open Source Project", passed: true },
      { label: "Minimum SAT/ACT: 1450+ (Current: 1520)", passed: true },
      { label: "Project Portfolio URL attached", passed: true },
      { label: "Action Needed: 3min Video Pitch URL", passed: false }
    ],
    workspace: {
      checklists: [
        { id: "c1", text: "Record 3-minute unlisted YouTube intro pitch", completed: false },
        { id: "c2", text: "Link GitHub repository portfolio", completed: true },
        { id: "c3", text: "Attach Founder Vision essay (1000w)", completed: false }
      ],
      notes: "High value scholarship. Work on pitch video next week.",
      attachedEssayId: null
    }
  },
  {
    id: "sch-05",
    title: "Silicon Valley NextGen Scholar Award",
    provider: "SV Technology Alliance",
    amount: 12000,
    matchScore: 96,
    deadline: "2026-07-28", // Past submitted date
    status: "Submitted",
    effortLevel: "Med",
    essayCount: 1,
    reqLetterCount: 1,
    tags: ["STEM", "Bay Area", "Computer Science"],
    verifiedCriteria: [
      { label: "Major: Computer Science", passed: true },
      { label: "GPA: 3.82", passed: true },
      { label: "All Application Documents Submitted", passed: true }
    ],
    workspace: {
      checklists: [
        { id: "c1", text: "Application submitted successfully", completed: true },
        { id: "c2", text: "Confirmation code received: SV-88912", completed: true }
      ],
      notes: "Submitted on July 28. Announcement date: Sept 15.",
      attachedEssayId: "ess-01"
    }
  },
  {
    id: "sch-06",
    title: "Women & Minority Engineers Excellence Fund",
    provider: "Society of Women Engineers",
    amount: 8000,
    matchScore: 99,
    deadline: "2026-06-15",
    status: "Awarded",
    effortLevel: "Med",
    essayCount: 1,
    reqLetterCount: 1,
    tags: ["STEM", "Minority", "Awarded"],
    verifiedCriteria: [
      { label: "Status: Fully Awarded ($8,000 disbursement verified)", passed: true }
    ],
    workspace: {
      checklists: [
        { id: "c1", text: "Disbursement check received & deposited", completed: true }
      ],
      notes: "Funds received for Fall 2026 semester tuition.",
      attachedEssayId: "ess-02"
    }
  }
];

export const MOCK_ESSAYS = [
  {
    id: "ess-01",
    title: "STEM Innovation & AI Pitch",
    wordCount: 742,
    targetWordCount: 750,
    tags: ["STEM", "Computer Science", "Innovation"],
    snippet: "My fascination with algorithm efficiency began when I observed how resource constraints impact localized data processing in underserved high school labs...",
    lastUpdated: "2026-08-10"
  },
  {
    id: "ess-02",
    title: "Leadership Narrative — Overcoming Barriers",
    wordCount: 498,
    targetWordCount: 500,
    tags: ["Leadership", "First-Gen", "Resilience"],
    snippet: "As a first-generation student navigating the complex landscape of higher education, leadership was not a title given to me, but a duty I assumed...",
    lastUpdated: "2026-08-11"
  },
  {
    id: "ess-03",
    title: "Community Service & Civic Tech",
    wordCount: 246,
    targetWordCount: 250,
    tags: ["Community", "Volunteering", "Local Impact"],
    snippet: "Volunteering 120+ hours building automated inventory tools for local food banks demonstrated how technical skills translate directly to civic relief...",
    lastUpdated: "2026-08-05"
  }
];
