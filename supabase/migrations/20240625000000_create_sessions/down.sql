-- Drop the trigger
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;

-- Drop the function
DROP FUNCTION IF EXISTS update_modified_column();

-- Drop the table (which also drops associated policies)
DROP TABLE IF EXISTS sessions;