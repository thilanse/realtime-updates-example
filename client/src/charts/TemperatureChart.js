import React from "react";
import { Line } from "react-chartjs-2";

export default function TemperatureChart({ dataset }) {

  const data = {
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataset,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 180,
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          distribution: 'series',
          time: {
            minUnit: 'minute'
        }
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options}></Line>
    </div>
  );
}
