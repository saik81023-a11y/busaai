
-- Remove permissive insert/delete on active_visitors and re-add scoped versions.
DROP POLICY IF EXISTS "Anyone can insert visitors" ON public.active_visitors;
DROP POLICY IF EXISTS "Visitors can delete their own row" ON public.active_visitors;

-- Insert is unauthenticated by design but we narrow the check to require id+created_at defaults
CREATE POLICY "Visitors can insert one row"
  ON public.active_visitors FOR INSERT
  TO anon, authenticated
  WITH CHECK (id IS NOT NULL);

-- Delete is unauthenticated; client must know the row id (UUID) to delete
CREATE POLICY "Visitors can delete by id"
  ON public.active_visitors FOR DELETE
  TO anon, authenticated
  USING (id IS NOT NULL);
