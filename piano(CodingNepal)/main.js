const pianoKeys = document.querySelectorAll(".key");
let audio = new Audio("tunes/a.wav");// 
pianoKeys.forEach(item => item.addEventListener("click", function(){
    playTune(item.dataset.key); //gọi hàm playTune với đối số được truyền vào là giá trị dataset của từng key
}))
document.addEventListener("keydown", function(e){
    playTune(e.key);
});
function playTune(key){
    audio.src=`tunes/${key}.wav`;
    audio.play();
    //thêm hiệu ứng cho mỗi khi nhấn hoặc nhập các chữ cái bằng giá trị data-key
    const keyClicked = document.querySelector(`[data-key="${key}"]`);
    keyClicked.classList.add("active");
    setTimeout(() => {
        keyClicked.classList.remove("active");
    }, 100);
}
//ẩn hiện cái chữ trên phím
const inputCheckbox = document.querySelector(".key-checkbox input");
const spanPianoKey = document.querySelectorAll(".key span");
console.log(spanPianoKey);
inputCheckbox.addEventListener("click", function(){
    if (inputCheckbox.checked){
        spanPianoKey.forEach(item => item.style="display: block");
    }
    else{
        spanPianoKey.forEach(item => item.style="display: none");
    }
});
//âm lượng 
const inputVolume = document.querySelector(".volume-slider input");
inputVolume.addEventListener("change", function(){
    audio.volume= this.value;
})