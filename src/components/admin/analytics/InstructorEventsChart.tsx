import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface InstructorEventsChartProps {
  data: {
    instructors: string[];
    eventCounts: number[];
  };
}

export function InstructorEventsChart({ data }: InstructorEventsChartProps) {
  const chartData = {
    labels: data.instructors,
    datasets: [
      {
        label: 'Number of Events',
        data: data.eventCounts,
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Events by Instructor',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}