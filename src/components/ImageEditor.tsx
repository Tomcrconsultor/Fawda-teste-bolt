import React, { useState, useEffect } from 'react';
import { Sliders, Image as ImageIcon, Save, RotateCcw, X } from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (editedImage: string) => void;
}

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  blur: number;
}

export default function ImageEditor({ imageUrl, onClose, onSave }: ImageEditorProps) {
  const [settings, setSettings] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    blur: 0,
  });

  const [previewStyle, setPreviewStyle] = useState('');

  useEffect(() => {
    const filters = [
      `brightness(${settings.brightness}%)`,
      `contrast(${settings.contrast}%)`,
      `saturate(${settings.saturation}%)`,
      `sepia(${settings.sepia}%)`,
      `blur(${settings.blur / 10}px)`,
    ].join(' ');

    setPreviewStyle(filters);
  }, [settings]);

  const handleReset = () => {
    setSettings({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
      blur: 0,
    });
  };

  const controls = [
    { name: 'brightness', label: 'Brilho', min: 0, max: 200 },
    { name: 'contrast', label: 'Contraste', min: 0, max: 200 },
    { name: 'saturation', label: 'Saturação', min: 0, max: 200 },
    { name: 'sepia', label: 'Sépia', min: 0, max: 100 },
    { name: 'blur', label: 'Desfoque', min: 0, max: 20 },
  ];

  const handleChange = (name: keyof FilterSettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-emerald-600" />
          <h2 className="font-semibold">Editor de Imagem</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Preview */}
      <div className="p-4 border-b">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              style={{ filter: previewStyle }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {controls.map(control => (
            <div key={control.name}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {control.label}
                </label>
                <span className="text-sm text-gray-500">
                  {settings[control.name as keyof FilterSettings]}
                </span>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                value={settings[control.name as keyof FilterSettings]}
                onChange={(e) => handleChange(control.name as keyof FilterSettings, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Redefinir</span>
          </button>
          <button
            onClick={() => onSave(previewStyle)}
            className="flex-1 flex items-center justify-center gap-2 btn-primary"
          >
            <Save className="h-4 w-4" />
            <span>Salvar</span>
          </button>
        </div>
      </div>
    </div>
  );
}