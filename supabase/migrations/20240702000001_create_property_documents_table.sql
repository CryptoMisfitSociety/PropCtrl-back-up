-- Create property_documents table
CREATE TABLE IF NOT EXISTS property_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  document_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for property documents
INSERT INTO storage.buckets (id, name) VALUES ('property-documents', 'property-documents')
ON CONFLICT DO NOTHING;

-- Set up storage policy to allow authenticated users to upload
DROP POLICY IF EXISTS "Allow authenticated users to upload property documents" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload property documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Set up storage policy to allow authenticated users to select their own documents
DROP POLICY IF EXISTS "Allow users to select their own property documents" ON storage.objects;
CREATE POLICY "Allow users to select their own property documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'property-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for property_documents table
alter publication supabase_realtime add table property_documents;
