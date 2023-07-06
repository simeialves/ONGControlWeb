import { CategoryScale, Chart, PieController, Title, Tooltip } from "chart.js";
import React, { useEffect, useRef } from "react";

const ChartPie = (props) => {
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

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: doacoesRecebidas,
          datasets: [
            {
              data: qtdRecebidas,
              backgroundColor: coresBackGround,
              hoverBackgroundColor: coresHoverBackGround,
            },
          ],
        },
        options: {
          responsive: true,
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: true,
              position: "right",
              align: "start",
              padding: 10,
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

  return (
    <canvas ref={chartRef} style={{ width: "100px", height: "100px" }}></canvas>
  );
};

export default ChartPie;
