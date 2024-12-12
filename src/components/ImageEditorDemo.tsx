import React, { useState } from 'react';
import ImageEditor from './ImageEditor';
import { Image as ImageIcon } from 'lucide-react';

export default function ImageEditorDemo() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');
  const demoImage = 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Editor de Imagem</h2>
          
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 relative mb-4">
            {demoImage ? (
              <img
                src={demoImage}
                alt="Demo"
                className="w-full h-full object-cover"
                style={{ filter: currentFilter }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <ImageIcon className="h-12 w-12" />
              </div>
            )}
          </div>

          <button
            onClick={() => setIsEditorOpen(true)}
            className="btn-primary w-full"
          >
            Abrir Editor
          </button>
        </div>
      </div>

      {isEditorOpen && (
        <ImageEditor
          imageUrl={demoImage}
          onClose={() => setIsEditorOpen(false)}
          onSave={(filter) => {
            setCurrentFilter(filter);
            setIsEditorOpen(false);
          }}
        />
      )}
    </div>
  );
}