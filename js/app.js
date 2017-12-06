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
const ul = document.getElementById("autocompleteNames");
const notification = document
  .querySelector("header")
  .querySelector(".notification");
const popUp = document.querySelector(".pop-up");
const notifications = popUp.querySelector(".notifications");
const poUpbutton = document.getElementById("closeNotifButton");

// ----- chart js set up  (needs a lot of refactoring)-----
// ----- daily traffic chart-----
var ctx = document.getElementById("dailyTrafficChart").getContext("2d");
var dailyTrafficChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
      label: "",
      data: [50, 75, 150, 100, 200, 175, 75],
      backgroundColor: "rgba(116, 119, 191, 1)"
    }]
  },
  options: {
    legend: {
      display: false
    },
    layout: {
      padding: 20
    },
    scales: {
      xAxes: [{
        barPercentage: 0.6,
        gridLines: {
          drawTicks: true
        }
      }],
      yAxes: [{
        gridLines: {
          drawTicks: true
        },
        ticks: {
          stepSize: 50,
          max: 250,
          min: 0
        }
      }]
    }
  }
});
// -----mobile chart-----
var cty = document.getElementById("mobileUsersChart").getContext("2d");
var mobileUsersChart = new Chart(cty, {
  type: "doughnut",
  data: {
    labels: ["Tablets", "Phones", "Desktop"],
    datasets: [{
      data: [15, 15, 70],
      backgroundColor: ["#81c98f", "#74b1bf", "#7477bf"],
      borderWidth: [0, 0, 0]
    }]
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

// -----traffic charts data and options (hourly, daily, weekyly, monthly)-----
const trafficChartContext = document.getElementById("trafficChartMonthly").getContext("2d");
const makeTrafficChart = {
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
      yAxes: [{
        ticks: {
          min: 0
        }
      }]
    }
  },
  monthly: {
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
    datasets: [{
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
    }]
  },
  weekly: {
    labels: [
      "16-22",
      "23-29",
      "30-5",
      "6-12",
      "13-19",
      "20-26",
      "27-3",
      "4-10",
      "11-17",
      "18-24",
      "25-31r"
    ],
    datasets: [{
      label: "",
      data: [
        500,
        1000,
        750,
        1250,
        1750,
        1250,
        1500,
        1000,
        1500,
        2000,
        1500,
        2000
      ],
      backgroundColor: "rgba(116, 119, 191, .25)",
      borderColor: "#7477bf",
      borderWidth: 1,
      lineTension: 0,
      pointBackgroundColor: "white",
      pointRadius: 5
    }]
  },
  daily: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [{
      label: "",
      data: [
        75, 50, 75, 150, 100, 200, 175
      ],
      backgroundColor: "rgba(116, 119, 191, .25)",
      borderColor: "#7477bf",
      borderWidth: 1,
      lineTension: 0,
      pointBackgroundColor: "white",
      pointRadius: 5
    }]
  },
  hourly: {
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    datasets: [{
      label: "",
      data: [
        75, 50, 75, 150, 100, 200, 175, 25, 5, 10, 10, 25, 50, 100, 250, 5, 0, 15, 30, 20, 25, 200, 170, 150
      ],
      backgroundColor: "rgba(116, 119, 191, .25)",
      borderColor: "#7477bf",
      borderWidth: 1,
      lineTension: 0,
      pointBackgroundColor: "white",
      pointRadius: 5
    }]
  }
};

// -----traffic charts (hourly, daily, weekyly, monthly)-----
const loadTrafficChart = {
  monthly: function () {
    var ctz = trafficChartContext;
    var trafficChartMonthly = new Chart(ctz, {
      type: "line",
      data: makeTrafficChart.monthly,
      options: makeTrafficChart.options
    });
  },
  weekly: function () {
    var ctz = trafficChartContext;
    var trafficChartMonthly = new Chart(ctz, {
      type: "line",
      data: makeTrafficChart.weekly,
      options: makeTrafficChart.options
    });
  },
  daily: function () {
    var ctz = trafficChartContext;
    var trafficChartMonthly = new Chart(ctz, {
      type: "line",
      data: makeTrafficChart.daily,
      options: makeTrafficChart.options
    });
  },
  hourly: function () {
    var ctz = trafficChartContext;
    var trafficChartMonthly = new Chart(ctz, {
      type: "line",
      data: makeTrafficChart.hourly,
      options: makeTrafficChart.options
    });
  },
}

// -----load different traffic charts (hourly, daily, weekyly, monthly)-----
loadTrafficChart.monthly();
const widgetButtons = document.querySelector('.widget-buttons');

widgetButtons.addEventListener('click', function (e) {
  for (let i = 0; i < widgetButtons.children.length; i++) {
    widgetButtons.children[i].classList.remove('selected');
  }
  if (e.target.innerText.toLowerCase() === 'monthly') {
    e.target.classList.add('selected');
    loadTrafficChart.monthly();
  }
  if (e.target.innerText.toLowerCase() === 'weekly') {
    e.target.classList.add('selected');
    loadTrafficChart.weekly();
  }
  if (e.target.innerText.toLowerCase() === 'daily') {
    e.target.classList.add('selected');
    loadTrafficChart.daily();
  }
  if (e.target.innerText.toLowerCase() === 'hourly') {
    e.target.classList.add('selected');
    loadTrafficChart.hourly();
  }
})

//----- close alert -----
alertButton.addEventListener("click", function () {
  alert.style.display = "none";
});

//-----  error messages and sent confirmation simulator (needs refactoring) -----

sendButton.addEventListener("click", function () {
  user.addEventListener("input", function (e) {
    sendButton.innerText = "Send";
    sendButton.style.backgroundColor = "#7477bf";
    if (this.value) {
      this.style.borderColor = "#81c98f";
    } else {
      this.style.borderColor = "red";
    }
  });
  message.addEventListener("input", function (e) {
    sendButton.innerText = "Send";
    sendButton.style.backgroundColor = "#7477bf";
    if (this.value) {
      this.style.borderColor = "#81c98f";
    } else {
      this.style.borderColor = "red";
    }
  });
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

// ----- save and cancel settings  -----

let settings = {
  load: function () {
    timeZone.selectedIndex = localStorage.selectedIndex;
    emailNotifSwitch.checked = JSON.parse(localStorage.sendEmail);
    profilePublicSwitch.checked = JSON.parse(localStorage.setProfile);
  },
  setUpEventListeners: function () {
    saveButton.addEventListener("click", function () {
      localStorage.saveSettings = true;
      localStorage.selectedIndex = timeZone.selectedIndex;
      localStorage.sendEmail = emailNotifSwitch.checked;
      localStorage.setProfile = profilePublicSwitch.checked;
    });
    cancelButton.addEventListener("click", function () {
      settings.load();
    });
  }
};

settings.setUpEventListeners();
if (localStorage.saveSettings) {
  settings.load();
}



//----- random users ------
let names = ["Victoria Chambers", "Dale Byrd", "Dawn Wood", "Dan Oliver"];
$.ajax({
  url: 'https://randomuser.me/api/?results=100&inc=name&noinfo',
  dataType: 'json',
  success: function (data) {
    for (let i = 0; i < data.results.length; i++) {
      names.push(data.results[i].name.first.charAt(0).toUpperCase() + data.results[i].name.first.slice(1) + ' ' + data.results[i].name.last.charAt(0).toUpperCase() + data.results[i].name.last.slice(1));
    }
  }
});

// ----- autocomplete function -----
let autoComplete = {
  users: names,
  searchUsers: function (arr, str) {
    let results = [];
    for (let i = 0; i < arr.length; i++) {
      let temp = autoComplete.users[i].slice(0, str.length);
      if (str.toLowerCase() === temp.toLowerCase()) {
        results.push(autoComplete.users[i]);
      }
    }
    autoComplete.render(results);
  },
  render: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      ul.innerHTML += "<li>" + arr[i] + "</li>";
    }
  },
  setUpEventListeners: function () {
    user.addEventListener("input", function (e) {
      let input = this.value;
      if (this.value.length > 0) {
        ul.innerHTML = "";
        autoComplete.searchUsers(autoComplete.users, input);
      } else {
        ul.innerHTML = "";
      }
    });
    ul.addEventListener("click", function (e) {
      user.value = e.target.innerText;
      this.innerHTML = "";
    });
  }
};

autoComplete.setUpEventListeners();

// -----notification popups----

let popUpNotifs = {
  notifs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    "Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
  ],
  render: function () {
    notifications.innerHTML = "";
    for (let i = 0; i < popUpNotifs.notifs.length; i++) {
      let newNotif = document.createElement("P");
      // newNotif.innerText = popUpNotifs.notifs[i];
      newNotif.innerHTML =
        "<span>" + "&times; " + "</span>" + popUpNotifs.notifs[i];
      notifications.appendChild(newNotif);
      newNotif.querySelector("span").addEventListener("click", function (e) {
        e.target.parentNode.style.display = "none";
      });
    }
  },
  setUpEventListeners: function () {
    notification.addEventListener("click", function () {
      popUp.style.display = "flex";
      popUpNotifs.render();
    });
    closeNotifButton.addEventListener("click", function () {
      popUp.style.display = "none";
    });
  }
};

popUpNotifs.setUpEventListeners();