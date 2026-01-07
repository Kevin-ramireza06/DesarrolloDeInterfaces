//Captura de Elementos del DOM
var campoNombre = document.getElementById("nombre");
var campoEdad = document.getElementById("edad");
var campoEmail = document.getElementById("email");
var campoCiclo = document.getElementById("ciclo");
var campoCheckBox = document.querySelectorAll("#mods input[type='checkbox']");
var campoTyC = document.getElementById("acepto");
var botonEnviar = document.getElementById("btnEnviar");
var botonLimpiar = document.getElementById("btnReset");
var botonRecargar = document.getElementById("btnReload");

//Campos Para los Mensajes de Error
var campoMensajeNombre = document.getElementById("msgNombre");
var campoMensajeEdad = document.getElementById("msgEdad");
var campoMensajeEmail = document.getElementById("msgEmail");
var campoMensajeCiclo = document.getElementById("msgCiclo");
var campoMensajeCheckBox = document.getElementById("msgMods");
var campoMensajeTyC = document.getElementById("msgAcepto");

//Asignacion de Onclick a los botones
campoNombre.addEventListener("change", function () {
  validarNombre(campoNombre.value);
  //EL value se utiliza para capturar el valor que esta puesto en los inputs
});

campoEdad.addEventListener("change", function () {
  validarEdad(campoEdad.value);
});

campoEmail.addEventListener("change", function () {
  validarEmail(campoEmail.value);
});

campoCiclo.addEventListener("change", function () {
  validarCiclo(campoCiclo);
});

for (let i = 0; i < campoCheckBox.length; i++) {
    campoCheckBox[i].addEventListener("change", function () {
        validarCheckBox(campoCheckBox);
    });
}

campoTyC.addEventListener("change", function () {
  validarTyC(campoTyC);
});

//Botones
botonEnviar.addEventListener("click", function (event) {
  event.preventDefault();

  let errores = [];

  if (!validarNombre(campoNombre.value)) errores.push("Nombre");
  if (!validarEdad(campoEdad.value)) errores.push("Edad");
  if (!validarEmail(campoEmail.value)) errores.push("Email");
  if (!validarCiclo(campoCiclo)) errores.push("Ciclo");
  if (!validarCheckBox(campoCheckBox)) errores.push("Módulos");
  if (!validarTyC(campoTyC)) errores.push("Aceptar condiciones");

  if (errores.length > 0) {
    alert("Campos no válidos:\n- " + errores.join("\n- "));
  } else {
    mostrarResumen();
  }
});

botonLimpiar.addEventListener("click", function () {

    document.getElementById("formMatricula").reset();

    campoMensajeNombre.textContent = "";
    campoMensajeEdad.textContent = "";
    campoMensajeEmail.textContent = "";
    campoMensajeCiclo.textContent = "";
    campoMensajeCheckBox.textContent = "";
    campoMensajeTyC.textContent = "";

});

botonRecargar.addEventListener("click", function () {
    location.reload();
});

//Validaciones
function validarNombre(nombre) {
    campoMensajeNombre.style.color = "red";
  if (nombre.length < 3) {
    console.log("nombre inválido, inserte al menos tres caracteres");
    campoMensajeNombre.textContent = "nombre inválido, inserte al menos tres caracteres";
    return false;
  } else {
    campoMensajeNombre.style.color = "green";
    campoMensajeNombre.textContent = "Nombre válido";
    return true;
  }
}

function validarEdad(edad) {
    campoMensajeEdad.style.color = "red";
  if (edad === "" || isNaN(edad)) {
    console.log("edad inválida, inserte un número");
    campoMensajeEdad.textContent = "edad inválida, inserte un número";
    return false;
  } else if(edad < 16 || edad > 60){
    console.log("edad inválida, debe estar entre 16 y 60 años");
    campoMensajeEdad.textContent = "edad inválida, debe estar entre 16 y 60 años";
    return false;
  }else {
    campoMensajeEdad.style.color = "green";
    campoMensajeEdad.textContent = "Edad Valida";
    return true;
  }
}

function validarEmail(email) {
    campoMensajeEmail.style.color = "red";
    if (!(email.includes("@") && email.includes(".") && email.length >= 6)) {
        console.log("Email inválido, debe contener '@' y '.'");
        campoMensajeEmail.textContent = "Email inválido, debe contener '@' y '.'";   
        return false;   
    } else if (email.split("@").pop().startsWith("yahoo")) {
        console.log("Email inválido, yahoo no está permitido");
        campoMensajeEmail.textContent = "Email inválido, yahoo no está permitido";
        return false;
    } else {
        campoMensajeEmail.style.color = "green";
        campoMensajeEmail.textContent = "Email Válido";
        return true;
    }
}

function validarCiclo(ciclo) {
    campoMensajeCiclo.style.color = "red";
    if (ciclo.value == "") {
        console.log("Debe seleccionar un ciclo");
        campoMensajeCiclo.textContent = "Debe seleccionar un ciclo";
        return false;
    } else {
        campoMensajeCiclo.style.color = "green";
        campoMensajeCiclo.textContent = "Ciclo Válido";
        return true;
    }
}

function validarCheckBox(modulos) {
    campoMensajeCheckBox.style.color = "red";
    var valido = true;
 
    for (var i = 0; i < modulos.length; i++) {
        if (!modulos[i].checked) {
            valido = false;
        }
    }

    if (!valido) {
        console.log("Debe seleccionar todos los módulos");
        campoMensajeCheckBox.textContent = "Debe seleccionar todos los módulos";
        return false;
    } else {
        campoMensajeCheckBox.style.color = "green";
        campoMensajeCheckBox.textContent = "Módulos Válidos";
        return true;
    }
}

function validarTyC(tyc) {
    campoMensajeTyC.style.color = "red";
    if (!tyc.checked) {
        console.log("Debe aceptar los términos y condiciones");
        campoMensajeTyC.textContent = "Debe aceptar los términos y condiciones";
        return false;
    } else {
        campoMensajeTyC.style.color = "green";
        campoMensajeTyC.textContent = "Términos y condiciones aceptados";
        return true;
    }
}

function mostrarResumen() {
  let modulosSeleccionados = [];

  for (let i = 0; i < campoCheckBox.length; i++) {
    if (campoCheckBox[i].checked) {
      modulosSeleccionados.push(campoCheckBox[i].value);
    }
  }

  let resumen = `
  MATRÍCULA REALIZADA

  Nombre: ${campoNombre.value}
  Edad: ${campoEdad.value}
  Email: ${campoEmail.value}
  Ciclo: ${campoCiclo.value}
  Módulos: ${modulosSeleccionados.join(", ")}
  Observaciones: ${document.getElementById("obs").value}
  `; /*Aqui usamos las comillas `` para hacer un string multilinea, como especie de una plantilla
  En la cual agregamos los campos del formulario siempre y cuando ya esten validados*/

  let nuevaVentana = window.open("", "_blank"); //Con esta linea abrimos una ventana en Blanco
  nuevaVentana.document.write("<pre>" + resumen + "</pre>"); //Al usar document write escribimos en la nueva ventana el resumen
  //Usamos la etiqueta <pre> para que respete los saltos de linea y espacios del string resumen
}
