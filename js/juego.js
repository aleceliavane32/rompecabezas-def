
var Juego = {   
  cantidadDePiezasPorLado: null,
  anchoDeRompecabezas: 0,
  altoDeRompecabezas: 0,
  images: null,
  piezas: [],
  contexto: null,
  filaPosicionVacia: null,
  columnaPosicionVacia: null,
  contadorDeMovimientos: null,


  anchoPiezas:0,
  altoPiezas:0,
  grilla: [],
  movimientosTotales: null,

  crearGrilla: function() {
  for (var i = 0; i < this.cantidadDePiezasPorLado; i++) {
    var fila = []
    for (var j = 0; j < this.cantidadDePiezasPorLado; j++) {
      fila.push((i * this.cantidadDePiezasPorLado) + j);
    }
    this.grilla.push(fila);
  }
},

  chequearSiGano: function() {
  return this.grillaOrdenada();
},

  grillaOrdenada: function() {

  var contadorFila = this.grilla.length;
  var contadorColumna = this.grilla[0].length;

  var ultimoValorVisto = 0;
  var valorActual = 0;

  for(var fila=0; fila < contadorFila; fila++){
    for(var columna=0; columna < contadorColumna; columna++){
      valorActual = this.grilla[fila][columna];
      if(valorActual < ultimoValorVisto) return false;

      ultimoValorVisto = valorActual;
    }
  }

  return true;
},


  mostrarCartelGanador: function() {
  var self = this;
  $(document).ready(function() {
    swal({
        title: "¡Ganaste!",
        text: "Volver a jugar",
        type: "success"
      },

      function() {
        self.iniciar(self.movimientosTotales);
      })
  });
  var cartel=document.getElementById('mensajes-ocultos');
  cartel.style.display="block";

},


  mostrarCartelPerdedor: function() {
  var self = this;
  $(document).ready(function() {
    sweetAlert({
      title: "Perdiste :(",
      text: "Volver a intentarlo",
      type: "error"
    },

    function() {
      self.iniciar(self.movimientosTotales);
    })
  });
},

  intercambiarPosiciones: function(fila1, columna1, fila2, columna2) {

  var posicionGrilla1 = this.grilla[fila1][columna1];
  var posicionGrilla2 = this.grilla[fila2][columna2];
  this.grilla[fila1][columna1] = posicionGrilla2;
  this.grilla[fila2][columna2] = posicionGrilla1;

  var pieza1 = this.piezas[posicionGrilla1];
  var pieza2 = this.piezas[posicionGrilla2];

  var sx1 = pieza1.sx
  var sy1 = pieza1.sy
  var sx2 = pieza2.sx
  var sy2 = pieza2.sy


  pieza1.sx = sx2
  pieza1.sy = sy2

  pieza2.sx = sx1
  pieza2.sy = sy1


  this.piezas[posicionGrilla1] = pieza1;
  this.piezas[posicionGrilla2] = pieza2;
  this.contexto.drawImage(this.imagen, pieza2.x, pieza2.y, this.anchoPiezas, this.altoPiezas, pieza2.sx, pieza2.sy, this.anchoPiezas, this.altoPiezas);
  this.contexto.fillStyle = "white";
  this.contexto.fillRect(pieza1.sx, pieza1.sy, this.anchoPiezas, this.altoPiezas);
},


actualizarPosicionVacia: function(nuevaFila, nuevaColumna) {
  this.filaPosicionVacia = nuevaFila;
  this.columnaPosicionVacia = nuevaColumna;
},



  posicionValida: function(fila, columna) {
  return (fila >= 0 && fila < this.cantidadDePiezasPorLado) && (columna >= 0 && columna < this.cantidadDePiezasPorLado);
},


  moverEnDireccion: function(direccion) {

  var nuevaFilaPiezaAzul;
  var nuevaColumnaPiezaAzul;


  if(direccion == 40){
    nuevaFilaPiezaAzul = this.filaPosicionVacia -1;
    nuevaColumnaPiezaAzul = this.columnaPosicionVacia;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaAzul = this.filaPosicionVacia +1;
    nuevaColumnaPiezaAzul = this.columnaPosicionVacia;

  }
  else if (direccion == 39) {
    nuevaFilaPiezaAzul = this.filaPosicionVacia;
    nuevaColumnaPiezaAzul = this.columnaPosicionVacia -1;

  }
  else if (direccion == 37) {
    nuevaFilaPiezaAzul = this.filaPosicionVacia;
    nuevaColumnaPiezaAzul = this.columnaPosicionVacia +1;
  }

  if (this.posicionValida(nuevaFilaPiezaAzul, nuevaColumnaPiezaAzul)){
    this.intercambiarPosiciones(this.filaPosicionVacia, this.columnaPosicionVacia,
      nuevaFilaPiezaAzul, nuevaColumnaPiezaAzul);

    this.actualizarPosicionVacia(nuevaFilaPiezaAzul, nuevaColumnaPiezaAzul);
    }

  },

  mezclarPiezas: function(veces) {
    var that = this;
    if (veces <= 0){
      that.capturarTeclas();
      return;
    }
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    this.moverEnDireccion(direccion);
    setTimeout(function(){
      that.mezclarPiezas(veces-1);
    },1);
  },

  capturarTeclas: function() {
    var that = this;
    document.body.onkeydown = (function(evento) {
      if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
        that.moverEnDireccion(evento.which);
        that.restarMovimientoYverSiGano();
      }
    });
  },

  capturarMouse: function(event) {
    event = event || window.event;
      x = event.offsetX,
      y = event.offsetY;

    var nuevaFilaPiezaAzul;
    var nuevaColumnaPiezaAzul;
    var cambioAlgo = false;
    if (y > this.filaPosicionVacia * this.altoPiezas && y < (this.filaPosicionVacia * this.altoPiezas + this.altoPiezas)) {
      if (x > (this.columnaPosicionVacia * this.anchoPiezas - this.anchoPiezas) && x < this.columnaPosicionVacia * this.anchoPiezas) {
        this.moverEnDireccion(39);
        cambioAlgo = true;
      } else if (x > (this.columnaPosicionVacia * this.anchoPiezas + this.anchoPiezas) && x < (this.columnaPosicionVacia * this.anchoPiezas + 2 * this.anchoPiezas)) {
        this.moverEnDireccion(37);
        cambioAlgo = true;
      }
    }
    if (x > this.columnaPosicionVacia * this.anchoPiezas && x < (this.columnaPosicionVacia * this.anchoPiezas + this.anchoPiezas)) {
      if (y > this.filaPosicionVacia * this.anchoPiezas - this.anchoPiezas && y < this.filaPosicionVacia * this.anchoPiezas) {
        this.moverEnDireccion(40);
        cambioAlgo = true;
      } else if (y > (this.filaPosicionVacia * this.anchoPiezas + this.anchoPiezas) && y < (this.filaPosicionVacia * this.anchoPiezas + 2 * this.anchoPiezas)) {
        this.moverEnDireccion(38);
        cambioAlgo = true;
      }
    }


    if (cambioAlgo) {
      this.restarMovimientoYverSiGano();
    }
  },

  restarMovimientoYverSiGano: function() {
    this.contadorDeMovimientos--;
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    if (this.contadorDeMovimientos == 0) {
      this.mostrarCartelPerdedor();
    }
    var gano = this.chequearSiGano();
    var that = this;
    if (gano) {
      setTimeout(function() {
        that.mostrarCartelGanador();
      }, 500);
    }
  },


  crearPieza: function(xPos, yPos) {
    var pieza = {};
    pieza.x = xPos;
    pieza.y = yPos;
    pieza.sx = xPos;
    pieza.sy = yPos;
    return pieza;
  },

  construirPiezas: function() {
    var i;
    var pieza;
    var xPos = 0;
    var yPos = 0;
    for (i = 0; i < this.cantidadDePiezasPorLado * this.cantidadDePiezasPorLado; i++) {
      var pieza = this.crearPieza(xPos, yPos);
      this.piezas.push(pieza);
      xPos += this.anchoPiezas;
      if (xPos >= this.anchoDeRompecabezas) {
        xPos = 0;
        yPos += this.altoPiezas;
      }
    }
    this.contexto.fillStyle = "white";
    this.contexto.fillRect(this.piezas[this.filaPosicionVacia * this.cantidadDePiezasPorLado + this.columnaPosicionVacia].sx, this.piezas[this.filaPosicionVacia * this.cantidadDePiezasPorLado + this.columnaPosicionVacia].sy, this.anchoPiezas, this.altoPiezas)
  },

  cargarImagen: function(e) {
    this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
    this.configurarCanvas();
  },


  configurarCanvas: function() {
    var canvas = document.getElementById('canvas');
    this.contexto = canvas.getContext('2d');
    canvas.width = this.anchoDeRompecabezas;
    canvas.height = this.altoDeRompecabezas;
    this.contexto.drawImage(this.imagen, 0, 0, this.anchoDeRompecabezas, this.altoDeRompecabezas, 0, 0, this.anchoDeRompecabezas, this.altoDeRompecabezas);
  },


  iniciarImagen: function(callback) {
    this.imagen = new Image();
    var self = this;
    this.imagen.addEventListener('load', function() {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = "images/princesa.jpg";
  },


  iniciar: function(cantMovimientos) {

    this.movimientosTotales = cantMovimientos;
    this.contadorDeMovimientos = cantMovimientos;
    this.piezas = [];
    this.grilla = [];
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    this.cantidadDePiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;
    var self = this;
    this.crearGrilla();
    this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    this.iniciarImagen(function() {
      self.construirPiezas();
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
    });
  }

}
