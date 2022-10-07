function cargar(name) {
  $("#contenido").load("pages/" + name + ".html");
}

async function load(url) {
  let consumos = loadJs(url + "/consumos.js");
  let users = loadJs(url + "/users.js");

  await consumos;
  await users;
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

async function listaUsuarios() {
  response = await userGetAll();
  for (const key in response) {
    var newRowContent =
      '<tr><td scope="row">' +
      response[key].identification +
      "</td><td>" +
      response[key].name +
      "</td><td>" +
      await getRol(response[key].rolId)+
      '</td><td class="text-center"><a class="text-warning" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger"><i class="fa-regular fa-trash"></i></a></td></tr>';
    $("#userTableBody").append(newRowContent);
  }
}

async function listaRoles(){
    response = await rolsGetAll();
    for (const key in response) {
        var newOptionRol = '<option value="'+ response[key].rolId +'">'+ response[key].rolName +'</option>'
        $("#rol").append(newOptionRol);
    }
}
