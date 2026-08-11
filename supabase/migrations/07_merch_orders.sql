CREATE TABLE IF NOT EXISTS public.merch_orders (
  order_id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  merch_id INT REFERENCES public.merch(merch_id) ON DELETE CASCADE NOT NULL,
  quantity INT DEFAULT 1,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);