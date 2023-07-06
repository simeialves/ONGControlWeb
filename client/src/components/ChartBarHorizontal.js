import Chart from "chart.js/auto";

import React, { useEffect, useRef } from "react";

const ChartBarHorizontal = (props) => {
  const chartRef = useRef(null);

  const colaboradores = props.colaboradores;
  const qtdColaboradoresNecessarios = props.qtdColaboradoresNecessarios;
  const qtdColaboradoresInscritos = props.qtdColaboradoresInscritos;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: colaboradores,
        datasets: [
          {
            label: "Necessários",
            backgroundColor: ["rgba(255, 99, 132, 1)"],
            hoverBackgroundColor: ["rgba(255, 99, 132, 0.8)"],
            data: qtdColaboradoresNecessarios,
          },
          {
            label: "Inscritos",
            backgroundColor: ["rgba(75, 192, 192, 1)"],
            hoverBackgroundColor: ["rgba(75, 192, 192, 0.8)"],
            data: qtdColaboradoresInscritos,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        aspectRatio: 1.5,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "start",
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [colaboradores]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartBarHorizontal;
