function importScript(src) {
  return new Promise(function (resolve, reject) {
    if (src.endsWith("js")) {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", function () {
        console.log(src);
        resolve(true);
      });
      document.head.appendChild(script);
    } else if ("src".endsWith("html")) {
      const script = document.createElement("object");
      script.data = src;
      script.type = "text/html";

      script.addEventListener("load", function () {
        console.log(src);
        resolve(true);
      });
      document.getElementById("app").innerHTML = script;
      
    } else if (src.endsWith("css")) {
      const script = document.createElement("link");
      script.href = src;
      script.rel = "stylesheet";
      script.type = "text/css";

      script.addEventListener("load", function () {
        console.log(src);
        resolve(true);
      });
      document.head.appendChild(script);
    } else {
      reject(false);
    }
  });
}

function importScripts(urls) {
  return urls.map(importScript).reduce(function (p, c) {
    return p.then(function () {
      return c.then(function (result) {
        return true;
      });
    });
  }, Promise.resolve([]));
}

function awake() {
  importScripts([
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
    "https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css",

    "https://code.jquery.com/jquery-3.6.0.js",
    "https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js",

    "https://raw.githubusercontent.com/mmohatra/dato_widget_test/main/widget.html",
  ]).then(function () {
    jQuery(onLoad);
  });
}

function onLoad($) {
  $("#example").DataTable();
}
