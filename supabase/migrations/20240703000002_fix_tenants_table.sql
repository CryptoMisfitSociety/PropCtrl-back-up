-- Create tenants table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  unit_number TEXT,
  lease_start DATE,
  lease_end DATE,
  rent_amount DECIMAL(12,2),
  security_deposit DECIMAL(12,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their tenants
DROP POLICY IF EXISTS "Users can only see their own tenants" ON public.tenants;
CREATE POLICY "Users can only see their own tenants"
  ON public.tenants
  FOR ALL
  USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table tenants;
