const spanColor = document.querySelectorAll("span.color");
const btnChangeColor = document.querySelector(".login-input--submit");
const borderChangeColor = document.querySelector(".login-title");
const body = document.querySelector("body");
spanColor.forEach(item => item.addEventListener("click", function(e){
    let color = e.target.getAttribute("aria-valuetext");
    handleChangeColorActive(e);
    handleChangeBackgroundColor(body, color);
    handleChangeBackgroundColor(btnChangeColor, color);
    hanndleChangeBorderColor(borderChangeColor, color);
    e.target.classList.add("active");
}));
function handleChangeBackgroundColor(object, color){
    object.style.backgroundColor=color;
    object.style.transition="background .5s linear";
}
function hanndleChangeBorderColor(object, color){
    object.style.borderColor=color;
    object.style.transition="background .5s linear";
}
function handleChangeColorActive(e){
    spanColor.forEach(item => item.classList.remove("active"));
    e.target.classList.add("active");
}