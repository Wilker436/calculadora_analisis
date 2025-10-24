import { useState } from 'react';
import { useEcuacion } from '../../hooks/UseEcuacion';
import { InputEcuacion } from '../InputEcuacion/InputEcuacion';
import { InputNumerico } from '../InputNumerico/InputNumerico';
import { Resultados } from '../Result/Result';
import type { IteracionPuntoFijo, Resultado } from '../../types/numericalMethods';



export default function MetodoPuntoFijo() {

  const { ecuacion, setEcuacion, evaluar, probarEcuacion, errorEcuacion } = useEcuacion();


  // Estados específicos del método
  const [a, setA] = useState<string>("1");
  const [b, setB] = useState<string>("3");
  const [tolerancia, setTolerancia] = useState<string>("0.0001");
  const [maxIteraciones, setMaxIteraciones] = useState<string>("100");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [iteraciones, setIteraciones] = useState<IteracionPuntoFijo[]>([]);


  const handleProbarEcuacion = () => {
    const prueba = probarEcuacion();
    if (prueba.exitoso) {
      alert(`Ecuación válida!\nf(0) = ${prueba.test1}\nf(1) = ${prueba.test2}`);
    } else {
      alert(prueba.error);
    }
  };

  const puntoFijo = () => {
    try {
      const p0 = parseFloat(a); // Valor inicial
      const tol = parseFloat(tolerancia);
      const maxIter = parseInt(maxIteraciones);

      const iteracionesArray: IteracionPuntoFijo[] = [];
      let pCurrent = p0;

      for (let i = 0; i < maxIter; i++) {
        // Evaluar g(p) - la función de iteración
        const pNext = evaluar(pCurrent);

        const error = Math.abs(pNext - pCurrent);

        const iteracion: IteracionPuntoFijo = {
          iteracion: i + 1,
          p: pCurrent,
          'g(p)': pNext,  // g(p)
          error: error
        };

        iteracionesArray.push(iteracion);

        // Verificar convergencia
        if (error < tol) {
          setResultado({
            raiz: pNext,
            iteraciones: i + 1,
            errorFinal: error
          });
          setIteraciones(iteracionesArray);
          return;
        }

        // Preparar siguiente iteración
        pCurrent = pNext;
      }

      // Si no converge en el máximo de iteraciones
      const ultimaIteracion = iteracionesArray[iteracionesArray.length - 1];
      setResultado({
        raiz: ultimaIteracion ? ultimaIteracion['g(p)'] : NaN,
        iteraciones: maxIter,
        errorFinal: ultimaIteracion ? ultimaIteracion.error : NaN,
        advertencia: "No se alcanzó la tolerancia en el número máximo de iteraciones"
      });
      setIteraciones(iteracionesArray);

    } catch (error: any) {
      alert("Error en el método de punto fijo: " + error.message);
    }
  };

  const limpiarResultados = () => {
    setResultado(null);
    setIteraciones([]);
  };


  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-[#424874] mb-4">Método del punto fijo</h3>

      <div className="space-y-4">
        <InputEcuacion
          ecuacion={ecuacion}
          setEcuacion={setEcuacion}
          errorEcuacion={errorEcuacion}
          onProbarEcuacion={handleProbarEcuacion}
        />

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
          onClick={puntoFijo}
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

      <Resultados resultado={resultado} iteraciones={iteraciones} />
    </div>
  )
}

