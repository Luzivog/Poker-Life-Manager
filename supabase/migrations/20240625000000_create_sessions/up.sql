-- Create the sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL,
  small_blind NUMERIC NOT NULL,
  big_blind NUMERIC NOT NULL,
  buy_in NUMERIC NOT NULL,
  cash_out NUMERIC NOT NULL,
  table_size TEXT NOT NULL,
  location TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  stack_size_updates JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up RLS (Row Level Security)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own sessions"
  ON sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
  ON sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create an index for faster lookups by user_id
CREATE INDEX sessions_user_id_idx ON sessions(user_id);

-- Set up updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sessions_updated_at
BEFORE UPDATE ON sessions
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();