const canvas = document.querySelector(".drawing-board canvas"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtn = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
tools = document.querySelectorAll(".tool");
ctx = canvas.getContext("2d");

let isDrawing = false,
prevMouseX, prevMouseY,snapshot
selectedTool = "brush", 
brushWidth = 5,
selectedColor = "black";

window.addEventListener("load", function(){
    //cài đặt cấu hình của canvas sao cho trả về đúng tầm hình của một element
    canvas.width= canvas.offsetWidth;
    canvas.height= canvas.offsetHeight;
    setCanvasBackground();
})

function drawRect(e){
    //stroleRect(x,y,width, height)
    if (!fillColor.checked){
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

function drawCircle (e){
    ctx.beginPath();//tạo đường mới để vẽ hình tròn
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2) + Math.pow((prevMouseY - e.offsetY),2));
    //lấy được radius để vẽ
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    // ctx.stroke();
    if (!fillColor.checked){
        ctx.stroke();
    }
    else {
        ctx.fill();
    }
}

function drawTriangle(e){
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);//di chuyển hình theo hướng dy chuyển của chuột
    ctx.lineTo(e.offsetX, e.offsetY);//tạo đường đầu tiên
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();//đóng đường vẽ lại, đường thứ 3 của tam giác sẽ được tự động vẽ
    !fillColor.checked ? ctx.stroke() : ctx.fill();
}

function setCanvasBackground(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}
function startDraw(e){
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();//tạo đường mới để vẽ
    ctx.lineWidth=brushWidth;//độ dày của nét vẽ
    ctx.strokeStyle = selectedColor;
    //sao chép dữ liệu của canvas là gán cho snapshot
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawing(e){
    if (!isDrawing) return;//nếu biến isDrawing là false thì dừng chương trình
    ctx.putImageData(snapshot, 0 , 0);//thêm dữ liệu canvas đã copy vào canvas
    if (selectedTool==="brush" || selectedTool==="eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "white" : selectedColor   ;
        ctx.lineTo(e.offsetX, e.offsetY);// tạo đường theo hướng chuột dy chuyển
        ctx.stroke();//tô màu cho đường đó
    }
    else if (selectedTool==="rectangle"){
        drawRect(e);
    }
    else if (selectedTool==="circle"){
        drawCircle(e);
    }
    else{
        drawTriangle(e);
    }
}

tools.forEach(item => item.addEventListener("click", function (){
    //xóa lớp active nếu đã tồn tại ở một element nào đó trong mảng tools
    document.querySelector(".options .active").classList.remove("active");
    selectedTool = item.id;
    item.classList.add("active");
}));

sizeSlider.addEventListener("change", function (){
    brushWidth=sizeSlider.value;
});
colorBtn.forEach(item => item.addEventListener("click", function(){
    document.querySelector(".options .selected").classList.remove("selected");
    item.classList.add("selected");
    selectedColor = window.getComputedStyle(item).getPropertyValue("background-color");
    console.log(selectedColor);
    // console.log("ok")

}));

colorPicker.addEventListener("change", function(){
    colorPicker.parentElement.style.background= colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});
saveImg.addEventListener("click", function(){
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href= canvas.toDataURL();
    link.click();
});
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing=false)