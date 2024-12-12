"use client"

import React from 'react';
import Image from 'next/image';
import { MenuItem as MenuItemType } from '@/types/menu';
import { ShoppingCart, Clock, Star, ImageOff } from 'lucide-react';
import DynamicDiv from './DynamicDiv';

interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  const [imageError, setImageError] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  return (
    <DynamicDiv className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {item.image_url && !imageError ? (
          <>
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <ImageOff className="w-12 h-12" />
          </div>
        )}
      </div>
      <DynamicDiv className="p-4">
        <DynamicDiv className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          {item.serve_people && (
            <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
              Serve {item.serve_people} {item.serve_people === 1 ? 'pessoa' : 'pessoas'}
            </span>
          )}
        </DynamicDiv>
        
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

        <DynamicDiv className="flex items-center gap-4 mb-4">
          {item.preparation_time && (
            <span className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {item.preparation_time}
            </span>
          )}
          {item.rating && (
            <span className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
              {item.rating.toFixed(1)}
            </span>
          )}
        </DynamicDiv>

        <DynamicDiv className="flex justify-between items-center">
          <span className="text-emerald-600 font-bold">
            R$ {item.price.toFixed(2)}
          </span>
          {!item.available ? (
            <span className="text-red-500 text-sm">Indisponível</span>
          ) : (
            <button 
              className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          )}
        </DynamicDiv>
      </DynamicDiv>
    </DynamicDiv>
  );
}