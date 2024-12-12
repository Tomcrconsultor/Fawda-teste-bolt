import React from 'react';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  category: string;
  minOrder: number;
}

export default function RestaurantCard({
  name,
  image,
  rating,
  deliveryTime,
  category,
  minOrder
}: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{category}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span>{deliveryTime}</span>
          </div>
          <span className="text-gray-600">
            Min. R$ {minOrder.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}