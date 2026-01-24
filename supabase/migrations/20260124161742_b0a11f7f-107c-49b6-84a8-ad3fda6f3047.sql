-- Create invite_codes table
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