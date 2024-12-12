import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Clock, Truck, Package, ChefHat } from 'lucide-react';
import { OrderStatus } from '../types/order';

const statusSteps: { status: OrderStatus; icon: React.ReactNode; label: string }[] = [
  { status: 'paid', icon: <CheckCircle className="h-6 w-6" />, label: 'Pedido Confirmado' },
  { status: 'preparing', icon: <ChefHat className="h-6 w-6" />, label: 'Em Preparação' },
  { status: 'ready_for_delivery', icon: <Package className="h-6 w-6" />, label: 'Pronto para Entrega' },
  { status: 'out_for_delivery', icon: <Truck className="h-6 w-6" />, label: 'Saiu para Entrega' },
  { status: 'delivered', icon: <CheckCircle className="h-6 w-6" />, label: 'Entregue' },
];

export default function OrderTracking() {
  const { orderId } = useParams();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('paid');
  const [estimatedTime, setEstimatedTime] = useState(45);

  // Simulate order status updates
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const currentStep = statusSteps.findIndex((step) => step.status === currentStatus);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Acompanhe seu Pedido</h1>
            <p className="text-gray-600">Pedido #{orderId}</p>
            {estimatedTime > 0 && (
              <div className="mt-4 flex items-center justify-center text-emerald-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Tempo estimado: {estimatedTime} minutos</span>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <div
                  key={step.status}
                  className={`flex items-center ${
                    index !== statusSteps.length - 1 ? 'pb-8 relative' : ''
                  }`}
                >
                  {index !== statusSteps.length - 1 && (
                    <div
                      className={`absolute left-4 top-10 w-0.5 h-full ${
                        isCompleted ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-2 ring-emerald-600 ring-offset-2' : ''}`}
                  >
                    {step.icon}
                  </div>

                  <div className="ml-4">
                    <p
                      className={`font-medium ${
                        isCompleted ? 'text-emerald-600' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-gray-500 mt-1">
                        {getStatusMessage(step.status)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="font-semibold mb-4">Endereço de Entrega</h2>
            <p className="text-gray-600">
              Rua Exemplo, 123 - Apto 45
              <br />
              Bairro Centro - São Paulo, SP
              <br />
              CEP: 01234-567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusMessage(status: OrderStatus): string {
  switch (status) {
    case 'paid':
      return 'Seu pedido foi confirmado e está sendo processado';
    case 'preparing':
      return 'Nossos chefs estão preparando seu pedido com todo cuidado';
    case 'ready_for_delivery':
      return 'Seu pedido está pronto e aguardando o entregador';
    case 'out_for_delivery':
      return 'Seu pedido está a caminho!';
    case 'delivered':
      return 'Pedido entregue. Bom apetite!';
    default:
      return '';
  }
}