CREATE TABLE
  leads (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users NOT NULL,
    NAME TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    status TEXT,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL
  );

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create leads." ON leads FOR INSERT
WITH
  CHECK (auth.uid () = user_id);

CREATE POLICY "Individuals can view their own leads." ON leads FOR
SELECT
  USING (
    (
      SELECT
        auth.uid ()
    ) = user_id
  );

CREATE POLICY "Individuals can update their own leads." ON leads
FOR UPDATE
  USING (
    (
      SELECT
        auth.uid ()
    ) = user_id
  );

CREATE POLICY "Individuals can delete their own leads." ON leads FOR DELETE USING (
  (
    SELECT
      auth.uid ()
  ) = user_id
);