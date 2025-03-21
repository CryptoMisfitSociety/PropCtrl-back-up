-- Create maintenance_requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  unit_number TEXT NOT NULL,
  issue TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL,
  status TEXT NOT NULL,
  assigned_to TEXT,
  estimated_cost INTEGER,
  reported_date DATE NOT NULL,
  scheduled_date DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create maintenance_photos table
CREATE TABLE IF NOT EXISTS maintenance_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  maintenance_request_id UUID REFERENCES maintenance_requests(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create maintenance_comments table
CREATE TABLE IF NOT EXISTS maintenance_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  maintenance_request_id UUID REFERENCES maintenance_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for maintenance photos
INSERT INTO storage.buckets (id, name) VALUES ('maintenance-photos', 'maintenance-photos')
ON CONFLICT DO NOTHING;

-- Set up storage policy to allow authenticated users to upload
DROP POLICY IF EXISTS "Allow authenticated users to upload maintenance photos" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload maintenance photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'maintenance-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Set up storage policy to allow authenticated users to select their own photos
DROP POLICY IF EXISTS "Allow users to select their own maintenance photos" ON storage.objects;
CREATE POLICY "Allow users to select their own maintenance photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'maintenance-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for maintenance tables
alter publication supabase_realtime add table maintenance_requests;
alter publication supabase_realtime add table maintenance_photos;
alter publication supabase_realtime add table maintenance_comments;
