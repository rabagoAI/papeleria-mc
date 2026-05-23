var SPREADSHEET_ID = "1xNMetcUGBywDCpqYPD5cXpwhEhTNYtesGLzZY96NiqY";
var EMAIL_PAPELERIA = "papeleriamc@gmail.com";

function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    if (datos.tipo === "reserva") {
      procesarReserva(datos);
    } else if (datos.tipo === "contacto") {
      procesarContacto(datos);
    }
    return respuestaOk();
  } catch (err) {
    return respuestaError(err.message);
  }
}

function doGet(e) {
  return respuestaOk();
}

function procesarReserva(datos) {
  var hoja = obtenerOCrearHoja("Reservas");
  var numReserva = generarNumeroReserva();
  var ahora = new Date();
  hoja.appendRow([
    Utilities.formatDate(ahora, "Europe/Madrid", "dd/MM/yyyy HH:mm"),
    numReserva,
    datos.nombre_alumno || "",
    datos.nombre_tutor || "",
    datos.telefono || "",
    datos.centro_educativo || "",
    datos.curso || "",
    datos.materiales || "",
    datos.fecha_recogida || "",
    datos.observaciones || "",
    "Pendiente",
    ""
  ]);
  var asunto = "Nueva reserva " + numReserva + " - " + datos.nombre_alumno;
  var cuerpo = "Nueva reserva de material escolar.\n\n"
    + "Numero: " + numReserva + "\n"
    + "Alumno: " + datos.nombre_alumno + "\n"
    + "Tutor: " + datos.nombre_tutor + "\n"
    + "Telefono: " + datos.telefono + "\n"
    + "Centro: " + datos.centro_educativo + "\n"
    + "Curso: " + datos.curso + "\n"
    + "Fecha recogida: " + datos.fecha_recogida + "\n\n"
    + "Materiales:\n" + datos.materiales + "\n\n"
    + "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID;
  MailApp.sendEmail(EMAIL_PAPELERIA, asunto, cuerpo);
}

function procesarContacto(datos) {
  var hoja = obtenerOCrearHoja("Contacto");
  var ahora = new Date();
  hoja.appendRow([
    Utilities.formatDate(ahora, "Europe/Madrid", "dd/MM/yyyy HH:mm"),
    datos.nombre || "",
    datos.telefono || "",
    datos.mensaje || "",
    "Nuevo"
  ]);
  var asunto = "Nuevo contacto - " + datos.nombre;
  var cuerpo = "Mensaje de contacto.\n\n"
    + "Nombre: " + datos.nombre + "\n"
    + "Telefono: " + datos.telefono + "\n\n"
    + "Mensaje:\n" + datos.mensaje;
  MailApp.sendEmail(EMAIL_PAPELERIA, asunto, cuerpo);
}

function obtenerOCrearHoja(nombre) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var hoja = ss.getSheetByName(nombre);
  if (hoja) return hoja;
  hoja = ss.insertSheet(nombre);
  if (nombre === "Reservas") {
    hoja.getRange(1,1,1,12).setValues([["Fecha envio","Numero reserva","Nombre alumno","Nombre tutor","Telefono","Centro educativo","Curso","Materiales","Fecha recogida","Observaciones","Estado","Notas internas"]]);
  }
  if (nombre === "Contacto") {
    hoja.getRange(1,1,1,5).setValues([["Fecha envio","Nombre","Telefono","Mensaje","Estado"]]);
  }
  var cab = hoja.getRange(1, 1, 1, hoja.getLastColumn());
  cab.setFontWeight("bold");
  cab.setBackground("#1a2744");
  cab.setFontColor("#ffffff");
  hoja.setFrozenRows(1);
  return hoja;
}

function generarNumeroReserva() {
  var num = Math.floor(1000 + Math.random() * 9000);
  return "MC-" + num;
}

function respuestaOk() {
  return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
}

function respuestaError(msg) {
  return ContentService.createTextOutput(JSON.stringify({ok: false, error: msg})).setMimeType(ContentService.MimeType.JSON);
}
