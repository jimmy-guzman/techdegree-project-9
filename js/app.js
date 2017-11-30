var ctx = document.getElementById("dailyTrafficChart").getContext("2d");
var dailyTrafficChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "",
        data: [50, 75, 150, 100, 200, 175, 75],
        backgroundColor: "rgba(116, 119, 191, 1)"
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    layout: {
      padding: 20
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.6,
          gridLines: {
            drawTicks: true
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawTicks: true
          },
          ticks: {
            stepSize: 50,
            max: 250,
            min: 0
          }
        }
      ]
    }
  }
});

var cty = document.getElementById("mobileUsersChart").getContext("2d");
var mobileUsersChart = new Chart(cty, {
  type: "doughnut",
  data: {
    labels: ["Tablets", "Phones", "Desktop"],
    datasets: [
      {
        data: [15, 15, 70],
        backgroundColor: ["#81c98f", "#74b1bf", "#7477bf"],
        borderWidth: [0, 0, 0]
      }
    ]
  },
  options: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 14
      }
    },
    layout: {
      padding: 20
    },
    rotation: 1.4 * Math.PI,
    segmentShowStroke: false
  }
});

var ctz = document.getElementById("trafficChart").getContext("2d");
var trafficChart = new Chart(ctz, {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets: [
      {
        label: "",
        data: [
          750,
          1250,
          750,
          1250,
          1750,
          1250,
          1500,
          1000,
          1500,
          2000,
          250,
          1800
        ],
        backgroundColor: "rgba(116, 119, 191, .25)",
        borderColor: "#7477bf",
        borderWidth: 1,
        lineTension: 0,
        pointBackgroundColor: "white",
        pointRadius: 5
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawTicks: true,

            offsetGridLines: false
          }
        }
      ],

      yAxes: [
        {
          gridLines: {
            drawTicks: true,
            offsetGridLines: false
          },
          ticks: {
            min: 0,
            stepSize: 500,
            max: 2500
          }
        }
      ]
    }
  }
});



