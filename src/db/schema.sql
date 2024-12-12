-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS api_settings CASCADE;
DROP TABLE IF EXISTS theme_settings CASCADE;
DROP TABLE IF EXISTS business_settings CASCADE;

-- Create tables
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  social_media JSONB NOT NULL DEFAULT '{"facebook": "", "instagram": "", "whatsapp": ""}',
  hero_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS api_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_url TEXT NOT NULL,
  supabase_anon_key TEXT NOT NULL,
  google_maps_key TEXT,
  stripe_public_key TEXT,
  environment TEXT NOT NULL DEFAULT 'development',
  api_version TEXT NOT NULL DEFAULT '1.0.0',
  debug BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  colors JSONB NOT NULL DEFAULT '{"primary": "#10b981", "secondary": "#ffffff", "accent": "#f59e0b"}',
  font TEXT NOT NULL DEFAULT 'Inter',
  button_style TEXT NOT NULL DEFAULT 'rounded',
  border_radius TEXT NOT NULL DEFAULT '0.5rem',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  working_hours JSONB NOT NULL DEFAULT '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}, "wednesday": {"open": "09:00", "close": "18:00"}, "thursday": {"open": "09:00", "close": "18:00"}, "friday": {"open": "09:00", "close": "18:00"}, "saturday": {"open": "10:00", "close": "16:00"}, "sunday": {"open": "", "close": ""}}',
  contact JSONB NOT NULL DEFAULT '{"phone": "", "email": "", "address": ""}',
  delivery JSONB NOT NULL DEFAULT '{"minimumOrder": 0, "deliveryFee": 0, "deliveryRadius": 0, "estimatedTime": "30-45", "freeDeliveryThreshold": 0}',
  notifications JSONB NOT NULL DEFAULT '{"email": true, "push": true, "orderUpdates": true, "marketing": false, "sounds": true}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_api_settings_updated_at ON api_settings;
CREATE TRIGGER update_api_settings_updated_at
  BEFORE UPDATE ON api_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_theme_settings_updated_at ON theme_settings;
CREATE TRIGGER update_theme_settings_updated_at
  BEFORE UPDATE ON theme_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_business_settings_updated_at ON business_settings;
CREATE TRIGGER update_business_settings_updated_at
  BEFORE UPDATE ON business_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure one row exists
CREATE OR REPLACE FUNCTION ensure_single_row()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM theme_settings) = 0 THEN
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to ensure single row
DROP TRIGGER IF EXISTS ensure_single_theme_row ON theme_settings;
CREATE TRIGGER ensure_single_theme_row
  BEFORE INSERT ON theme_settings
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_row();

-- Insert initial data if not exists
DO $$
BEGIN
  -- Site Settings
  IF NOT EXISTS (SELECT 1 FROM site_settings) THEN
    INSERT INTO site_settings (business_name, address, phone, email)
    VALUES ('Nome do Estabelecimento', 'Endereço do Estabelecimento', '(00) 0000-0000', 'contato@estabelecimento.com');
  END IF;

  -- API Settings
  IF NOT EXISTS (SELECT 1 FROM api_settings) THEN
    INSERT INTO api_settings (supabase_url, supabase_anon_key)
    VALUES ('https://vobaklixhkvwmmmpajeb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYmFrbGl4aGt2d21tbXBhamViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1ODE4NTYsImV4cCI6MjA0OTE1Nzg1Nn0.GmkE5vbheAs6yt-Mk9kak3xV0UWl6ZxvuGQSjpW8Xw8');
  END IF;

  -- Theme Settings
  IF NOT EXISTS (SELECT 1 FROM theme_settings) THEN
    INSERT INTO theme_settings (colors, font, button_style, border_radius)
    VALUES (
      '{"primary": "#10b981", "secondary": "#ffffff", "accent": "#f59e0b"}',
      'Inter',
      'rounded',
      '0.5rem'
    );
  END IF;

  -- Business Settings
  IF NOT EXISTS (SELECT 1 FROM business_settings) THEN
    INSERT INTO business_settings DEFAULT VALUES;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;