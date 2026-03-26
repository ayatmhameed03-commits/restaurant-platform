CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(150) NOT NULL,
  image_url TEXT
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
  item_name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  number_of_people INT NOT NULL
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name VARCHAR(100) NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name VARCHAR(100) NOT NULL,
  comment_text TEXT NOT NULL
);