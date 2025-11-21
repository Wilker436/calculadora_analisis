import { Line } from "react-chartjs-2";
import { useState, useEffect, useMemo } from 'react';
import { useEcuacion } from '../../hooks/UseEcuacion';
import type { TooltipItem } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FunctionChartProps {
  funcion: string;
  xMin: number;
  xMax: number;
  numPuntos?: number;
}

export default function FunctionChart({ funcion, xMin, xMax, numPuntos = 100 }: FunctionChartProps) {
  const { evaluar } = useEcuacion(funcion);
  const [puntos, setPuntos] = useState<{ x: number; y: number | null }[]>([]);

  useEffect(() => {
    const paso = (xMax - xMin) / (numPuntos - 1);
    const nuevosPuntos = [];

    for (let i = 0; i < numPuntos; i++) {
      const x = xMin + (i * paso);
      try {
        const y = evaluar(x);
        nuevosPuntos.push({ x, y });
      } catch (error) {
        nuevosPuntos.push({ x, y: null });
        console.log(error);
        // Opcional: comentar el console.error para no ensuciar la consola si falla mucho mientras escribes
        // console.error(`Error evaluando la función en x=${x}:`, error);
      }
    }

    setPuntos(nuevosPuntos);

    // AGREGAMOS ESTA LÍNEA PARA EVITAR EL BUCLE INFINITO:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [funcion, xMin, xMax, numPuntos]);

  const data = useMemo(() => ({
    datasets: [{
      label: `f(x) = ${funcion}`,
      data: puntos.filter(p => p.y !== null),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
      pointRadius: 0,
    }]
  }), [funcion, puntos]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const xVal = context.parsed.x?.toFixed(2) ?? '';
            const yVal = context.parsed.y?.toFixed(4) ?? 'Indefinido';

            return `f(${xVal}) = ${yVal}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'x'
        }
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'f(x)'
        }
      }
    }
  }), []);

  return <Line options={options} data={data} />;
}