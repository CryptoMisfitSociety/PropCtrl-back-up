-- Create financial_transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  unit_number TEXT,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  payment_method TEXT,
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for financial receipts
INSERT INTO storage.buckets (id, name) VALUES ('financial-receipts', 'financial-receipts')
ON CONFLICT DO NOTHING;

-- Set up storage policy to allow authenticated users to upload
DROP POLICY IF EXISTS "Allow authenticated users to upload financial receipts" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload financial receipts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'financial-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Set up storage policy to allow authenticated users to select their own receipts
DROP POLICY IF EXISTS "Allow users to select their own financial receipts" ON storage.objects;
CREATE POLICY "Allow users to select their own financial receipts"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'financial-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for financial_transactions table
alter publication supabase_realtime add table financial_transactions;
