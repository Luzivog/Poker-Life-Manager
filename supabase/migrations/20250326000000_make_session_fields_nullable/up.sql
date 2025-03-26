-- Make end_time and cash_out nullable for live sessions
ALTER TABLE sessions ALTER COLUMN end_time DROP NOT NULL;
ALTER TABLE sessions ALTER COLUMN cash_out DROP NOT NULL;

-- Add a status column to indicate live sessions
ALTER TABLE sessions ADD COLUMN status TEXT NOT NULL DEFAULT 'completed';

-- Create an index on status to improve query performance when filtering live sessions
CREATE INDEX sessions_status_idx ON sessions(status);