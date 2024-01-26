document.addEventListener("DOMContentLoaded", function () {
  console.log(vioku_settings);
  function vioku_extractURLparams(name) {
    var regex = new RegExp("[?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.href);
    return results === null ? null : decodeURI(results[1]) || 0;
  }

  var vioku_go1 = document.getElementById("vioku_go1"),
    vioku_go2 = document.getElementById("vioku_go2"),
    vioku_timer = document.getElementById("vioku_timer"),
    request = false;

  if (vioku_extractURLparams("vioku-go") !== null) {
    var secondsRemaining = vioku_settings.timerCountDown1 || 5;
    var timerInterval = setInterval(function () {
      var textTimer = vioku_settings.textTimerOnloading || "Please wait [timer] second";
      vioku_timer.innerHTML = textTimer.replace("[timer]", secondsRemaining);
      if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        vioku_go1.innerHTML = vioku_settings.button1Onready || "Getlink";
        vioku_go1.disabled = false;
        vioku_go1.style.display = "flex";
        vioku_timer.style.display = "none";
      }
      secondsRemaining--;
    }, 1000);
  }

  function vioku_geturlcountdown() {
    var countDown = vioku_settings.timerCountDown1 || 3;
    vioku_go2.style.display = "flex";
    vioku_go2.innerHTML = vioku_settings.button2Onloading || "Please Wait...";
    var x = setInterval(function () {
      var distance = (countDown -= 1);
      if (distance < 0) {
        clearInterval(x);
        vioku_go2.disabled = false;
        vioku_go2.innerHTML = vioku_settings.button2Onready || "Continue";
      }
    }, 1000);
  }
  vioku_go1.addEventListener("click", function () {
    if (request === false) {
      vioku_geturlcountdown();
      request = true;
    }
    var scrollTopValue = vioku_go2.offsetTop - 10;
    window.scroll({
      top: scrollTopValue,
      behavior: "smooth",
    });
  });
  vioku_go2.addEventListener("click", function () {
    var realurl = aesCrypto.decrypt(cleanWhiteSpace(vioku_extractURLparams("vioku-go")), cleanWhiteSpace("root"));
    window.location.href = realurl;
  });
});
