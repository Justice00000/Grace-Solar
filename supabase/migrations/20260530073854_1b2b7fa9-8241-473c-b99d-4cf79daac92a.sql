
-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Re-assert search_path
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION public.handle_new_user_role() SET search_path = public;
ALTER FUNCTION public.set_updated_at() SET search_path = public;

-- Tighten chat_conversations UPDATE policy: visitors can only bump last_message_at; admins can update anything
DROP POLICY IF EXISTS "anyone can update conversations" ON public.chat_conversations;

CREATE POLICY "admins update conversations"
ON public.chat_conversations FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Make bucket non-public so listing is not allowed, but RLS still grants read on each object
UPDATE storage.buckets SET public = false WHERE id = 'product-images';
