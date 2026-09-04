-- Add stock_status column to merch table
ALTER TABLE public.merch
  ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'available'
  CHECK (stock_status IN ('available', 'limited', 'out_of_stock'));
