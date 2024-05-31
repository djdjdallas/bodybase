CREATE TABLE
  fitness_clients (
    client_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth date NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(10),
    start_weight NUMERIC(5, 2),
    start_body_fat_percentage NUMERIC(5, 2),
    start_bmi NUMERIC(5, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );