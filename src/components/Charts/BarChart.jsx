import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <Bar
      style={{ width: "300px" }}
      data={chartData}
      options={{ responsive: false }}
    />
  );
};

export default BarChart;
