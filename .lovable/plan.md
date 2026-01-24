

# Demo Mode for Text Chat

## Overview
Add a "Demo" button next to the "Chat with Career Advisor" title that runs an automated conversation simulation. When clicked, it selects a random persona from a list of career switchers and automatically responds to the AI advisor's questions with realistic answers based on that persona's background.

## User Flow
1. User enters text chat mode
2. AI advisor greets and asks first question
3. User clicks "Demo" button
4. System selects a random persona (e.g., "Bank Teller looking to transition")
5. Demo mode automatically generates user responses based on the persona
6. Conversation continues automatically until skills summary is generated
7. User can stop demo mode at any time by clicking "Stop Demo" or typing manually

## Persona Data Structure

Each persona will include:
- **Current role** (from the declining occupations list)
- **Years of experience** (2-15 years)
- **Key skills** from their background (mapped to the 26-skill framework)
- **Career goal** (what they want to transition to)
- **Story snippets** for common assessment questions

Example personas:
- Bank teller (8 years) - strong in customer service, attention to detail, basic tech
- Graphic designer (5 years) - strong in creative thinking, design/UX, tech literacy  
- Postal clerk (12 years) - strong in dependability, resource management, customer service
- Data entry clerk (3 years) - strong in attention to detail, tech literacy, systems thinking

---

## Technical Implementation

### 1. New File: `src/data/demoPersonas.ts`

Create a data file with 15 persona definitions matching the declining occupations list:

```typescript
export interface DemoPersona {
  id: string;
  currentRole: string;
  yearsExperience: number;
  careerGoal: string;
  skills: {
    name: string;
    level: number; // 1-5
    experience: string; // Story snippet for this skill
  }[];
  personality: string; // Brief description for AI context
  commonResponses: {
    greeting: string;
    analyticalThinking: string;
    resilience: string;
    leadership: string;
    creativeThinking: string;
    customerService: string;
    technology: string;
    learning: string;
    teamwork: string;
    general: string[];
  };
}
```

### 2. New Hook: `src/hooks/useDemoMode.ts`

Handles demo state and auto-response generation:

```typescript
interface UseDemoModeReturn {
  isDemoMode: boolean;
  currentPersona: DemoPersona | null;
  startDemo: () => void;
  stopDemo: () => void;
  generateResponse: (aiMessage: string) => string | null;
}
```

Key logic:
- Randomly selects a persona on start
- Analyzes AI messages to detect question types
- Returns appropriate persona-based response
- Tracks conversation progress to know when to provide skills-related answers

### 3. Update `TextChatPanel.tsx`

Add Demo button in header:

```tsx
<div className="flex items-center gap-3">
  <Button variant="ghost" size="icon" onClick={onBack}>
    <ArrowLeft className="w-5 h-5" />
  </Button>
  <h2 className="text-lg font-bold">Chat with Career Advisor</h2>
  {/* NEW: Demo button */}
  <Button
    variant={isDemoMode ? "destructive" : "outline"}
    size="sm"
    onClick={isDemoMode ? stopDemo : startDemo}
    className="rounded-full text-xs"
    disabled={isLoading}
  >
    {isDemoMode ? "Stop Demo" : "Demo"}
  </Button>
</div>
```

Add auto-response effect:

```tsx
// Auto-respond in demo mode
useEffect(() => {
  if (isDemoMode && !isLoading && messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "assistant") {
      const response = generateResponse(lastMessage.content);
      if (response) {
        // Delay to simulate human typing
        const delay = 1000 + Math.random() * 2000;
        const timer = setTimeout(() => {
          onSendMessage(response);
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }
}, [isDemoMode, isLoading, messages]);
```

### 4. Update `useTextChat.ts`

Add optional `setMessages` function to allow demo mode to inject messages:

```typescript
interface UseTextChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  initiateConversation: () => Promise<void>;
}
// No changes needed - sendMessage already works for demo
```

### 5. Question Detection Logic

The demo mode will detect question types by looking for keywords:

```typescript
function detectQuestionType(message: string): QuestionType {
  const lower = message.toLowerCase();
  
  if (lower.includes("analyze") || lower.includes("complex information") || lower.includes("decision")) {
    return "analyticalThinking";
  }
  if (lower.includes("adapt") || lower.includes("unexpected") || lower.includes("change")) {
    return "resilience";
  }
  if (lower.includes("lead") || lower.includes("influence") || lower.includes("team")) {
    return "leadership";
  }
  if (lower.includes("creative") || lower.includes("new idea") || lower.includes("innovative")) {
    return "creativeThinking";
  }
  if (lower.includes("customer") || lower.includes("client") || lower.includes("service")) {
    return "customerService";
  }
  if (lower.includes("technology") || lower.includes("software") || lower.includes("digital")) {
    return "technology";
  }
  if (lower.includes("learn") || lower.includes("new skill") || lower.includes("training")) {
    return "learning";
  }
  if (lower.includes("what") && lower.includes("focus")) {
    return "greeting";
  }
  
  return "general";
}
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/data/demoPersonas.ts` | Create | 15 persona definitions with responses |
| `src/hooks/useDemoMode.ts` | Create | Demo mode state and response generation |
| `src/components/TextChatPanel.tsx` | Modify | Add Demo button and auto-response logic |

## Demo Persona Examples

**Bank Teller (Maria, 8 years)**
- Skills: Customer Service (5), Attention to Detail (4), Tech Literacy (3)
- Goal: Transition to financial advising
- Sample response to "Tell me about adapting to change":
  "When our branch switched to a new banking system last year, I was one of the first to learn it. I actually ended up training five other tellers. It was stressful at first, but I created a quick reference guide that the whole team still uses."

**Graphic Designer (James, 5 years)**
- Skills: Creative Thinking (5), Design/UX (5), Tech Literacy (4)
- Goal: Move into UX research
- Sample response to "Tell me about customer service":
  "As a freelancer, I work directly with clients. I've learned to really listen to what they want, even when they struggle to articulate it. I often create mood boards to help us get on the same page before starting designs."

---

## Behavior Notes

1. **Random selection**: Each demo run picks a different persona
2. **Natural pacing**: 1-3 second delay before responses to simulate typing
3. **Graceful exit**: User can stop demo anytime; stopping clears demo state but preserves conversation
4. **Visual indicator**: Button changes to "Stop Demo" (destructive style) when active
5. **Toast notification**: Shows which persona was selected when demo starts
