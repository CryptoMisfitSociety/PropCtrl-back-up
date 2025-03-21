-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  property_type TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  description TEXT,
  year_built INTEGER,
  last_renovation INTEGER,
  total_units INTEGER,
  total_area INTEGER,
  lot_size DECIMAL,
  purchase_price INTEGER,
  purchase_date DATE,
  current_value INTEGER,
  monthly_expenses INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name) VALUES ('property-images', 'property-images')
ON CONFLICT DO NOTHING;

-- Set up storage policy to allow authenticated users to upload
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Set up storage policy to allow authenticated users to select their own images
DROP POLICY IF EXISTS "Allow users to select their own images" ON storage.objects;
CREATE POLICY "Allow users to select their own images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'property-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for properties table
alter publication supabase_realtime add table properties;
