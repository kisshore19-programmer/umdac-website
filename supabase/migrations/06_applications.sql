CREATE TABLE IF NOT EXISTS public.applications (
  application_id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  event_id INT REFERENCES public.events(event_id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending',
  answers JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);