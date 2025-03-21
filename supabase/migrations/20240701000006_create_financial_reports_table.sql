-- Create financial reports table
CREATE TABLE IF NOT EXISTS financial_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_name VARCHAR(100) NOT NULL,
  report_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  properties UUID[] DEFAULT '{}',
  format VARCHAR(20) DEFAULT 'PDF',
  report_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Create policy for financial reports
DROP POLICY IF EXISTS "Users can only access their own financial reports" ON financial_reports;
CREATE POLICY "Users can only access their own financial reports"
  ON financial_reports
  USING (user_id = auth.uid());

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE financial_reports;
