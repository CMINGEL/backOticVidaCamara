CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES category(id),
  image TEXT,
  rating_rate NUMERIC,
  rating_count INTEGER
);