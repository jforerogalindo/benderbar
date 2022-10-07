function cargar(name){
    $("#contenido").load("pages/"+ name +".html");  
}

async function load(url){
    let consumos = loadJs(url + "/consumos.js");

    await consumos;
}


function loadJs(url){
    let script = document.createElement('script');
    script.onload = function(){
        console.log("Success loading", url);
    };
    script.onerror = function(){
        console.log("Error loading", url);
    };
    script.src = url;
    document.head.appendChild(script);
}

async function listaUsuarios(){
    response = await userGetAll();
    console.log(response);
    for (const key in response) {
        var newRowContent = "<tr><td scope=\"row\">"+ response[key].identification + "</td><td>" + response[key].name + "</td><td>" + response[key].rolId + "</td><td class=\"text-center\"><a class=\"text-warning\" data-bs-toggle=\"modal\" data-bs-target=\"#modalEditar\"><i class=\"fa-regular fa-pen-to-square\"></i></a></td><td class=\"text-center\"><a class=\"text-danger\"><i class=\"fa-regular fa-trash\"></i></a></td></tr>";
        console.log(response[key]);
        $("#userTableBody").append(newRowContent);
    }
    
}