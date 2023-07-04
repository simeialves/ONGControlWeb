import Chart from "chart.js/auto";

import React, { useEffect, useRef } from "react";

const ChartBarHorizontal = (props) => {
  const chartRef = useRef(null);

  const doacoesRecebidas = props.doacoesRecebidas;
  const qtdRecebidas = props.qtdRecebidas;
  console.log(doacoesRecebidas, qtdRecebidas);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Professor de Violão", "Professor de Inglês", "3", "4", "5"],
        datasets: [
          {
            label: "Necessários",
            backgroundColor: ["rgba(255, 99, 132, 1)"],
            hoverBackgroundColor: ["rgba(255, 99, 132, 0.8)"],
            data: [1, 2, 3, 4, 5],
          },
          {
            label: "Inscritos",
            backgroundColor: ["rgba(75, 192, 192, 1)"],
            hoverBackgroundColor: ["rgba(75, 192, 192, 0.8)"],
            data: [2, 3, 4, 5, 6],
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "start",
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "Colaboradores",
            },
            maxBarThickness: 35,
          },
        },
        layout: {
          padding: { right: 50 },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartBarHorizontal;
