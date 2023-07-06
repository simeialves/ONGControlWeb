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
          labels: [
            "Caixa de Sorvete",
            "Descartáveis",
            "Pipoca",
            "Cesta Básica",
          ],
          datasets: [
            {
              label: "Necessários",
              backgroundColor: ["#b22222", "#b22222", "#b22222", "#b22222"],
              data: ["20", "50", "50", "50"],
            },
            {
              label: "Recebidos",
              backgroundColor: ["#adb5bd", "#adb5bd", "#adb5bd", "#adb5bd"],
              data: ["3", "5", "4", "25"],
            },
            {
              label: "Doados",
              backgroundColor: ["#4d68eb", "#4d68eb", "#4d68eb", "#4d68eb"],
              data: ["0", "0", "0", "2"],
            },
            {
              label: "Saldo",
              backgroundColor: ["#0b8a39", "#0b8a39", "#0b8a39", "#0b8a39"],
              data: ["3", "5", "4", "23"],
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: "bottom",
          },
          responsive: true,
          aspectRatio: 1.5,
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
            },
            y: {
              grid: {
                display: false,
              },
            },
            xAxes: [
              {
                gridLines: { display: false },
                display: true,
                scaleLabel: { display: false, labelString: "" },
                maxBarThickness: 35,
              },
            ],
            yAxes: [
              {
                gridLines: { display: false },
                display: true,
                scaleLabel: { display: true, labelString: "Quantidade" },
              },
            ],
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
