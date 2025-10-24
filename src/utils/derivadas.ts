// utils/derivadas.ts

/**
 * Calcula la derivada numérica usando diferencia centrada
 * @param f Función a derivar
 * @param x Punto donde evaluar la derivada
 * @param h Tamaño del paso (por defecto 1e-5)
 */
export const derivadaNumerica = (f: (x: number) => number, x: number, h: number = 1e-5): number => {
    return (f(x + h) - f(x - h)) / (2 * h);
};

/**
 * Alternativa: Derivada por diferencia hacia adelante (más simple)
 */
export const derivadaNumericaSimple = (f: (x: number) => number, x: number, h: number = 1e-5): number => {
    return (f(x + h) - f(x)) / h;
};