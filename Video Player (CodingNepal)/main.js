const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
progressBar = container.querySelector(".progress-bar"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
volumeBtn = container.querySelector(".volume i"),
videoTimeline = container.querySelector(".video-timeline"),
videoDuration = container.querySelector(".video-duration"),
currentVideoTime = container.querySelector(".current-time"),
volumeChange = container.querySelector("#range"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
picInPic = container.querySelector(".pic-in-pic span"),
fullScreen = container.querySelector(".fullscreen i"),
playPauseBtn = container.querySelector(".play-pause i");

function replaceClass(object, classOld, classNew){
    object.classList.add(classNew);
    object.classList.remove(classOld);
}
function playPauseVideo(){
    // mainVideo.pause ? mainVideo.play() : mainVideo.pause();
    if (mainVideo.paused){
        mainVideo.play();
        // playPauseBtn.classList.replace("fa-play","fa-pause");
        replaceClass(playPauseBtn, "fa-play", "fa-pause");
    }
    else if (mainVideo.play){
        mainVideo.pause();
        // playPauseBtn.classList.replace("fa-pause", "fa-play");
        replaceClass(playPauseBtn, "fa-pause", "fa-play");
    }
}
//play, pause video
playPauseBtn.addEventListener("click", playPauseVideo);
mainVideo.addEventListener("click", playPauseVideo);

videoTimeline.addEventListener("click", function (e) {
    let timelineWidth = videoTimeline.clientWidth;
    console.log(timelineWidth);
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
})
function draggableProgressBar(e){
    let timelineWidth = videoTimeline.clientWidth;
    // console.log(timelineWidth);
    progressBar.style.width=`${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVideoTime.textContent = formatTime(mainVideo.currentTime);
}
videoTimeline.addEventListener("mousedown", function(){
    videoTimeline.addEventListener("mousemove", draggableProgressBar)
})
videoTimeline.addEventListener("mouseup", function(){
    videoTimeline.removeEventListener("mousemove", draggableProgressBar)
})
videoTimeline.addEventListener("mousemove", function(e){
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left=`${offsetX}px`;
    let timelineWidth = videoTimeline.clientWidth;
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.textContent=formatTime(percent);
})
function formatTime (time){
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    if (hours == 0){
        return `${minutes}:${seconds}`;
    }
    else {
        return `${hours}:${minutes}:${seconds}`;
    }
}
mainVideo.addEventListener("timeupdate", function(e){
    let {currentTime, duration} = e.target; //lấy ra thời gian chạy video và tổng thời lượng của video
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVideoTime.textContent=formatTime(currentTime);
})

mainVideo.addEventListener("loadeddata", function(e){
    videoDuration.textContent=formatTime(e.target.duration);
})
//tua nhanh, tua ngược video
skipBackward.addEventListener("click", function(){
    mainVideo.currentTime-=5;
})

skipForward.addEventListener("click", function(){
    mainVideo.currentTime+=5;
})
//chỉnh âm lượng
volumeBtn.addEventListener("click", function(){
    // console.log(volumeBtn);
    if (!volumeBtn.classList.contains("fa-volume-high")){
        mainVideo.volume=50/100;
        replaceClass(volumeBtn, "fa-volume-xmark", "fa-volume-high");
        volumeChange.value=50;
        // volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    else {
        mainVideo.volume=0/100;
        volumeChange.value=0;
        replaceClass(volumeBtn, "fa-volume-high", "fa-volume-xmark");
    }
});

volumeChange.addEventListener("change", function(){
    console.log(volumeChange.value);
    mainVideo.volume=volumeChange.value / 100;
    if (volumeChange.value > 0 && volumeChange < 100){
        replaceClass(volumeBtn, "fa-volume-xmark", "fa-volume-high");
    }
    else if (volumeChange.value == 0){
        replaceClass(volumeBtn, "fa-volume-high", "fa-volume-xmark");
    }
    else {
        replaceClass(volumeBtn, "fa-volume-xmark", "fa-volume-high");
    }
})

//chế độ chạy video
speedBtn.addEventListener("click", function(){
    speedOptions.classList.toggle("show");
});
document.addEventListener("click", function(e){
    if (e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded"){
        speedOptions.classList.remove("show");
    }
})
const speedOptionsList = speedOptions.querySelectorAll("li");
speedOptionsList.forEach(item => item.addEventListener("click", handleChangeClass))
function handleChangeClass(e){
    mainVideo.playbackRate=e.target.dataset.speed;
    speedOptionsList.forEach(item => item.classList.remove("active"));
    e.target.classList.add("active");
    
}
//picture in picture
picInPic.addEventListener("click", function(){
    mainVideo.requestPictureInPicture();
});
//toàn màn hình
fullScreen.addEventListener("click", function (){
    container.classList.toggle("full-screen");
    container.requestFullscreen();
    if (document.fullscreenElement){
        replaceClass(fullScreen, "fa-compress","fa-expand");
        return document.exitFullscreen;
    }
    else {
    replaceClass(fullScreen, "fa-expand", "fa-compress");
    }

})