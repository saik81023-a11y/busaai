
CREATE TABLE public.active_visitors (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.active_visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visitors" ON public.active_visitors FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read visitors" ON public.active_visitors FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can delete their visitor" ON public.active_visitors FOR DELETE TO anon, authenticated USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.active_visitors;
