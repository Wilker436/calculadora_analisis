import { useState } from "react";
import TablaPuntos from "../../TablePoints/TablePoints";
import Line from "../../Charts/LineChart";

export default function InterpolacionSplinesCuadraticos() {
    const [numPuntos, setNumPuntos] = useState<number>(3);
    const [puntos, setPuntos] = useState<{ x: number; y: number }[]>([]);
    const [puntosGrafico, setPuntosGrafico] = useState<{ x: number; y: number }[]>([]);
    const [xInterpolar, setXInterpolar] = useState<number>(0);
    const [yInterpolado, setYInterpolado] = useState<number | null>(null);
    const [coeficientes, setCoeficientes] = useState<{ a: number; b: number; c: number }[]>([]);

    const handlePuntosChange = (nuevosPuntos: { x: number; y: number }[]) => {
        setPuntos(nuevosPuntos);
        setPuntosGrafico(nuevosPuntos);
    };

    const resolverSistemaEcuaciones = (matriz: number[][], vectorB: number[]): number[] | null => {
        const n = vectorB.length;
        const A = matriz.map(row => [...row]);
        const b = [...vectorB];

        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(A[j][i]) > Math.abs(A[maxRow][i])) {
                    maxRow = j;
                }
            }

            [A[i], A[maxRow]] = [A[maxRow], A[i]];
            [b[i], b[maxRow]] = [b[maxRow], b[i]];

            if (Math.abs(A[i][i]) < 1e-10) return null;

            for (let j = i + 1; j < n; j++) {
                const factor = A[j][i] / A[i][i];
                for (let k = i; k < n; k++) {
                    A[j][k] -= factor * A[i][k];
                }
                b[j] -= factor * b[i];
            }
        }

        const solucion: number[] = new Array(n);
        for (let i = n - 1; i >= 0; i--) {
            solucion[i] = b[i];
            for (let j = i + 1; j < n; j++) {
                solucion[i] -= A[i][j] * solucion[j];
            }
            solucion[i] /= A[i][i];
        }

        return solucion;
    };

    const interpolarConSplines = (x: number, puntosOrdenados: { x: number; y: number }[], coeficientes: { a: number; b: number; c: number }[]): number => {
        const n = puntosOrdenados.length;

        for (let i = 0; i < n - 1; i++) {
            if (x >= puntosOrdenados[i].x && x <= puntosOrdenados[i + 1].x) {
                const { a, b, c } = coeficientes[i];
                return a * x * x + b * x + c;
            }
        }

        if (x < puntosOrdenados[0].x) {
            const { a, b, c } = coeficientes[0];
            return a * x * x + b * x + c;
        } else {
            const { a, b, c } = coeficientes[n - 2];
            return a * x * x + b * x + c;
        }
    };

    const generarPuntosGrafico = (puntosOrdenados: { x: number; y: number }[], coeficientes: { a: number; b: number; c: number }[]) => {
        const nuevosPuntos: { x: number; y: number }[] = [];
        const numPuntosPorSpline = 20;

        for (let i = 0; i < puntosOrdenados.length - 1; i++) {
            const xInicio = puntosOrdenados[i].x;
            const xFin = puntosOrdenados[i + 1].x;
            const { a, b, c } = coeficientes[i];

            for (let j = 0; j <= numPuntosPorSpline; j++) {
                const t = j / numPuntosPorSpline;
                const x = xInicio + t * (xFin - xInicio);
                const y = a * x * x + b * x + c;
                nuevosPuntos.push({ x, y });
            }
        }

        setPuntosGrafico(nuevosPuntos);
    };

    const resolverSplinesCuadraticos = () => {
        if (puntos.length < 2) {
            alert("Se necesitan al menos 2 puntos");
            return;
        }

        const puntosOrdenados = [...puntos].sort((a, b) => a.x - b.x);
        const n = puntosOrdenados.length;
        const numSplines = n - 1;

        const matriz: number[][] = [];
        const vectorB: number[] = [];

        let ecuacionIndex = 0;

        // 1. Condición: Los splines pasan por los puntos
        for (let i = 0; i < numSplines; i++) {
            const x_i = puntosOrdenados[i].x;

            // Pasa por el punto izquierdo
            matriz[ecuacionIndex] = Array(3 * numSplines).fill(0);
            matriz[ecuacionIndex][3 * i] = x_i * x_i;
            matriz[ecuacionIndex][3 * i + 1] = x_i;
            matriz[ecuacionIndex][3 * i + 2] = 1;
            vectorB[ecuacionIndex] = puntosOrdenados[i].y;
            ecuacionIndex++;

            // Pasa por el punto derecho  
            const x_i1 = puntosOrdenados[i + 1].x;
            matriz[ecuacionIndex] = Array(3 * numSplines).fill(0);
            matriz[ecuacionIndex][3 * i] = x_i1 * x_i1;
            matriz[ecuacionIndex][3 * i + 1] = x_i1;
            matriz[ecuacionIndex][3 * i + 2] = 1;
            vectorB[ecuacionIndex] = puntosOrdenados[i + 1].y;
            ecuacionIndex++;
        }

        // 2. Condición: Continuidad de primeras derivadas en nodos internos
        for (let i = 0; i < numSplines - 1; i++) {
            const x_i1 = puntosOrdenados[i + 1].x;

            matriz[ecuacionIndex] = Array(3 * numSplines).fill(0);
            // Derivada del spline i en x_{i+1}
            matriz[ecuacionIndex][3 * i] = 2 * x_i1;      // 2a_i
            matriz[ecuacionIndex][3 * i + 1] = 1;         // b_i
            // Derivada del spline i+1 en x_{i+1} 
            matriz[ecuacionIndex][3 * (i + 1)] = -2 * x_i1; // -2a_{i+1}
            matriz[ecuacionIndex][3 * (i + 1) + 1] = -1;  // -b_{i+1}
            vectorB[ecuacionIndex] = 0;
            ecuacionIndex++;
        }

        // 3. Condición extra: Segunda derivada en primer punto = 0
        matriz[ecuacionIndex] = Array(3 * numSplines).fill(0);
        matriz[ecuacionIndex][0] = 2;  // 2a_0 (segunda derivada)
        vectorB[ecuacionIndex] = 0;

        const coeficientesCalculados = resolverSistemaEcuaciones(matriz, vectorB);

        if (!coeficientesCalculados) {
            alert("Error al resolver el sistema");
            return;
        }

        const nuevosCoeficientes: { a: number; b: number; c: number }[] = [];
        for (let i = 0; i < numSplines; i++) {
            nuevosCoeficientes.push({
                a: coeficientesCalculados[3 * i],
                b: coeficientesCalculados[3 * i + 1],
                c: coeficientesCalculados[3 * i + 2]
            });
        }

        setCoeficientes(nuevosCoeficientes);

        const resultado = interpolarConSplines(xInterpolar, puntosOrdenados, nuevosCoeficientes);
        setYInterpolado(resultado);

        generarPuntosGrafico(puntosOrdenados, nuevosCoeficientes);
    };

    return (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#424874] mb-4">Splines Cuadráticos</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Puntos:</label>
                    <input
                        type="number"
                        min="2"
                        max="10"
                        value={numPuntos}
                        onChange={(e) => setNumPuntos(parseInt(e.target.value) || 2)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874]"
                    />
                </div>

                <TablaPuntos numPuntos={numPuntos} onChange={handlePuntosChange} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">X a interpolar:</label>
                    <input
                        type="number"
                        step="any"
                        value={xInterpolar}
                        onChange={(e) => setXInterpolar(parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-[#424874] focus:ring-1 focus:ring-[#424874]"
                    />
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={resolverSplinesCuadraticos}
                        className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#4A528F] transition-colors"
                    >
                        Calcular
                    </button>
                </div>

                {yInterpolado !== null && (
                    <div className="p-4 bg-[#DCD6F7] border border-[#424874] rounded-lg">
                        <h4 className="text-lg font-semibold text-[#424874] mb-2">Resultado</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div><strong>X:</strong> {xInterpolar.toFixed(6)}</div>
                            <div><strong>Y:</strong> {yInterpolado.toFixed(6)}</div>
                        </div>

                        {coeficientes.length > 0 && (
                            <div className="mt-4">
                                <h5 className="font-semibold text-[#424874] mb-2">Coeficientes:</h5>
                                {coeficientes.map((coef, index) => (
                                    <div key={index} className="text-sm mb-1">
                                        Spline {index + 1}: {coef.a.toFixed(4)}x² + {coef.b.toFixed(4)}x + {coef.c.toFixed(4)}
                                    </div>
                                ))}
                            </div>
                        )}

                        <h4 className="text-lg font-semibold text-[#424874] mb-2 mt-4">Gráfico</h4>
                        <div className="bg-[#F4EEFF] mt-4 p-2 rounded-md">
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