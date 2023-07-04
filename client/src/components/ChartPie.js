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

const ChartComponentPie = (props) => {
  const chartRef = useRef(null);

  const doacoesRecebidas = props.doacoesRecebidas;

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
          labels: [doacoesRecebidas],
          datasets: [
            {
              data: ["25", "5", "4", "3"],
              backgroundColor: ["#b22222", "#adb5bd", "#577590"],
              hoverBackgroundColor: ["#c22222", "#c4c8cc", "#567990"],
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: "right",
          },
          layout: {
            padding: { right: 50 },
          },
          legend: {
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Legenda",
            },
          },
        },
      });
    };

    createChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Limpar o gráfico ao desmontar o componente
      }
    };
  }, [doacoesRecebidas]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponentPie;
