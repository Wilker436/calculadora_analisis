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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


interface LineChartProps {
  xValues: number[];
  yValues: number[];
}



export default function LineChart({ xValues, yValues }: LineChartProps) {


  const labels = xValues.map(x => x.toString());

  const data = {
    labels,
    datasets: [{
      label: 'Función interpolada', 
      data: yValues.map((y, index) => ({
        x: xValues[index],
        y: y
      })),
      borderColor: '#424874',
      backgroundColor: '#A6B1E1',
      pointBackgroundColor: '#A6B1E1',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#424874',
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
          label: function (context: any) {
            // context.dataIndex te da el índice del punto
            const index = context.dataIndex;
            return `X = ${xValues[index]}, Y = ${yValues[index]}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y'
        }
      }
    }
  };


  return (
    <Line options={options} data={data} />

  );

}

