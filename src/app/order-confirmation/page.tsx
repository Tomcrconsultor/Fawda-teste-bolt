'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg text-center">
      <div className="mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <p className="text-gray-600 mb-4">
          Seu pedido foi realizado com sucesso. O número do seu pedido é:
        </p>
        <p className="text-xl font-bold text-emerald-600 mb-4">{orderId}</p>
        <p className="text-sm text-gray-500">
          Guarde este número para acompanhar seu pedido
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => router.push(`/order-tracking?orderId=${orderId}`)}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Acompanhar Pedido
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full text-emerald-600 py-2 px-4 hover:text-emerald-700 transition-colors"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
} 