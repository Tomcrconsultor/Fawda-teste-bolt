import { supabase } from '../src/lib/supabase';
import { menuData } from '../src/data/menu';

async function migrateData() {
  try {
    console.log('Iniciando migração...');

    // Migrar categorias
    for (const category of menuData) {
      console.log(`Migrando categoria: ${category.title}`);
      
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .insert({
          title: category.title
        })
        .select()
        .single();

      if (categoryError) {
        console.error('Erro ao inserir categoria:', categoryError);
        continue;
      }

      console.log('Categoria criada:', categoryData);

      // Migrar itens do menu
      for (const item of category.items || []) {
        console.log(`Migrando item: ${item.name}`);
        
        const menuItem = {
          name: item.name,
          description: item.description,
          price: item.price,
          category_id: categoryData.id,
          options: item.options || null,
          characteristics: item.characteristics || null
        };

        // Adicionar image apenas se existir e não for placeholder
        if (item.image && !item.image.includes('URL_DA_IMAGEM')) {
          menuItem['image'] = item.image;
        }
        
        const { data: menuItemData, error: menuItemError } = await supabase
          .from('menu_items')
          .insert(menuItem)
          .select()
          .single();

        if (menuItemError) {
          console.error('Erro ao inserir item do menu:', menuItemError);
          console.error('Item que causou erro:', menuItem);
          continue;
        }

        console.log('Item criado:', menuItemData);

        // Migrar ingredientes
        if (item.ingredients && item.ingredients.length > 0) {
          console.log(`Migrando ingredientes para: ${item.name}`);
          
          const ingredientsToInsert = item.ingredients.map(ing => ({
            name: ing.name,
            menu_item_id: menuItemData.id,
            removable: ing.removable ?? true
          }));

          const { error: ingredientsError } = await supabase
            .from('ingredients')
            .insert(ingredientsToInsert);

          if (ingredientsError) {
            console.error('Erro ao inserir ingredientes:', ingredientsError);
            console.error('Ingredientes que causaram erro:', ingredientsToInsert);
          } else {
            console.log(`Ingredientes migrados para ${item.name}`);
          }
        }
      }
    }

    console.log('Migração concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração:', error);
  }
}

migrateData(); 