-- Migration 10: Add UI columns to events table + seed 3 upcoming events
-- Copy-paste this into Supabase → SQL Editor and click Run

-- Step 1: Add new columns
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS slug        TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS type        TEXT DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS time_label  TEXT DEFAULT 'TBA',
  ADD COLUMN IF NOT EXISTS seats_label TEXT DEFAULT 'TBA',
  ADD COLUMN IF NOT EXISTS checklist   JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS notice      TEXT DEFAULT 'Registration details will be announced soon.',
  ADD COLUMN IF NOT EXISTS cta_label   TEXT DEFAULT 'Register now',
  ADD COLUMN IF NOT EXISTS is_past     BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS writeup     TEXT,
  ADD COLUMN IF NOT EXISTS image_urls  JSONB DEFAULT '[]';

-- Step 2: Fix sequence so new rows don't clash with existing event_id values
SELECT setval(
  pg_get_serial_sequence('public.events', 'event_id'),
  COALESCE((SELECT MAX(event_id) FROM public.events), 0)
);

-- Step 3: Seed the 3 upcoming events with TBA details (skips if slug already exists)
INSERT INTO public.events
  (title, slug, description, type, date, time_label, location, seats_label, capacity, status, checklist, notice, cta_label, is_past)
VALUES
  (
    'Startup Bootcamp',
    'startup-bootcamp',
    'An intensive bootcamp where you will learn how to ideate, validate, and pitch a data-driven startup idea. Designed for students interested in entrepreneurship, AI, and applied analytics.',
    'Bootcamp',
    '2026-12-31 00:00:00+00',
    'TBA',
    'TBA',
    'TBA',
    NULL,
    'upcoming',
    '["Startup ideation frameworks", "Data-driven pitch deck", "Mentor feedback sessions", "Networking with industry"]',
    'Registration details will be announced soon. Stay tuned to our social media.',
    'Register now',
    false
  ),
  (
    'Datathon',
    'datathon',
    'UMDAC''s flagship data competition where teams tackle real-world datasets under time pressure. Solve meaningful problems, compete for prizes, and grow alongside the best data minds on campus.',
    'Competition',
    '2026-12-31 00:00:00+00',
    'TBA',
    'TBA',
    'TBA',
    NULL,
    'upcoming',
    '["Team-based competition", "Real-world datasets", "Industry mentors", "Prizes & certificates"]',
    'Registration details will be announced soon. Stay tuned to our social media.',
    'Register now',
    false
  ),
  (
    'DataFair',
    'data-fair',
    'A student project showcase and career fair hybrid, where UMDAC members present their data projects and connect with recruiters and industry partners looking for emerging talent.',
    'Showcase',
    '2026-12-31 00:00:00+00',
    'TBA',
    'TBA',
    'TBA',
    NULL,
    'upcoming',
    '["Project showcase booths", "Industry partner meetups", "CV review sessions", "Networking fair"]',
    'Registration details will be announced soon. Stay tuned to our social media.',
    'Register now',
    false
  )
ON CONFLICT (slug) DO NOTHING;
