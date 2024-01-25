// var setting = {
//   exceptionurl: "facebook.com,google.com,link-blog-utama.com",
//   path: "#?o=",
// };
function extractDomain(url) {
  return url.split(/[:/?]/)[2] || url.split("/")[2] || url.split("/")[0];
}
function exception() {
  return setting.exceptionurl.split(",");
}
setting.exceptionurl = setting.exceptionurl ? setting.exceptionurl + "," + window.location.href : window.location.href;
var exception = exception();

function showurl(datajson) {
  var links = [];
  var allarticle = datajson.feed.openSearch$totalResults.$t;
  for (var i = 0; i < allarticle; i++) {
    var urlarticle;
    for (var s = 0; s < datajson.feed.entry[i].link.length; s++) {
      if (datajson.feed.entry[i].link[s].rel == "alternate") {
        urlarticle = datajson.feed.entry[i].link[s].href;
        break;
      }
    }
    links[i] = urlarticle;
  }
  var exceptionlength = exception.length;
  var linktag = document.getElementsByTagName("a");
  for (var i = 0; i < linktag.length; i++) {
    var check = false;
    var no = 0;
    var checklink, checkexception;
    while (check === false && no < exceptionlength) {
      checklink = extractDomain(linktag[i].href);
      checkexception = extractDomain(exception[no]);
      if (checklink.includes(checkexception)) {
        check = true;
      }
      no++;
    }
    if (!check) {
      var randindex = Math.floor(Math.random() * links.length);
      linktag[i].href = links[randindex] + setting.path + aesCrypto.encrypt(cleanWhiteSpace(linktag[i].href), cleanWhiteSpace("root"));
      linktag[i].rel = "nofollow";
      linktag[i].target = "_blank";
    }
  }
}
