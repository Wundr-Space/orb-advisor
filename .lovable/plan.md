

# Job Recommendation Integration Plan

## Overview
Enhance the Career Advisor to use real South Wales job data after completing a skills assessment. The AI will match the user's top-scored skills against local job listings and recommend relevant opportunities.

## Data Structure (from uploaded file)
The job_skills_analysis.json contains:
- **500 local South Wales jobs** with title, company, and required skills
- **26 skills** mapped to which jobs require them
- Each job lists 1-7 skills it requires

## Implementation Approach

### 1. Store Job Data in Project
Copy the JSON file to the project's data directory so it can be imported and used by the AI prompts.

### 2. Create Job Matching Utility
Build a utility function that:
- Takes the user's assessed skills (with scores)
- Finds jobs that require their top skills (score 3+)
- Ranks jobs by how many of the user's strong skills they match
- Returns the top 5-10 matching jobs

### 3. Update System Prompt
Modify the advisor prompt to:
- Include instructions on when to provide job recommendations (after 5+ skills assessed)
- Explain how to present job matches with context about why they fit
- Format job suggestions attractively with company and skill match info

### 4. Enhance Edge Function
Update the text-chat edge function to:
- Accept optional job data context
- Allow the AI to reference specific local jobs when providing recommendations

## Technical Details

### Files to Create
1. `src/data/jobsData.ts` - Processed job data as TypeScript for imports

### Files to Modify
1. `src/constants/advisorPrompt.ts` - Add job recommendation instructions
2. `src/hooks/useTextChat.ts` - Include job matching context
3. `supabase/functions/text-chat/index.ts` - Handle larger context with job data

### Job Matching Algorithm
```text
For each job in dataset:
  - Count how many of user's "strong skills" (score >= 3) match job's required skills
  - Weight by skill score (higher scored skills = better match)
  - Return top matches sorted by match quality
```

### Updated Prompt Flow
```text
1. Conduct skills interview (existing)
2. After 5-8 skills assessed, offer summary
3. In summary, include:
   - Skills Snapshot (existing)
   - "Based on your strengths, here are local opportunities in South Wales:"
   - Top 3-5 job recommendations with:
     - Job title and company
     - Which of their strong skills apply
     - Why it's a good fit
```

### Sample Output Format
```text
**Your Skills Snapshot:**
- Analytical thinking: 4/5 (69% demand) - Strong problem-solving shown
- Leadership: 4/5 (61% demand) - Clear team coordination skills
- Customer Service: 3/5 (47% demand) - Good communication

**Recommended Jobs in South Wales:**

1. **Process Improvement Specialist** at Ryder Reid Legal Ltd
   - Matches your: Creative thinking, Customer service
   - Great fit for your analytical mindset

2. **HR Administrator / HR Advisor** at Goodfellow  
   - Matches your: Customer service, Resource management
   - Leverages your leadership experience

3. **Technical Training Specialist** at United Utilities
   - Matches your: Teaching, Customer service, Technology
   - Perfect for sharing your expertise
```

## Data Size Consideration
The full JSON is ~10K lines. Options:
- **Option A**: Embed curated subset (top 100 jobs) in prompt for simplicity
- **Option B**: Create edge function to query jobs dynamically based on skills
- **Option C**: Store in database table for flexible querying

Recommended: **Option A** for initial implementation - embed a representative sample of ~50-100 jobs directly in the system prompt. This keeps it simple and avoids database changes.

## Implementation Steps

1. **Copy job data to project**: Save as `src/data/jobsData.ts` with typed exports
2. **Create job matching helper**: `src/utils/jobMatcher.ts` to find best matches
3. **Update prompts**: Add job data and recommendation instructions to advisor prompt
4. **Update text-chat hook**: Pass matched jobs to the AI for context
5. **Test the full flow**: Run through assessment and verify job recommendations appear

