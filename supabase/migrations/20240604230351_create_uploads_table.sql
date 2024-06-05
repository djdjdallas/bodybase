CREATE TABLE
  uploads (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth TIMESTAMP WITH TIME ZONE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(10),
    start_weight NUMERIC(5, 2),
    start_body_fat_percentage NUMERIC(5, 2),
    start_bmi NUMERIC(5, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );