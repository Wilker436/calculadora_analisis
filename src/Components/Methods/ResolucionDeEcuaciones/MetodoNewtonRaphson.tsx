import { useState } from 'react';
import { useEcuacion } from '../../../hooks/UseEcuacion';
import { InputEcuacion } from '../../InputEcuacion/InputEcuacion';
import { InputNumerico } from '../../InputNumerico/InputNumerico';
import { Resultados } from '../../Result/Result';
import type { IteracionNewton, ResultadoConDerivada } from '../../../types/numericalMethods';
import { derivadaNumerica } from '../../../utils/derivadas';

export default function MetodoNewtonRaphson() {
  const { ecuacion, setEcuacion, evaluar, probarEcuacion, errorEcuacion } = useEcuacion();

  const [x0] = useState<string>("1");
  const [tolerancia, setTolerancia] = useState<string>("0.0001");
  const [maxIteraciones, setMaxIteraciones] = useState<string>("100");
  const [resultado, setResultado] = useState<ResultadoConDerivada | null>(null);
  const [iteraciones, setIteraciones] = useState<IteracionNewton[]>([]);

  const handleProbarEcuacion = () => {
    const prueba = probarEcuacion();
    if (prueba.exitoso) {
      alert(`Ecuación válida!\nf(0) = ${prueba.test1}\nf(1) = ${prueba.test2}`);
    } else {
      alert(prueba.error);
    }
  };

  const calcularDerivada = (x: number): number => {
    return derivadaNumerica(evaluar, x);
  };

  const newtonRaphson = () => {
    try {
      const x0Num = parseFloat(x0);
      const tol = parseFloat(tolerancia);
      const maxIter = parseInt(maxIteraciones);

      const iteracionesArray: IteracionNewton[] = [];
      let xCurrent = x0Num;

      for (let i = 0; i < maxIter; i++) {
        // Evaluar función y derivada en el punto actual
        const fx = evaluar(xCurrent);
        const dfx = calcularDerivada(xCurrent);

        // Verificar que la derivada no sea cero
        if (Math.abs(dfx) < 1e-10) {
          alert("Derivada cercana a cero. El método puede divergir.");
          return;
        }

        // Fórmula de Newton-Raphson: xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ)
        const xNext = xCurrent - fx / dfx;

        const error = Math.abs(xNext - xCurrent);

        const iteracion: IteracionNewton = {
          iteracion: i + 1,
          x: xNext,
          fx: evaluar(xNext),
          dfx: calcularDerivada(xNext),
          error: error
        };

        iteracionesArray.push(iteracion);

        // Verificar convergencia
        if (error < tol) {
          setResultado({
            raiz: xNext,
            iteraciones: i + 1,
            errorFinal: error
          });
          setIteraciones(iteracionesArray);
          return;
        }

        xCurrent = xNext;
      }

      // No convergió en el máximo de iteraciones
      const ultimaIteracion = iteracionesArray[iteracionesArray.length - 1];
      setResultado({
        raiz: ultimaIteracion.x,
        iteraciones: maxIter,
        errorFinal: ultimaIteracion.error,
        advertencia: "No se alcanzó la tolerancia en el número máximo de iteraciones"
      });
      setIteraciones(iteracionesArray);

    } catch (error) {
      let errorMessage = "Ocurrió un error desconocido";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        // Si lanzan un string u otra cosa que no sea Error
        errorMessage = String(error);
      }

      alert("Error en el método de Newton-Raphson: " + errorMessage);
    }
  };





  const limpiarResultados = () => {
    setResultado(null);
    setIteraciones([]);
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-[#424874] mb-4">Método de Bisección</h3>

      <div className="space-y-4">
        <InputEcuacion
          ecuacion={ecuacion}
          setEcuacion={setEcuacion}
          errorEcuacion={errorEcuacion}
          onProbarEcuacion={handleProbarEcuacion}
        />

        {/*       <div className="grid grid-cols-2 gap-4">
          <InputNumerico
            label="Valor inicial de X"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            step="any"
          />

        </div> */}

        <div className="grid grid-cols-2 gap-4">
          <InputNumerico
            label="Tolerancia:"
            value={tolerancia}
            onChange={(e) => setTolerancia(e.target.value)}
            step={0.0001}
            min={0.000001}
          />

          <InputNumerico
            label="Máx. iteraciones:"
            value={maxIteraciones}
            onChange={(e) => setMaxIteraciones(e.target.value)}
            min={1}
            max={1000}
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={newtonRaphson}
          className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#4A528F] transition-colors"
        >
          Resolver
        </button>

        <button
          onClick={limpiarResultados}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Limpiar
        </button>
      </div>

      <Resultados resultado={resultado} iteraciones={iteraciones} ecuacion={ecuacion} />
    </div>
  );
}
