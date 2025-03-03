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

interface AttendeeChartProps {
  data: {
    labels: string[];
    attendees: number[];
  };
}

export function AttendeeChart({ data }: AttendeeChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Number of Attendees',
        data: data.attendees,
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Event Attendance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}