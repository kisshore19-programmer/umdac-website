-- 1. Grant usage on the auto-increment counter to authenticated users
GRANT USAGE, SELECT, UPDATE ON SEQUENCE merch_merch_id_seq TO authenticated;

-- 2. Grant access to all future sequences in the public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO authenticated;