-- Drop the index first
DROP INDEX IF EXISTS sessions_status_idx;

-- Drop the status column
ALTER TABLE sessions DROP COLUMN IF EXISTS status;

-- Make end_time and cash_out NOT NULL again
ALTER TABLE sessions ALTER COLUMN end_time SET NOT NULL;
ALTER TABLE sessions ALTER COLUMN cash_out SET NOT NULL;