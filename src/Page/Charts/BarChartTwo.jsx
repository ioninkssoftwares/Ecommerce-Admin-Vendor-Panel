import React, { useEffect, useRef } from "react";
import { Box, Typography, InputLabel, MenuItem, FormControl, Select, CircularProgress, useMediaQuery } from "@mui/material";
import { ArrowUpward as ArrowUpwardIcon, CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import Chart from "chart.js/auto";

const BarChartTwo = ({ allOrdersCount, processingOrders, shippedOrders, deliveredOrders, cancelledOrders, returnedOrders, deliveredPercentage, loading }) => {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [time, setTime] = React.useState("");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    const barColors = [
      "rgb(0, 101, 193)",
      "rgb(0, 193, 0)",
      "rgb(255, 165, 0)",
      "rgb(169, 169, 169)"
    ];

    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["Orders"],
        datasets: [
          {
            label: "Orders Count",
            data: [allOrdersCount],
            backgroundColor: barColors[0],
            barPercentage: 0.5,
            borderRadius: 10,
          },
          {
            label: "Processing Count",
            data: [processingOrders],
            backgroundColor: barColors[1],
            barPercentage: 0.5,
            borderRadius: 10,
          },
          {
            label: "Shipped Count",
            data: [shippedOrders],
            backgroundColor: barColors[2],
            barPercentage: 0.5,
            borderRadius: 10,
          },
          {
            label: "Delivered Count",
            data: [deliveredOrders],
            backgroundColor: barColors[3],
            barPercentage: 0.5,
            borderRadius: 10,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                return datasets.map((dataset, i) => ({
                  text: dataset.label,
                  fillStyle: dataset.backgroundColor,
                  hidden: !chart.isDatasetVisible(i),
                  lineCap: 'round',
                  lineDash: [],
                  lineDashOffset: 0,
                  lineJoin: 'round',
                  lineWidth: 1,
                  strokeStyle: dataset.borderColor,
                  pointStyle: 'circle',
                }));
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [allOrdersCount, processingOrders, shippedOrders, deliveredOrders]);

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div
      style={{
        width: isMobile ? "100%" : "32%",
        marginBottom: isMobile ? "30px" : "0",
        marginRight: isMobile ? "0" : "30px",
        marginLeft: isMobile ? "0" : "30px",
      }}
      className="BarChartOne01"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Total Orders
          <br />
          <Typography paragraph style={{ fontWeight: "800" }}>
            {allOrdersCount}
            {/* <span style={{ color: "green", fontSize: "12px", fontWeight: "200" }}>
              <ArrowUpwardIcon sx={{ fontSize: "12px" }} />
              {deliveredPercentage}
            </span> */}
          </Typography>
        </Typography>
      </Box>
      {loading ? <CircularProgress /> : <canvas ref={chartRef} />}
    </div>
  );
};

export default BarChartTwo;








