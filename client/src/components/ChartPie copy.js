import { CategoryScale, Chart, PieController, Title, Tooltip } from "chart.js";
import React, { useEffect, useRef } from "react";

const ChartPie = (props) => {
  const chartRef = useRef(null);

  const doacoesRecebidas = props.doacoesRecebidas;
  const qtdRecebidas = props.qtdRecebidas;

  useEffect(() => {
    Chart.register(PieController, CategoryScale, Title, Tooltip);

    let chartInstance = null;
    const createChart = () => {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: doacoesRecebidas,
          datasets: [
            {
              label: "Doações Recebidas",
              data: qtdRecebidas,
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(255, 159, 64, 0.8)",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Doações Recebidas",
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = context.label || "";
                  var value = context.raw || 0;
                  return label + ": " + value;
                },
              },
            },
            legend: {
              display: false, // Desabilitar a legenda padrão do Chart.js
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

export default ChartPie;
