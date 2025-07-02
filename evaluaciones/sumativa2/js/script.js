document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombres = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const fecha = document.getElementById("fechaNacimiento").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const taller = document.getElementById("taller").value;

  if (!nombres || !apellidos || !rut || !fecha || !correo || !taller) {alert("Todos los campos obligatorios deben estar completos.");return;}

  if (!validarRUT(rut)) {alert("El RUT ingresado no es válido.");return;}

  if (!validarFechaNacimiento(fecha)) {alert("La fecha de nacimiento no es válida o no cumple con el requisito de edad mínima (14 años).");return;}

  if (!validarCorreo(correo)) {alert("El correo electrónico ingresado no es válido.");return;}

  alert("Formulario enviado correctamente.");

});

function validarRUT(rut) {
  const regex = /^(\d{7,8})-([\dkK])$/;
  const match = rut.match(regex);
  if (!match) return false;

  const cuerpo = match[1];
  const digito = match[2].toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;}

  const dvEsperado = 11 - (suma % 11);
  let dv = "";

  if (dvEsperado === 11) dv = "0";
  else if (dvEsperado === 10) dv = "K";
  else dv = dvEsperado.toString();

  return dv === digito;
}

function validarFechaNacimiento(fecha) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = fecha.match(regex);
  if (!match) return false;

  const dia = parseInt(match[1]);
  const mes = parseInt(match[2]);
  const anio = parseInt(match[3]);

  if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 0 || anio > 9999) {return false;}

  const hoy = new Date();
  const fechaNacimiento = new Date(anio, mes - 1, dia);
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();

  const cumpleEsteAño =
    mes < mesActual || (mes === mesActual && dia <= diaActual);

  const edadFinal = cumpleEsteAño ? edad : edad - 1;

  return edadFinal >= 14;
}

function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
  if (!regex.test(correo)) return false;

  const partes = correo.split("@");
  if (partes.length !== 2) return false;

  const dominioPartes = partes[1].split(".");
  if (dominioPartes.length !== 2) return false;

  const pais = dominioPartes[1];
  return /^[a-zA-Z0-9]+$/.test(pais);
}
