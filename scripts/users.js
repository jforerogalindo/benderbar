async function getRol(rolId) {
    roles = await rolsGetAll();
    for (const key in roles) {
        if (rolId === roles[key].rolId) {
            //console.log(roles[key].rolName)
            return roles[key].rolName;
        }
    }
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
            (await getRol(response[key].rolId)) +
            '</td><td class="text-center"><a class="text-warning" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarUsuario(' +
            response[key].name+ ',' +response[key].identification +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#userTableBody").append(newRowContent);
    }
}

async function listaRoles() {
    response = await rolsGetAll();
    for (const key in response) {
        var newOptionRol =
            '<option value="' +
            response[key].rolId +
            '">' +
            response[key].rolName +
            "</option>";
        $("#rol").append(newOptionRol);
    }
}

function eliminarUsuario(name, userId) {
    Swal.fire({
        title: "¿Estas seguro de eliminar a " + name + "?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Eliminado!", "", "success");
        } else if (result.isDenied) {
            Swal.fire({
                title: "Cancelado",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    });
}
