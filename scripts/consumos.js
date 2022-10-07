"use strict";

var xhr = new XMLHttpRequest();
xhr.open("GET", "config/jsonconfig.json", false);
xhr.send();

if (xhr.readyState === 4 && xhr.status == 200) {
  var myArr = JSON.parse(xhr.responseText);
  console.log(myArr);
  urls(myArr);
}

function urls(arr) {
  var urlBase = arr.Config[0].url;
  console.log(urlBase);
}

function userGetAll() {
  return consumoAjax("GET", "consumos/listuser.json", "", "");
}

function consumoAjax(method, url, body, contentType) {
  let promise = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          //console.log(respJson);
          resolve(respJson);
        }
        else{
            var resp = xhr.responseText;
            var respJson = JSON.parse(resp);
            //console.log(respJson);
            reject(respJson);
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
