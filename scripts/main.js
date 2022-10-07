function cargar(name) {
  $("#contenido").load("pages/" + name + ".html");
}

async function load(url) {
  let consumos = loadJs(url + "/consumos.js");
  let users = loadJs(url + "/users.js");
  let login = loadJs(url + "/login.js");

  await consumos;
  await users;
  await login;
}

function loadJs(url) {
  let promise = new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.onload = function () {
      console.log("Success loading", url);
      resolve(true);
    };
    script.onerror = function () {
      console.log("Error loading", url);
      reject(true);
    };
    script.src = url;
    document.head.appendChild(script);
  });
  return promise;
}

