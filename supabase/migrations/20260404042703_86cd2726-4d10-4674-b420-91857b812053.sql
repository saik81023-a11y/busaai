
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone (even unauthenticated) to submit an enquiry
CREATE POLICY "Anyone can submit enquiries"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view enquiries (admin check in app)
CREATE POLICY "Authenticated users can view enquiries"
ON public.enquiries FOR SELECT
TO authenticated
USING (true);
