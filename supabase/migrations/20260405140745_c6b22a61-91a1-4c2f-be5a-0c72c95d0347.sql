CREATE TABLE public.user_searches (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  budget TEXT NOT NULL,
  location TEXT NOT NULL,
  business_idea TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert searches" ON public.user_searches FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Only authenticated can view searches" ON public.user_searches FOR SELECT TO authenticated USING (true);