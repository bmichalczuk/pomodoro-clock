(function() {
var POMODORO = function() {
  var self = this;
  var time = document.querySelector(".clock__timer");
  
  this.data = {
    breakLength: Number(document.querySelector(".settings__length--break").textContent) || 5,
    sessionLength: Number(document.querySelector(".settings__length--session").textContent) || 25,
    breakSeconds: 60,
    sessionMinutes: "",
    breakMinutes: "",
    sessionSeconds: 60,
    timerRunning: false,
    currentTask: "Session"
  };
  
  self.data.sessionMinutes = self.data.sessionLength;
  self.data.breakMinutes = self.data.breakLength;
  
  this.timer = "";

  this.displayTimer = function(minutes, seconds) {
    var clockTurn = document.querySelector(".clock__turn");
    var clockBackground = document.querySelector(".clock__background");
    var app = document.querySelector(".app");
    if(clockTurn.textContent !== self.data.currentTask) {
      clockTurn.textContent = (clockTurn.textContent === "Session") ? "Break" : "Session";
    }
    clockBackground.style.height = function() {
        return (100 - ((minutes - 1) * 60 + seconds) * 100/(self.data[self.data.currentTask.toLowerCase() + "Length"] * 60)) + "%";
    }();
      //clockBackground.style.backgroundColor = self.data.currentTask === "Session" ? "#D85F09" : "#8BC34A";
      app.classList.toggle("app--session", self.data.currentTask === "Session");
      app.classList.toggle("app--break", self.data.currentTask === "Break");
      //document.querySelector(".app__subheading").style.color = self.data.currentTask === "Session" ? "#D85F09" : "#8BC34A";
    if(minutes > 0) {
      if(seconds > 9) {
         return minutes - 1 + ":" + seconds;
      } else {
         return minutes - 1 + ":0" + seconds;
      }
    } else {
       if(seconds > 9) {
         return minutes + ":" + seconds;
      } else {
         return minutes + ":0" + seconds;
      }
    }

  };

  this.clock = function() {
    if(self.data.currentTask === "Session") {
      if(self.data.sessionMinutes > 0) {
         if(self.data.sessionSeconds > 0) {
            self.data.sessionSeconds--;
          } else {
            self.data.sessionMinutes -= 1;
            if(self.data.sessionMinutes !== 0) {
                self.data.sessionSeconds = 59;
            }
         }
         time.textContent = self.displayTimer(self.data.sessionMinutes, self.data.sessionSeconds);
      } else {
         time.textContent = self.displayTimer(self.data.sessionMinutes, self.data.sessionSeconds);
         self.data.currentTask = "Break";
         self.data.sessionMinutes = self.data.sessionLength;
         self.data.sessionSeconds = 60;
      }
   } else {
      if(self.data.breakMinutes > 0) {
         if(self.data.breakSeconds > 0) {
            self.data.breakSeconds--;
         } else {
            self.data.breakMinutes -= 1;
            if(self.data.breakMinutes !== 0) {
                self.data.breakSeconds = 59;
            }
         }
         time.textContent = self.displayTimer(self.data.breakMinutes, self.data.breakSeconds);
      } else {
         time.textContent = self.displayTimer(self.data.breakMinutes, self.data.breakSeconds);
         self.data.currentTask = "Session";
         self.data.breakMinutes = self.data.breakLength;
         self.data.breakSeconds = 60;
      }
    }
  };

  this.startTimer = function() {
    self.timer = setInterval(self.clock, 1000);
    self.data.timerRunning = true;
  };

  this.stopTimer = function() {   
    clearInterval(self.timer);  
    self.data.timerRunning = false;
  };

  this.toggleTimer = function() {
    if(self.data.timerRunning === true) {
      self.stopTimer();
    } else {
      self.startTimer();
    }
  };

  this.resetTimerSettings = function() {
    self.data.sessionSeconds = 60;
    self.data.breakSeconds = 60;
    self.data.breakMinutes = self.data.breakLength;
    self.data.sessionMinutes = self.data.sessionLength;
    self.data.currentTask = "Session";
  };

  this.changeSettings = function(targetElement, setting) {
    if(!self.data.timerRunning) {
      var displayLength = document.querySelector(".settings__length--" + setting);
      var modifier = setting + "Length";
      var length = self.data[modifier];
       if(targetElement.classList.contains("settings__controll--decrase")) {
            if(length > 5) {
              POMODORO.data[modifier] -= 5; 
              displayLength.textContent = POMODORO.data[modifier];
            }
          }
        if(targetElement.classList.contains("settings__controll--incrase")) {
            if(length < 60) {
              POMODORO.data[modifier] += 5;
              displayLength.textContent = POMODORO.data[modifier];
           }
          }
          self.resetTimerSettings();
      }
  }
  return this;
}();

var sessionSettings = document.querySelector(".settings__session");
var breakSettings = document.querySelector(".settings__break");

sessionSettings.addEventListener("click", function(e) {
    var target = e.target;
    POMODORO.changeSettings(target, "session");
});

breakSettings.addEventListener("click", function(e) {
  var target = e.target;
    POMODORO.changeSettings(target, "break");
});

document.querySelector(".clock").addEventListener("click", POMODORO.toggleTimer);
}());








