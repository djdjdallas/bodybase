CREATE TABLE
  hot_leads (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    NAME TEXT,
    email TEXT,
    status TEXT CHECK (status IN ('hot', 'cold')),
    phone_number TEXT
  );