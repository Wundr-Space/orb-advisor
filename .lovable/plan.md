

## Summary

Add a two-step onboarding flow where users first select their journey type (Job Seeker or Recruiter), then select their communication mode (Voice or Text). Each journey has different AI prompts, and the Recruiter journey ends with mock applicant cards instead of job recommendations.

## Current Flow
```text
Home Screen → Select Mode (Voice/Text) → Chat → Job Cards
```

## New Flow
```text
Home Screen → Select Journey (Job Seeker/Recruiter) → Select Mode (Voice/Text) → Chat → Results
                     ↓                                                                    ↓
              Job Seeker: Job Cards                                           Recruiter: Applicant Cards
```

## Technical Implementation

### 1. Create User Type Selector Component
**New File:** `src/components/UserTypeSelector.tsx`

A new component with two large buttons:
- **"I'm looking for a job"** (Briefcase icon) - Sets user type to "jobseeker"
- **"I'm looking to hire"** (Users icon) - Sets user type to "recruiter"

Style will match the existing `ChatModeSelector` with animated buttons.

### 2. Update Index Page State Machine
**File:** `src/pages/Index.tsx`

Add new state:
```typescript
type UserType = "jobseeker" | "recruiter" | null;
const [userType, setUserType] = useState<UserType>(null);
```

Update the flow:
1. `userType === null` → Show `UserTypeSelector`
2. `userType !== null && chatMode === null` → Show `ChatModeSelector`
3. `chatMode === "voice"` → Voice chat
4. `chatMode === "text"` → Text chat

Update `handleBack`:
- From chat mode selection → Reset `userType` to `null`
- From chat → Reset `chatMode` to `null`

Update header text dynamically based on journey.

### 3. Create Recruiter-Specific Prompts
**File:** `src/constants/advisorPrompt.ts`

Add new exports:
- `RECRUITER_SYSTEM_PROMPT` - Instructions for recruiting advisor
- `RECRUITER_GREETING_PROMPT` - Initial greeting for recruiters

The recruiter prompt will:
- Ask for the recruiter's name first
- Ask about the role they're hiring for
- Gather required skills and experience
- Ask about company culture and team dynamics
- Provide a skills profile summary of the ideal candidate
- Generate mock applicant recommendations

### 4. Create Applicant Data Structure
**New File:** `src/data/applicantPersonas.ts`

Create 20-30 mock applicants with:
- Name, current role, years of experience
- Skill scores (using the same 26 skills)
- Brief bio/summary
- Availability status
- Location (South Wales focus)

### 5. Create Applicant Matching Hook
**New File:** `src/hooks/useApplicantRecommendations.ts`

Similar to `useJobRecommendations.ts`:
- Parse the conversation to extract required skills from the job description
- Match skills against applicant personas
- Calculate match scores
- Return top 8 matching applicants

### 6. Create Applicant Card Component
**New File:** `src/components/ApplicantMatchCard.tsx`

Display each applicant with:
- Name and current role
- Match percentage (using existing `ProfileBlobChart`)
- Matched skills badges
- Years of experience
- Brief bio snippet

### 7. Create Applicants Panel
**New File:** `src/components/ApplicantCardsPanel.tsx`

Similar to `JobCardsPanel.tsx`:
- Grid layout of applicant cards
- Header with back/chat buttons
- Footer with next steps:
  - "Schedule interviews"
  - "Save shortlist"

### 8. Update Text Chat Panel
**File:** `src/components/TextChatPanel.tsx`

- Accept `userType` prop to determine which panel to show
- Conditionally render `JobCardsPanel` or `ApplicantCardsPanel`
- Update header text based on journey type

### 9. Update Text Chat Hook
**File:** `src/hooks/useTextChat.ts`

- Accept `userType` parameter in `initiateConversation`
- Use appropriate system prompt based on user type
- Pass correct greeting prompt

### 10. Update Voice Chat Hook
**File:** `src/hooks/useRealtimeVoice.ts`

- Accept `userType` parameter in `startConversation`
- Use appropriate system prompt in WebSocket session config

### 11. Update Feature Hints on Home Screen
**File:** `src/pages/Index.tsx`

Change the feature hints based on selected journey:
- **Job Seeker:** "Skills Assessment", "Local Jobs", "Career Tips"
- **Recruiter:** "Role Definition", "Candidate Matching", "Hiring Tips"

## File Changes Summary

| File | Action |
|------|--------|
| `src/components/UserTypeSelector.tsx` | Create |
| `src/constants/advisorPrompt.ts` | Modify (add recruiter prompts) |
| `src/data/applicantPersonas.ts` | Create |
| `src/hooks/useApplicantRecommendations.ts` | Create |
| `src/components/ApplicantMatchCard.tsx` | Create |
| `src/components/ApplicantCardsPanel.tsx` | Create |
| `src/pages/Index.tsx` | Modify (add user type state/flow) |
| `src/components/TextChatPanel.tsx` | Modify (accept userType prop) |
| `src/hooks/useTextChat.ts` | Modify (accept userType param) |
| `src/hooks/useRealtimeVoice.ts` | Modify (accept userType param) |

## Technical Details

### Recruiter System Prompt Key Points:
- Ask for recruiter's name first
- One question at a time approach (same as job seeker)
- Gather: job title, department, required skills, experience level, salary range, team culture
- Track which of the 26 skills are mentioned as requirements
- Generate "Ideal Candidate Profile" summary
- Follow up with mock applicant recommendations

### Applicant Matching Algorithm:
1. Extract required skills from conversation (regex patterns like job matching)
2. For each applicant, check skill overlap
3. Calculate match score based on:
   - Number of matching skills
   - Applicant's proficiency level in those skills
4. Sort by match score, return top 8

### State Flow Diagram:
```text
┌─────────────────┐
│  userType=null  │ ← Initial state
│ chatMode=null   │
└────────┬────────┘
         │ Select "Job Seeker" or "Recruiter"
         ▼
┌─────────────────┐
│ userType=chosen │
│ chatMode=null   │ ← Show ChatModeSelector
└────────┬────────┘
         │ Select "Voice" or "Text"
         ▼
┌─────────────────┐
│ userType=chosen │
│ chatMode=chosen │ ← Chat interface
└────────┬────────┘
         │ Assessment complete
         ▼
┌─────────────────┐
│  Results Panel  │ ← JobCardsPanel or ApplicantCardsPanel
└─────────────────┘
```

