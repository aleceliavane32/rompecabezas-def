// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  var contadorFila = grilla.length;
  var contadorColumna= grilla[0].length;

  var valorActual= 0;
  var ultiValorVisto= 0;

  for (var fila = 0; fila < contadorFila; fila++) {
    for (var columna = 0; columna < contadorColumna; columna++) {
      valorActual= grilla[fila][columna];

      if (valorActual > ultiValorVisto) {
        return false;

        ultiValorVisto = valorActual;
      }
    }
    return true;
  }
}

// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){

  if (chequearSiGano) {
    alert(mensaje-ocultos);
  }
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
var interCam1= grilla[fila1][columna1];
var interCam2= grilla[fila2][columna2];

var elementPieza1= document.gerElementByID('pieza'+pieza1);
var elementPieza2=document.gerElementByID('pieza'+pieza2);

var padre= elementPieza1.parentNode;

var clonElement1= elementPieza1.cloneNode(true);
var clonElement2= elementPieza2.cloneNode(true);

padre.replaceChild(clonElement1, elementPieza2);
padre.replaceChild(clonElement2, elementPieza1);

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
posicionValida.fila = nuevaFila;
posicionValida.columna= nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
return (fila >=0 && fila <= 2) && (columna >=0 && columna <=2);

}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFillaPieza = posicionVacia.fila;
    nuevaCollPieza = posicionVacia.columna-1;
    // Completar

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {

    nuevaFillaPieza = posicionVacia.fila;
    nuevaCollPieza = posicionVacia.columna+1;
    // Completar
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      //actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      actualizarPosicionVacia(nuevaFillaPieza, nuevaCollPieza);
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
      if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
        moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if(gano){
          setTimeout(function(){
            mostrarCartelGanador();
          },500);
        }
        evento.preventDefault();
      }
    })
  }

  function iniciar(){
    mezclarPiezas(60);
    capturarTeclas();
  }


  iniciar();
  mostrarCartelGanador();
