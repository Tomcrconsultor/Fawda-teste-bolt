'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState('processing');

  // Simula diferentes estados do pedido
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('shipped');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Acompanhar Pedido</h1>

      {orderId ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <p className="text-gray-600">Número do Pedido:</p>
            <p className="text-xl font-bold">{orderId}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium">Pedido Confirmado</p>
                <p className="text-sm text-gray-500">Seu pedido foi recebido e está sendo processado</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`h-8 w-8 rounded-full ${status === 'processing' || status === 'shipped' ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center`}>
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium">Em Processamento</p>
                <p className="text-sm text-gray-500">Seu pedido está sendo preparado</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`h-8 w-8 rounded-full ${status === 'shipped' ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center`}>
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium">Enviado</p>
                <p className="text-sm text-gray-500">Seu pedido está a caminho</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">Nenhum pedido encontrado. Verifique o número do pedido.</p>
        </div>
      )}
    </div>
  );
} 