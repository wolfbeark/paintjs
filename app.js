
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;
let isMoblie = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function isMobile(){

    isMobile = /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
    console.log(isMobile);
    };
    if (isMobile()) alert('mobile');
    

function stopPainting(event)
{
    painting = false;
}
function startPainting(event)
{
    painting = true;
}
function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting)
    {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else
    {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function changeColor(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function rangeChange(event)
{
    const size = event.target.value;
    ctx.lineWidth = size;
}
function modeClick()
{
    if(filling === true)
    {
        mode.innerText = "Brush";
        filling = false;
    }
    else if(filling === false)
    {
        mode.innerText = "Paint";
        
        filling = true;
    }
}
function canvasClick()
{
    if(filling)
    {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleCM(event)
{
    event.preventDefault();
}
function saveClick()
{
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJSTest";
    link.click();
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
if(colors)
{
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if(range)
{
    range.addEventListener("input", rangeChange);
}
if(mode)
{
    mode.addEventListener("click", modeClick);
}
if(save)
{
    save.addEventListener("click", saveClick);
}