
UPDATE storage.buckets SET public = true WHERE id = 'product-images';

DROP POLICY IF EXISTS "product images public read" ON storage.objects;
CREATE POLICY "product images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "admins manage product images insert" ON storage.objects;
CREATE POLICY "admins manage product images insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage product images update" ON storage.objects;
CREATE POLICY "admins manage product images update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage product images delete" ON storage.objects;
CREATE POLICY "admins manage product images delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete chat conversations (cleanup)
DROP POLICY IF EXISTS "admins delete conversations" ON public.chat_conversations;
CREATE POLICY "admins delete conversations"
ON public.chat_conversations FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Realtime for chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_conversations;
