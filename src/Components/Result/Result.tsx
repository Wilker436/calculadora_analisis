// components/Result/Result.tsx
import type { Resultado, IteracionBiseccion, IteracionNewton, IteracionSecante, IteracionPuntoFijo } from '../../types/numericalMethods';
import FunctionChart from '../Charts/CharFuntion';


interface ResultadosProps {
  resultado: Resultado | null;
  iteraciones: IteracionBiseccion[] | IteracionNewton[] | IteracionSecante[] | IteracionPuntoFijo[];
  ecuacion?: string;
}

export const Resultados: React.FC<ResultadosProps> = ({ resultado, iteraciones, ecuacion }) => {
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
          <div>
            <strong>Raíz aproximada:</strong> {resultado.raiz.toFixed(6)}
          </div>
          <div>
            <strong>Iteraciones:</strong> {resultado.iteraciones} {/* Ya es entero */}
          </div>
          {resultado.errorFinal && (
            <div>
              <strong>Error final:</strong> {resultado.errorFinal.toFixed(6)}
            </div>
          )}
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

      {ecuacion && (
        <div className="bg-light w-full h-100 bg-[#F4EEFF] mt-4 p-2 rounded-md overflow-auto ">
          <FunctionChart funcion={ecuacion} xMin={-20} xMax={20} numPuntos={100} />
        </div>
      )}


    </div>
  );
};