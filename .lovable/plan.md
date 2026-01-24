

## Summary

Add a recruiter demo mode that simulates a hiring manager describing a job they need to fill. The demo will randomly select a tech job from `jobsData.ts` and generate responses as if the recruiter is hiring for that position.

## Current State

The existing demo mode in `useDemoMode.ts`:
- Uses `DemoPersona` from `demoPersonas.ts` (job seeker profiles)
- Detects question types (name, greeting, skills, etc.)
- Generates job-seeker-style responses
- Does NOT accept `userType` - only works for job seekers

## New Flow

```text
Job Seeker Demo:
  - Selects random persona from demoPersonas.ts
  - Responds as someone looking for a job
  - Answers questions about their skills and experience

Recruiter Demo (NEW):
  - Selects random tech job from jobsData.ts
  - Responds as a hiring manager
  - Answers questions about the role they're hiring for
  - Describes required skills, salary, team dynamics
```

## Technical Implementation

### 1. Create Recruiter Demo Persona Data
**New File:** `src/data/recruiterDemoPersonas.ts`

Create a structure for recruiter personas that includes:
- Recruiter name and company
- The job they're hiring for (from `jobsData.ts`)
- Pre-built responses for common recruiter questions:
  - `askingName`: Introduce themselves
  - `roleDescription`: What position they're hiring for
  - `skills`: Required skills for the role
  - `experience`: Experience level needed
  - `salary`: Compensation details
  - `teamCulture`: Team dynamics and company culture
  - `timeline`: Hiring urgency
  - `challenges`: Current challenges in the role
  - `general`: Fallback responses

Include a helper function `getRandomRecruiterPersona()` that:
1. Filters `JOBS_DATA` to only tech jobs (using `isTechJob` logic)
2. Randomly selects one job
3. Returns a generated recruiter persona with that job's details

### 2. Update Demo Mode Hook
**File:** `src/hooks/useDemoMode.ts`

**Changes:**
- Add `userType` parameter to `startDemo(userType: UserType)`
- Add new type `RecruiterDemoPersona` for the recruiter persona structure
- Add new `RecruiterQuestionType` for detecting recruiter-specific questions
- Add `detectRecruiterQuestionType()` function to identify:
  - Name requests
  - Role/position questions
  - Skills requirements
  - Experience level
  - Salary/compensation
  - Team/culture questions
  - Timeline/urgency
  - General questions
- Update `generateResponse()` to check the user type and call the appropriate response generator
- Update toast notifications to show different info for recruiters (job title + company instead of career goal)

### 3. Update Text Chat Panel
**File:** `src/components/TextChatPanel.tsx`

**Changes:**
- Pass `userType` to `startDemo()` function call
- The demo button click handler already exists; just update the `startDemo` call

### 4. Update Return Type Interface
**File:** `src/hooks/useDemoMode.ts`

Update `UseDemoModeReturn` interface:
- Keep `currentPersona: DemoPersona | null` for job seekers
- Add `currentRecruiterPersona: RecruiterDemoPersona | null` for recruiters
- Update `startDemo` signature to accept `userType`

## File Changes Summary

| File | Action |
|------|--------|
| `src/data/recruiterDemoPersonas.ts` | Create |
| `src/hooks/useDemoMode.ts` | Modify |
| `src/components/TextChatPanel.tsx` | Modify (pass userType to startDemo) |

## Technical Details

### Recruiter Question Type Detection

The `detectRecruiterQuestionType` function will look for:

- **askingName**: "your name", "who am i speaking", "may i ask your name"
- **roleDescription**: "position", "role", "job", "hiring for", "what are you looking for"
- **skills**: "skills", "qualifications", "requirements", "looking for", "need", "must have"
- **experience**: "experience", "years", "senior", "junior", "level"
- **salary**: "salary", "compensation", "pay", "benefits", "package"
- **teamCulture**: "team", "culture", "environment", "work with", "colleagues"
- **timeline**: "when", "urgency", "start date", "timeline", "fill this"
- **challenges**: "challenges", "problems", "difficult", "issues", "why this role"

### Recruiter Response Generation

Responses will be dynamically generated based on the selected job's data:

```typescript
// Example for a "DevOps Engineer" role at "Comparethemarket" in Cardiff
{
  askingName: "I'm Alex, the Head of Engineering at Comparethemarket.",
  roleDescription: "We're looking for a DevOps Engineer to join our Cardiff team. It's a key role in our infrastructure team.",
  skills: "We really need someone strong in Programming and Networks & Cybersecurity. Systems thinking is also important for understanding our architecture.",
  experience: "We're looking for someone mid-level, probably 3-5 years of experience in a similar role.",
  salary: "The salary is around £58,000, competitive for the Cardiff market.",
  teamCulture: "We're a collaborative team that values continuous improvement. We work in agile sprints and everyone's input matters.",
  timeline: "We'd like to have someone start within the next 2-3 months if possible.",
  challenges: "Our main challenge is scaling our CI/CD pipelines as we grow. We need someone who can help us modernize our infrastructure.",
  general: ["This role is really pivotal for us.", "I'm excited about what this person could bring to the team."]
}
```

### Demo Completion Detection for Recruiters

The demo will end when the AI outputs an "Ideal Candidate Profile" or "Matching Candidates" signal (matching the recruiter system prompt's expected output format).

