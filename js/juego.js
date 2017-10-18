
// representación del tablero del juego
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Para ir guardando la posición vacia del rompecabezas
var posicionVacia = {
  fila:2,
  columna:2
};

// La hacen los alumnos: Existen muchas posibilidades, la planteada es chequear el orden
function chequearSiGano(){
  return grillaOrdenada();
}

function grillaOrdenada(){
  // guardo la cantidad de filas de la grilla en una variable
  var contadorFila = grilla.length;
  var cantidadColumnas = grilla[0].length;

  // En esta variable vamos a guardar el ultimo valor visto en la grilla
  var ultimoValorVisto = 0;
  var valorActual = 0;
  // recorro cada fila columna por columna chequeando el orden de sus elementos
  for(var fila=0; fila < contadorFila; fila++){
    for(var columna=0; columna < contadorColumna; columna++){
      valorActual = grilla[fila][columna]
      // si el valorActual es menor al ultimoValorVisto entonces no est&aacute; ordenada
      if(valorActual < ultimoValorVisto) return false;

      // actualizamos el valor del ultimoValorVisto
      ultimoValorVisto = valorActual;
    }
  }
  // si llegamos hasta ac&aacute; quiere decir que est&aacute; ordenada
  return true;
}


// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("juego ganado!");
}

// Idealmente la modificación del DOM y el cambio en la Grilla estarían
// desacoplados. Por el momento no queremos generar esta complicación
// así que aprecen juntos
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById('cull'+pieza1);
  var elementoPieza2 = document.getElementById('cull'+pieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}



function actualizarposicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Esta buena para entender como funcionan los booleanos.
function posicionValida(fila, columna){
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);

}

// Movimiento de fichas, en este caso la que se mueve es
// la vacia intercambiando su posición con otro elem
// Podría ser diferente el movimiento y seguir siendo correcto.
function moverEnDireccion(direccion){

  var nuevaFilaPiezaAzul;
  var nuevaColumnaPiezaAzul;


  // Intercambia pieza vacía con la pieza que está arriba
  if(direccion == 40){
    nuevaFilaPiezaAzul = posicionVacia.fila-1;
    nuevaColumnaPiezaAzul = posicionVacia.columna;
  }
  // Intercambia pieza vacía con la pieza que está abajo
  else if (direccion == 38) {
    nuevaFilaPiezaAzul = posicionVacia.fila+1;
    nuevaColumnaPiezaAzul = posicionVacia.columna;

  }
  // Intercambia pieza vacía con la pieza que está a su izquierda
  else if (direccion == 39) {
    nuevaFilaPiezaAzul = posicionVacia.fila;
    nuevaColumnaPiezaAzul = posicionVacia.columna-1;

  }
  // Intercambia pieza vacía con la pieza que está a su derecha
  else if (direccion == 37) {
    nuevaFilaPiezaAzul = posicionVacia.fila;
    nuevaColumnaPiezaAzul = posicionVacia.columna+1;
  }

  // Hay que chequear los limites, si no se puede mover, no se mueve.
  if (posicionValida(nuevaFilaPiezaAzul, nuevaColumnaPiezaAzul)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaAzul, nuevaColumnaPiezaAzul);
    actualizarposicionVacia(nuevaFilaPiezaAzul, nuevaColumnaPiezaAzul);
  }

}


// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
