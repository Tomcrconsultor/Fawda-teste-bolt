-- Função que será executada quando um usuário fizer login
create or replace function public.handle_auth_user()
returns trigger as $$
begin
  -- Se o email for admin@teste.com, atribui role de admin
  if new.email = 'admin@teste.com' then
    new.raw_user_meta_data = jsonb_set(
      coalesce(new.raw_user_meta_data, '{}'::jsonb),
      '{role}',
      '"admin"'
    );
  else
    -- Para outros usuários, atribui role de user
    new.raw_user_meta_data = jsonb_set(
      coalesce(new.raw_user_meta_data, '{}'::jsonb),
      '{role}',
      '"user"'
    );
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que executa a função quando um usuário é criado ou atualizado
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  before insert or update on auth.users
  for each row execute procedure public.handle_auth_user(); 