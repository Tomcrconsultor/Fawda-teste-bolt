import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

export default function FactorialCalculator() {
  const [number, setNumber] = useState<number>(5);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateFactorial = () => {
    setError('');
    if (number > 170) {
      setError('Número muito grande! Por favor, use um número menor que 171.');
      setResult(null);
      return;
    }
    if (number < 0) {
      setError('Por favor, use um número positivo.');
      setResult(null);
      return;
    }
    setResult(factorial(number));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-6 w-6 text-emerald-600" />
        <h2 className="text-2xl font-bold">Calculadora de Fatorial</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
            Digite um número:
          </label>
          <input
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Digite um número"
          />
        </div>

        <button
          onClick={calculateFactorial}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          <Calculator className="h-4 w-4" />
          Calcular Fatorial
        </button>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-md">
            <p className="text-sm text-emerald-800 mb-1">Resultado:</p>
            <p className="text-2xl font-bold text-emerald-600">
              {number}! = {result.toLocaleString()}
            </p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          <p>O fatorial de um número n (escrito como n!) é o produto de todos os números inteiros positivos menores ou iguais a n.</p>
          <p className="mt-1">Exemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120</p>
        </div>
      </div>
    </div>
  );
}