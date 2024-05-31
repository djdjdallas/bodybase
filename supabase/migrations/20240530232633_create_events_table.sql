CREATE TABLE
  events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );