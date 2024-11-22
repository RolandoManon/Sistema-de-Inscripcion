// Obtener referencias a los elementos del formulario
const inputName = document.getElementById("name");
const inputProvincia = document.getElementById("provincia");
const inputCiudad = document.getElementById("ciudad");
const inputSector = document.getElementById("sector");
const inputCalle = document.getElementById("calle");
const selectCarreerType = document.getElementById("carrera");

// Función para validar los campos del formulario
function validate() {
    const valueName = inputName.value;
    const valueProvincia = inputProvincia.value;
    const valueCiudad = inputCiudad.value;
    const valueSector = inputSector.value;
    const valueCalle = inputCalle.value;
    const valueCarreerType = selectCarreerType.value;
    let isValid = true;

    // Validar cada campo
    isValid = inputValidator(inputName, valueName, isValid);
    isValid = inputValidator(inputProvincia, valueProvincia, isValid);
    isValid = inputValidator(inputCiudad, valueCiudad, isValid);
    isValid = inputValidator(inputSector, valueSector, isValid);
    isValid = inputValidator(inputCalle, valueCalle, isValid);
    isValid = inputValidator(selectCarreerType, valueCarreerType, isValid);

    return isValid;
}

// Función para validar un campo individual
function inputValidator(input, value, isValid) {
    if (value === "" || value == null || value == undefined) {
        input.classList.add("input-error");
        input.classList.remove("input-success");
        return false;
    } else {
        input.classList.add("input-success");
        input.classList.remove("input-error");
        return isValid;
    }
}

// Función para validar y redirigir según la carrera seleccionada
function validateAndRedirect() {
    const isValid = validate();
    if (!isValid) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    const selectedValue = selectCarreerType.value;
    if (selectedValue === "software") {
        window.location.href = "seleccion_software.html";
    } else if (selectedValue === "multimedia") {
        window.location.href = "seleccion_multimedia.html";
    } else if (selectedValue === "redes") {
        window.location.href = "seleccion_redes.html";
    } else {
        alert("Por favor, selecciona una carrera válida.");
    }
}

// Función para limpiar un campo de entrada
function inputClear(input, isFocus) {
    input.value = "";
    input.classList.remove("input-success");
    input.classList.remove("input-error");
    if (isFocus) {
        input.focus();
    }
}

// Función para limpiar todos los campos del formulario
function clearFields() {
    inputClear(inputName, false);
    inputClear(inputProvincia, false);
    inputClear(inputCiudad, false);
    inputClear(inputSector, false);
    inputClear(inputCalle, false);
    selectCarreerType.value = "";
}

// Función para guardar los datos del formulario en localStorage
function saveFormData() {
    localStorage.setItem('name', inputName.value);
    localStorage.setItem('provincia', inputProvincia.value);
    localStorage.setItem('ciudad', inputCiudad.value);
    localStorage.setItem('sector', inputSector.value);
    localStorage.setItem('calle', inputCalle.value);
    localStorage.setItem('carrera', selectCarreerType.value);
}

// Función para cargar los datos desde localStorage
function loadFormData() {
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.value = localStorage.getItem('name') || '';
    
    const provinciaInput = document.getElementById('provincia');
    if (provinciaInput) provinciaInput.value = localStorage.getItem('provincia') || '';
    
    const ciudadInput = document.getElementById('ciudad');
    if (ciudadInput) ciudadInput.value = localStorage.getItem('ciudad') || '';
    
    const sectorInput = document.getElementById('sector');
    if (sectorInput) sectorInput.value = localStorage.getItem('sector') || '';
    
    const calleInput = document.getElementById('calle');
    if (calleInput) calleInput.value = localStorage.getItem('calle') || '';
    
    const carreraInput = document.getElementById('carrera');
    if (carreraInput) carreraInput.value = localStorage.getItem('carrera') || '';
}

// Cargar los datos al cargar la página
window.onload = function() {
    loadFormData();
}

// Función para agregar un horario al localStorage
function agregarHorario() {
    const asignatura = document.getElementById("asignatura").value;
    const horario = document.getElementById("horario").value;
    const carrera = selectCarreerType.value;

    // Obtener horarios existentes y agregar el nuevo
    let horarios = JSON.parse(localStorage.getItem('horarios')) || [];
    horarios.push(`${asignatura} - ${horario} - ${carrera}`);
    localStorage.setItem('horarios', JSON.stringify(horarios));

    // Actualizar la visualización de horarios
    mostrarHorarios();
}

function cargarDatos() {
    // Obtener datos personales desde localStorage
    const nombre = localStorage.getItem('name');
    const provincia = localStorage.getItem('provincia');
    const ciudad = localStorage.getItem('ciudad');
    const sector = localStorage.getItem('sector');
    const calle = localStorage.getItem('calle');
    const carreraSeleccionada = localStorage.getItem('carrera');

    // Obtener horarios seleccionados desde sessionStorage
    const horariosSeleccionados = JSON.parse(sessionStorage.getItem('horariosSeleccionados')) || [];

    // Depuración: verifica si los datos se cargaron correctamente
    if (!nombre && !provincia && !ciudad && !sector && !calle && !carreraSeleccionada && horariosSeleccionados.length === 0) {
        console.warn("No se encontraron datos en localStorage o sessionStorage.");
        return;
    }

    // Mostrar datos personales
    const datosPersonales = document.getElementById('datos-personales');
    if (datosPersonales) {
        datosPersonales.appendChild(crearElementoLista(`Nombre: ${nombre || 'No especificado'}`));
        datosPersonales.appendChild(crearElementoLista(`Provincia: ${provincia || 'No especificado'}`));
        datosPersonales.appendChild(crearElementoLista(`Ciudad: ${ciudad || 'No especificado'}`));
        datosPersonales.appendChild(crearElementoLista(`Sector: ${sector || 'No especificado'}`));
        datosPersonales.appendChild(crearElementoLista(`Calle: ${calle || 'No especificado'}`));
        datosPersonales.appendChild(crearElementoLista(`Carrera: ${carreraSeleccionada || 'No especificado'}`));
    } else {
        console.error("El elemento 'datos-personales' no se encontró en el DOM.");
    }

    
}
