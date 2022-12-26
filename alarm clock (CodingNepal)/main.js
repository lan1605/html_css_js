const selectMenu = document.querySelectorAll("select"),
alarmBtn = document.querySelector(".alarm");

const audio = new Audio("files/ringtone.mp3");
let isAlarmSet = false, alarmTime;
for (let index = 12; index > 0; index--) {
    index = index < 10 ? "0" + index : index;
    let option = `<option value="${index}">${index}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let index = 60; index > 0; index--) {
    index = index < 10 ? "0" + index : index;
    let option = `<option value="${index}">${index}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let index = 2; index > 0; index--) {
    let option = index == 1 ? `<option value="AM">AM</option>` : `<option value="PM">PM</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval (()=>{
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    amp = "AM";

    if ( h >=12){
        h-=12;
        amp="PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h< 10 ? "0" + h: h;
    m = m< 10 ? "0" + m: m;
    s = s< 10 ? "0" + s: s;

    document.querySelector("h1").innerText =`${h}:${m}:${s} ${amp}`;
    if (alarmTime == `${h}:${m} ${amp}` ){
        audio.play();
        audio.loop();

    }
}, 1000);

alarmBtn.addEventListener("click", function(){
    if (isAlarmSet){
        alarmTime="";
        document.querySelector(".content").style="opacity: 1;pointer-events: auto;";
        alarmBtn.textContent="Set Alarm";
        audio.pause();
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        alert("Vui lòng chọn thời gian");
    }
        document.querySelector(".content").style="opacity: 0.5;pointer-events: none;";
        alarmBtn.innerText="Clear Alarm";
        isAlarmSet= true;
        alarmTime= time;
    
})
