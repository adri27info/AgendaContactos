const nombreContacto = document.getElementById("nombreContacto");
const numeroContacto = document.getElementById("numeroContacto");
const fechaContacto = document.getElementById("fechaContacto");
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const listadoContactos = document.getElementById("listadoContactos");
const db = window.localStorage;

btnAgregarContacto.addEventListener("click", agregarContacto);

function agregarContacto() {
  if (
    nombreContacto.value === "" ||
    numeroContacto.value === "" ||
    fechaContacto.value === ""
  ) {
    alert("Para introducir un contacto debes rellenar todos los campos");
  } else {
    guardarContacto(
      db,
      nombreContacto.value,
      numeroContacto.value,
      fechaContacto.value
    );
  }
}

function guardarContacto(db, nombre, numeroContacto, fecha) {
  let objetoContacto = {
    id: Math.random(0 * 100),
    nombre: nombre,
    numero: numeroContacto,
    fecha: fecha,
  };
  db.setItem(objetoContacto.id, JSON.stringify(objetoContacto));
  window.location.reload();
}

function cargarContactos() {
  limpiarValoresCampos();
  let keysLocalStorage = Object.keys(db);
  if (keysLocalStorage.length !== 0) {
    let longitudStorage = db.length;
    for (let index = 0; index < longitudStorage; index++) {
      const obj = JSON.parse(db.getItem(keysLocalStorage[index]));
      crearContacto(obj);
    }
  }
}

function crearContacto(obj) {
  const divContacto = document.createElement("div");
  divContacto.classList.add("contacto");
  divContacto.id = "contacto";
  const parrafoNombre = document.createElement("p");
  parrafoNombre.textContent = obj.nombre;
  const parrafoNumero = document.createElement("p");
  parrafoNumero.textContent = obj.numero;
  const parrafoFecha = document.createElement("p");
  parrafoFecha.textContent = obj.fecha;
  const spanDelete = document.createElement("span");
  spanDelete.textContent = "delete";
  spanDelete.classList.add("material-symbols-outlined");
  spanDelete.addEventListener("click", () => {
    db.removeItem(obj.id);
    window.location.reload();
  });
  divContacto.appendChild(parrafoNombre);
  divContacto.appendChild(parrafoNumero);
  divContacto.appendChild(parrafoFecha);
  divContacto.appendChild(spanDelete);
  listadoContactos.appendChild(divContacto);
}

function limpiarValoresCampos() {
  nombreContacto.value = "";
  numeroContacto.value = "";
  fechaContacto.value = "";
}

cargarContactos();
