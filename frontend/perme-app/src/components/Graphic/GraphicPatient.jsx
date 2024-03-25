import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { PatientStyledLineChart } from './GraphicPatientStyled'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const GraphicPatient = ({ measurements }) => {
  if (measurements.length === 0) {
    return <div>Nenhuma aferição foi registrada até o momento.</div>;
  }

   const labels = measurements.map((measurement) => {
    const date = new Date(measurement.dataMeasurement);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    return formattedDate;
  });

  const scores = measurements.map((measurement) => measurement.score);

  const data = {
    labels,
    datasets: [
      {
        label: 'Score Perme',
        data: scores,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Score Perme over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data de Aferição',
        },
      },
      y: {
        min: 0,
        max: 40,
        title: {
          display: true,
          text: 'Score Perme',
        },
      },
    },    
  };

  return <PatientStyledLineChart options={options} data={data} />;
};

export default GraphicPatient;

