-- Create property units table
CREATE TABLE IF NOT EXISTS property_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_number VARCHAR(50) NOT NULL,
  unit_type VARCHAR(50),
  square_feet INTEGER,
  bedrooms INTEGER,
  bathrooms NUMERIC(3,1),
  monthly_rent NUMERIC(10,2),
  status VARCHAR(20) DEFAULT 'Vacant',
  is_furnished BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, unit_number)
);

-- Enable row level security
ALTER TABLE property_units ENABLE ROW LEVEL SECURITY;

-- Create policy for property units
DROP POLICY IF EXISTS "Users can only access their own property units" ON property_units;
CREATE POLICY "Users can only access their own property units"
  ON property_units
  USING (user_id = auth.uid());

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE property_units;
