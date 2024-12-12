import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { OrderAddress } from '../types/order';
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<'review' | 'address' | 'payment'>('review');
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState<OrderAddress>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix'>('credit_card');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto p-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
            {['review', 'address', 'payment'].map((s, index) => (
              <div
                key={s}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  ['review', 'address', 'payment'].indexOf(step) >= index
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Revisão</span>
            <span>Endereço</span>
            <span>Pagamento</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {step === 'review' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Revise seu Pedido</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-4 border-b"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Taxa de entrega</span>
                    <span>R$ 5.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>R$ {(total + 5).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-emerald-600 hover:text-emerald-700"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Menu
                  </button>
                  <button
                    onClick={() => setStep('address')}
                    className="btn-primary"
                  >
                    Continuar para Entrega
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="p-6">
              <h2 className="text-2xl font-bold mb-6">Endereço de Entrega</h2>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua
                    </label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número
                    </label>
                    <input
                      type="text"
                      required
                      value={address.number}
                      onChange={(e) =>
                        setAddress({ ...address, number: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={address.complement}
                    onChange={(e) =>
                      setAddress({ ...address, complement: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bairro
                    </label>
                    <input
                      type="text"
                      required
                      value={address.neighborhood}
                      onChange={(e) =>
                        setAddress({ ...address, neighborhood: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      required
                      value={address.zipCode}
                      onChange={(e) =>
                        setAddress({ ...address, zipCode: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep('review')}
                  className="flex items-center text-emerald-600 hover:text-emerald-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </button>
                <button type="submit" className="btn-primary">
                  Continuar para Pagamento
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="p-6">
              <h2 className="text-2xl font-bold mb-6">Forma de Pagamento</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                      paymentMethod === 'credit_card'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-600'
                    }`}
                  >
                    <CreditCard className={`h-6 w-6 ${
                      paymentMethod === 'credit_card' ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">Cartão de Crédito</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-600'
                    }`}
                  >
                    <QrCode className={`h-6 w-6 ${
                      paymentMethod === 'pix' ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">PIX</span>
                  </button>
                </div>

                {paymentMethod === 'credit_card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Validade
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome no Cartão
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Como aparece no cartão"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Após confirmar o pedido, você receberá o QR Code do PIX
                      para realizar o pagamento.
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total a Pagar</span>
                    <span>R$ {(total + 5).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="flex items-center text-emerald-600 hover:text-emerald-700"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary"
                  >
                    {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}