import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  PieController,
} from "chart.js";

import React, { useEffect, useRef } from "react";

const ChartBarVertical = (props) => {
  const chartRef = useRef(null);

  const doacoesRecebidas = props.doacoesRecebidas;
  const qtdRecebidas = props.qtdRecebidas;
  console.log(doacoesRecebidas, qtdRecebidas);

  useEffect(() => {
    Chart.register(
      LinearScale,
      CategoryScale,
      BarController,
      BarElement,
      PieController,
      ArcElement
    );

    let chartInstance = null;
    const createChart = () => {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Comparativo entre doações"],
          datasets: [
            {
              label: "Necessários",
              backgroundColor: ["rgba(255, 99, 132, 1)"],
              borderColor: ["rgba(255, 99, 132, 0.8)"],
              data: ["1"],
            },
            {
              label: "Recebidos",
              backgroundColor: ["rgba(54, 162, 235, 1)"],
              borderColor: ["rgba(54, 162, 235, 0.8)"],
              data: ["2"],
            },
            {
              label: "Doados",
              backgroundColor: ["rgba(255, 206, 86, 1)"],
              borderColor: ["rgba(255, 206, 86, 0.8)"],
              data: ["3"],
            },
            {
              label: "Saldo",
              backgroundColor: ["rgba(75, 192, 192, 1)"],
              borderColor: ["rgba(75, 192, 192, 0.8)"],
              data: ["4"],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          layout: {
            padding: { right: 50 },
          },
        },
      });
    };

    createChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [doacoesRecebidas]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartBarVertical;
