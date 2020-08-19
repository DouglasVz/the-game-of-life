let cols = 110;
let rows = 70;
let borderThick = 1;
let cellSize = 5;
let cells = new Array(rows * cols);
cells.fill(false);


let vel = 50;  //Me determina la velocidad de movimiento de las celdas.
let onOff = false; //Ésta me sirve para pausar el tablero.
let linesOn = true; //Ésta variable me sirve como Flag para desactivar o activar las cuadriculas.
let deadsCounter = 0;
let populationInit = 0; //Calcula población en los clicks que definen las formas iniciales.
let run;

//Funciones para cambiar la velocidad

function normal() {

    vel = 50;
    console.log(vel)
    document.getElementById("muyLento").innerHTML = "Muy lento"
    document.getElementById("lento").innerHTML = "Lento"
    document.getElementById("normal").innerHTML = "&#10004; Normal"
    document.getElementById("rapido").innerHTML = "Rápido"
    document.getElementById("muyRapido").innerHTML = "Muy rápido"

    document.getElementById("speedLNR").innerHTML = "Normal >"


}
function muyLento() {

    vel = 300;
    console.log(vel)
    document.getElementById("muyLento").innerHTML = "&#10004; Muy lento"
    document.getElementById("lento").innerHTML = "Lento"
    document.getElementById("normal").innerHTML = "Normal"
    document.getElementById("rapido").innerHTML = "Rápido"
    document.getElementById("muyRapido").innerHTML = "Muy rápido"

    document.getElementById("speedLNR").innerHTML = "Muy lento >"


}
function lento() {

    vel = 150;
    console.log(vel)
    document.getElementById("muyLento").innerHTML = "Muy lento"
    document.getElementById("lento").innerHTML = "&#10004; Lento"
    document.getElementById("normal").innerHTML = "Normal"
    document.getElementById("rapido").innerHTML = "Rápido"
    document.getElementById("muyRapido").innerHTML = "Muy rápido"

    document.getElementById("speedLNR").innerHTML = "Lento >"

}
function rapido() {

    vel = 30;
    console.log(vel)
    document.getElementById("muyLento").innerHTML = "Muy lento"
    document.getElementById("lento").innerHTML = "Lento"
    document.getElementById("normal").innerHTML = "Normal"
    document.getElementById("rapido").innerHTML = "&#10004; Rápido"
    document.getElementById("muyRapido").innerHTML = "Muy rápido"

    document.getElementById("speedLNR").innerHTML = "Rápido >"

}
function muyRapido() {

    vel = 10;
    console.log(vel)
    document.getElementById("muyLento").innerHTML = "Muy lento"
    document.getElementById("lento").innerHTML = "Lento"
    document.getElementById("normal").innerHTML = "Normal"
    document.getElementById("rapido").innerHTML = "Rápido"
    document.getElementById("muyRapido").innerHTML = "&#10004; Muy rápido"

    document.getElementById("speedLNR").innerHTML = "Muy rápido >"


}



//Creo canvas desde javascript. Las medidas del canvas están en función del número de columnas y celdas.
let canvas = document.createElement("canvas");
//canvas.setAttribute("width", (cols * (cellSize + borderThick) + borderThick).toString());
//canvas.setAttribute("height", (rows * (cellSize + borderThick) + borderThick).toString());
canvas.setAttribute("width", '661');
canvas.setAttribute("height", '421');

let canvasContainer = document.getElementById("canvas_container");
canvasContainer.appendChild(canvas);
canvasContainer.setAttribute("width", canvas.width.toString());
canvasContainer.setAttribute("height", canvas.height.toString());
let ctx = canvas.getContext("2d");

//Introduciendo vídeo
let whatch = document.getElementById('whatch_cont');
whatch.onclick = options;

function options() {
    let counters = document.getElementById('id_counters_container');
    counters.style.display = 'none';
    canvas.style.display = 'none';
    let body = document.getElementsByTagName('body');
    let div = document.createElement('div');
    div.setAttribute('id', 'div_video');
    body[0].appendChild(div);
    canvasContainer.parentNode.insertBefore(div, canvasContainer);
    div.innerHTML = `<iframe  width="100%" height="100%" src="https://www.youtube.com/embed/R9Plq-D1gEk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    let style = document.getElementsByTagName('style');
    style[0].innerHTML = `  
   body{
    margin: 0;
    font-family: Cambria;
 }

 .header{
    
    width: 100%;
    height: 10%;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: solid thin rgb(185, 185, 185);
    
 }
.title {
    position: relative;
    left: 8%;
    margin: 0;;
}
#whatch_cont, #play_cont {
    position: relative;
    width: 5rem;
    
    bottom: 0;
    margin: 0 10% 0 10%; 
    cursor: pointer;
}
#whatch_cont {
    left: 70%;
    right: 40%;
}

#play_cont {
    left: 80%;
    right: 30%;
}

#whatch_cont h3, #play_cont h3{
    position: absolute;
    margin: 0;
    bottom: 0;
}

.counters_container {
    display: flex;
    justify-content: flex-start;
    width: 661px;
    margin-left: 8%;
}

#counterDeads {
    margin-left: 3%;
}

#canvas_container {
    width: 661px;
    position: relative;
    left: 8%;
    right: 43%;
    margin-left: 0;
    margin-right: 0;
}

canvas {
    background-color: rgb(0, 0, 0);
    


}

#start {
    width: 5rem;
    position: absolute;
    left: 3%;
    bottom: 4%;
    background-color: rgba(161, 161, 161, 0.616);
    border: none;
    display: none;
    font-family: Cambria;
    color: rgb(240, 239, 239);
}

#grill {
    width: 5rem;
    position: absolute;
    left: 20%;
    bottom: 4%;
    background-color: rgba(161, 161, 161, 0.616);
    border: none;
    display: none;
    color: rgb(240, 239, 239);
}

#setting,
#setting_label {
    width: 5rem;
    position: absolute;
    right: 3%;
    bottom: 4%;
    background-color: rgba(161, 161, 161, 0.616);
    border: none;
    display: none;
    padding-left: 1rem;
    box-sizing: border-box;
    color: rgb(230, 230, 230);
    cursor: pointer;
}

#canvas_container:hover #start {
    display: block;
}

#canvas_container:hover #grill {
    display: block;
}

#canvas_container:hover #setting_label {
    display: block;
}

#start,
#setting,
#grill:hover {
    cursor: pointer;
}

.setting_container {
    position: absolute;
    width: 20rem;
    height: 8rem;
    background-color: rgba(161, 161, 161, 0.616);
    right: 3%;
    bottom: 10%;
    display: none;
    opacity: 1;
    transition: opacity .3s;
    
}

#div_video {
    position: relative;
    width: 50vw;
    height: 65vh;
    left: 8%;
    right: 42%;
    margin-top: 3%;

}



#mode_input {
    display: none;
}

.mode {
    display: flex;
    width: 100%;
    background-color: transparent;
    border: none;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    color: rgb(240, 239, 239);
}

.speed_a, .mode_a {
    text-decoration: none;
    color: rgb(0, 0, 0);
}

.speed {
    display: flex;
    width: 100%;
    background-color: transparent;
    border: none;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    color: rgb(240, 239, 239);
}

.speed:hover,
.mode:hover {
    background-color: rgba(70, 69, 69, 0.616);
    cursor: pointer;
}

.speed_container {
    position: absolute;
    width: 15rem;
    height: 20rem;
    background-color: rgba(161, 161, 161, 0.616);
    right: 3%;
    bottom: 10%;
    display: none;
    opacity: 1;
    transition: opacity .3s;
}

.speed_container div {
    margin-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    cursor: pointer;
    color: rgb(240, 239, 239);

}

.speed_container div:hover {
    background-color: rgba(70, 69, 69, 0.616);
}

/*Contenedor del Mode*/

.mode_container{
    width: 13rem;
    height: 8.5rem;
    position: absolute;
    background-color:rgba(161, 161, 161, 0.616);
    bottom: 10%;
    right: 3%;
    display: none;
    opacity: 1;
    transition: opacity .3s;
}
.mode_container div{
    margin-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    cursor: pointer;
    color: rgb(240, 239, 239);
}
.mode_container div:hover{
      background-color: rgba(70, 69, 69, 0.616);
}


/* Contenedor de Intrucciones*/

.concept_container {
    width: 30%;
    height: 85%;
    margin-bottom: 1rem;
    background-color: rgb(241, 241, 241);
    position: absolute;
    top: 15%;
    right: 8%;
    left: 62%;
    padding: 0 2rem;
    box-sizing: border-box;
    overflow-y: scroll;
}

@media (max-width: 1130px) {
    body {
        display: block;
    }

    .concept_container {
        position: static;
        width: 100%;
        left: 0;
        right: 0;
        background-color: white;
        overflow-y: hidden;
    }

    #div_video {
        width: 70%;
    }
    #canvas_container {
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
        

    }
    .counters_container{
        margin-left: 20%
    }
}

@media (max-width: 800px) {
    body {
        margin: 0;
    }

    canvas {
        width: 100vw;

    }

    #div_video {
        width: 100%;
        height: 65vh;
        left: 0;
        right: 0;
    }
    .title{
        font-size: 1rem;
    }
    #whatch_cont h3, #play_cont h3{
        font-size: 0.8rem;
    }
    #canvas_container {
        left: 0;
        right: 0;
        transform: translateX(0);
        

    }
}

@media (max-width: 480px) {
    #div_video {
        height: 30vh;
    }
    
    .title{
        width: 40%;
    }
    #whatch_cont{
        left:60%;
        right: 40%;
    }
   
}
    
 `
}

//Introduciendo canvas de nuevo
let play = document.getElementById('play_cont');
play.onclick = optionPlay;

function optionPlay(){
    let div = document.getElementById('div_video');
    div.remove();
    canvas.style.display = 'block';
    let counters = document.getElementById('id_counters_container');
    counters.style.display = 'flex';
}
//Evento click
canvas.addEventListener("click", event => {
    clickEvent(event);

})

function clickEvent(event) {
    //Primero encontramos las coordenadas x,y del click
    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let indice = cellIndex(x, y);
    let state = !cells[indice];


    //Agrego el contador que disminuye las vidas al inicio antes de start, en el click.
    if (state === false) {

        populationInit--

        document.getElementById("pop").innerHTML = `Population: ${populationInit}`
    } else {
        populationInit++
        document.getElementById("pop").innerHTML = `Population: ${populationInit}`
    }

    pintarCelda(indice, state);

}


//Dibujamos lineas.

function dibujarLineas() {
    ctx.lineWidth = borderThick;

    (linesOn) ? ctx.strokeStyle = "rgba(95, 95, 95, 0.575)" : ctx.strokeStyle = "rgba(0,0,0)";

    ctx.beginPath();

    console.log(canvas.width)

    //Bucle for para hacer las lineas verticales.
    for (let x = borderThick / 2; x <= canvas.width; x += cellSize + borderThick) {

        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    //Bucle for para hacer las lineas verticales.
    for (let y = borderThick / 2; y <= canvas.height; y += cellSize + borderThick) {

        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
}



//Encontramos el indice de la celda que fue clickeada.
function cellIndex(x, y) {
    let row = Math.trunc((y - borderThick) / (cellSize + borderThick));
    let col = Math.trunc((x - borderThick) / (cellSize + borderThick));

    return indice(col, row);
}


function indice(col, row) {
    return row * cols + col
}

function coords(indice) {
    let row = Math.trunc(indice / cols);
    let col = indice - row * cols;

    return [row, col];
}

//Función pintar celdas.

function pintarCelda(indice, state) {
    cells[indice] = state;

    let row = coords(indice)[0]
    let col = coords(indice)[1];
    let x0 = col * (cellSize + borderThick) + borderThick;
    let x1 = x0 + cellSize;
    let y = row * (cellSize + borderThick) + borderThick + cellSize / 2;



    ctx.lineWidth = cellSize;

    if (state) {
        ctx.strokeStyle = "white";


    } else {
        ctx.strokeStyle = "black";

    }

    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
}

dibujarLineas();




//Empezamos a programar la lógica del juego.

let nextState = function () {
    let tmpCells = new Array(rows * cols);
    tmpCells.fill(false);
    let population = 0;

    //let cells_two = tmpCells; // meto tmpCells en la variable cells porque pintarcelda tiene dentro la variable cells.

    //despues debo analizar las celdas y los estados de sus celdas vecinas segun las condiciones de vivo o muerto.
    console.log("ok")

    for (let indice = 0; indice < cells.length; indice++) {

        let trueNeighbors = neighborsState(indice);
        //let trueNeighbors = countNeighbors(indice);  //VERSIÓN PAUL

        if (trueNeighbors === 3 && cells[indice] === false) {
            tmpCells[indice] = cells[indice];
            tmpCells[indice] = !tmpCells[indice];

        }

        if ((trueNeighbors < 2 || trueNeighbors > 3) && cells[indice] === true) {
            tmpCells[indice] = false;
            deadsCounter++
            document.getElementById("counterDeads").innerHTML = `Deads: ${deadsCounter}`
            /*tmpCells[indice] = cells[indice];
            tmpCells[indice] = tmpCells[indice];*/

        } else if (cells[indice] === true) {
            tmpCells[indice] = true;
            // tmpCells[indice] = tmpCells[indice];

        }

    }

    //Contador de población
    tmpCells.forEach(x => {
        if (x === true) {
            population++;
        }
    })
    document.getElementById("pop").innerHTML = `Population: ${population}`

    cells = tmpCells;
    clearCanvas();
    dibujarLineas();


    for (let indice = 0; indice < cells.length; indice++) {
        let state = cells[indice];
        pintarCelda(indice, state);

    }
}

//función que borrara el canvas en cada intervalo de tiempo
function clearCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;

}

//Debo crear la función que analice los vecinos en el lienzo1 que son true y los guarde en trueNeighbors.


function neighborsState(indice) {

    let trueNeighbors = 0;
    let index;
    let row;
    let col;

    let rowI = Math.trunc(indice / cols);
    let colI = indice - rowI * cols;
    //debugger
    if (rowI === 0) {
        //Analizamos vecinos de encima
        //Vecino de encima - izquierda
        if (colI === 0) {
            row = rows - 1;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rows - 1;
            col = colI - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }

        }
        //Vecino de encima
        row = rows - 1;
        col = colI
        index = (row * cols) + col;
        if (cells[index]) {
            trueNeighbors = trueNeighbors + 1;
        }
        //Vecino de encima - derecha
        if (colI === (cols - 1)) {
            row = rows - 1;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rows - 1;
            col = colI + 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //Analizamos vecinos de ambos lados
        //Vecino de la izquierda
        if (colI === 0) {
            row = rowI;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            index = indice - 1;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        // Vecino de la derecha
        if (colI === (cols - 1)) {
            row = rowI;
            col = 0;
            index = 0;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            index = indice + 1;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //Analizamos vecinos de abajo
        //Vecino de abajo - izquierda
        if (colI === 0) {
            row = rowI + 1;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI + 1;
            col = colI - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        //Vecino de abajo
        row = rowI + 1;
        col = colI;
        index = (row * cols) + col;
        if (cells[index]) {
            trueNeighbors = trueNeighbors + 1;
        }
        //Vecino de abajo - derecha
        if (colI === (cols - 1)) {
            row = rowI + 1;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI + 1;
            col = colI + 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
    }

    //Analizamos las celdas que no son fila 0 ni la última fila.
    if (rowI != 0 && rowI != (rows - 1)) {
        //vecinos de la izquierda
        if (colI === 0) {
            row = rowI;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            index = indice - 1;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        //Vecinos de la derecha

        if (colI === (cols - 1)) {
            row = rowI;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            index = indice + 1;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        //Vecinos de arriba-izquierda

        if (colI === 0) {
            row = rowI - 1;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI - 1;
            col = colI - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //vecino de arriba
        row = rowI - 1;
        col = colI;
        index = (row * cols) + col;
        if (cells[index]) {
            trueNeighbors = trueNeighbors + 1;
        }

        //vecino de arriba - derecha

        if (colI === (cols - 1)) {
            row = rowI - 1;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI - 1;
            col = colI + 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //vecino de abajo - izquierda

        if (colI === 0) {
            row = rowI + 1;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI + 1;
            col = colI - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        //vecino de abajo

        row = rowI + 1;
        col = colI;
        index = (row * cols) + col;
        if (cells[index]) {
            trueNeighbors = trueNeighbors + 1;
        }

        //vecino de abajo - derecha
        if (colI === (cols - 1)) {
            row = rowI + 1;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI + 1;
            col = colI + 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
    }

    //Analizamos los vecinos cuando el indice esté en la ultima fila


    if (rowI === (rows - 1)) {
        //Analizamos vecinos de arriba
        //vecino de arriba - izquierda
        if (colI === 0) {
            row = rowI - 1;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI - 1;
            col = colI - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //vecino arriba
        row = rowI - 1;
        col = colI;
        index = (row * cols) + col;
        if (cells[index]) {
            trueNeighbors = trueNeighbors + 1;
        }

        //vecino de arriba - izquierda
        if (colI === (cols - 1)) {
            row = rowI - 1;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = rowI - 1;
            col = colI + 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //Analizamos los vecinos de los lados
        //vecino de la izquierda
        if (colI === 0) {
            row = rowI;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            /* col = colI - 1;
             row = rowI;
             index = (row * cols) + col;*/
            index = indice - 1;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }

        //vecino de la derecha
        if (colI === (cols - 1)) {
            row = rowI;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            /*col = colI + 1;
            row = rowI;
            index = (row * cols) + col;*/
            index = indice + 1;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        //Analizamos los vecinos de abajo
        //vecino abajo - izquierda
        if (colI === 0) {
            row = 0;
            col = cols - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = 0;
            col = colI - 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
        //vecino de abajo
        row = 0;
        col = colI;
        index = (row * cols) + col;
        if (cells[index]) {
            trueNeighbors = trueNeighbors + 1;
        }

        //vecino de abajo - derecha
        if (colI === (cols - 1)) {
            row = 0;
            col = 0;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        } else {
            row = 0;
            col = colI + 1;
            index = (row * cols) + col;
            if (cells[index]) {
                trueNeighbors = trueNeighbors + 1;
            }
        }
    }
    return trueNeighbors;
}


//Función para inciar y pausar el tablero

function StartPause() {

    if (!onOff) {
        onOff = true;
        run = setInterval(() => nextState(), vel);
        document.getElementById("start").innerHTML = "Pause";
    } else {
        onOff = false;
        clearInterval(run);
        document.getElementById("start").innerHTML = "Restart";
    }

}
//Evento inciar el juego presionando el boton "start"
let botonStart = document.getElementById("start");
botonStart.addEventListener("click", () => StartPause());


//Función que cambia el estado de la variable "linesOn"

function linesOnState() {

    if (linesOn) {
        linesOn = false;
    } else {
        linesOn = true;
    }
}

//Evento click para cambiar el estado de la variable "linesOn" que activa o desactiva las cuadriculas.
let botonCuadriculas = document.getElementById("grill");
botonCuadriculas.addEventListener("click", () => { linesOnState(); dibujarLineas() });


// FUNCIÓN QUE ANALIZA LOS VECINOS (VERSIÓN MEJORADA DE PAUL)
function countNeighbors(index) {
    let coordinates = coords(index);

    let sum = 0;

    // up right
    let neighborX = (coordinates[1] == cols - 1 ? 0 : coordinates[1] + 1);
    let neighborY = (coordinates[0] == 0 ? rows - 1 : coordinates[0] - 1);
    if (cells[indice(neighborX, neighborY)]) sum++;

    // up
    neighborY = (coordinates[0] == 0 ? rows - 1 : coordinates[0] - 1);
    if (cells[indice(coordinates[1], neighborY)]) sum++;

    // up left
    neighborX = (coordinates[1] == 0 ? cols - 1 : coordinates[1] - 1);
    neighborY = (coordinates[0] == 0 ? rows - 1 : coordinates[0] - 1);
    if (cells[indice(neighborX, neighborY)]) sum++;

    // left
    neighborX = (coordinates[1] == 0 ? cols - 1 : coordinates[1] - 1);
    if (cells[indice(neighborX, coordinates[0])]) sum++;

    // bottom left
    neighborX = (coordinates[1] == 0 ? cols - 1 : coordinates[1] - 1);
    neighborY = (coordinates[0] == rows - 1 ? 0 : coordinates[0] + 1);
    if (cells[indice(neighborX, neighborY)]) sum++;

    // bottom
    neighborY = (coordinates[0] == rows - 1 ? 0 : coordinates[0] + 1);
    if (cells[indice(coordinates[1], neighborY)]) sum++;

    // bottom right
    neighborX = (coordinates[1] == cols - 1 ? 0 : coordinates[1] + 1);
    neighborY = (coordinates[0] == rows - 1 ? 0 : coordinates[0] + 1);
    if (cells[indice(neighborX, neighborY)]) sum++;

    // right
    neighborX = (coordinates[1] == cols - 1 ? 0 : coordinates[1] + 1);
    if (cells[indice(neighborX, coordinates[0])]) sum++;

    return sum;
}



//FUNCIÓN QUE GENERA EL ARRAY ALEATORIO



function manual() {
    cells.fill(false);
    clearCanvas();
    dibujarLineas();
    document.getElementById("manual").innerHTML = "&#10004; Manual";
    document.getElementById("aleatorio").innerHTML = "Random";
    document.getElementById("modeMR").innerHTML = "Manual >";
}

function aleatorio() {
    let randomArray = [];
    for (let i = 0; i <= cells.length; i++) {
        let numAlea = Math.floor(Math.random() * 2);
        if (numAlea === 1) {
            randomArray.push(true);
        } else {
            randomArray.push(false);
        }

    }

    cells = randomArray;
    for (let i = 0; i <= (rows * cols); i++) {
        let state = cells[i]
        pintarCelda(i, state);

    }
    document.getElementById("aleatorio").innerHTML = "&#10004; Random";
    document.getElementById("manual").innerHTML = "Manual";
    document.getElementById("modeMR").innerHTML = "Random >";

}

