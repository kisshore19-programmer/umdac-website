
-- 1. ADMIN HELPER FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- 2. UPDATE EXISTING SELECT POLICIES (FROM 7th MIGRATION)

-- Replace "Users can view own profile" with admin-inclusive visibility
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Admins view all, users view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR 
  public.is_admin()
);

-- Replace "Users can view own applications" with admin-inclusive visibility
DROP POLICY IF EXISTS "Users can view own applications" ON public.applications;

CREATE POLICY "Admins view all, applicants view own"
ON public.applications
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR 
  public.is_admin()
);


-- 3. ADD WRITE & MUTATION POLICIES FOR USERS & ADMINS

-- Profiles: Users can update their own details; Admins can update/promote any profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins full write control profiles"
ON public.profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Applications: Admins can update status (accept/reject) or delete
CREATE POLICY "Admins full control applications"
ON public.applications
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Committee Members: Admin management (Insert/Update/Delete)
CREATE POLICY "Admins full control committee_members"
ON public.committee_members
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Events: Admin management (Insert/Update/Delete)
CREATE POLICY "Admins full control events"
ON public.events
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Merch: Admin management (Insert/Update/Delete)
CREATE POLICY "Admins full control merch"
ON public.merch
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());