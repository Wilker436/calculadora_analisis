// components/TablaPuntos/TablaPuntos.tsx
import { useState } from 'react';
import type { TablaPuntosProps } from '../../types/numericalMethods';

export default function TablaPuntos({ numPuntos, onChange, disabled = false }: TablaPuntosProps) {
  const [puntos, setPuntos] = useState<{ x: number; y: number }[]>([]);

  const generarTabla = () => {
    const nuevaTabla = Array(numPuntos).fill(0).map(() => ({ x: 0, y: 0 }));
    setPuntos(nuevaTabla);
    onChange(nuevaTabla);
  };

  const handleChange = (index: number, campo: 'x' | 'y', valor: string) => {
    const numValor = parseFloat(valor) || 0;
    const nuevosPuntos = puntos.map((punto, i) => 
      i === index ? { ...punto, [campo]: numValor } : punto
    );
    setPuntos(nuevosPuntos);
    onChange(nuevosPuntos);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={generarTabla}
        className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#373b67] transition-colors"
      >
        Generar Tabla ({numPuntos} puntos)
      </button>

      {puntos.length > 0 && (
        <div className="border border-gray-300 rounded-lg bg-gray-50 p-4 w-full">
          {/* Contenedor principal con scroll */}
          <div className="overflow-x-auto">
            {/* Contenedor interno con ancho fijo por punto */}
            <div className="flex flex-col gap-2 min-w-max">
              
              {/* Fila de números - MISMAS PROPIEDADES que inputs */}
              <div className="flex gap-2">
                <div className="w-16 h-10 flex items-center justify-center font-semibold text-gray-700 shrink-0">
                  P
                </div>
                {puntos.map((_, index) => (
                  <div 
                    key={index} 
                    className="w-16 h-10 flex items-center justify-center font-semibold text-gray-700 shrink-0 border border-transparent" // ← border transparent para mismo tamaño
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Fila X */}
              <div className="flex gap-2">
                <div className="w-16 h-10 flex items-center justify-center font-medium text-gray-700 shrink-0">
                  X
                </div>
                {puntos.map((punto, index) => (
                  <input
                    key={`x-${index}`}
                    type="number"
                    step="any"
                    value={punto.x}
                    onChange={(e) => handleChange(index, 'x', e.target.value)}
                    disabled={disabled}
                    className="w-16 h-10 text-center border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874] disabled:bg-gray-200 shrink-0"
                    placeholder="0"
                  />
                ))}
              </div>

              {/* Fila Y */}
              <div className="flex gap-2">
                <div className="w-16 h-10 flex items-center justify-center font-medium text-gray-700 shrink-0">
                  Y
                </div>
                {puntos.map((punto, index) => (
                  <input
                    key={`y-${index}`}
                    type="number"
                    step="any"
                    value={punto.y}
                    onChange={(e) => handleChange(index, 'y', e.target.value)}
                    disabled={disabled}
                    className="w-16 h-10 text-center border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874] disabled:bg-gray-200 shrink-0"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}