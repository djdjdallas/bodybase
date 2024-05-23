CREATE TABLE
  new_clients (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    NAME TEXT,
    status TEXT CHECK (status IN ('Active', 'Inactive')),
    total_sales TEXT CHECK (total_sales IN ('Recurring', 'One time')),
    member_since TIMESTAMP WITH TIME ZONE,
    price NUMERIC
  );