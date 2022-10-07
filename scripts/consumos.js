var xhr = new XMLHttpRequest();
xhr.open("GET", "config/jsonconfig.json", false);
xhr.send();

if (xhr.readyState === 4 && xhr.status == 200) {
    var myArr = JSON.parse(xhr.responseText);
    console.log(myArr);
    urls(myArr);
}

function urls(arr) {
    urlBase = arr.Config[0].url;
    console.log(urlBase);
}
//---------------------------------------------------------------------------------------
function ajaxlogin(userName, password) {
    url = urlBase + "User/Login";
    body = {
        "user": userName,
        "password": password
    }
    return consumoAjax("POST", url, JSON.stringify(body), "aplication/json");
}
//---------------------------------------------------------------------------------------
function deleteUser(userId) {
    return consumoAjax("DELETE", urlBase + "User/Delete/" + userId, "", "");
}
//---------------------------------------------------------------------------------------
function rolsGetAll() {
    //return consumoAjax("GET", urlBase + "Roles/GetAll", "", "");
    return consumoAjax("GET", "consumos/listroles.json", "", "");
}
//---------------------------------------------------------------------------------------
function userGetAll() {
    //return consumoAjax("GET", urlBase + "User/GetAll", "", "");
    return consumoAjax("GET", "consumos/listuser.json", "", "");
}
//---------------------------------------------------------------------------------------
function consumoAjax(method, url, body, contentType) {
    let promise = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var resp = xhr.responseText;
                    try {
                        var respJson = JSON.parse(resp);
                        resolve(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                }
                else {
                    var resp = xhr.responseText;
                    try {
                        var respJson = JSON.parse(resp);
                        reject(respJson);
                    } catch (e) {
                        reject(resp);
                    }
                }
            }
        };
        xhr.open(method, url, true);
        if (contentType != null && contentType != "") {
            xhr.setRequestHeader("Content-type", contentType);
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(body);
        xhr.send(body);
    });
    return promise;
}
