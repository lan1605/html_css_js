const textarea = document.querySelector("textarea"),
fileNameInput = document.querySelector(".file-name input"),
selectMenu = document.querySelector(".save-as select"),

saveBtn = document.querySelector(".save-btn");
console.log(selectMenu);
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
saveBtn.addEventListener("click", function(){
    //Blob(blobContent, Mime-types)
    const blob = new Blob([textarea.value], {type: selectMenu.value});  
    const fileURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileNameInput.value;
    link.href= fileURL;
    link.click();
})

selectMenu.addEventListener("change", function(){
    let selectOption = selectMenu.options[selectMenu.selectedIndex].text.split(" ")[0];
    document.querySelector(".save-btn span").textContent= selectOption;

})