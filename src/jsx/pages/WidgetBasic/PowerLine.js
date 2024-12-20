import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class PowerLine extends Component {
  render() {
    const data = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "My First dataset",
          data: [4, 5, 1.5, 6, 7, 5.5, 5.8, 4.6],
          backgroundColor: "#20dea6",
          borderColor: "#46FFC8",
          borderWidth: 1,
          strokeColor: "#46FFC8",
          capBezierPoints: !0,
          pointColor: "#fff",
          pointBorderColor: "#46FFC8",
          pointBackgroundColor: "#46FFC8",
          fill : true 
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false,
      },
     plugins :{
      legend: {
        display: false,        
      },
     },
      scales: {
        x: 
          {
            display: false,
            gridLines: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: false,
              labelString: "Month",
            },
          },
        
        y: 
          {
            display: false,
            gridLines: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Value",
            },
          },
       
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 0,
          borderWidth: 0,
        },
      },
      title: {
        display: false,
      },
    };
    return (
      <div style={{ height: 140 }}>
        <Line data={data} options={options} height={140} />
      </div>
    );
  }
}

export default PowerLine;
