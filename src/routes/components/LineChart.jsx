// LineChart.js
import React, { useEffect, useRef } from 'react';
import { Paper, Typography } from '@mui/material';
import Chart from 'chart.js/auto';

const LineChart = ({graphData,graphLabel}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Sample data for the line chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: graphLabel,
          data: graphData,
          borderColor: '#3f51b5', // Line color
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Chart configuration
    const options = {
      scales: {
        x: {
          type: 'category',
          labels: data.labels,
        },
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }, []);

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Sales Trend
      </Typography>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </Paper>
  );
};

export default LineChart;
