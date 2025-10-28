// types/numericalMethods.ts

export interface IteracionBiseccion {
  iteracion: number;
  a: number;
  b: number;
  c: number;
  'f(c)': number;
  error: number;
}


export interface IteracionPuntoFijo {
   iteracion: number;
   p: number;      
   'g(p)': number;    
   error: number; 
}


export interface IteracionNewton {
  iteracion: number;
  x: number;
  fx: number;
  dfx: number;
  error: number;
}

export interface IteracionSecante {
  iteracion: number;
  x0: number;
  x1: number;
  x2: number;
  fx: number;
  error: number;
}

// Interface genérica para resultados
export interface Resultado {
  raiz: number;
  iteraciones: number;
  errorFinal: number;
  advertencia?: string;
}



// Interface para métodos que usan derivadas
export interface ResultadoConDerivada extends Resultado {
  derivada?: string;
}

// Tipo unión para todas las iteraciones posibles
export type Iteracion = IteracionBiseccion | IteracionNewton | IteracionSecante;

// Interface para el hook de ecuación
export interface UseEcuacionReturn {
  ecuacion: string;
  setEcuacion: (ecuacion: string) => void;
  evaluar: (x: number) => number;
  probarEcuacion: () => { exitoso: boolean; test1?: number; test2?: number; error?: string };
  errorEcuacion: string;
  setErrorEcuacion: (error: string) => void;
}


export interface UseEcuacionSistemaReturn {
  ecuacion: string;
  setEcuacion: (ecuacion: string) => void;
  evaluar: (variables: Record<string, number>) => number;
  probarEcuacion: () => { exitoso: boolean; test1?: number; test2?: number; error?: string };
  errorEcuacion: string;
  setErrorEcuacion: (error: string) => void;
}

export interface IteracionJacobi {
  iteracion: number;
  x: number;
  y: number;
  z: number;
  error: number;
}

// types/numericalMethods.ts - Agrega esto

export interface ResultadoSistema {
  raiz: string; // Cambiado a string para mostrar x, y, z
  iteraciones: number;
  error: number;
  advertencia?: string;
}

export interface MatrizInputProps {
  filas: number;
  columnas: number;
  onChange: (matriz: number[][]) => void;
  disabled?: boolean;
}




export interface PasoGaussJordan {
  paso: number;
  descripcion: string;
  matriz: number[][];
  operacion?: string;
}


export interface TablaPuntosProps {
  numPuntos: number;
  onChange: (puntos: { x: number; y: number }[]) => void;
  disabled?: boolean;
}