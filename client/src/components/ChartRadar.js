import { CategoryScale, Chart, PieController, Title, Tooltip } from "chart.js";
import React, { useEffect, useRef } from "react";

const ChartRadar = (props) => {
  const chartRef = useRef(null);

  const doacoesRecebidas = props.doacoesRecebidas;
  const qtdRecebidas = props.qtdRecebidas;
  const coresBackGround = props.coresBackGround;
  const coresHoverBackGround = props.coresHoverBackGround;

  useEffect(() => {
    Chart.register(PieController, CategoryScale, Title, Tooltip);

    let chartInstance = null;
    const createChart = () => {
      const ctx = chartRef.current.getContext("2d");

      const data = {
        labels: doacoesRecebidas,
        datasets: [
          {
            label: "Doações Realizadas",
            data: [10, 5, 2, 3],
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
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
  }, [doacoesRecebidas]);

  return (
    <canvas ref={chartRef} style={{ width: "100px", height: "100px" }}></canvas>
  );
};

export default ChartRadar;
