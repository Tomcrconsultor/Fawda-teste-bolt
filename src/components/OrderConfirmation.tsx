import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, Receipt, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 rounded-full p-3">
              <CheckCircle className="h-16 w-16 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pedido Confirmado!
          </h1>
          <p className="text-gray-600">
            Pedido #{orderId}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <Clock className="h-6 w-6 text-emerald-600 mt-1" />
            <div className="ml-4">
              <h3 className="font-semibold">Tempo Estimado</h3>
              <p className="text-gray-600">45-60 minutos</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
            <div className="ml-4">
              <h3 className="font-semibold">Endereço de Entrega</h3>
              <p className="text-gray-600">
                Rua Exemplo, 123 - Apto 45
                <br />
                Bairro Centro - São Paulo, SP
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Receipt className="h-6 w-6 text-emerald-600 mt-1" />
            <div className="ml-4">
              <h3 className="font-semibold">Forma de Pagamento</h3>
              <p className="text-gray-600">Cartão de Crédito •••• 4242</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate(`/order-tracking/${orderId}`)}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <span>Acompanhar Pedido</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Voltar para o Início
          </button>
        </div>
      </div>
    </div>
  );
}