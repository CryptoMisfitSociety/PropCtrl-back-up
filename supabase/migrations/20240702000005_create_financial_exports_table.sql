-- Create financial exports table
CREATE TABLE IF NOT EXISTS financial_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  format TEXT NOT NULL,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE financial_exports ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own exports" ON financial_exports;
CREATE POLICY "Users can view their own exports"
  ON financial_exports
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own exports" ON financial_exports;
CREATE POLICY "Users can insert their own exports"
  ON financial_exports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own exports" ON financial_exports;
CREATE POLICY "Users can delete their own exports"
  ON financial_exports
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE financial_exports;
