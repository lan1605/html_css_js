const links = document.querySelectorAll("li");
const circle = document.querySelector(".circle");
links.forEach((item, index) => item.addEventListener("click", function(e){
    circle.style.left= 80*index  + "px";
    circle.style.transition="all .25s linear";
    handleChangeClass(e);
    const circleItem = document.querySelectorAll(".circle i");
    circleItem.forEach(item => item.remove());
    if (e.target.matches(".active")){
        const i = e.target.querySelector("i").className;
        insertClass(i);
    }
}))

function insertClass(className){
    const template = `<i class="${className}"></i>`;
   circle.insertAdjacentHTML("beforeend", template);
}
function handleChangeClass(e){
    links.forEach(item => item.classList.remove("active"));
    e.target.classList.add("active");
}