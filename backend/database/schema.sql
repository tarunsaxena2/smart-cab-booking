-- Create User Roles Enum
CREATE TYPE user_role AS ENUM ('customer', 'driver', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'ongoing', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- 1. Users Table (Customers and Admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Hashed passwords from bcrypt
    phone VARCHAR(15),
    role user_role DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Drivers Table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 5.00,
    current_latitude DECIMAL(9, 6),
    current_longitude DECIMAL(9, 6)
);

-- 3. Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(id) ON DELETE CASCADE,
    model VARCHAR(50) NOT NULL,
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(20),
    type VARCHAR(20) DEFAULT 'sedan' -- sedan, SUV, luxury, etc.
);

-- 4. Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE SET NULL,
    driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    pickup_latitude DECIMAL(9, 6),
    pickup_longitude DECIMAL(9, 6),
    dropoff_latitude DECIMAL(9, 6),
    dropoff_longitude DECIMAL(9, 6),
    fare DECIMAL(10, 2) NOT NULL,
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Payments Table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'card', -- cash, card, wallet
    status payment_status DEFAULT 'pending',
    transaction_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id INT REFERENCES users(id) ON DELETE SET NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);