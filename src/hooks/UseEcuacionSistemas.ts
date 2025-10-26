// hooks/useEcuacionSistema.ts
import { useState } from 'react';
import { evaluate } from 'mathjs';
import type { UseEcuacionSistemaReturn } from '../types/numericalMethods';

export const useEcuacionSistema = (ecuacionInicial: string = "x"): UseEcuacionSistemaReturn => {
  const [ecuacion, setEcuacion] = useState<string>(ecuacionInicial);
  const [errorEcuacion, setErrorEcuacion] = useState<string>("");

  const evaluar = (variables: Record<string, number>): number => {
    try {
      setErrorEcuacion("");
      return evaluate(ecuacion, variables);
    } catch (error) {
      const mensajeError = `Error en la ecuación: ${
        error instanceof Error ? error.message : String(error)
      }`;
      setErrorEcuacion(mensajeError);
      throw new Error(mensajeError);
    }
  };

  const probarEcuacion = (): { exitoso: boolean; test1?: number; test2?: number; error?: string } => {
    try {
      // Probar con valores por defecto
      const test1 = evaluar({ x: 0, y: 0, z: 0 });
      const test2 = evaluar({ x: 1, y: 1, z: 1 });
      return { exitoso: true, test1, test2 };
    } catch (error) {
      return { exitoso: false, error: error instanceof Error ? error.message : String(error) };
    }
  };

  return {
    ecuacion,
    setEcuacion,
    evaluar,
    probarEcuacion,
    errorEcuacion,
    setErrorEcuacion
  };
};