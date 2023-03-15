let btn = document.getElementById("btn-search");
const palabras = ["juego", "leon", "entrenar", "ahorcado", "perro", "negro"];
let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
let guiones = palabraRandom.replace(/./g, "_ ");
const letra = document.getElementById("search");
let respuesta = document.getElementById("output");
let contFallos = 0;
let resultado = document.getElementById("resultado");
let next = document.getElementById("next");
let clear = document.getElementById("clear");
let fallo = true;
respuesta.innerHTML = guiones;
let guionesUpdated = [];
let palabraCompleta = document.getElementById("palabraCompleta");
let inputWord = document.getElementById("wordfull");
let historial = document.getElementById("historial");
let modoLetra = document.getElementById("letra");
let posicion;
let letrasFallidas = [];
let contLetrasFallidas = 0;
let repLetter = false;

// Funciones

const valFallos = (fallo) => {
  if (fallo) {
    contFallos++;
    document.getElementById("ahorcado").style.backgroundPosition =
      -(200 * contFallos) + "px 0";

    if (contFallos == 4) {
      resultado.style.color = "#FF00FF";
      resultado.innerHTML = "Perdiste";
      inputWord.disabled = true
      letra.disabled = true
    }
  } else {
    if (guiones.indexOf("_") < 0) {
      resultado.style.color = "#FFFF00";
      resultado.innerHTML = "Ganaste";
      inputWord.disabled = true
      letra.disabled = true
    }
  }
};

const fallos = (fallo, letra) => {
  if (fallo) {
    for (let i in palabraRandom) {
      if (letra == palabraRandom[i]) {
        guiones =
          guiones.substring(0, i * 2) + letra + guiones.substring(i * 2 + 1);
        fallo = false;
      }
    }
  
    valFallos(fallo)
  }else{
    for (let i in palabraRandom) {
      if (letra == palabraRandom[i]) {
        guiones =
          guiones.substring(0, i * 2) + letra + guiones.substring(i * 2 + 1);
        fallo = false;
      }
    }
    valFallos(fallo)
  }
  
};

const validarLetrasEscritas = (letra) => {
  let letraRepetida = false;
  letrasFallidas.push(letra);

  for (let i = 0; i < letrasFallidas.length; i++) {
    if (letrasFallidas[i] == letra) {
      contLetrasFallidas++
    }  
  }
 
  console.log(letrasFallidas);
  console.log(contLetrasFallidas);

  if (contLetrasFallidas > 2) {
    letraRepetida = true;
    contLetrasFallidas = 1
  } else {
    letraRepetida = false;
    contLetrasFallidas = 1
  }
  return letraRepetida;
};



//Metodos

palabraCompleta.addEventListener("click", () => {
  inputWord.hidden = false;
  letra.hidden = true;
  inputWord.value = "";
  inputWord.focus();
  palabraCompleta.hidden = true;
  modoLetra.hidden = false;
});

modoLetra.addEventListener("click", () => {
  inputWord.hidden = true;
  letra.hidden = false;
  letra.value = "";
  letra.focus();
  palabraCompleta.hidden = false;
  modoLetra.hidden = true;
});

inputWord.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    if (inputWord.value.length > 1) {
      if (inputWord.value == palabraRandom) {
        guiones = inputWord.value;
        fallo = false;
      } else {
        fallo = true;
      }
    } else {
      if (palabraRandom.includes(inputWord.value)) {
        fallo = false;
        fallos(fallo, inputWord.value);
      } else {
        fallo = true;
        fallos(fallo, inputWord.value);
      }
    }

    repLetter = validarLetrasEscritas(inputWord.value);
    if (repLetter) {
      alert(`La letra ${inputWord.value} ya fue utilizada,  Ingrese otra`);
      fallos(false, inputWord.value);
    } else {
      historial.innerHTML += inputWord.value + ", ";
      fallos(fallo, inputWord.value);
    }
    respuesta.innerHTML = guiones;
    inputWord.value = "";
    inputWord.focus();
  }
});

letra.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    guionesUpdated.push(guiones);
    repLetter = validarLetrasEscritas(letra.value);
    if (repLetter) {
      alert(`La letra ${letra.value} ya fue utilizada,  Ingrese otra`);
      fallos(false, letra.value);
    } else {
      historial.innerHTML += letra.value + ", ";
      fallos(fallo, letra.value);
    }
    respuesta.innerHTML = guiones;
    letra.value = "";
    letra.focus();
  }
});

next.addEventListener("click", () => {
  historial.innerHTML = "";
  contFallos = 0;
  fallo = true;
  for (let i = 0; i < palabras.length; i++) {
    if (palabraRandom == palabras[i]) {
      palabras.splice(i, 1);
    }
  }
  if (palabras.length > 0) {
    palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
    guiones = palabraRandom.replace(/./g, "_ ");
    respuesta.innerHTML = guiones;
    document.getElementById("ahorcado").style.backgroundPosition = 0 + "px 0";
    letra.value = "";
    letra.focus();
    resultado.innerHTML = "";
  } else {
    resultado.style.color = "#FFFF00";
    resultado.innerHTML = "Game Over";
  }
});

clear.addEventListener("click", () => {
  window.location.reload();
});
