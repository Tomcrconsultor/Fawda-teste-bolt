"use client"

import React, { useState } from 'react';
import { MenuItem, Ingredient } from '../types/menu';
import { CartItem } from '../types/cart';
import { X, ChevronDown } from 'lucide-react';

interface MenuItemCustomizeProps {
  item: MenuItem;
  onAddToCart: (customizations: CartItem['customizations']) => void;
  onCancel: () => void;
}

export default function MenuItemCustomize({ item, onAddToCart, onCancel }: MenuItemCustomizeProps) {
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [additionalIngredients, setAdditionalIngredients] = useState<Ingredient[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    item.options?.porcoes?.[0]?.id
  );
  const [selectedLanche1, setSelectedLanche1] = useState<string>('');
  const [selectedLanche2, setSelectedLanche2] = useState<string>('');
  const [selectedBebida, setSelectedBebida] = useState<string>('');

  const isCombo = item.options?.lanches !== undefined;
  const isDuploCombo = item.id.includes('duplo');

  const handleToggleIngredient = (ingredient: Ingredient) => {
    if (ingredient.removable) {
      setRemovedIngredients(prev =>
        prev.includes(ingredient.id)
          ? prev.filter(id => id !== ingredient.id)
          : [...prev, ingredient.id]
      );
    }
  };

  const handleToggleAdditional = (additional: Ingredient) => {
    if (additional.additional) {
      setAdditionalIngredients(prev =>
        prev.some(item => item.id === additional.id)
          ? prev.filter(item => item.id !== additional.id)
          : [...prev, additional]
      );
    }
  };

  const calculateTotal = () => {
    let total = item.price;

    // Adiciona o preço dos ingredientes adicionais
    const additionalsTotal = additionalIngredients.reduce((sum, ingredient) => 
      sum + (ingredient.price || 0), 0);
    total += additionalsTotal;

    // Se tiver opções de porções e uma porção selecionada
    if (item.options?.porcoes && selectedOption) {
      const selectedPorcao = item.options.porcoes.find(p => p.id === selectedOption);
      if (selectedPorcao) {
        total = selectedPorcao.price + additionalsTotal;
      }
    }

    return total;
  };

  const handleConfirm = () => {
    // Verifica se todas as seleções necessárias foram feitas
    if (isCombo) {
      if (!selectedLanche1 || !selectedBebida || (isDuploCombo && !selectedLanche2)) {
        alert('Por favor, faça todas as seleções necessárias');
        return;
      }
    }

    if (item.options?.porcoes && !selectedOption) {
      alert('Por favor, selecione o tamanho');
      return;
    }

    onAddToCart({
      removedIngredients,
      additionalIngredients,
      selectedOption,
      comboSelections: isCombo ? {
        lanche1: selectedLanche1,
        lanche2: isDuploCombo ? selectedLanche2 : undefined,
        bebida: selectedBebida
      } : undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Personalizar {item.name}</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Combo Selections */}
          {isCombo && (
            <>
              <div className="space-y-4">
                <h4 className="font-medium">Escolha seu lanche:</h4>
                <select
                  value={selectedLanche1}
                  onChange={(e) => setSelectedLanche1(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Selecione o lanche</option>
                  {item.options?.lanches?.map(lanche => (
                    <option key={lanche.id} value={lanche.id}>
                      {lanche.name}
                    </option>
                  ))}
                </select>

                {isDuploCombo && (
                  <select
                    value={selectedLanche2}
                    onChange={(e) => setSelectedLanche2(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione o segundo lanche</option>
                    {item.options?.lanches?.map(lanche => (
                      <option key={lanche.id} value={lanche.id}>
                        {lanche.name}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  value={selectedBebida}
                  onChange={(e) => setSelectedBebida(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Selecione a bebida</option>
                  {item.options?.bebidas?.map(bebida => (
                    <option key={bebida.id} value={bebida.id}>
                      {bebida.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Porções */}
          {item.options?.porcoes && (
            <div className="space-y-4">
              <h4 className="font-medium">Escolha o tamanho:</h4>
              <div className="space-y-2">
                {item.options.porcoes.map((porcao) => (
                  <label key={porcao.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="porcao"
                      value={porcao.id}
                      checked={selectedOption === porcao.id}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="form-radio text-emerald-600"
                    />
                    <span>
                      {porcao.name} - R$ {porcao.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Ingredientes Removíveis */}
          {item.ingredients?.some(i => i.removable) && (
            <div className="space-y-4">
              <h4 className="font-medium">Remover ingredientes:</h4>
              <div className="space-y-2">
                {item.ingredients
                  .filter(i => i.removable)
                  .map((ingredient) => (
                    <label key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={removedIngredients.includes(ingredient.id)}
                        onChange={() => handleToggleIngredient(ingredient)}
                        className="form-checkbox text-emerald-600"
                      />
                      <span>{ingredient.name}</span>
                    </label>
                  ))}
              </div>
            </div>
          )}

          {/* Ingredientes Adicionais */}
          {item.ingredients?.some(i => i.additional) && (
            <div className="space-y-4">
              <h4 className="font-medium">Adicionais:</h4>
              <div className="space-y-2">
                {item.ingredients
                  .filter(i => i.additional)
                  .map((additional) => (
                    <label key={additional.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={additionalIngredients.some(item => item.id === additional.id)}
                        onChange={() => handleToggleAdditional(additional)}
                        className="form-checkbox text-emerald-600"
                      />
                      <span>
                        {additional.name} {additional.price && `(+ R$ ${additional.price.toFixed(2)})`}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total:</span>
            <span className="text-xl font-bold text-emerald-600">
              R$ {calculateTotal().toFixed(2)}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}