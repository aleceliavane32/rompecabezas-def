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
  alert(Ganaste);
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
var pieza1 = grilla[fila1][columna1];
var pieza2 = grilla[fila2][columna2];

grilla[fila1][columna1] = pieza2;
grilla[fila2][columna2] = pieza1;

var elementoPieza1 = document.getElementById('cull'+pieza1);
var elementoPieza2 = document.getElementById('cull'+pieza2);

var padre =elementoPieza1.parentNode;

var clonElemento1 = elementoPieza1.clonNode(true);
var clonElemento2 = elementoPieza2.clonNode(true);

padre.replaceChild(clonElemento1, clonElemento2);

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
posicionValida.fila = nuevaFila;
posicionValida.columna= nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
return(fila >=0 && fila <=2) && (columna >=0 && columna <=2);
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVaciaBlanca;
  var nuevaColumnaPiezaVaciaBlanca;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVaciaBlanca = posicionVacia.fila-1;
    nuevaColumnaPiezaVaciaBlanca = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVaciaBlanca = posicionVacia.fila+1;
    nuevaColumnaPiezaVaciaBlanca = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
  nuevaFilaPiezaVaciaBlanca = posicionVacia.fila;
  nuevaColumnaPiezaVaciaBlanca = posicionVacia.columna-1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVaciaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaVaciaBlanca = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
      nuevaFilaPiezaVaciaBlanca, nuevaColumnaPiezaVaciaBlanca);
      actualizarPosicionVacia(nuevaFilaPiezaVaciaBlanca, nuevaColumnaPiezaVaciaBlanca);
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
