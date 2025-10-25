
import { useState } from 'react';
import { useGaussJordan } from '../../hooks/UseGaussJordan';
import MatrizInput from '../MatrizInput/MatrizInput';
import type { PasoGaussJordan } from '../../types/numericalMethods';

export default function MetodoGaussJordan() {
  const [filas, setFilas] = useState<number>(2);
  const [columnas, setColumnas] = useState<number>(3); // n columnas para n+1 (términos independientes)
  const [matriz, setMatriz] = useState<number[][]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  
  const { pasos, resultado, resolver } = useGaussJordan();

  const handleResolver = () => {
    try {
      resolver(matriz);
      setMostrarResultados(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al resolver el sistema');
    }
  };

  const handleMatrizChange = (nuevaMatriz: number[][]) => {
    setMatriz(nuevaMatriz);
    setMostrarResultados(false);
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold text-[#424874] mb-6 text-center">
        Método de Gauss Jordan
      </h3>

      {/* Controles de tamaño */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Filas (n)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={filas}
            onChange={(e) => setFilas(parseInt(e.target.value) || 1)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Columnas (n+1)
          </label>
          <input
            type="number"
            min="2"
            max="11"
            value={columnas}
            onChange={(e) => setColumnas(parseInt(e.target.value) || 2)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874]"
          />
        </div>
      </div>

      {/* Matriz aumentada */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-[#424874] mb-4 text-center">
          Matriz Aumentada [A|B]
        </h4>
        <p className="text-sm text-gray-600 text-center mb-4">
          Ingrese los coeficientes de la matriz A y el vector de términos independientes B
        </p>
        
        <MatrizInput
          filas={filas}
          columnas={columnas}
          onChange={handleMatrizChange}
        />
      </div>

      {/* Botón resolver */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleResolver}
          disabled={matriz.length === 0}
          className="px-6 py-3 bg-[#424874] text-white rounded-md hover:bg-[#373b67] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Resolver Sistema
        </button>
      </div>

      {/* Resultados */}
      {mostrarResultados && (
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-[#424874] mb-4">Resultados</h4>
          
          {/* Solución */}
          <div className="mb-6 p-4 bg-[#DCD6F7] rounded-lg">
            <h5 className="font-medium text-[#424874] mb-2">Solución del Sistema:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {resultado.map((valor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-[#424874]">x{index + 1} =</span>
                  <span className="font-mono font-semibold text-[#424874]">
                    {valor}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pasos del método */}
          <div>
            <h5 className="font-semibold text-[#424874] mb-3">Pasos del Método:</h5>
            <div className="space-y-4">
              {pasos.map((paso: PasoGaussJordan) => (
                <div key={paso.paso} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[#424874]">Paso {paso.paso}</span>
                    {paso.operacion && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                        {paso.operacion}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{paso.descripcion}</p>
                  
                  {/* Matriz del paso */}
                  <div className="flex justify-center">
                    <div className="inline-grid gap-1">
                      {paso.matriz.map((fila, i) => (
                        <div key={i} className="flex gap-1">
                          {fila.map((valor, j) => (
                            <div
                              key={j}
                              className="w-12 h-8 flex items-center justify-center border border-gray-300 bg-white text-sm font-mono"
                            >
                              {valor.toFixed(2)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}