import { useState } from 'react';
import { useEcuacion } from '../../../hooks/UseEcuacion';
import { InputEcuacion } from '../../InputEcuacion/InputEcuacion';
import { InputNumerico } from '../../InputNumerico/InputNumerico';


export default function TrapecioCompuesto() {

    const { ecuacion, setEcuacion, evaluar, probarEcuacion, errorEcuacion } = useEcuacion();

    const [a, setA] = useState<string>("1");
    const [b, setB] = useState<string>("3");
    const [n, setN] = useState<string>("4");
    const [resultado, setResultado] = useState<number | null>(null);


    const handleProbarEcuacion = () => {
        const prueba = probarEcuacion();
        if (prueba.exitoso) {
            alert(`Ecuación válida!\nf(0) = ${prueba.test1}\nf(1) = ${prueba.test2}`);
        } else {
            alert(prueba.error);
        }
    };


    const trapecio = () => {
        const lowerLimit = parseFloat(a);
        const upperLimit = parseFloat(b);

        if (upperLimit <= lowerLimit) {
            alert("El límite superior debe ser mayor que el límite inferior.");
            return;
        }

        const numPairs = parseInt(n);
        if (isNaN(numPairs) || numPairs <= 0 || numPairs % 1 !== 0) {
            alert("El número de pares debe ser un entero positivo.");
            return;
        }

        const fa = evaluar(lowerLimit);
        const fb = evaluar(upperLimit);

        const h = (upperLimit - lowerLimit) / numPairs;

        // Suma de f(a + i*h) para i = 1 hasta n-1
        let sum = 0;
        for (let i = 1; i < numPairs; i++) {
            const x = lowerLimit + i * h;
            sum += evaluar(x);
        }

        // Fórmula del trapecio compuesto
        const area = (h / 2) * (fa + fb + 2 * sum);

        setResultado(area);

    }

    const limpiarResultados = () => {
        setResultado(null);
        setEcuacion("x^2 - 4");
        setA("1");
        setB("3");
        setN("4");
    };



    return (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#424874] mb-4">Método de Bisección</h3>

            <div className="flex items-center gap-6">
                {/* Integral definida con inputs arriba y abajo */}
                <div className="flex flex-col items-center leading-none">

                    {/* Input del límite superior */}
                    <div className="mb-1">
                        <InputNumerico
                            param={1}
                            label=""
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            step="any"
                        />
                    </div>

                    {/* Símbolo de integral */}
                    <span className="text-6xl">∫</span>

                    {/* Input del límite inferior */}
                    <div className="mt-3">
                        <InputNumerico
                            param={1}
                            label=""
                            value={a}
                            onChange={(e) => setA(e.target.value)}
                            step="any"
                        />
                    </div>
                </div>

                {/* Input de la ecuación */}
                <InputEcuacion
                    label="integral"
                    param2={1}
                    ecuacion={ecuacion}
                    setEcuacion={setEcuacion}
                    errorEcuacion={errorEcuacion}
                    onProbarEcuacion={handleProbarEcuacion}
                />
            </div>


            <div className="grid grid-cols-2 gap-4">
                <InputNumerico
                    label="Numero de pares"
                    value={n}
                    onChange={(e) => setN(e.target.value)}
                    step={0.0001}
                    min={0.000001}
                />

            </div>

            <div className="flex space-x-4 mt-6">
                <button
                    onClick={trapecio}
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

            {resultado !== null && (
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-[#424874] mb-2">Resultado:</h4>
                    <p className="text-gray-700">El valor aproximado de la integral es: <span className="font-bold">{resultado}</span></p>
                </div>
            )}




        </div>
    )

}
