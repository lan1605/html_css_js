const sidebarMenu = document.querySelector(".sidebar-menu");
const sidebarMenuToggle = document.querySelector(".nav-toggle");
const spanNavbar = document.querySelectorAll("span");
sidebarMenuToggle.addEventListener("click", function(){
    if (!sidebarMenu.classList.contains("show")){
        sidebarMenu.classList.add("show");
        sidebarMenu.classList.remove("hidden");
        sidebarMenuToggle.style="    transform: rotate(180deg);";
        spanNavbar.forEach((item) => {
            item.classList.add("active");
            item.classList.remove("unactive");

        });
    }
    else {
        sidebarMenu.classList.remove("show");
        sidebarMenu.classList.add("hidden");
        sidebarMenuToggle.style="    transform: rotate(0deg);";
        spanNavbar.forEach((item) => {
            item.classList.add("unactive");
            item.classList.remove("active");

        });
    }
})