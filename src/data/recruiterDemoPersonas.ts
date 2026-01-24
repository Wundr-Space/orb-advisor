import { JOBS_DATA, Job } from "./jobsData";

export interface RecruiterDemoPersona {
  id: string;
  name: string;
  title: string;
  company: string;
  job: Job;
  commonResponses: {
    askingName: string;
    roleDescription: string;
    skills: string;
    experience: string;
    salary: string;
    teamCulture: string;
    timeline: string;
    challenges: string;
    general: string[];
  };
}

// List of tech-related keywords to filter jobs
const TECH_KEYWORDS = [
  "engineer", "developer", "software", "data", "devops", "cloud",
  "machine learning", "cybersecurity", "analyst", "architect",
  "full stack", "ux", "designer", "product manager", "technical"
];

const RECRUITER_NAMES = [
  { name: "Sarah Mitchell", title: "Head of Engineering" },
  { name: "James Chen", title: "Talent Acquisition Lead" },
  { name: "Emma Williams", title: "HR Director" },
  { name: "Michael Thompson", title: "Engineering Manager" },
  { name: "Lisa Patel", title: "Tech Recruitment Manager" },
  { name: "David Roberts", title: "VP of Technology" },
  { name: "Rachel Hughes", title: "People Operations Lead" },
  { name: "Alex Morgan", title: "Senior Technical Recruiter" },
];

const TEAM_CULTURES = [
  "We're a collaborative team that values continuous improvement. We work in agile sprints and everyone's input matters.",
  "Our team is quite diverse with people from different backgrounds. We have regular team lunches and knowledge-sharing sessions.",
  "We're quite informal here - no rigid hierarchies. Everyone works together closely and we encourage innovation.",
  "It's a fast-paced environment but we're supportive. We have mentoring programs for new joiners.",
  "We believe in work-life balance. Flexible hours, remote options, and we trust people to manage their own time.",
];

const CHALLENGES = [
  "scaling our infrastructure as we grow rapidly",
  "modernizing our legacy systems to be more cloud-native",
  "improving our CI/CD pipelines and deployment processes",
  "handling increasing data volumes and real-time analytics needs",
  "building out new product features while maintaining quality",
  "strengthening our security posture across all services",
];

const TIMELINES = [
  "We'd like to have someone start within the next 2-3 months if possible.",
  "It's not super urgent - we want to find the right person rather than rush.",
  "We're looking to fill this fairly quickly, ideally within 4-6 weeks.",
  "This is a new position, so we're being thorough, probably 2-3 months.",
];

const isTechJob = (job: Job): boolean => {
  const titleLower = job.title.toLowerCase();
  return TECH_KEYWORDS.some(keyword => titleLower.includes(keyword));
};

const generateRecruiterPersona = (job: Job): RecruiterDemoPersona => {
  const recruiter = RECRUITER_NAMES[Math.floor(Math.random() * RECRUITER_NAMES.length)];
  const teamCulture = TEAM_CULTURES[Math.floor(Math.random() * TEAM_CULTURES.length)];
  const challenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
  const timeline = TIMELINES[Math.floor(Math.random() * TIMELINES.length)];
  
  const salaryText = job.salary 
    ? `around £${job.salary.toLocaleString()}, which is competitive for the ${job.location} market`
    : "competitive for the market - we're flexible depending on experience";
  
  const skillsText = job.skills.length > 0
    ? job.skills.slice(0, 3).join(", ")
    : "technical skills, problem-solving, and communication";

  return {
    id: `recruiter-${Date.now()}`,
    name: recruiter.name,
    title: recruiter.title,
    company: job.company,
    job,
    commonResponses: {
      askingName: `I'm ${recruiter.name}, ${recruiter.title} at ${job.company}. Nice to meet you!`,
      roleDescription: `We're looking for a ${job.title} to join our ${job.location} team. It's a key role that will be critical to our growth plans.`,
      skills: `We really need someone strong in ${skillsText}. These are essential for the day-to-day work in this role.`,
      experience: `We're looking for someone mid-level, probably 3-5 years of experience in a similar role. Though we're open to the right candidate with less experience if they show potential.`,
      salary: `The salary is ${salaryText}. We also have good benefits including pension, private healthcare, and flexible working.`,
      teamCulture: teamCulture,
      timeline: timeline,
      challenges: `Our main challenge right now is ${challenge}. This role will be key in helping us address that.`,
      general: [
        "This role is really pivotal for us right now.",
        "I'm excited about what the right person could bring to the team.",
        "We've got some great projects lined up for whoever joins.",
        "It's an interesting time to join - lots of opportunities for growth.",
        "The team is looking forward to welcoming someone new.",
      ],
    },
  };
};

export const getRandomRecruiterPersona = (): RecruiterDemoPersona => {
  // Filter to tech jobs
  const techJobs = JOBS_DATA.filter(isTechJob);
  
  // If no tech jobs found, use all jobs
  const jobPool = techJobs.length > 0 ? techJobs : JOBS_DATA;
  
  // Select a random job
  const randomJob = jobPool[Math.floor(Math.random() * jobPool.length)];
  
  return generateRecruiterPersona(randomJob);
};
