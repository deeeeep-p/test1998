import Chart from "react-apexcharts";

const ApexChart = ({ categories, data, siteName, location }) => {
  const options = {
    chart: {
      id: "basic-bar",
      width: "10px",
    },
    xaxis: {
      categories,
    },
    colors: ["#00E396"],
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };

  const series = [
    {
      name: "series-1",
      data,
    },
  ];

  return (
    <div
      className="ApexChart"
      style={{ padding: "20px", backgroundColor: "white" }}
    >
      <div
        className="title"
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "10px" }}
      >
        {`${siteName} at ${location}`}
      </div>
      <div className="chart-container" style={{ overflowX: "auto" }}>
        <div className="row">
          <div className="mixed-chart">
            <Chart options={options} series={series} type="bar" width="500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApexChart;
