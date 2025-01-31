import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useUnixToLocalTimeContext } from "../../context/UnixToLocalTime/useUnixToLocalTimeContext";
import { useConvertToCelsiusContext } from "../../context/ConvertToCelsius/useConvertToCelsiusContext";
import "./index.css";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureGraph = ({ forecastData = [] }) => {
  const { convertUnixTo12HoursFormate } = useUnixToLocalTimeContext();
  const { convertToCelsius } = useConvertToCelsiusContext();

  const labels = forecastData?.map((item) =>
    convertUnixTo12HoursFormate(item?.dt_txt.split(" ")[1])
  ); 
  const temperatures = forecastData?.map((item) =>
    convertToCelsius(item?.main?.temp)
  ); 

  // Chart.js data
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "#ffce46",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderWidth: 3, // Thicker line
        pointRadius: 5, // Bigger points
        pointBackgroundColor: "white",
        pointBorderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Chart.js options
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
    scales: {
      x: {
        // title: {
        //   display: true,
        //   text: "Time",
        //   font: { size: 14 },
        // },
        ticks: {
          font: { size: 12 },
          //   maxRotation: 30, // Rotate labels
          //   minRotation: 30,
        },
        grid: {
          display: false,
        },
      },
      y: {
        // title: {
        //   display: true,
        //   text: "Temperature (°C)",
        //   font: { size: 14 },
        // },
        ticks: {
          font: { size: 12 },
          stepSize: 2,
        },
        grid: {
          color: "#c8c8c8", // Lighter grid
        },
        suggestedMin: Math.min(...temperatures) - 2,
        suggestedMax: Math.max(...temperatures) + 2,
      },
    },
  };

  return (
    <div
      className="temperature-graph"
      style={{ height: "190px", width: "460px" }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureGraph;
