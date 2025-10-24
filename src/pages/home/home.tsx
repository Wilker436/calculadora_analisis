/* React */
import { useState, Suspense, lazy} from "react";

/* bibliotecas externas*/
import { IoIosArrowDown } from "react-icons/io";
import { Dropdown, DropdownItem } from "flowbite-react";


/* Componentes */
const MetodoBiseccion = lazy(() => import("../../Components/Methods/MetodoBiseccion"));
const MetodoFalsaPosicion = lazy(() => import("../../Components/Methods/MetodoFalsaPosicion"));
const MetodoPuntoFijo = lazy(() => import("../../Components/Methods/MetodoPuntoFijo"));
const MetodoNewtonRaphson = lazy(() => import("../../Components/Methods/MetodoNewtonRaphson"));
const MetodoGaussJordan = lazy(() => import("../../Components/Methods/MetodoGaussJordan"));
const MetodoGaussSeidel = lazy(() => import("../../Components/Methods/MetodoGaussSeidel"));
const MetodoJacobi = lazy(() => import("../../Components/Methods/MetodoJacobi"));

import LoadingFallback from "../../Components/LoadingFallback/LoadingFallback";


const metodosConfig = [
  { id: "biseccion", label: "Método de Bisección", componente: MetodoBiseccion },
  { id: "falsa-posicion", label: "Método de Falsa Posición", componente: MetodoFalsaPosicion },
  { id: "punto-fijo", label: "Método de Punto Fijo", componente: MetodoPuntoFijo },
  { id: "newton-raphson", label: "Método de Newton-Raphson", componente: MetodoNewtonRaphson },
  { id: "gauss-jordan", label: "Método de Gauss-Jordan", componente: MetodoGaussJordan },
  { id: "gauss-seidel", label: "Método de Gauss-Seidel", componente: MetodoGaussSeidel },
  { id: "jacobi", label: "Método de Jacobi", componente: MetodoJacobi },
];

type MetodoConfig = typeof metodosConfig[0];

export default function Home() {
  const [metodoActivo, setMetodoActivo] = useState<MetodoConfig | null>(null);




  const ComponenteActivo = metodoActivo?.componente;


  return (
    <div className="min-h-screen bg-[#424874] py-8">
      <h1 className="text-4xl font-bold text-center mt-10 text-[#DCD6F7]">
        Calculadora de Análisis Numérico
      </h1>

      <div className="flex justify-center items-center mt-16">
        <div className="h-[700px] w-[700px] bg-[#DCD6F7] rounded-lg shadow-lg p-10 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#424874]">
            Selecciona un método:
          </h2>

          <Dropdown
            label=""
            dismissOnClick={true} 
            inline
            renderTrigger={() => (
              <div className="bg-[#A6B1E1] text-[#424874] p-3 rounded-md w-full border border-[#424874] shadow-sm hover:cursor-pointer flex justify-between items-center">
                {metodoActivo?.label || "Seleccionar"}
                <IoIosArrowDown />
              </div>
            )}
          >
            {metodosConfig.map((metodo) => (
              <DropdownItem
                key={metodo.id}
                onClick={() => setMetodoActivo(metodo)}
              >
                {metodo.label}
              </DropdownItem>
            ))}
          </Dropdown>

          {/* Renderizar componente activo */}
          {ComponenteActivo && (
            <Suspense fallback={<LoadingFallback />}>
              <ComponenteActivo />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}