-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on appointments (allow public inserts, no auth required for clinic booking)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert appointments (public booking form)
CREATE POLICY "Allow public to insert appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Policy to allow reading appointments (for admin purposes, can be restricted later)
CREATE POLICY "Allow public to read appointments" ON appointments
  FOR SELECT USING (true);

-- Enable RLS on reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert reviews
CREATE POLICY "Allow public to insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Policy to allow anyone to read reviews
CREATE POLICY "Allow public to read reviews" ON reviews
  FOR SELECT USING (true);
