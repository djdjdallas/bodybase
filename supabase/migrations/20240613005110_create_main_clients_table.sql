CREATE TABLE main_clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  status TEXT CHECK (status IN ('Active', 'Inactive')),
  total_sales TEXT CHECK (total_sales IN ('Recurring', 'One time')),
  member_since TIMESTAMP WITH TIME ZONE,
  price NUMERIC,
  user_id UUID NOT NULL  -- Add the user_id column to link data to specific users
);
