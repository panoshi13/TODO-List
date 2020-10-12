$(document).ready(function () {
  var confirmar = document.getElementById("confirmar");
  var datos = [];
  let alternar = true;
  var terminado;

  function mostrar() {
    if ("valores" in localStorage) {
      var value = localStorage.getItem("valores");

      var json_value = JSON.parse(value);
      json_value.forEach((element) => {
        datos.push(element);
      });
      var hecho;
      json_value.forEach((element) => {
        if (element.terminado === true) {
          hecho = "checked";
        } else {
          hecho = "";
        }
        fila.innerHTML += `<tr>
                                    <td scope='row'>
                                        <input type='checkbox' name='' id='terminado' ${hecho} terminar-task='${element.id}'>
                                    </td>
                                    <td width='450'style="vertical-align:middle;">${element.nombre}</td>
                                    <td>
                                        <button type='button' class='btn btn-primary' id='editar' editar-task='${element.id}'><i class='fas fa-edit'></i></button>
                                        <button type='button' class='btn btn-danger' id='eliminar' eliminar-task='${element.id}'><i class='fas fa-trash-alt'></i></button>
                                    </td>
                                </tr>`;
      });
    }
  }

  mostrar();
  confirmar.addEventListener("click", function (event) {
    var nombre = document.getElementById("tarea").value;
    document.getElementById("tarea").value = "";
    var fila = document.getElementById("fila");
    var alfanumerico = "0123456";
    var key = shuffle(alfanumerico).substring(0, 5);
    var datito = {
      id: key,
      nombre: nombre,
      terminado: false,
    };
    if (alternar) {
      datos.push(datito);
      localStorage.setItem("valores", JSON.stringify(datos));
      var value = localStorage.getItem("valores");
      var json = JSON.parse(value);
      fila.innerHTML += `<tr>
                              <td scope='row'>
                              <input type='checkbox' name='' id='terminado' terminar-task='${
                                json[json.length - 1].id
                              }'>
                              </td>
                              <td width='450'style="vertical-align:middle;">${
                                json[json.length - 1].nombre
                              }</td>
                              <td>
                                  <button type='button' class='btn btn-primary' id='editar' editar-task='${
                                    json[json.length - 1].id
                                  }'><i class='fas fa-edit'></i></button>
                                  <button type='button' class='btn btn-danger' id='eliminar' eliminar-task='${
                                    json[json.length - 1].id
                                  }'><i class='fas fa-trash-alt'></i></button>
                              </td>
                          </tr>`;
    } else {
      var dato_actualizado;
      var acabado;
      var datos_traidos = localStorage.getItem('valores')
      var json_datos_traidos = JSON.parse(datos_traidos)

      json_datos_traidos.forEach((element,i) => {
          if (i == indice) {
            dato_actualizado = element
          }
      });

      datos.splice(indice, 1, dato_actualizado);
      localStorage.removeItem("valores");
      localStorage.setItem("valores", JSON.stringify(datos));
      fila.innerHTML = "";
      datos.forEach((element) => {
        if (element.terminado === true) {
          acabado = "checked";
        } else {
          acabado = "";
        }
        fila.innerHTML += `<tr>
                                <td scope='row'>
                                    <input type='checkbox' name='' id='terminado' ${acabado} terminar-task='${element.id}'>
                                </td>
                                <td width='450'style="vertical-align:middle;">${element.nombre}</td>
                                <td>
                                    <button type='button' class='btn btn-primary' id='editar' editar-task='${element.id}'><i class='fas fa-edit'></i></button>
                                    <button type='button' class='btn btn-danger' id='eliminar' eliminar-task='${element.id}'><i class='fas fa-trash-alt'></i></button>
                                </td>
                            </tr>`;
      });
      alternar = true;
    }
  });

  var indice;
  $(document).on("click", "#editar", function () {
    var element = $(this)[0];
    var id = element.getAttribute("editar-task");

    var tarea = document.getElementById("tarea");

    var valores = localStorage.getItem("valores");
    var json_dato = JSON.parse(valores);

    json_dato.forEach((element, index) => {
      if (element.id == id) {
        indice = index;
        tarea.value = element.nombre;
      }
    });
    alternar = false;
  });

  $(document).on("click", "#eliminar", function (e) {
    e.preventDefault();
    var elemento = $(this)[0];
    var id = $(elemento).attr("eliminar-task");

    var valores = localStorage.getItem("valores");
    var json_dato = JSON.parse(valores);

    for (let index = 0; index <= datos.length - 1; index++) {
      if (json_dato[index].id == id) {
        datos.splice(index, 1);
      }
    }

    localStorage.removeItem("valores");
    localStorage.setItem("valores", JSON.stringify(datos));
    fila.innerHTML = "";
    datos.forEach((element) => {
      fila.innerHTML += `<tr>
                                <td scope='row'>
                                    <input type='checkbox' name='' id='terminado' terminar-task='${element.id}'>
                                </td>
                                <td width='450'style="vertical-align:middle;">${element.nombre}</td>
                                <td>
                                    <button type='button' class='btn btn-primary' id='editar' editar-task='${element.id}'><i class='fas fa-edit'></i></button>
                                    <button type='button' class='btn btn-danger' id='eliminar' eliminar-task='${element.id}'><i class='fas fa-trash-alt'></i></button>
                                </td>
                            </tr>`;
    });
  });

  $(document).on("click", "#terminado", function () {
    var element = $(this)[0];
    var id = $(element).attr("terminar-task");

    datos.forEach((element, index) => {
      if (element.id == id) {
        indice = index;
        if (element.terminado === true) {
          element.terminado = false;
        } else {
          element.terminado = true;
        }
      }
    });

    localStorage.removeItem("valores");
    localStorage.setItem("valores", JSON.stringify(datos));
  });

  function shuffle(string) {
    var parts = string.split("");
    for (var i = parts.length; i > 0; ) {
      var random = parseInt(Math.random() * i);
      var temp = parts[--i];
      parts[i] = parts[random];
      parts[random] = temp;
    }
    return parts.join("");
  }
});
