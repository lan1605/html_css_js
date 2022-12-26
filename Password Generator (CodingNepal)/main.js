const lengthPass = document.querySelector(".pass-length input"),
lengthPassValue = document.querySelector(".pass-length span"),
options = document.querySelectorAll(".option input"),
inputPass = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
copyPass = document.querySelector(".input-box span"),
generateBtn = document.querySelector(".generate-btn");

lengthPass.addEventListener("input", function(){
    lengthPassValue.textContent= lengthPass.value;
    if (lengthPass.value < 8){
        passIndicator.classList.add("weak");
        passIndicator.classList.remove("medium");
        passIndicator.classList.remove("strong");
    }
    else if (lengthPass.value >=8 && lengthPass.value < 16){
        passIndicator.classList.add("medium");
        passIndicator.classList.remove("weak");
        passIndicator.classList.remove("strong");
    }
    else {
        passIndicator.classList.add("strong");
        passIndicator.classList.remove("medium");
        passIndicator.classList.remove("weak");
    }
});

generateBtn.addEventListener("click", function(){
    let passWord ="", randomPass ="", exclude = false;
    //tạo một object chứa các id có giá trị 
    const charaters={
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        symbols: "^!$%&|{}[]();:.,*+-#@<>~"
    }
    options.forEach(item => {
        //kiểm tra các option đã tích vào hay chưa
        if (item.checked){
            //Lấy mã pass nếu chưa tích vào ô spaces và duplicate
            if (item.id !== "exc-duplicate" && item.id !=="spaces"){
                passWord+= charaters[item.id];
            }
            //nếu đã tích vào ô spaces
            else if (item.id==="spaces"){
                passWord+= ` ${passWord} `;
            }
            else {
                    exclude=true;
            }
        }
    })
    for (let i=0; i<lengthPass.value;i++){
        //lấy ra các kí tự để random trong biến passWord
        let randomChar = passWord[Math.floor(Math.random() * passWord.length)];
        if (exclude){
            //nếu randomPass không chứa các kí tụ trong randomChar hoặc randomChar rỗng thì gán randonChar cho randomPass 
            //nếu không thì biến i phải lùi lại (i-1)
            if (!randomPass.includes(randomChar) ||  randomChar==" "){
                randomPass += randomChar;
            }
            else {
                i--;
            }
        }
        else {
            randomPass += randomChar;
        }
    }
    inputPass.value=randomPass;
});

copyPass.addEventListener("click", function(){
    navigator.clipboard.writeText(inputPass.value);
    copyPass.textContent="check";
    setTimeout(()=>{
        copyPass.textContent="copy_all";
    }, 1000);
})