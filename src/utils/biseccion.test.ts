import { describe, test, expect } from 'vitest';
import { calcularBiseccion } from './biseccion'; // Asegúrate que la ruta sea correcta

// --- Funciones de Prueba (f(x)) ---

// 1. Función simple: f(x) = x - 2. Raíz en x=2
const f_simple = (x: number) => x - 2;

// 2. Función cuadrática: f(x) = x^2 - 4. Raíces en x=2 y x=-2
const f_cuadratica = (x: number) => x * x - 4;

// 3. Función exponencial: f(x) = exp(x) - 5. Raíz en ln(5) ≈ 1.609
const f_exp = (x: number) => Math.exp(x) - 5;


describe('Método de Bisección', () => {

  // =========================================================
  // Caso de Éxito 1: Raíz Simple (x-2)
  // =========================================================
  test('debe encontrar la raíz de f(x) = x - 2 en el intervalo [0, 5]', () => {
    const resultado = calcularBiseccion(
      0,          // a
      5,          // b
      0.0001,     // tolerancia
      50,         // maxIteraciones
      f_simple
    );

    // Assertions (Verificaciones)
    expect(resultado.raiz).toBeCloseTo(2, 4); // La raíz debe ser ≈ 2 (4 decimales de precisión)
    expect(resultado.iteraciones).toBeGreaterThan(10); // Debe tomar varias iteraciones
    expect(resultado.errorBolzano).toBeUndefined(); // No debe haber error de Bolzano
    expect(resultado.advertencia).toBeUndefined(); // No debe haber advertencia de iteraciones
    expect(resultado.iteracionesArray.length).toBe(resultado.iteraciones);
  });
  
  // =========================================================
  // Caso de Éxito 2: Raíz Cuadrática (x^2-4)
  // =========================================================
  test('debe encontrar la raíz positiva de f(x) = x^2 - 4 en [0, 5]', () => {
    const resultado = calcularBiseccion(
      0, 
      5, 
      0.001, 
      100, 
      f_cuadratica
    );

    expect(resultado.raiz).toBeCloseTo(2, 3); // La raíz debe ser ≈ 2
    expect(resultado.iteraciones).toBeGreaterThan(1);
  });

  // =========================================================
  // Caso de Falla 1: Teorema de Bolzano
  // =========================================================
  test('debe fallar si no se cumple el teorema de Bolzano (mismo signo)', () => {
    // f(x) = x - 2. En [3, 5], f(3)=1, f(5)=3 (ambos positivos)
    const resultado = calcularBiseccion(
      3, 
      5, 
      0.0001, 
      50, 
      f_simple
    );

    expect(resultado.errorBolzano).toBeDefined(); // Debe tener el mensaje de error de Bolzano
    expect(resultado.raiz).toBeUndefined(); // No debe haber raíz
    expect(resultado.iteraciones).toBe(0);
  });

  // =========================================================
  // Caso de Falla 2: Máximas Iteraciones
  // =========================================================
  test('debe retornar advertencia si no alcanza la tolerancia en maxIteraciones', () => {
    // Le ponemos una tolerancia muy estricta, pero solo 3 iteraciones
    const resultado = calcularBiseccion(
      0, 
      5, 
      0.0000001, // Tolerancia muy estricta
      3,         // Máximo 3 iteraciones
      f_simple
    );

    expect(resultado.advertencia).toBeDefined(); // Debe tener la advertencia
    expect(resultado.iteraciones).toBe(3);       // Debe terminar justo en maxIter
  });
});