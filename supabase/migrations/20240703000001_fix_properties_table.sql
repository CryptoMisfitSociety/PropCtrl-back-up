-- Create properties table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  property_type TEXT,
  purchase_date DATE,
  purchase_price DECIMAL(12,2),
  current_value DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their properties
DROP POLICY IF EXISTS "Users can only see their own properties" ON public.properties;
CREATE POLICY "Users can only see their own properties"
  ON public.properties
  FOR ALL
  USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table properties;
