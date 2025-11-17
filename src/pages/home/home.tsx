/* React */
import { useState, Suspense, lazy } from "react";

/* bibliotecas externas*/
import { IoIosArrowDown } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { Dropdown, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader, DropdownDivider } from "flowbite-react";


/* Componentes */
const MetodoBiseccion = lazy(() => import("../../Components/Methods//ResolucionDeEcuaciones/MetodoBiseccion"));
const MetodoFalsaPosicion = lazy(() => import("../../Components/Methods/ResolucionDeEcuaciones/MetodoFalsaPosicion"));
const MetodoPuntoFijo = lazy(() => import("../../Components/Methods/ResolucionDeEcuaciones/MetodoPuntoFijo"));
const MetodoNewtonRaphson = lazy(() => import("../../Components/Methods/ResolucionDeEcuaciones/MetodoNewtonRaphson"));
const MetodoGaussJordan = lazy(() => import("../../Components/Methods/ResolucionDeSistemasEcuaciones/MetodoGaussJordan"));
const MetodoGaussSeidel = lazy(() => import("../../Components/Methods/ResolucionDeSistemasEcuaciones/MetodoGaussSeidel"));
const MetodoJacobi = lazy(() => import("../../Components/Methods/ResolucionDeSistemasEcuaciones/MetodoJacobi"));
const InterpolacionLineal = lazy(() => import("../../Components/Methods/Interpolacion/InterpolacionLineal"));
const InterpolacionLagrange = lazy(() => import("../../Components/Methods/Interpolacion/InterpolacionLagrange"));
const InterpolacionSpline = lazy(() => import("../../Components/Methods/Interpolacion/InterpolacionSplines"));
const MetodoTrapecioCompuesto = lazy(() => import("../../Components/Methods/Integrales/TrapecioCompuesto"));

import LoadingFallback from "../../Components/LoadingFallback/LoadingFallback";



const metodosConfig = [
  // Métodos de resolución de ecuaciones
  {
    id: "biseccion",
    label: "Método de Bisección",
    componente: MetodoBiseccion,
    tipo: "ecuaciones"
  },
  {
    id: "falsa-posicion",
    label: "Método de Falsa Posición",
    componente: MetodoFalsaPosicion,
    tipo: "ecuaciones"
  },
  {
    id: "punto-fijo",
    label: "Método de Punto Fijo",
    componente: MetodoPuntoFijo,
    tipo: "ecuaciones"
  },
  {
    id: "newton-raphson",
    label: "Método de Newton-Raphson",
    componente: MetodoNewtonRaphson,
    tipo: "ecuaciones"
  },

  // Separador - Métodos de sistemas de ecuaciones
  { id: "divider-sistemas", tipo: "divider", label: "Sistemas de Ecuaciones" },

  {
    id: "gauss-jordan",
    label: "Método de Gauss-Jordan",
    componente: MetodoGaussJordan,
    tipo: "sistemas"
  },
  {
    id: "gauss-seidel",
    label: "Método de Gauss-Seidel",
    componente: MetodoGaussSeidel,
    tipo: "sistemas"
  },
  {
    id: "jacobi",
    label: "Método de Jacobi",
    componente: MetodoJacobi,
    tipo: "sistemas"
  },

  // Separador - Interpolación
  { id: "divider-interpolacion", tipo: "divider", label: "Interpolación" },

  {
    id: "interpolacion-lineal",
    label: "Interpolación Lineal",
    componente: InterpolacionLineal, 
    tipo: "interpolacion"
  },
  {
    id: "lagrange",
    label: "Interpolación por Lagrange",
    componente: InterpolacionLagrange, 
    tipo: "interpolacion"
  },
  {
    id: "spline",
    label: "Interpolación por Splines",
    componente: InterpolacionSpline, 
    tipo: "interpolacion"
  },
    // Separador - Integrales
  { id: "divider-Integrales", tipo: "divider", label: "Solucion de integrales" },
  
  {
    id: "trapecio-compuesto",
    label: "Método del Trapecio Compuesto",
    componente: MetodoTrapecioCompuesto, 
    tipo: "integrales"
  }
];

type MetodoConfig = typeof metodosConfig[0];

export default function Home() {
  const [metodoActivo, setMetodoActivo] = useState<MetodoConfig | null>(null);
  const [mostrarInfo, setMostrarInfo] = useState<boolean>(false);



  const ComponenteActivo = metodoActivo?.componente;


  return (
    <div className="min-h-screen bg-[#424874] py-8">
      <h1 className="text-4xl font-bold text-center mt-10 text-[#DCD6F7]">
        Calculadora de Análisis Numérico
      </h1>

      <div className="flex justify-center items-center mt-16">
        <div className="h-[700px] w-[700px] bg-[#DCD6F7] rounded-lg shadow-lg p-10 overflow-y-auto relative">

          <button
            onClick={() => setMostrarInfo(true)}
            className="absolute top-4 right-4 p-2 text-[#424874] hover:text-[#373b67] transition-colors"
            title="Información de sintaxis"
          >
            <FaInfoCircle size={24} />
          </button>


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
            {/* Métodos de resolución de ecuaciones */}
            <DropdownItem className="cursor-default text-[15px] font-bold bg-[#364153]">
              Métodos de Resolución de Ecuaciones
            </DropdownItem>

            {metodosConfig
              .filter(metodo => metodo.tipo === "ecuaciones")
              .map((metodo) => (
                <DropdownItem
                  key={metodo.id}
                  onClick={() => setMetodoActivo(metodo)}
                >
                  {metodo.label}
                </DropdownItem>
              ))
            }

            <DropdownDivider />

            {/* Métodos de sistemas de ecuaciones */}
            <DropdownItem className="cursor-default text-[15px] font-bold bg-[#364153]">
              Métodos de Sistemas de Ecuaciones
            </DropdownItem>

            {metodosConfig
              .filter(metodo => metodo.tipo === "sistemas")
              .map((metodo) => (
                <DropdownItem
                  key={metodo.id}
                  onClick={() => setMetodoActivo(metodo)}
                >
                  {metodo.label}
                </DropdownItem>
              ))
            }

            <DropdownDivider />

            {/* Interpolación */}
            <DropdownItem className="cursor-default text-[15px] font-bold bg-[#364153]">
              Interpolación
            </DropdownItem>

            {metodosConfig
              .filter(metodo => metodo.tipo === "interpolacion")
              .map((metodo) => (
                <DropdownItem
                  key={metodo.id}
                  onClick={() => setMetodoActivo(metodo)}
                >
                  {metodo.label}
                </DropdownItem>
              ))
            }

             <DropdownDivider />

            {/* Integrales */}

            <DropdownItem className="cursor-default text-[15px] font-bold bg-[#364153]">
              Integrales
            </DropdownItem>

              {metodosConfig
              .filter(metodo => metodo.tipo === "integrales")
              .map((metodo) => (
                <DropdownItem
                  key={metodo.id}
                  onClick={() => setMetodoActivo(metodo)}
                >
                  {metodo.label}
                </DropdownItem>
              ))
            }            

          </Dropdown>

          {/* Renderizar componente activo */}
          {ComponenteActivo && (
            <Suspense fallback={<LoadingFallback />}>
              <ComponenteActivo />
            </Suspense>
          )}



          <Modal show={mostrarInfo} size="3xl" onClose={() => setMostrarInfo(false)}>
            <ModalHeader>
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-[#DCD6F7]" />
                Sintaxis de Math.js
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#DCD6F7] mb-3">Operadores Aritméticos:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#F4EEFF]">
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">+</code> Suma</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">-</code> Resta</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">*</code> Multiplicación</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">/</code> División</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">^</code> Potencia</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">**</code> Potencia</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#DCD6F7] mb-3">Funciones Matemáticas:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#F4EEFF]">
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">sin(x)</code> Seno</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">cos(x)</code> Coseno</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">tan(x)</code> Tangente</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">asin(x)</code> Arcoseno</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">acos(x)</code> Arcocoseno</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">atan(x)</code> Arcotangente</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">sinh(x)</code> Seno hiperbólico</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">cosh(x)</code> Coseno hiperbólico</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">tanh(x)</code> Tangente hiperbólica</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">asinh(x)</code> Arcoseno hiperbólico</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">acosh(x)</code> Arcocoseno hiperbólico</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">atanh(x)</code> Arcotangente hiperbólica</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">log(x)</code> Log natural base(e)</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">log10(x)</code> Log base 10</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">exp(x)</code> Exponencial</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">sqrt(x)</code> Raíz cuadrada</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">abs(x)</code> Valor absoluto</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#DCD6F7] mb-3">Constantes:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#F4EEFF]">
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">pi</code> π (3.14159...)</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">e</code> Euler (2.71828...)</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">phi</code> Número áureo (1.61803...)</div>
                    <div><code className="inline-flex items-center justify-center w-20 h-10 bg-gray-100 rounded text-black text-1xl">tau</code> Tau (2π ≈ 6.28318...)</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#DCD6F7] mb-3">Ejemplos:</h3>
                  <div className="space-y-2 text-sm">
                    <div><code className="inline-flex items-center justify-center w-40 h-10 bg-gray-100 rounded ">x^2 + 2*x - 5</code></div>
                    <div><code className="inline-flex items-center justify-center w-40 h-10 bg-gray-100 rounded">sin(x) + cos(2*x)</code></div>
                    <div><code className="inline-flex items-center justify-center w-40 h-10 bg-gray-100 rounded">exp(-x) * log(x)</code></div>
                    <div><code className="inline-flex items-center justify-center w-40 h-10 bg-gray-100 rounded">sqrt(x^2 + 1)</code></div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center w-full">
                <button
                  onClick={() => setMostrarInfo(false)}
                  className="px-4 py-2 bg-[#424874] text-white rounded-md hover:bg-[#373b67] transition-colors hover:cursor-pointer"
                >
                  Cerrar
                </button>
              </div>

            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}