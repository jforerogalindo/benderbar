const swal = Swal.mixin({
    width: 400,
});

const swalResponse = Swal.mixin({
    width: 400,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

async function getRol(rolId) {
    var roles = await rolsGetAll();
    for (const key in roles) {
        if (rolId === roles[key].rolId) {
            //console.log(roles[key].rolName)
            return roles[key].rolName;
        }
    }
}

async function listaUsuarios() {
    var response = await userGetAll();
    for (const key in response) {
        console.log(response[key]);
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].identification +
            "</td><td>" +
            response[key].name +
            "</td><td>" +
            (await getRol(response[key].rolId)) +
            '</td><td class="text-center"><a class="text-warning" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarUsuario('+response[key].identification +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#userTableBody").append(newRowContent);
    }
}

async function listaRoles() {
    var response = await rolsGetAll();
    for (const key in response) {
        var newOptionRol =
            '<option value="' +
            response[key].rolId +
            '">' +
            response[key].rolName +
            "</option>";
        $("#rol").append(newOptionRol);
        $("#rolEdit").append(newOptionRol);
    }
}

function eliminarUsuario(userId) {
    swal.fire({
        text: "¿Estas seguro de eliminar al usuario " + userId + "?",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarUser(userId)
        } else if (result.isDenied) {
            swalResponse.fire({
                text: "Cancelado",
                icon: "error",
            });
        }
    });
}

async function eliminarUser(userId){
    try {
        var response = await deleteUser(userId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar el usuario, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminado!",
			icon: "success",
		});
		$("#userTableBody tr").remove();
		listaUsuarios();
	} else {
		swalResponse.fire({
			text: "Error al eliminar el usuario, por favor reintenta más tarde",
			icon: "error",
		});
	}
}

async function agregarUsuario(identification,nombre,password,rol){
    idbranch = 1101;
    try {
        var response = await insertUser(identification, nombre, password, rol, idbranch);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar el usuario, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
    if (response.success) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Agregado!",
            icon: "success",
        });
        $("#userTableBody tr").remove();
        listaUsuarios();
        
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al eliminar al usuario, por favor reintenta más tarde",
            icon: "error",
        });
    }
}