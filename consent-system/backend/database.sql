CREATE TABLE IF NOT EXISTS consents (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100),
  purpose TEXT,
  data_category TEXT,
  retention TEXT,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
