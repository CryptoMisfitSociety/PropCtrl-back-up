-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  unit_number TEXT NOT NULL,
  lease_start DATE NOT NULL,
  lease_end DATE NOT NULL,
  rent_amount INTEGER NOT NULL,
  security_deposit INTEGER,
  payment_status TEXT NOT NULL,
  last_payment_date DATE,
  notes TEXT,
  lease_document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for tenant documents
INSERT INTO storage.buckets (id, name) VALUES ('tenant-documents', 'tenant-documents')
ON CONFLICT DO NOTHING;

-- Set up storage policy to allow authenticated users to upload
DROP POLICY IF EXISTS "Allow authenticated users to upload tenant documents" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload tenant documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'tenant-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Set up storage policy to allow authenticated users to select their own documents
DROP POLICY IF EXISTS "Allow users to select their own tenant documents" ON storage.objects;
CREATE POLICY "Allow users to select their own tenant documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'tenant-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for tenants table
alter publication supabase_realtime add table tenants;
