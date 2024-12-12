-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de configurações
DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT DEFAULT 'SiriaExpress',
  site_description TEXT DEFAULT 'Comida Árabe Autêntica',
  business_name TEXT DEFAULT 'SiriaExpress',
  business_address TEXT DEFAULT 'Rua Exemplo, 123',
  business_phone TEXT DEFAULT '(11) 99999-9999',
  business_email TEXT DEFAULT 'contato@siriaexpress.com',
  theme_primary_color TEXT DEFAULT '#10b981',
  theme_secondary_color TEXT DEFAULT '#6b7280',
  api_key TEXT,
  api_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Inserir configuração inicial
INSERT INTO settings (
  id,
  site_name,
  site_description,
  business_name,
  business_address,
  business_phone,
  business_email,
  theme_primary_color,
  theme_secondary_color
) VALUES (
  uuid_generate_v4(),
  'SiriaExpress',
  'Comida Árabe Autêntica',
  'SiriaExpress',
  'Rua Exemplo, 123',
  '(11) 99999-9999',
  'contato@siriaexpress.com',
  '#10b981',
  '#6b7280'
) ON CONFLICT DO NOTHING;

-- Habilitar RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes
DROP POLICY IF EXISTS "Permitir acesso público" ON settings;
DROP POLICY IF EXISTS "Permitir gerenciamento para admins" ON settings;

-- Criar novas políticas
CREATE POLICY "settings_select_policy" 
  ON settings FOR SELECT 
  USING (true);

CREATE POLICY "settings_insert_policy" 
  ON settings FOR INSERT 
  WITH CHECK (
    auth.role() IN ('authenticated', 'service_role')
  );

CREATE POLICY "settings_update_policy" 
  ON settings FOR UPDATE 
  USING (
    auth.role() IN ('authenticated', 'service_role')
  )
  WITH CHECK (
    auth.role() IN ('authenticated', 'service_role')
  );

CREATE POLICY "settings_delete_policy" 
  ON settings FOR DELETE 
  USING (
    auth.role() IN ('authenticated', 'service_role')
  );

-- Trigger para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column(); 