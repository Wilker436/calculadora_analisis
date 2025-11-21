
export interface IteracionBiseccion {
  iteracion: number;
  a: number;
  b: number;
  c: number;
  'f(c)': number;
  error: number;
}

export interface ResultadoBiseccion {
  raiz?: number;
  iteraciones: number;
  errorFinal: number | 'N/A';
  advertencia?: string;
  errorBolzano?: string;
  iteracionesArray: IteracionBiseccion[];
}


export function calcularBiseccion(
  a: number,
  b: number,
  tol: number,
  maxIter: number,
  evaluar: (x: number) => number
): ResultadoBiseccion {
  const iteracionesArray: IteracionBiseccion[] = [];

  try {
    const fa = evaluar(a);
    const fb = evaluar(b);

    // 1. Verificar teorema de Bolzano
    if (fa * fb >= 0) {
      return {
        iteraciones: 0,
        errorFinal: 'N/A',
        errorBolzano: "No se cumple el teorema de Bolzano: f(a) * f(b) >= 0",
        iteracionesArray: []
      };
    }

    // 2. Algoritmo de bisección
    let aCurrent = a;
    let bCurrent = b;

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

      // Criterio de parada por tolerancia
      if (Math.abs(fc) < tol) {
        return {
          raiz: c,
          iteraciones: i + 1,
          errorFinal: Math.abs(fc),
          iteracionesArray: iteracionesArray
        };
      }

      // Actualizar el intervalo
      if (evaluar(aCurrent) * fc < 0) {
        bCurrent = c;
      } else {
        aCurrent = c;
      }
    }

    // 3. No se alcanzó la tolerancia después de maxIter
    const cFinal = (aCurrent + bCurrent) / 2;
    return {
      raiz: cFinal,
      iteraciones: maxIter,
      errorFinal: Math.abs(evaluar(cFinal)),
      advertencia: "No se alcanzó la tolerancia en el número máximo de iteraciones",
      iteracionesArray: iteracionesArray
    };

  } catch (error) {
    console.error("Error en la ejecución del método de bisección:", error);
    // Retorna un objeto de error estructurado
    return {
        iteraciones: 0,
        errorFinal: 'N/A',
        advertencia: `Error inesperado: ${error instanceof Error ? error.message : String(error)}`,
        iteracionesArray: []
    };
  }
}