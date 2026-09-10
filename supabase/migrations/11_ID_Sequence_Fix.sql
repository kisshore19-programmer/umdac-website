-- MERCH


-- Check current state before touching anything
SELECT 
  pg_get_serial_sequence('public.merch', 'merch_id') AS sequence_name,
  (SELECT MAX(merch_id) FROM public.merch) AS max_id_in_table;

-- Force the sequence to match the current max ID 
SELECT setval(
  pg_get_serial_sequence('public.merch', 'merch_id'),
  GREATEST(COALESCE((SELECT MAX(merch_id) FROM public.merch), 0), 1),
  true
);

-- Test what nextval() produces (this will consume ID 4)
SELECT nextval(pg_get_serial_sequence('public.merch', 'merch_id')) AS next_generated_id;

-- Reset it back to 3 so the next app INSERT claims 4 cleanly
SELECT setval(
  pg_get_serial_sequence('public.merch', 'merch_id'),
  COALESCE((SELECT MAX(merch_id) FROM public.merch), 0),
  true
);


-- Events


-- Check current state before touching anything
SELECT 
  pg_get_serial_sequence('public.events', 'event_id') AS sequence_name,
  (SELECT MAX(event_id) FROM public.events) AS max_id_in_table;

-- Force the sequence to match the max ID (6)
SELECT setval(
  pg_get_serial_sequence('public.events', 'event_id'),
  GREATEST(COALESCE((SELECT MAX(event_id) FROM public.events), 0), 1),
  true
);

-- Test what nextval() produces (this will consume ID 7)
SELECT nextval(pg_get_serial_sequence('public.events', 'event_id')) AS next_generated_id;

-- Reset it back to 6 so the next app INSERT claims 7 cleanly
SELECT setval(
  pg_get_serial_sequence('public.events', 'event_id'),
  COALESCE((SELECT MAX(event_id) FROM public.events), 0),
  true
);