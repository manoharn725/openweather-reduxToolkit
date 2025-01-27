import './index.css'

const SunriseSunsetChart = ({ sunrise, sunset, currentTime }) => {
  // Convert time strings (e.g. "5:50", "20:47") to minutes for calculation
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const sunriseMinutes = timeToMinutes(sunrise);
  const sunsetMinutes = timeToMinutes(sunset);
  const currentMinutes = timeToMinutes(currentTime);

  // Total daylight duration in minutes
  const totalDaylightMinutes = sunsetMinutes - sunriseMinutes;
  // Percentage of the day that has passed
  const dayProgress = ((currentMinutes - sunriseMinutes) / totalDaylightMinutes) * 100;

  // Position the sun based on progress (restricting to range 0-100%)
  const sunPositionX = Math.min(100, Math.max(0, dayProgress));

  return (
    <div className="sun-chart">
      <svg viewBox="0 0 100 50" width="100%" height="200">
        {/* Arc path for sun movement */}
        <path
          d="M 10 40 Q 50 0 90 40"
          stroke="orange"
          fill="none"
          strokeWidth="2"
        />
        {/* Sun position (animated circle) */}
        <circle
          cx={10 + (80 * sunPositionX) / 100}
          cy={40 - 30 * Math.sin((Math.PI * sunPositionX) / 100)}
          r="5"
          fill="orange"
        />
        {/* Sunrise and Sunset dots */}
        <circle cx="10" cy="40" r="3" fill="orange" />
        <circle cx="90" cy="40" r="3" fill="orange" />

        {/* Labels */}
        <text x="0" y="48" fontSize="5" fill="black">
          {sunrise} Sunrise
        </text>
        <text x="75" y="48" fontSize="5" fill="black">
          Sunset {sunset}
        </text>
      </svg>
    </div>
  );
};

// Example usage
export default  SunriseSunsetChart 

