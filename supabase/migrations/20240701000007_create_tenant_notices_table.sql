-- Create tenant notices table
CREATE TABLE IF NOT EXISTS tenant_notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notice_type VARCHAR(50) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  recipients VARCHAR(50) NOT NULL,
  sent_to UUID[],
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE tenant_notices ENABLE ROW LEVEL SECURITY;

-- Create policy for tenant notices
DROP POLICY IF EXISTS "Users can only access their own tenant notices" ON tenant_notices;
CREATE POLICY "Users can only access their own tenant notices"
  ON tenant_notices
  USING (user_id = auth.uid());

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE tenant_notices;
