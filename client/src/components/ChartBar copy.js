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

const ChartComponentBar = (props) => {
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
          labels: doacoesRecebidas,
          datasets: [
            {
              label: "Doações Recebidas",
              data: qtdRecebidas,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
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

export default ChartComponentBar;
