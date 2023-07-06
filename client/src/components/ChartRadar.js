import { CategoryScale, Chart, PieController, Title, Tooltip } from "chart.js";
import React, { useEffect, useRef } from "react";

const ChartRadar = (props) => {
  const chartRef = useRef(null);

  const doacoes = props.doacoes;
  const qtdRecebidas = props.qtdRecebidas;
  const qtdNecessarias = props.qtdNecessarias;
  const qtdRealizadas = props.qtdRealizadas;

  useEffect(() => {
    Chart.register(PieController, CategoryScale, Title, Tooltip);

    let chartInstance = null;
    const createChart = () => {
      const ctx = chartRef.current.getContext("2d");

      const data = {
        labels: doacoes,
        datasets: [
          {
            label: "Doações Necessarias",
            data: qtdNecessarias,
            fill: true,
            backgroundColor: "rgba(99, 255, 132, 0.2)",
            borderColor: "rgb(99, 255, 132)",
            pointBackgroundColor: "rgb(99, 255, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(99, 255, 132)",
          },
          {
            label: "Doações Recebidas",
            data: qtdRecebidas,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
          {
            label: "Doações Realizadas",
            data: qtdRealizadas,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      };

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "radar",
        data: data,
        options: {
          responsive: true,
          aspectRatio: 1.5,
          elements: {
            line: {
              borderWidth: 3,
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
  }, [doacoes]);

  return (
    <canvas ref={chartRef} style={{ width: "100px", height: "100px" }}></canvas>
  );
};

export default ChartRadar;
