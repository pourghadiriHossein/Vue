const formList = [
    "نام خود را وارد کنید",
    "نام خانوادگی خود را وارد کنید",
    "سن خود را وارد کنید",
    "قد خود را وارد کنید",
    "وزن خود را وارد کنید",
    "استان خود را وارد کنید",
    "شهر خود را وارد کنید",
    "نام محله خود را وارد کنید",
];
const tableList = [
    "نام",
    "نام خانوادگی",
    "سن",
    "قد",
    "وزن",
    "استان",
    "شهر",
    "محله"
];
let result = ``;
let form = ``;
let resultBox = document.querySelector(".result");
let dataFormBox = document.querySelector(".dataForm");
let body = document.getElementById("body");
window.addEventListener("load",start);

function start(){
    createNewInput(0);
}
function createNewInput(id) {
    result += `<input type="text" placeholder="${formList[id]}" id="input${id+1}"><button onclick="createNextInput(${id+1})">&plus;</button>`;
    dataFormBox.innerHTML = result;
}

function createNextInput(id) {
    switch (id) {
        case 1:
            enterData(id);
            checkInputState(id);
            break;
        case 2:
            enterData(id);
            checkInputState(id);
            break;
        case 3:
            enterData(id);
            checkInputState(id);
            break;
        case 4:
            enterData(id);
            checkInputState(id);
            break;
        case 5:
            enterData(id);
            checkInputState(id);
            break;
        case 6:
            enterData(id);
            checkInputState(id);
            break;
        case 7:
            enterData(id);
            checkInputState(id);
            break;
        case 8:
            enterData(id);
            checkInputState(id);
        case 9:
            checkInputState(id);
            break;    
    }      
}
function enterData(id) {
    let row = document.getElementById(`tableRow${id}`);
    let inputValue = document.getElementById(`input${id}`).value;
    if (row){
        row.innerHTML = `<td>${tableList[id-1]}</td><td>${inputValue}</td></tr>`;
    }else{
        form += `<tr id="tableRow${id}"><td>${tableList[id-1]}</td><td>${inputValue}</td></tr>`;
        body.innerHTML = form;
    }
}
function checkInputState(id){
    if(document.getElementById(`input${id+1}`) && id < 9)
        throw "can`t create new input";
    else{
        if (id == 8){
            result += `<input type="submit" value="ثبت کن" onclick="createNextInput(${id+1})" id="input${id+1}">`;
            dataFormBox.innerHTML = result;
        }else if(id == 9){
            dataFormBox.style.display = "none";
            resultBox.style.width = "100%";
            resultBox.style.margin = "0";
        }else{
            createNewInput(id);
        }
    }
}