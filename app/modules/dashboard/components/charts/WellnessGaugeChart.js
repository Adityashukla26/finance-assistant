'use client';

import { Doughnut } from 'react-chartjs-2';
import { chartColors } from './ChartDefaults';

export default function WellnessGaugeChart({ value = 82 }) {
  const config = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['rgba(0, 255, 204, 0.85)', 'rgba(255, 255, 255, 0.08)'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <Doughnut data={config} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#00ffcc',
          fontSize: '24px',
          fontWeight: '600',
        }}
      >
        {value}
      </div>
    </div>
  );
}
