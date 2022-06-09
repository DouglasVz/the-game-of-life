let cols = 110;
let rows = 70;
let borderThick = 1;
let cellSize = 8;
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
canvas.setAttribute("width", (cols * (cellSize + borderThick) + borderThick).toString());
canvas.setAttribute("height", (rows * (cellSize + borderThick) + borderThick).toString());
//canvas.setAttribute("width", '661');
//canvas.setAttribute("height", '421');

let canvasContainer = document.getElementById("canvas_container");
canvasContainer.appendChild(canvas);

let ctx = canvas.getContext("2d");

//Media query
let media = window.matchMedia("(max-width: 1000px)");
function checkViewport(media) {
    if (media.matches) {
        aleatorio();
    }else {
        aleatorio();
    }
}
media.addEventListener("change", checkViewport);
checkViewport(media);

//Introduciendo vídeo
let whatch = document.getElementById('watch_cont');
whatch.onclick = options;

function options() {
    let counters = document.getElementById('id_counters_container');
    let canvasButtons = document.getElementById('canvas-buttons');
    counters.style.display = 'none';
    canvas.style.display = 'none';
    canvasButtons.style.display = "none";
    let body = document.getElementsByTagName('body');
    let div = document.createElement('div');
    div.setAttribute('id', 'div_video');
    body[0].appendChild(div);
    canvasContainer.parentNode.insertBefore(div, canvasContainer);
    div.innerHTML = `<iframe  width="100%" height="100%" src="https://www.youtube.com/embed/R9Plq-D1gEk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
}

//Introduciendo canvas de nuevo
let play = document.getElementById('play_cont');
play.onclick = optionPlay;

function optionPlay(){
    let div = document.getElementById('div_video');
    let counters = document.getElementById('id_counters_container');
    let canvasButtons = document.getElementById('canvas-buttons');
    div.remove(); 
    counters.style.display = 'flex';
    canvas.style.display = 'block';
    canvasButtons.style.display = "flex";
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
    console.log(rect)
    console.log(event.clientX)
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

        // let trueNeighbors = neighborsState(indice);
        let trueNeighbors = countNeighbors(indice);  //VERSIÓN PAUL

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
botonCuadriculas.click();


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
