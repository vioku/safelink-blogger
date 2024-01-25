document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("vioku-btn-generateurl").addEventListener("click", function () {
    var generateurl = document.getElementById("generateurl").value,
      generatelink = document.getElementById("generatelink"),
      generateloading = document.getElementById("generateloading"),
      resulturl = document.getElementById("resulturl");
    if (generateurl === "") {
      document.getElementById("generateurl").focus();
      return false;
    }
    generateloading.classList.remove("hidden");
    generatelink.classList.add("hidden");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://lanjutdroid.blogspot.com//feeds/posts/summary?alt=json-in-script", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = JSON.parse(xhr.responseText);
          var link = "";
          var content = data.feed.entry;
          var links = [];

          if (content !== undefined) {
            for (var i = 0; i < content.length; i++) {
              for (var j = 0; j < content[i].link.length; j++) {
                if (content[i].link[j].rel == "alternate") {
                  link = content[i].link[j].href;
                  break;
                }
              }
              links[i] = link;
              var randindex = Math.floor(Math.random() * links.length);
            }
            resultgenerate = links[randindex] + "#?o=" + aesCrypto.encrypt(convertstr(generateurl), convertstr("root"));
            generateloading.classList.add("hidden");
            generatelink.classList.remove("hidden");
            resulturl.value = resultgenerate;
          } else {
            resulturl.value = "No result!";
          }
        } else {
          resulturl.value = "Error loading feed!";
        }
      }
    };

    xhr.send();
  });
});
