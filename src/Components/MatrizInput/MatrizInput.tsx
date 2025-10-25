// components/MatrizInput/MatrizInput.tsx
import { useState } from 'react';
import type { MatrizInputProps } from '../../types/numericalMethods';



export default function MatrizInput({ filas, columnas, onChange, disabled = false }: MatrizInputProps) {
  const [matriz, setMatriz] = useState<number[][]>([]);

  // Función para generar nueva matriz
  const generarMatriz = () => {
    const nuevaMatriz = Array(filas).fill(0).map(() => Array(columnas).fill(0));
    setMatriz(nuevaMatriz);
    onChange(nuevaMatriz);
  };

  const handleChange = (fila: number, columna: number, valor: string) => {
    const numValor = parseFloat(valor) || 0;
    
    const nuevaMatriz = matriz.map((f, i) => 
      i === fila ? f.map((v, j) => j === columna ? numValor : v) : f
    );
    
    setMatriz(nuevaMatriz);
    onChange(nuevaMatriz);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Botón para generar matriz */}
      <button
        onClick={generarMatriz}
        className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#373b67] transition-colors"
      >
        Generar Matriz {filas}×{columnas}
      </button>

      {/* Inputs de la matriz - solo se muestra si hay matriz generada */}
      {matriz.length > 0 && (
        <div 
          className="inline-grid gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50"
          style={{ 
            gridTemplateColumns: `repeat(${matriz[0]?.length || columnas}, minmax(0, 1fr))` 
          }}
        >
          {matriz.map((fila, i) =>
            fila.map((valor, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                step="any"
                value={valor}
                onChange={(e) => handleChange(i, j, e.target.value)}
                disabled={disabled}
                className="w-16 h-10 text-center border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874] disabled:bg-gray-200"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}