const uploadBox = document.querySelector(".upload-box"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratio = document.querySelector("#ratio"),
quality = document.querySelector("#quality"),
downloadBtn = document.querySelector(".download-btn");
const imgFile = uploadBox.querySelector("#img");
let ogImgRatio;

fileInput.addEventListener("change", function (){
    imgFile.src=window.URL.createObjectURL(fileInput.files[0]);
    console.log(fileInput.value);
    imgFile.style=`object-fit: cover;
                    width: 100%;
                    height: 100%;`;
    const uploadBoxText = uploadBox.querySelector("p");
    uploadBoxText.style.display="none";
    
    imgFile.addEventListener("load", function () {
        widthInput.value = imgFile.naturalWidth;
        heightInput.value = imgFile.naturalHeight;
        ogImgRatio = imgFile.naturalWidth / imgFile.naturalHeight;
    })
})

widthInput.addEventListener("keyup", function(){
    heightInput.value = Math.floor(ratio.checked ? widthInput.value / ogImgRatio : heightInput.value);
});

heightInput.addEventListener("keyup", function(){
    widthInput.value = Math.floor(ratio.checked ? heightInput.value / ogImgRatio : widthInput.value);
})
downloadBtn.addEventListener("click", function(){
    //tạo 1 element canvas để chứa ảnh đã được resize
    const canvas = document.createElement("canvas");
    //thẻ a để tải ảnh về
    const a = document.createElement("a");
    const cxt = canvas.getContext("2d");
    canvas.width= widthInput.value;
    canvas.height = heightInput.value;
    //drawImage(): hiển thị ảnh/ video trong canvas
    //Vị trí của ảnh trên canvas và chỉ định chiều rộng và chiều cao của ảnh (ảnh cần cắt, x, y, chiều rộng, chiều cao)
    cxt.drawImage(imgFile, 0,0 , canvas.width, canvas.height);
    //tạo đường dẫn từ canvas để tải ảnh, set chất lượng ảnh là 0.7 và 1.0
    a.href = canvas.toDataURL("image/jpeg", quality.checked ? 0.7 : 1.0);
    a.download = new Date().getTime() + "-" + fileInput.value.slice(12);
    a.click();
})
//mỗi lần click vào thực hiện sự kiện click của input 
uploadBox.addEventListener("click", function (){
    fileInput.click();
})