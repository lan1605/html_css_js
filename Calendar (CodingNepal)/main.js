const currentDate = document.querySelector(".current-date"),
days = document.querySelector(".days"),
iconBtn = document.querySelectorAll(".icons span");
let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();
//phần tử trong mảng month chạy từ 0-11
const months =["January", "Febbruary", "March", "April", "May", "June","July", "August", "September","October","November","December"];

function renderCalendar(){
    //lấy ra ngày cuối cùng trong tháng
    let lastDateOfMonth = new Date(currentYear, currentMonth+1,0).getDate();
    //lấy ra ngày đầu trong tháng
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    //lấy ngày cuối cùng của tháng 12
    let lastDateOfLastMonth = new Date(currentYear, currentMonth,0).getDate();
    let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
    currentDate.innerText=`${months[currentMonth]} ${currentYear}`;
    
    let liTag = "";
    for (let i = firstDayOfMonth; i > 0 ;i--){
        liTag +=`<li class="unactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <=lastDateOfMonth;i++){
        if (date.getDate()==i && currentMonth===new Date().getMonth() && currentYear===new Date().getFullYear()){
            liTag +=`<li class="current">${i}</li>`;
        }
        else {
            liTag +=`<li>${i}</li>`;
        }
    }
    for (let i = lastDayOfMonth; i < 6 ;i++){
        liTag +=`<li class="unactive">${i- lastDayOfMonth + 1}</li>`;
    }
    days.innerHTML=liTag;
}
iconBtn.forEach(item => item.addEventListener("click", function(){
    currentMonth=item.id === "prev" ? currentMonth - 1 : currentMonth + 1 ;
    if (currentMonth===12 && item.id==="next"){
        currentYear = currentYear + 1;
        currentMonth=0;
    } 
    if(currentMonth===1 && item.id==="prev")
    {
        currentYear= currentYear - 1;
        currentMonth=12;
    }
    if (currentMonth < 0 || currentYear > 11 ){
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();//thay đổi năm 
        currentMonth = date.getMonth();//thay đổi tháng
        }
        else {
            date = new Date();
        }
    console.log(currentYear)
    renderCalendar();
}))
renderCalendar();