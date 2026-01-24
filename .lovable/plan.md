
# Skills Assessment Integration Plan

## Overview
We'll enhance the Career Advisor's system prompt to guide it through a structured skills assessment conversation. The AI will naturally ask questions to discover the user's proficiency in the 26 skills from the CSV, score them, and provide actionable insights.

## Approach

The best way to direct the conversation is through **enhanced system prompting**. The AI will:
1. Ask situational and behavioral questions that reveal skill competencies
2. Track which skills have been assessed during the conversation
3. Provide scores and insights based on the user's responses
4. Compare the user's skill profile against employer demand data

## Implementation Steps

### 1. Update the System Prompt
Modify `src/constants/advisorPrompt.ts` to include:
- The full skills list with employer demand percentages embedded in the prompt
- Instructions for conducting a skills assessment through natural conversation
- A scoring framework (e.g., 1-5 scale for each skill)
- Guidance on asking probing questions that reveal skill levels
- Instructions to summarize findings at appropriate points

### 2. Revised Prompt Structure

```text
SKILLS_DATA (embedded in prompt):
- Analytical thinking (69% employer demand)
- Resilience, flexibility and agility (67%)
- Leadership and social influence (61%)
... (all 26 skills)

ASSESSMENT APPROACH:
- Ask open-ended, situational questions
- Example: "Tell me about a time you had to analyze complex data to make a decision"
- Use follow-up questions to gauge depth
- Mentally track scores (1-5) for skills revealed in answers
- Cover 5-8 key skills per conversation naturally
- Offer to provide a skills summary when appropriate

SCORING CRITERIA:
1 = No experience/awareness
2 = Basic understanding
3 = Competent, can apply independently
4 = Advanced, can teach others
5 = Expert, industry-leading

OUTPUT FORMAT:
When summarizing, show:
- Skill name
- User's estimated score (1-5)
- Employer demand percentage
- Brief recommendation
```

### 3. Update Initial Greeting
Modify `INITIAL_GREETING_PROMPT` to have the advisor mention the skills assessment as an option:

> "I can help you discover your strengths through a quick skills assessment, discuss career goals, review your resume, or prepare for interviews. What would you like to focus on today?"

### 4. Add Assessment Mode Flag (Optional Enhancement)
If you want the assessment to be a distinct mode:
- Add a state flag `assessmentMode` in the chat hooks
- Pass this to the backend to use a specialized assessment prompt
- Track which skills have been covered across messages

## Technical Details

### Files to Modify
1. `src/constants/advisorPrompt.ts` - Main prompt updates with skills data and assessment instructions
2. `src/hooks/useTextChat.ts` - Optionally pass assessment context
3. `src/hooks/useRealtimeVoice.ts` - Ensure same prompt is used for voice

### Prompt Engineering Best Practices Used
- **Role definition**: Clear assessor persona with specific goals
- **Structured output**: Scoring framework for consistency
- **Examples**: Sample questions to guide behavior
- **Data grounding**: Skills list with employer demand built into context

## Example Conversation Flow

```text
Advisor: "Hi! I'm your Career Advisor. I can help you discover your 
         strengths through a skills assessment, or we can discuss 
         career goals and challenges. What interests you?"

User: "I'd like to know my strengths"

Advisor: "Great! Let's explore your skills through a few questions. 
         Tell me about a recent project where you had to solve a 
         complex problem. What was your approach?"

User: [Describes problem-solving experience]

Advisor: "Excellent! That shows strong analytical thinking. You 
         mentioned coordinating with your team - how did you handle 
         differing opinions?" 

... (conversation continues, covering multiple skills)

Advisor: "Based on our conversation, here's your skills snapshot:
         
         Analytical Thinking: 4/5 (69% of employers seek this)
         Leadership: 3/5 (61% demand)
         Communication: 4/5 (embedded in multiple skills)
         
         Your analytical skills are a strong market differentiator..."
```

## Benefits of This Approach
- **No database changes needed** - Assessment happens through conversation
- **Works for both voice and text** - Same prompt powers both modes
- **Natural flow** - Questions feel conversational, not like a quiz
- **Actionable output** - Scores tied to employer demand data

## Future Enhancements (Optional)
- Store assessment results in database for tracking over time
- Visual skills radar chart showing results
- Compare user profile to specific job requirements
- PDF export of skills assessment report
