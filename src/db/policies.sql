-- Primeiro remove todas as políticas existentes
DROP POLICY IF EXISTS "Permitir leitura pública dos itens do menu" ON menu_items;
DROP POLICY IF EXISTS "Permitir escrita apenas por admins nos itens do menu" ON menu_items;
DROP POLICY IF EXISTS "Permitir leitura pública das categorias" ON categories;
DROP POLICY IF EXISTS "Permitir escrita apenas por admins nas categorias" ON categories;
DROP POLICY IF EXISTS "Permitir upload de imagens apenas por admins" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura pública de imagens" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read site settings" ON site_settings;
DROP POLICY IF EXISTS "Allow admin write site settings" ON site_settings;
DROP POLICY IF EXISTS "Allow admin read api settings" ON api_settings;
DROP POLICY IF EXISTS "Allow admin write api settings" ON api_settings;
DROP POLICY IF EXISTS "Allow public read theme settings" ON theme_settings;
DROP POLICY IF EXISTS "Allow admin write theme settings" ON theme_settings;
DROP POLICY IF EXISTS "Allow public read business settings" ON business_settings;
DROP POLICY IF EXISTS "Allow admin write business settings" ON business_settings;

-- Habilita RLS (Row Level Security)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Configuração do storage (verifica se já existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'menu-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('menu-images', 'menu-images', true);
  END IF;
END $$;

-- Cria as políticas de acesso
-- Menu Items
CREATE POLICY "Permitir leitura pública dos itens do menu" 
ON menu_items FOR SELECT 
USING (true);

CREATE POLICY "Permitir escrita apenas por admins nos itens do menu" 
ON menu_items FOR ALL 
USING (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

-- Categories
CREATE POLICY "Permitir leitura pública das categorias" 
ON categories FOR SELECT 
USING (true);

CREATE POLICY "Permitir escrita apenas por admins nas categorias" 
ON categories FOR ALL 
USING (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

-- Storage
CREATE POLICY "Permitir upload de imagens apenas por admins"
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'menu-images' AND
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Permitir leitura pública de imagens"
ON storage.objects FOR SELECT
USING ( bucket_id = 'menu-images' );

-- Site Settings
CREATE POLICY "Allow public read site settings"
ON site_settings
FOR SELECT
USING (true);

CREATE POLICY "Allow admin write site settings"
ON site_settings
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- API Settings
CREATE POLICY "Allow admin read api settings"
ON api_settings
FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin write api settings"
ON api_settings
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Theme Settings
CREATE POLICY "Allow public read theme settings"
ON theme_settings
FOR SELECT
USING (true);

CREATE POLICY "Allow admin write theme settings"
ON theme_settings
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Business Settings
CREATE POLICY "Allow public read business settings"
ON business_settings
FOR SELECT
USING (true);

CREATE POLICY "Allow admin write business settings"
ON business_settings
FOR ALL
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Permitir inserção nas tabelas de configurações
CREATE POLICY "Permitir inserção nas configurações do site"
ON site_settings FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Permitir inserção nas configurações de API"
ON api_settings FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Permitir inserção nas configurações de tema"
ON theme_settings FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Permitir inserção nas configurações de negócio"
ON business_settings FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'role' = 'admin'
);

-- Inserir configurações padrão se não existirem
INSERT INTO site_settings (business_name, address, phone, email)
VALUES ('Nome do Estabelecimento', 'Endereço do Estabelecimento', '(00) 0000-0000', 'contato@estabelecimento.com')
ON CONFLICT DO NOTHING;

INSERT INTO api_settings (supabase_url, supabase_anon_key)
VALUES ('', '')
ON CONFLICT DO NOTHING;

INSERT INTO theme_settings DEFAULT VALUES;

INSERT INTO business_settings DEFAULT VALUES;

-- Função para criar usuário admin
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
BEGIN
  -- Verifica se o usuário admin já existe
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'admin@teste.com'
  ) THEN
    -- Cria o usuário admin
    INSERT INTO auth.users (
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role
    ) VALUES (
      'admin@teste.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"role": "admin"}',
      now(),
      now(),
      'authenticated'
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Executa a função para criar o usuário admin
SELECT create_admin_user(); 