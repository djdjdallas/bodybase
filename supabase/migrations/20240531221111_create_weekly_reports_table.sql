CREATE TABLE weekly_reports (
  report_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES fitness_clients(client_id),
  week INTEGER NOT NULL,
  weight DECIMAL(5, 2),
  chest DECIMAL(5, 2),
  waist DECIMAL(5, 2),
  hips DECIMAL(5, 2),
  bmi DECIMAL(5, 2),
  body_weight_percentage DECIMAL(5, 2),
  workouts TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
