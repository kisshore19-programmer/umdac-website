CREATE TABLE IF NOT EXISTS public.committee_members (
  committee_id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  department TEXT,
  photo_url TEXT,
  display_priority INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);