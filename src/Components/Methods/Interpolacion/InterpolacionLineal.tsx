import { useState } from "react";

import { InputNumerico } from "../../InputNumerico/InputNumerico";
import Line from "../../Charts/LineChart";
import FunctionChart from "../../Charts/CharFuntion";

export default function InterpolacionLineal() {

    const [x1, setX1] = useState<string>("1");
    const [y1, setY1] = useState<string>("3");

    const [x2, setX2] = useState<string>("2");
    const [y2, setY2] = useState<string>("5");

    const [x, setX] = useState<string>("1.5");
    const [y, setY] = useState<number | null>(null);




    const limpiarResultados = () => {
        setY(null);
        setX("1.5");
        setX1("1");
        setY1("3");
        setX2("2");
        setY2("5");
    };

    const InterpolacionLineal = () => {
        const x1Num = parseFloat(x1);
        const y1Num = parseFloat(y1);
        const x2Num = parseFloat(x2);
        const y2Num = parseFloat(y2);
        const xNum = parseFloat(x);

        if (x2Num === x1Num) {
            alert("Error: x1 y x2 no pueden ser iguales.");
            return;
        }

        if (x1Num > xNum || xNum > x2Num) {
            alert("Error: El valor de x debe estar entre x1 y x2.");
            return;
        }

        let m = (y2Num - y1Num) / (x2Num - x1Num);

        let y = m * (xNum - x2Num) + y2Num;

        return setY(y);



    }

    return (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">

            <h3 className="text-xl font-semibold text-[#424874] mb-4">Interpolacion Lineal</h3>


            <div className="space-y-4">


                <h1 className="text-lg font-semibold text-[#424874] mb-4">Punto 1</h1>

                <div className="grid grid-cols-2 gap-4">

                    <InputNumerico
                        label="Coordenada X del punto 1:"
                        value={x1}
                        onChange={(e) => setX1(e.target.value)}
                        step="any"
                    />

                    <InputNumerico
                        label="Coordenada Y del punto 1:"
                        value={y1}
                        onChange={(e) => setY1(e.target.value)}
                        step="any"
                    />
                </div>

                <h1 className="text-lg font-semibold text-[#424874] mb-4">Punto 2</h1>

                <div className="grid grid-cols-2 gap-4">

                    <InputNumerico
                        label="Coordenada X del punto 2:"
                        value={x2}
                        onChange={(e) => setX2(e.target.value)}
                        step="any"
                    />

                    <InputNumerico
                        label="Coordenada Y del punto 2:"
                        value={y2}
                        onChange={(e) => setY2(e.target.value)}
                        step="any"
                    />
                </div>

                <h1 className="text-lg font-semibold text-[#424874] mb-4">Punto 2</h1>

                <div className="flex w-full items-center justify-center gap-4">
                    <InputNumerico
                        label="Coordenada X a interpolar:"
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                        step="any"
                    />
                </div>




                <div className="flex tems-center justify-center space-x-4 mt-6">
                    <button
                        onClick={InterpolacionLineal}
                        className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#4A528F] transition-colors"
                    >
                        Encontrar Coordenada Y
                    </button>

                    <button
                        onClick={limpiarResultados}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Reiniciar
                    </button>
                </div>


                {y !== null && (

                    <div className="p-4 bg-[#DCD6F7] border border-[#424874] rounded-lg">
                        <h4 className="text-lg font-semibold text-[#424874] mb-2">Resultado</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <strong>X: </strong> {parseFloat(x).toFixed(6)}
                            </div>

                            <div>
                                <strong>Y: </strong> {y !== null ? y.toFixed(6) : "N/A"}
                            </div>

                        </div>

                        <h4 className="text-lg font-semibold text-[#424874] mb-2 mt-7">Grafico</h4>
                        <div className="bg-light w-full h-100 bg-[#F4EEFF] mt-4 p-2 rounded-md overflow-auto ">
                            <Line xValues={[parseFloat(x1),parseFloat(x), parseFloat(x2)]} yValues={[parseFloat(y1), y,parseFloat(y2)]}></Line>
                            
                        </div>
                    </div>
                )}



            </div>
        </div>

    );
}