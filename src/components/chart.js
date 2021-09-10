import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useHistory } from "react-router-dom";
import "../styles/chart.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

function Charts() {
  const history = useHistory();
  const [chartAmount, setChartAmount] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [chartMonth, setChartMonth] = useState([]);
  var s = 0;
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    var date = JSON.parse(localStorage.getItem(key)).date;
    for (var j = 0; j < localStorage.length; j++) {
      const key1 = localStorage.key(j);
      var date1 = JSON.parse(localStorage.getItem(key1)).date;
      if (date === date1) {
        s = s + parseInt(JSON.parse(localStorage.getItem(key1)).amount);
      }
    }
    if (chartMonth.includes(date) === false) {
      chartMonth.push(date);
      chartAmount[parseFloat(date) - 1] = s;
    }
    s = 0;
  }

  const [chart, setChart] = useState({
    series: [
      {
        name: "Spend",
        data: chartAmount,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Amount Spend By Month",
        align: "left",
      },
      fill: {
        style: { color: "black" },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 1,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  });

  console.log(chartMonth);
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Bill Tracker
          </Typography>
          <Button
            onClick={() => history.push("/")}
            color="inherit"
            variant="outlined"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <div className="chart">
        <Chart
          options={chart.options}
          series={chart.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}

export default Charts;
