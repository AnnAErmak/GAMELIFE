const canvas = document.getElementById("board");
const container = document.querySelector('.container')
const ctx = canvas.getContext("2d");
const colors = ['#d95f00','#c033e8','#45cca0','#ba5d60','#9b7d4b','#6d3530','#88abc2','#3e1c00',]
let arr = []
let interval
let numberVertical = 500
let numberHorizontal = 500
canvas.addEventListener('click', addLive)

function addLive(e){
    let x = e.offsetX
    let y = e.offsetY
    x = Math.floor(x/10)
    y = Math.floor(y/10)
    arr[y][x] = 1
    drawField()
}

function goLife(){
    const v = numberVertical/10, h = numberHorizontal/10
    for (let i = 0; i < h; i++){
        arr[i] = []
        for (let j = 0; j < v; j++){
            arr[i][j] = 0
        }
    }
}
goLife()

function drawField(){
    const h = numberHorizontal/10
    const v = numberVertical/10
    ctx.clearRect(0, 0, numberVertical, numberHorizontal)
    for (let i = 0; i < v; i++){
        for(let j = 0; j < h; j++){
            if (arr[i][j] === 1){
                ctx.fillRect(j*10, i*10, 10, 10)
                ctx.fillStyle = getRandomColor()
            }
        }
    }
}
function getRandomColor(){
    const index =  Math.floor(Math.random()*colors.length)
    return colors[index]
}

function startLife() {
    let arr2 = []
    for (let i = 0; i < numberHorizontal/10; i++){
        arr2[i] = []
        for(let j = 0; j < numberVertical/10; j++){
            let neighbors = 0
            if (arr[fpv(i) - 1][j] === 1) neighbors++ //up
            if (arr[i][fph(j) + 1] === 1) neighbors++ //right
            if (arr[fph(i) +1][j] === 1) neighbors++ //bottom
            if (arr[i][fpv(j) - 1] === 1) neighbors++ //left
            if (arr[fpv(i) - 1][fph(j) + 1] === 1) neighbors++
            if (arr[fph(i) + 1][fph(j) + 1] === 1) neighbors++
            if (arr[fph(i) + 1][fpv(j) -1] === 1) neighbors++
            if (arr[fpv(i) - 1][fpv(j) -1] === 1) neighbors++
            arr2[i][j] = arr[i][j]
            if (neighbors === 3) {
                arr2[i][j] = 1
            }else if (neighbors > 3){
                arr2[i][j] = 0
            }else if(neighbors < 2){
                arr2[i][j] = 0
            }
        }

    }
    arr = arr2
    drawField()
    interval = setTimeout(startLife, 500)
}

function fpv(i){
    if(i === 0) return numberVertical/10
    else return i
}
function fph(i){
    if(i === (numberVertical/10) - 1) return -1
    else return i
}

document.getElementById('start').onclick = () =>{
    startLife()
}

document.getElementById('stop').onclick = () => {
    clearTimeout(interval)
}
document.getElementById('clear').onclick = () => {
    clearTimeout(interval)
    goLife()
    drawField()
}

document.getElementById('btnSquare').addEventListener('click', getSquare)

function getSquare(){
    const inputSquare = document.querySelector('#inputSquare')
    if (inputSquare.value){
        const prov = inputSquare.value/10
        if(!Number.isInteger(prov)){
            alert('Указанное число не является кратным 10')
        }else{
            console.log(inputSquare.value)
            canvas.width = inputSquare.value
            canvas.height = inputSquare.value
            container.style.width = inputSquare.value+ 'px'
            container.style.height = inputSquare.value+ 'px'
            numberVertical= Number(inputSquare.value)
            numberHorizontal = Number(inputSquare.value)
            goLife()
            drawField()
        }
    }
}