import { Line } from "react-chartjs-2";
import { useState, useEffect, useMemo } from 'react';
import { useEcuacion } from '../../hooks/UseEcuacion';

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
  funcion: string ;
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
      }
    }

    setPuntos(nuevosPuntos);
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
          label: function(context: any) {
            return `f(${context.parsed.x.toFixed(2)}) = ${context.parsed.y?.toFixed(4) || 'undefined'}`;
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