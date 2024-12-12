'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { total } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Aqui você pode adicionar a lógica de processamento do pedido
      // Por exemplo, enviar para uma API, etc.
      
      // Simula um processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Gera um ID de pedido aleatório
      const orderId = "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Redireciona para a página de confirmação com o ID do pedido
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço de Entrega</label>
          <textarea
            id="address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total do Pedido:</span>
            <span className="text-xl font-bold text-emerald-600">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
        </button>
      </form>
    </div>
  );
} 