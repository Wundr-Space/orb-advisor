

## Summary

Add user authentication with registration and login before users can access the main journey. Registration will require a valid invite code (`QT6rrR1`) to complete signup.

## Current State

- No authentication exists in the app
- Users go directly to the Index page with the user type selector
- Supabase client is already configured
- No database tables exist yet

## New Flow

```text
Unauthenticated User:
  /auth → Login/Register form
    - Login: Email + Password
    - Register: Email + Password + Invite Code validation
    - On success → redirect to /

Authenticated User:
  / → Index page (existing journey)
  - Logout option available
```

## Technical Implementation

### 1. Database Setup

**Create invite_codes table** to store valid invite codes:

```sql
CREATE TABLE public.invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  uses_remaining INTEGER DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active codes (for validation)
CREATE POLICY "Anyone can validate invite codes"
  ON public.invite_codes
  FOR SELECT
  USING (is_active = true);

-- Insert the invite code
INSERT INTO public.invite_codes (code) VALUES ('QT6rrR1');
```

**Configure auth** to auto-confirm email signups (no email verification needed).

### 2. Create Auth Page

**New File:** `src/pages/Auth.tsx`

A single page with tabs for Login and Register:

**Login Tab:**
- Email input field
- Password input field
- "Log In" button
- Link to switch to Register tab

**Register Tab:**
- Email input field
- Password input field
- Confirm password input field
- Invite code input field
- "Create Account" button
- Link to switch to Login tab

**Validation Flow:**
1. Validate invite code against `invite_codes` table before signup
2. If invalid code, show error and prevent registration
3. If valid code, proceed with Supabase auth signup

**Styling:**
- Use existing Card, Input, Button, Tabs, Label components
- Include the logo at top
- Show decorative background shapes for consistency

### 3. Create Auth Hook

**New File:** `src/hooks/useAuth.ts`

Hook to manage authentication state:

```typescript
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => { ... };
  const signUp = async (email: string, password: string) => { ... };
  const signOut = async () => { ... };

  return { user, loading, signIn, signUp, signOut };
}
```

### 4. Create Protected Route Component

**New File:** `src/components/ProtectedRoute.tsx`

Wrapper component to protect routes:

```typescript
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <>{children}</> : null;
}
```

### 5. Update App Router

**Modify:** `src/App.tsx`

Add auth route and wrap Index with ProtectedRoute:

```typescript
<Routes>
  <Route path="/auth" element={<Auth />} />
  <Route 
    path="/" 
    element={
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    } 
  />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 6. Add Logout Button

**Modify:** `src/pages/Index.tsx`

Add a logout button in the top-right corner (alongside the Debug/Voice toggles):

- Show user email or a user icon
- Dropdown or button to sign out
- On sign out, redirect to /auth

## File Changes Summary

| File | Action |
|------|--------|
| Database migration | Create `invite_codes` table |
| Auth config | Enable auto-confirm signups |
| `src/pages/Auth.tsx` | Create |
| `src/hooks/useAuth.ts` | Create |
| `src/components/ProtectedRoute.tsx` | Create |
| `src/App.tsx` | Modify - add routes and protection |
| `src/pages/Index.tsx` | Modify - add logout button |

## Invite Code Validation Logic

Registration flow:
1. User fills in email, password, confirm password, and invite code
2. Before calling `supabase.auth.signUp()`:
   - Query `invite_codes` table: `SELECT * FROM invite_codes WHERE code = $code AND is_active = true`
   - If no matching row found, show error: "Invalid invite code"
   - If found, proceed with signup
3. On successful signup, user is logged in and redirected to home

## Security Considerations

- Invite codes are validated server-side via RLS policy
- Passwords must be at least 6 characters (Supabase default)
- Auth state persisted in localStorage (already configured)
- Protected routes redirect unauthenticated users to /auth

