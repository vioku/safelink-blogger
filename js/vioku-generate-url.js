document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("vioku-btn-geturl").addEventListener("click", function () {
    var vioku_input_url = document.getElementById("vioku-input-url").value,
      vioku_loading_url = document.getElementById("vioku_loading_url"),
      vioku_result_url = document.getElementById("vioku-result-url");
    if (vioku_input_url === "") {
      document.getElementById("vioku-input-url").focus();
      return false;
    }
    vioku_loading_url.classList.remove("hidden");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/feeds/posts/summary?alt=json-in-script", true);
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
            resultgenerate = links[randindex] + "#?o=" + aesCrypto.encrypt(cleanWhiteSpace(vioku_input_url), cleanWhiteSpace("root"));
            vioku_loading_url.classList.add("hidden");

            vioku_result_url.value = resultgenerate;
          } else {
            vioku_result_url.value = "No result!";
          }
        } else {
          vioku_result_url.value = "Error loading feed!";
        }
      }
    };

    xhr.send();
  });
});
