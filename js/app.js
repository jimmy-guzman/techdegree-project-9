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

const alert = document.querySelector(".alert");
const alertButton = document.getElementById("alertButton");
const messageUser = document.querySelector(".message-user");
const form = messageUser.getElementsByTagName("form")[0];
const user = document.getElementById("user");
const message = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const emailNotifSwitch = document.getElementById("emailNotifSwitch");
const profilePublicSwitch = document.getElementById("profilePublicSwitch");
const timeZone = document.getElementById("timeZone");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");
let saveSettings;
//----- close alert -----
alertButton.addEventListener("click", function() {
  alert.style.display = "none";
});

//-----  error messages and sent confirmation simulator (needs refactoring) -----
sendButton.addEventListener("click", function() {
  if (!user.value || !message.value) {
    user.addEventListener("input", function(e) {
      sendButton.innerText = "Send";
      sendButton.style.backgroundColor = "#7477bf";
      if (this.value) {
        this.style.borderColor = "#81c98f";
      } else {
        this.style.borderColor = "red";
      }
    });
    message.addEventListener("input", function(e) {
      sendButton.innerText = "Send";
      sendButton.style.backgroundColor = "#7477bf";
      if (this.value) {
        this.style.borderColor = "#81c98f";
      } else {
        this.style.borderColor = "red";
      }
    });
  }
  if (!user.value && !message.value) {
    user.style.borderColor = "red";
    message.style.borderColor = "red";
    sendButton.innerText = "Empty Fields";
    sendButton.style.backgroundColor = "red";
  } else if (!user.value) {
    user.style.borderColor = "red";
    sendButton.innerText = "No User";
    sendButton.style.backgroundColor = "red";
  } else if (!message.value) {
    message.style.borderColor = "red";
    sendButton.innerText = "No Message";
    sendButton.style.backgroundColor = "red";
  } else {
    sendButton.innerText = "Sent Message!";
    sendButton.style.backgroundColor = "#81c98f";
    form.reset();
  }
});

// ----- save and cancel settings -----

if (localStorage.saveSettings) {
  loadSettings();
}

function loadSettings() {
  timeZone.selectedIndex = localStorage.selectedIndex;
  emailNotifSwitch.checked = JSON.parse(localStorage.sendEmail);
  profilePublicSwitch.checked = JSON.parse(localStorage.setProfile);
}

saveButton.addEventListener("click", function() {
  localStorage.saveSettings = true;
  localStorage.selectedIndex = timeZone.selectedIndex;
  localStorage.sendEmail = emailNotifSwitch.checked;
  localStorage.setProfile = profilePublicSwitch.checked;
});

cancelButton.addEventListener("click", function() {
  loadSettings();
});
