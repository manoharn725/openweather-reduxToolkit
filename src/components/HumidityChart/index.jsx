import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useUnixToLocalTimeContext } from "../../context/UnixToLocalTime/useUnixToLocalTimeContext";
import "./index.css";

// ✅ Register necessary chart elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HumidityChart = ({ forecastData = [] }) => {
  const { convertUnixTo12HoursFormate } = useUnixToLocalTimeContext();

  console.log("check", forecastData);
  const labels = forecastData?.map((item) =>
    convertUnixTo12HoursFormate(item?.dt_txt.split(" ")[1])
  );
  const humidityValues = forecastData.map((item) => item?.main?.humidity);

  const data = {
    labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidityValues,
        backgroundColor: "#ffe08a",
        borderColor: "#ffce46",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { size: 14 },
          boxWidth: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ffce46",
        borderWidth: 1,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //     title: { display: true, text: "Humidity (%)" },
    //   },
    //   x: {
    //     title: { display: true, text: "Time" },
    //   },
    // },
  };

  return (
    <div className="humidity-chart-bar">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HumidityChart;
