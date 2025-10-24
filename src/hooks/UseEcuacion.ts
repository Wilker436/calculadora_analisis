// hooks/useEcuacion.ts
import { useState } from 'react';
import { evaluate } from 'mathjs';
import type { UseEcuacionReturn } from '../types/numericalMethods';

export const useEcuacion = (ecuacionInicial: string = "x^2 - 4"): UseEcuacionReturn => {
  const [ecuacion, setEcuacion] = useState<string>(ecuacionInicial);
  const [errorEcuacion, setErrorEcuacion] = useState<string>("");

  const evaluar = (x: number): number => {
    try {
      setErrorEcuacion("");
      return evaluate(ecuacion, { x });
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
      const test1 = evaluar(0);
      const test2 = evaluar(1);
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