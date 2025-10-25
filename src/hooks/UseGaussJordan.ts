
import { useState } from 'react';

export interface PasoGaussJordan {
  paso: number;
  descripcion: string;
  matriz: number[][];
  operacion?: string;
}

export function useGaussJordan() {
  const [pasos, setPasos] = useState<PasoGaussJordan[]>([]);
  const [resultado, setResultado] = useState<number[]>([]);

  const resolver = (matriz: number[][]) => {
    const nuevosPasos: PasoGaussJordan[] = [];
    const matrizCopy = matriz.map(fila => [...fila]);
    const n = matrizCopy.length;

    // Validar que la matriz sea cuadrada + vector de términos independientes
    if (matrizCopy[0].length !== n + 1) {
      throw new Error('La matriz debe tener n filas y n+1 columnas (incluyendo términos independientes)');
    }

    // Paso inicial
    nuevosPasos.push({
      paso: 0,
      descripcion: 'Matriz inicial',
      matriz: matrizCopy.map(fila => [...fila])
    });

    // Eliminación hacia adelante
    for (let i = 0; i < n; i++) {
      // Pivoteo parcial (buscar máximo en la columna)
      let maxFila = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(matrizCopy[j][i]) > Math.abs(matrizCopy[maxFila][i])) {
          maxFila = j;
        }
      }

      // Intercambiar filas si es necesario
      if (maxFila !== i) {
        [matrizCopy[i], matrizCopy[maxFila]] = [matrizCopy[maxFila], matrizCopy[i]];
        nuevosPasos.push({
          paso: nuevosPasos.length,
          descripcion: `Intercambio de fila ${i + 1} con fila ${maxFila + 1}`,
          matriz: matrizCopy.map(fila => [...fila]),
          operacion: `F${i + 1} ↔ F${maxFila + 1}`
        });
      }

      // Hacer el pivote 1
      const pivote = matrizCopy[i][i];
      if (pivote === 0) {
        throw new Error('La matriz es singular, no tiene solución única');
      }

      for (let j = i; j < n + 1; j++) {
        matrizCopy[i][j] /= pivote;
      }

      nuevosPasos.push({
        paso: nuevosPasos.length,
        descripcion: `Hacer pivote (${i + 1},${i + 1}) igual a 1`,
        matriz: matrizCopy.map(fila => [...fila]),
        operacion: `F${i + 1} = F${i + 1} / ${pivote.toFixed(2)}`
      });

      // Eliminar en otras filas
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = matrizCopy[j][i];
          for (let k = i; k < n + 1; k++) {
            matrizCopy[j][k] -= factor * matrizCopy[i][k];
          }

          nuevosPasos.push({
            paso: nuevosPasos.length,
            descripcion: `Eliminar elemento (${j + 1},${i + 1})`,
            matriz: matrizCopy.map(fila => [...fila]),
            operacion: `F${j + 1} = F${j + 1} - ${factor.toFixed(2)} * F${i + 1}`
          });
        }
      }
    }

    // Extraer solución
    const solucion = matrizCopy.map(fila => parseFloat(fila[n].toFixed(6)));

    setPasos(nuevosPasos);
    setResultado(solucion);

    return {
      pasos: nuevosPasos,
      solucion
    };
  };

  return {
    pasos,
    resultado,
    resolver
  };
}