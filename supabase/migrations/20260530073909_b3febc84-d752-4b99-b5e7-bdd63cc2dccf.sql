
DROP POLICY IF EXISTS "anyone can create a conversation" ON public.chat_conversations;
CREATE POLICY "visitors can create their own conversation"
ON public.chat_conversations FOR INSERT TO anon, authenticated
WITH CHECK (visitor_id IS NOT NULL AND length(visitor_id) >= 6);
