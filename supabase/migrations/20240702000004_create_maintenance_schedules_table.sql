-- Create maintenance schedules table
CREATE TABLE IF NOT EXISTS maintenance_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  frequency TEXT NOT NULL,
  priority TEXT NOT NULL,
  estimated_cost DECIMAL(10,2) DEFAULT 0,
  vendor_id UUID REFERENCES maintenance_vendors(id) ON DELETE SET NULL,
  notes TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE maintenance_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own schedules" ON maintenance_schedules;
CREATE POLICY "Users can view their own schedules"
  ON maintenance_schedules
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own schedules" ON maintenance_schedules;
CREATE POLICY "Users can insert their own schedules"
  ON maintenance_schedules
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own schedules" ON maintenance_schedules;
CREATE POLICY "Users can update their own schedules"
  ON maintenance_schedules
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own schedules" ON maintenance_schedules;
CREATE POLICY "Users can delete their own schedules"
  ON maintenance_schedules
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE maintenance_schedules;
