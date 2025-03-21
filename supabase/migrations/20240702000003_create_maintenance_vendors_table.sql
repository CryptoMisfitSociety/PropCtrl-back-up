-- Create maintenance vendors table
CREATE TABLE IF NOT EXISTS maintenance_vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  notes TEXT,
  rating DECIMAL(3,1) DEFAULT 0,
  jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE maintenance_vendors ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own vendors" ON maintenance_vendors;
CREATE POLICY "Users can view their own vendors"
  ON maintenance_vendors
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own vendors" ON maintenance_vendors;
CREATE POLICY "Users can insert their own vendors"
  ON maintenance_vendors
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own vendors" ON maintenance_vendors;
CREATE POLICY "Users can update their own vendors"
  ON maintenance_vendors
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own vendors" ON maintenance_vendors;
CREATE POLICY "Users can delete their own vendors"
  ON maintenance_vendors
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE maintenance_vendors;
