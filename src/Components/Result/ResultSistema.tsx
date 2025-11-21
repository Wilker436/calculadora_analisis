// components/Result/ResultSistema.tsx
import type { ResultadoSistema, IteracionJacobi } from '../../types/numericalMethods';

interface ResultadosSistemaProps {
  resultado: ResultadoSistema | null;
  iteraciones: IteracionJacobi[];
}

export const ResultadosSistema: React.FC<ResultadosSistemaProps> = ({ resultado, iteraciones }) => {
  if (!resultado) return null;

  // Función para formatear valores según la columna
  const formatearValor = (key: string, value: unknown): string => {
    if (key === 'iteracion') {
      return String(value);
    }


    if (typeof value === 'number') {
      return value.toFixed(6);
    }

    if (value !== null && value !== undefined) {
      return value.toString();
    }

    return '';
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Resultado principal */}
      <div className="p-4 bg-[#DCD6F7] border border-[#b8b2d6] rounded-lg">
        <h4 className="text-lg font-semibold text-[#424874] mb-2">Resultados</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <strong>Solución:</strong> {resultado.raiz}
          </div>
          <div>
            <strong>Iteraciones:</strong> {resultado.iteraciones}
          </div>
          <div>
            <strong>Error final:</strong> {resultado.error.toFixed(6)}
          </div>
          {resultado.advertencia && (
            <div className="col-span-2 text-yellow-700">
              <strong>Advertencia:</strong> {resultado.advertencia}
            </div>
          )}
        </div>
      </div>

      {/* Tabla de iteraciones */}
      {iteraciones.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <h4 className="text-lg font-semibold bg-gray-50 p-3 border-b">
            Iteraciones
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(iteraciones[0]).map(key => (
                    <th key={key} className="py-2 px-3 border-b text-left capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {iteraciones.map((iter, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.entries(iter).map(([key, value], idx) => (
                      <td key={idx} className="py-2 px-3 border-b text-center">
                        {formatearValor(key, value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};