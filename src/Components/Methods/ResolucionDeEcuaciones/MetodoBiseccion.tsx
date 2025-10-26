
import { useState } from 'react';
import { useEcuacion } from '../../../hooks/UseEcuacion';
import { InputEcuacion } from '../../InputEcuacion/InputEcuacion';
import { InputNumerico } from '../../InputNumerico/InputNumerico';
import { Resultados } from '../../Result/Result';
import type { IteracionBiseccion, Resultado } from '../../../types/numericalMethods';

export default function MetodoBiseccion() {
  // Usamos el hook personalizado
  const { ecuacion, setEcuacion, evaluar, probarEcuacion, errorEcuacion } = useEcuacion();

  // Estados específicos del método
  const [a, setA] = useState<string>("1");
  const [b, setB] = useState<string>("3");
  const [tolerancia, setTolerancia] = useState<string>("0.0001");
  const [maxIteraciones, setMaxIteraciones] = useState<string>("100");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [iteraciones, setIteraciones] = useState<IteracionBiseccion[]>([]);

  const handleProbarEcuacion = () => {
    const prueba = probarEcuacion();
    if (prueba.exitoso) {
      alert(`Ecuación válida!\nf(0) = ${prueba.test1}\nf(1) = ${prueba.test2}`);
    } else {
      alert(prueba.error);
    }
  };

  const biseccion = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const tol = parseFloat(tolerancia);
    const maxIter = parseInt(maxIteraciones);
    
    const iteracionesArray: IteracionBiseccion[] = [];
    
    try {
      // Verificar teorema de Bolzano
      const fa = evaluar(aNum);
      const fb = evaluar(bNum);
      
      if (fa * fb >= 0) {
        alert("No se cumple el teorema de Bolzano: f(a) * f(b) >= 0");
        return;
      }
      
      // Algoritmo de bisección
      let aCurrent = aNum;
      let bCurrent = bNum;
      
      for (let i = 0; i < maxIter; i++) {
        const c = (aCurrent + bCurrent) / 2;
        const fc = evaluar(c);
        
        const iteracion: IteracionBiseccion = {
          iteracion: i + 1,
          a: aCurrent,
          b: bCurrent,
          c: c,
          'f(c)': fc,
          error: Math.abs(fc)
        };
        
        iteracionesArray.push(iteracion);
        
        if (Math.abs(fc) < tol) {
          setResultado({
            raiz: c,
            iteraciones: i + 1,
            errorFinal: Math.abs(fc)
          });
          setIteraciones(iteracionesArray);
          return;
        }
        
        if (fa * fc < 0) {
          bCurrent = c;
        } else {
          aCurrent = c;
        }
      }
      
      const cFinal = (aCurrent + bCurrent) / 2;
      setResultado({
        raiz: cFinal,
        iteraciones: maxIter,
        errorFinal: Math.abs(evaluar(cFinal)),
        advertencia: "No se alcanzó la tolerancia en el número máximo de iteraciones"
      });
      setIteraciones(iteracionesArray);
      
    } catch (error) {
      
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
        
        <div className="grid grid-cols-2 gap-4">
          <InputNumerico 
            label="Límite inferior (a):"
            value={a}
            onChange={(e) => setA(e.target.value)}
            step="any"
          />
          
          <InputNumerico 
            label="Límite superior (b):"
            value={b}
            onChange={(e) => setB(e.target.value)}
            step="any"
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
          onClick={biseccion}
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
  );
}