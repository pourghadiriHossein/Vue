
// DOM
 
const dropZone = document.querySelectorAll(".zone");
 
window.draggedDOM = null;
 
Array.from(dropZone).forEach(function(element){
    //زمانی که المنت را می کشیم
    element.addEventListener("dragstart" , dragStart);
    // زمانی که المنت کشیده شده وارد یک المنت دیگر می شود
    element.addEventListener("dragenter" , dragEnter);
 
    //مشابه dragenter با این تفاوت که تا زمانی که در المنت وارد شده موس تکان می خورد این رویداد اجرا می شود .
    element.addEventListener("dragover" , function(event){
        // جلوگیری از رخ داد رها کردن موس
        event.preventDefault();
    });
 
    //زمانی که المنت را بر روی یک موقعیت رها می کنیم
    element.addEventListener("drop" , dragDroped);
    // آخرین رویداد می باشد زمانی که المنت رها می شود
    element.addEventListener("dragend" , function(){
        draggedDOM.style.opacity = 1;
    });
});
function dragStart(even){
 
    const element = even.target;
    draggedDOM = element;
 
    element.style.opacity = 0.7;
}
 
 
function dragEnter(){
 
    const dropZone = this;
    const dragedElement = dropZone.querySelector("#element");
     
    if(dragedElement) return false;
 
    dropZone.appendChild(draggedDOM);
}
 
function dragDroped(even){
    // prevent to automatically open some files
    even.preventDefault();
    const dropZone = this;
 
    dropZone.appendChild(draggedDOM);
}