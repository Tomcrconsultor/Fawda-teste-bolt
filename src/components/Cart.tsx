"use client"

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
            <div className="relative w-20 h-20 flex-shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name || 'Item do menu'}
                  fill
                  className="object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Sem imagem</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.name || 'Item sem nome'}
              </h4>
              <p className="text-sm text-gray-500">
                R$ {item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center">{item.quantity}</span>
              
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-medium">Total</span>
          <span className="text-lg font-semibold text-emerald-600">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}