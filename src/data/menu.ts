import { MenuSection, MenuItem } from '@/types/menu';

const STORAGE_URL = "https://vobaklixhkvwmmmpajeb.supabase.co/storage/v1/object/public/menu-images";

export const menuData: MenuSection[] = [
  {
    id: 'combos',
    title: 'Combos',
    items: [
      {
        id: 'combo-individual',
        name: 'Combo Individual',
        description: 'Combo perfeito para uma pessoa',
        price: 45.90,
        image_url: `${STORAGE_URL}/combo-individual.jpg`,
        preparation_time: '15-20 min',
        serve_people: 1,
        category_id: 'combos',
        available: true,
        rating: 4.8
      },
      {
        id: 'combo-duplo',
        name: 'Combo Duplo',
        description: 'Combo ideal para duas pessoas',
        price: 79.90,
        image_url: `${STORAGE_URL}/combo-duplo.jpg`,
        preparation_time: '20-25 min',
        serve_people: 2,
        category_id: 'combos',
        available: true,
        rating: 4.9
      },
    ],
  },
  {
    id: 'lanches',
    title: 'Lanches',
    items: [
      {
        id: 'kibe-carne',
        name: 'Kibe de Carne',
        description: 'Kibe tradicional sírio recheado com carne',
        price: 12.90,
        image_url: `${STORAGE_URL}/kibe-carne.jpg`,
        preparation_time: '10-15 min',
        category_id: 'lanches',
        available: true,
        rating: 4.7
      },
      {
        id: 'kibe-queijo',
        name: 'Kibe de Queijo',
        description: 'Kibe recheado com queijo derretido',
        price: 12.90,
        image_url: `${STORAGE_URL}/kibe-queijo.jpg`,
        preparation_time: '10-15 min',
        category_id: 'lanches',
        available: true,
        rating: 4.6
      },
      {
        id: 'falafel',
        name: 'Falafel',
        description: 'Bolinhos de grão de bico tradicional',
        price: 10.90,
        image_url: `${STORAGE_URL}/falafel.jpg`,
        preparation_time: '15-20 min',
        category_id: 'lanches',
        available: true,
        rating: 4.8
      },
      {
        id: 'batata-frita',
        name: 'Batata Frita',
        description: 'Porção de batata frita crocante',
        price: 15.90,
        image_url: `${STORAGE_URL}/batata-frita.jpg`,
        preparation_time: '10-15 min',
        category_id: 'lanches',
        available: true,
        rating: 4.5
      },
    ],
  },
  {
    id: 'doces-sirios',
    title: 'Doces Sírios',
    items: [
      {
        id: 'biscoito-erva-doce',
        name: 'Biscoito de Erva Doce',
        description: 'Biscoito tradicional com erva doce',
        price: 18.90,
        image_url: `${STORAGE_URL}/biscoito-erva-doce.jpg`,
        category_id: 'doces-sirios',
        available: true,
        rating: 4.6
      },
      {
        id: 'herise',
        name: 'Herise',
        description: 'Doce típico sírio',
        price: 22.90,
        image_url: `${STORAGE_URL}/herise.jpg`,
        category_id: 'doces-sirios',
        available: true,
        rating: 4.7
      },
      {
        id: 'bolacha-tamara',
        name: 'Bolacha de Tâmara',
        description: 'Bolacha recheada com tâmara',
        price: 20.90,
        image_url: `${STORAGE_URL}/bolacha-tamara.jpg`,
        category_id: 'doces-sirios',
        available: true,
        rating: 4.8
      },
      {
        id: 'bolacha-pistache',
        name: 'Bolacha de Pistache',
        description: 'Bolacha recheada com pistache',
        price: 20.90,
        image_url: `${STORAGE_URL}/bolacha-pistache.jpg`,
        category_id: 'doces-sirios',
        available: true,
        rating: 4.9
      },
    ],
  },
  {
    id: 'mercado-sirio',
    title: 'Mercado Sírio',
    items: [
      {
        id: 'zatar',
        name: 'Zatar',
        description: 'Tempero tradicional sírio',
        price: 15.90,
        image_url: `${STORAGE_URL}/zatar.jpg`,
        category_id: 'mercado-sirio',
        available: true,
        rating: 4.7
      },
      {
        id: 'humos',
        name: 'Homus',
        description: 'Pasta de grão de bico tradicional',
        price: 18.90,
        image_url: `${STORAGE_URL}/humos.jpg`,
        category_id: 'mercado-sirio',
        available: true,
        rating: 4.8
      },
      {
        id: 'pasta-alho',
        name: 'Pasta de Alho',
        description: 'Pasta de alho síria',
        price: 12.90,
        image_url: `${STORAGE_URL}/pasta-alho.jpg`,
        category_id: 'mercado-sirio',
        available: true,
        rating: 4.6
      },
      {
        id: 'pao-sirio',
        name: 'Pão Sírio',
        description: 'Pão sírio tradicional',
        price: 8.90,
        image_url: `${STORAGE_URL}/pao-sirio.jpg`,
        category_id: 'mercado-sirio',
        available: true,
        rating: 4.9
      },
    ],
  },
];

export const categories = [
  {
    id: 'combos',
    name: 'Combos',
    slug: 'combos'
  },
  {
    id: 'lanches',
    name: 'Lanches',
    slug: 'lanches'
  },
  {
    id: 'doces-sirios',
    name: 'Doces Sírios',
    slug: 'doces-sirios'
  },
  {
    id: 'mercado-sirio',
    name: 'Mercado Sírio',
    slug: 'mercado-sirio'
  }
];