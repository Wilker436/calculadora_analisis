import { Line } from "react-chartjs-2";
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

import type { TooltipItem } from 'chart.js';

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

interface LineChartProps {
  xValues: number[];
  yValues: number[];
}

export default function LineChart({ xValues, yValues }: LineChartProps) {
  // Combinar y ordenar los puntos por valor de X para un gráfico correcto
  const points = xValues.map((x, i) => ({ x, y: yValues[i] }));
  points.sort((a, b) => a.x - b.x);

  const data = {
    datasets: [{
      label: 'Función interpolada', 
      data: points,
      borderColor: '#424874',
      backgroundColor: '#A6B1E1',
      pointBackgroundColor: '#A6B1E1',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#424874',
      fill: false,
      tension: 0.4 // Suaviza la línea un poco
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            return `X = ${context.parsed.x}, Y = ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear' as const, // ¡IMPORTANTE! Escala lineal para X
        title: {
          display: true,
          text: 'X'
        },
        ticks: {
          // Para mostrar ticks más ordenados
          stepSize: 1
        }
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Y'
        }
      }
    }
  };

  return <Line options={options} data={data} />;
}