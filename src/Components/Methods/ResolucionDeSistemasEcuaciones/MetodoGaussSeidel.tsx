import { useState } from 'react';
import { useEcuacionSistema } from '../../../hooks/UseEcuacionSistemas';
import { InputEcuacion } from '../../InputEcuacion/InputEcuacion';
import { InputNumerico } from '../../InputNumerico/InputNumerico';
import { ResultadosSistema } from '../../Result/ResultSistema';
import type { IteracionJacobi, ResultadoSistema } from '../../../types/numericalMethods';

export default function MetodoJacobi() {
  const ecuacionX = useEcuacionSistema("(7.85 + 0.1*y + 0.2*z)/3");
  const ecuacionY = useEcuacionSistema("(-19.3 - 0.1*x + 0.3*z)/7");
  const ecuacionZ = useEcuacionSistema("(71.3 - 0.3*x + 0.2*y)/10");

  const [x0, setX0] = useState<string>("0");
  const [y0, setY0] = useState<string>("0");
  const [z0, setZ0] = useState<string>("0");
  const [tolerancia, setTolerancia] = useState<string>("0.0001");
  const [maxIteraciones, setMaxIteraciones] = useState<string>("100");
  const [resultado, setResultado] = useState<ResultadoSistema | null>(null);
  const [iteraciones, setIteraciones] = useState<IteracionJacobi[]>([]);

  const handleProbarEcuacionX = () => {
    const prueba = ecuacionX.probarEcuacion();
    if (prueba.exitoso) {
      alert(`Ecuación X válida!\nf(0,0,0) = ${prueba.test1}\nf(1,1,1) = ${prueba.test2}`);
    } else {
      alert(prueba.error);
    }
  };

  const handleProbarEcuacionY = () => {
    const prueba = ecuacionY.probarEcuacion();
    if (prueba.exitoso) {
      alert(`Ecuación Y válida!\nf(0,0,0) = ${prueba.test1}\nf(1,1,1) = ${prueba.test2}`);
    } else {
      alert(prueba.error);
    }
  };

  const handleProbarEcuacionZ = () => {
    const prueba = ecuacionZ.probarEcuacion();
    if (prueba.exitoso) {
      alert(`Ecuación Z válida!\nf(0,0,0) = ${prueba.test1}\nf(1,1,1) = ${prueba.test2}`);
    } else {
      alert(prueba.error);
    }
  };

  const resolverGaussSeidel = () => {
    try {
      let x = parseFloat(x0);
      let y = parseFloat(y0);
      let z = parseFloat(z0);
      const tol = parseFloat(tolerancia);
      const maxIter = parseInt(maxIteraciones);

      const nuevasIteraciones: IteracionJacobi[] = [];
      let iteracion = 0;
      let error = tol + 1;

      // Declarar variables aquí para que estén disponibles en todo el scope
      let nuevoX = 0;
      let nuevoY = 0;
      let nuevoZ = 0;

      while (error > tol && iteracion < maxIter) {
        // Calcular nuevos valores en orden
        nuevoX = ecuacionX.evaluar({ x, y, z });
        nuevoY = ecuacionY.evaluar({ x: nuevoX, y, z });
        nuevoZ = ecuacionZ.evaluar({ x: nuevoX, y: nuevoY, z });

        // Calcular error (norma euclidiana)
        error = Math.sqrt(
          Math.pow(nuevoX - x, 2) +
          Math.pow(nuevoY - y, 2) +
          Math.pow(nuevoZ - z, 2)
        );

        // Guardar iteración
        nuevasIteraciones.push({
          iteracion: iteracion + 1,
          x: nuevoX,
          y: nuevoY,
          z: nuevoZ,
          error
        });

    
        x = nuevoX;
        y = nuevoY;
        z = nuevoZ;
        iteracion++;
      }

      setIteraciones(nuevasIteraciones);
      setResultado({
        raiz: `x = ${x.toFixed(6)}, y = ${y.toFixed(6)}, z = ${z.toFixed(6)}`,
        iteraciones: iteracion,
        error: error
      });

    } catch (error) {
      alert('Error al resolver el sistema: ' + error);
    }
  };

  const limpiarResultados = () => {
    setResultado(null);
    setIteraciones([]);
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-[#424874] mb-4">Método de Gauss-Seidel</h3>

      <div className="space-y-4">
        <InputEcuacion
          label='Ecuación para X:'
          ecuacion={ecuacionX.ecuacion}
          setEcuacion={ecuacionX.setEcuacion}
          errorEcuacion={ecuacionX.errorEcuacion}
          onProbarEcuacion={handleProbarEcuacionX}
          placeholder="(7.85 + 0.1*y + 0.2*z)/3"
          param={2}
        />

        <InputEcuacion
          label='Ecuación para Y:'
          ecuacion={ecuacionY.ecuacion}
          setEcuacion={ecuacionY.setEcuacion}
          errorEcuacion={ecuacionY.errorEcuacion}
          onProbarEcuacion={handleProbarEcuacionY}
          placeholder="(-19.3 - 0.1*x + 0.3*z)/7"
          param={2}
        />

        <InputEcuacion
          label='Ecuación para Z:'
          ecuacion={ecuacionZ.ecuacion}
          setEcuacion={ecuacionZ.setEcuacion}
          errorEcuacion={ecuacionZ.errorEcuacion}
          onProbarEcuacion={handleProbarEcuacionZ}
          placeholder="(71.3 - 0.3*x + 0.2*y)/10"
          param={2}
        />

        <div className="grid grid-cols-3 gap-4">
          <InputNumerico
            label="X inicial:"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            placeholder="0"
          />

          <InputNumerico
            label="Y inicial:"
            value={y0}
            onChange={(e) => setY0(e.target.value)}
            placeholder="0"
          />

          <InputNumerico
            label="Z inicial:"
            value={z0}
            onChange={(e) => setZ0(e.target.value)}
            placeholder="0"
          />
        </div>

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
          onClick={resolverGaussSeidel}
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

      <ResultadosSistema resultado={resultado} iteraciones={iteraciones} />
    </div>
  );
}