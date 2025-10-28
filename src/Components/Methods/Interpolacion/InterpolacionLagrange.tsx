import { useState } from "react";
import TablaPuntos from "../../TablePoints/TablePoints";
import Line from "../../Charts/LineChart";


export default function InterpolacionLagrage() {

  const [numPuntos, setNumPuntos] = useState<number>(3);
  const [puntos, setPuntos] = useState<{ x: number; y: number }[]>([]);
  const [puntosGrafico, setPuntosGrafico] = useState<{ x: number; y: number }[]>([]);
  const [xInterpolar, setXInterpolar] = useState<number>(0);
  const [yInterpolado, setYInterpolado] = useState<number | null>(null);

  const handlePuntosChange = (nuevosPuntos: { x: number; y: number }[]) => {
    setPuntos(nuevosPuntos);
    // Actualizar también los puntos del gráfico cuando cambien los puntos base
    setPuntosGrafico(nuevosPuntos);
  };



  const resolverLagrange = () => {
    if (puntos.length === 0) {
      alert("Primero genera la tabla de puntos");
      return;
    }

    const xValues = puntos.map(punto => punto.x);
    const yValues = puntos.map(punto => punto.y);


    // Verificar que no hay X repetidos
    const xUnicos = new Set(xValues);
    if (xUnicos.size !== xValues.length) {
      alert("Error: No puede haber valores de X repetidos");
      return;
    }

    // 2. Función para calcular el término L_i(x)

    const calcularTerminoLagrange = (i: number, x: number): number => {
      let termino = 1;

      for (let j = 0; j < xValues.length; j++) {
        if (j !== i) {
          // Fórmula: (x - x_j) / (x_i - x_j)
          termino *= (x - xValues[j]) / (xValues[i] - xValues[j]);
        }
      }

      return termino;
    };


    // 3. Función principal del polinomio de Lagrange
    const polinomioLagrange = (x: number): number => {
      let resultado = 0;

      for (let i = 0; i < xValues.length; i++) {
        // Sumar: y_i * L_i(x)
        resultado += yValues[i] * calcularTerminoLagrange(i, x);
      }

      return resultado;
    };

    const yInterpolado = polinomioLagrange(xInterpolar);
    setYInterpolado(yInterpolado);


    const nuevosPuntosGrafico = [
      ...puntos,
      { x: xInterpolar, y: yInterpolado }
    ];

    setPuntosGrafico(nuevosPuntosGrafico);





  };


  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">

      <h3 className="text-xl font-semibold text-[#424874] mb-4">Interpolacion por polinomios de lagrange</h3>


      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de puntos:
          </label>
          <input
            type="number"
            min="2"
            max="100"
            value={numPuntos}
            onChange={(e) => setNumPuntos(parseInt(e.target.value) || 2)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874]"
          />
        </div>

        <TablaPuntos
          numPuntos={numPuntos}
          onChange={handlePuntosChange}
        />


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor de X a interpolar:
          </label>
          <input
            type="number"
            step="any"
            value={xInterpolar}
            onChange={(e) => setXInterpolar(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874]"
            placeholder="Ingresa el valor de X"
          />
        </div>




        <div className="flex tems-center justify-center space-x-4 mt-6">
          <button
            onClick={resolverLagrange}
            className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#4A528F] transition-colors"
          >
            Encontrar Coordenada Y
          </button>

        </div>







        {yInterpolado !== null && (


          <div className="p-4 bg-[#DCD6F7] border border-[#424874] rounded-lg">
            <h4 className="text-lg font-semibold text-[#424874] mb-2">Resultado</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>X: </strong> {xInterpolar.toFixed(6)}
              </div>

              <div>
                <strong>Y: </strong> {yInterpolado !== null ? yInterpolado.toFixed(6) : "N/A"}
              </div>
            </div>

            <h4 className="text-lg font-semibold text-[#424874] mb-2 mt-7">Grafico</h4>


            <div className="bg-light w-full h-100 bg-[#F4EEFF] mt-4 p-2 rounded-md overflow-auto ">
              <Line
                xValues={puntosGrafico.map(punto => punto.x)}
                yValues={puntosGrafico.map(punto => punto.y)}
              />

            </div>
          </div>



        )}



      </div>
    </div>

  );
}