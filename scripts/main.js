function cargar(name){
    $("#contenido").load("pages/"+ name +".html");
}


$.getScript( "scripts/consumos.js" )
  .done(function( script, textStatus ) {
    console.log( textStatus );
  })
  .fail(function( jqxhr, settings, exception ) {
    alert( "Triggered ajaxError handler." );
});

var xmlhttp = new XMLHttpRequest();
var url = "config/jsonconfig.json";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    urls(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function urls(arr) {
  urlBase = arr.Config[0].url;
  console.log(urlBase);
}


