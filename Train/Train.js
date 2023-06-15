const zoneState = [
    0, //place one - default state is null
    0, //place two - default state is null
    0, //place three - default state is null
    0, //place four - default state is null
    0, //place five - default state is null
    0, //place six - default state is null
    0, //place seven - default state is null
    0, //palce eight - default state is null
    0, //place nine - default state is null
];
const playerPosition = [
    0, //place one - default state is null
    0, //place two - default state is null
    0, //place three - default state is null
    0, //place four - default state is null
    0, //place five - default state is null
    0, //place six - default state is null
    0, //place seven - default state is null
    0, //palce eight - default state is null
    0, //place nine - default state is null
];
const redVast = [
    "pres1",
    "pres2",
    "pres3",
];
const blueVast = [
    "ss1",
    "ss2",
    "ss3",
];
const player = [
    "red",
    "blue",
];
const playerTurn = {
    red: 0,
    blue: 0,
};
const playerStatus = {
    red: 0,
    blue: 0,
};
let gameStatus = 0;

//starter page
start = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    const chanceElement = document.getElementById("chance");
    if (randomNumber < 6) {
        //red side
        chanceElement.className = "spanTurnLeft";
        closeStarterPage();
        playerTurn.red = 1;
    }else {
        //blue side
        chanceElement.classList = "spanTurnRight";
        closeStarterPage();
        playerTurn.blue = 1;
    }
    setDragableOnPlayer();
}
closeStarterPage = () => {
    const starterPage = document.querySelector(".start");
    var delayInMilliseconds = 5000; //5 second

    setTimeout(() => {
        starterPage.style.display = "none";
    }, delayInMilliseconds);
}
//end start page

//drag event
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    if (event.target.parentNode.id > 0 && event.target.parentNode.id < 10){
        zoneState[(event.target.parentNode.id - 1)] = 0;
        //remove last player position
        playerPosition[(event.target.parentNode.id - 1)] = 0;
    }     
}

function drop(event) {
    //check for new place 
    if (zoneState[(event.target.id - 1)] == 0) {
        // move and drop image
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
        // change zone state to 1 
        zoneState[(event.target.id - 1)] = 1;
        //remove dragable attribute player image after move
        removeDragableOnPlayer();
        //check turn and switch turn to another player
        if (playerTurn.blue == 1){
            //change turn
            playerTurn.blue = 0;
            playerTurn.red = 1;
            //set player vast position
            playerPosition[(event.target.id - 1)] = 2;
            winner("blue");
        }else {
            //change turn
            playerTurn.red = 0;
            playerTurn.blue = 1;
            //set player vast position
            playerPosition[(event.target.id - 1)] = 1;
            winner("red");
        }
        setDragableOnPlayer();
    }
}

//end drag event 

//Player selection
setDragableOnPlayer = () => {
    if (playerTurn.blue == 1){
        blueVast.forEach((index) => {
            document.getElementById(index).setAttribute("ondragstart", "drag(event)");
        });
    }else if (playerTurn.red == 1) {
        redVast.forEach((index) => {
            document.getElementById(index).setAttribute("ondragstart", "drag(event)");
        });
    }
}
//end player selection

//remove player move access
removeDragableOnPlayer = () => {
    if (playerTurn.blue == 1){
        blueVast.forEach((index) => {
            document.getElementById(index).removeAttribute("ondragstart");
        });
    }else {
        redVast.forEach((index) => {
            document.getElementById(index).removeAttribute("ondragstart");
        });
    }
}
//end remove player move access


//check win state 
const winner = (player) => {
    //win state
    switch (player){
        case "red":
            if(playerPosition[0] == 1 && playerPosition[1] == 1 && playerPosition[2] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[3] == 1 && playerPosition[4] == 1 && playerPosition[5] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[6] == 1 && playerPosition[7] == 1 && playerPosition[8] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[0] == 1 && playerPosition[3] == 1 && playerPosition[6] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[1] == 1 && playerPosition[4] == 1 && playerPosition[7] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[2] == 1 && playerPosition[5] == 1 && playerPosition[8] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[0] == 1 && playerPosition[4] == 1 && playerPosition[8] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }else if(playerPosition[2] == 1 && playerPosition[4] == 1 && playerPosition[6] == 1){
                playerStatus.red = 1;
                gameStatus = 1;
            }
            break;
        case "blue":
            if(playerPosition[0] == 2 && playerPosition[1] == 2 && playerPosition[2] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[3] == 2 && playerPosition[4] == 2 && playerPosition[5] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[6] == 2 && playerPosition[7] == 2 && playerPosition[8] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[0] == 2 && playerPosition[3] == 2 && playerPosition[6] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[1] == 2 && playerPosition[4] == 2 && playerPosition[7] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[2] == 2 && playerPosition[5] == 2 && playerPosition[8] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[0] == 2 && playerPosition[4] == 2 && playerPosition[8] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }else if(playerPosition[2] == 2 && playerPosition[4] == 2 && playerPosition[6] == 2){
                playerStatus.blue = 1;
                gameStatus = 1;
            }
            break;
    }
    //check winner
    if (gameStatus == 1){
        const endPage = document.querySelector(".end");
        let text = ``;
        if (playerStatus.blue == 1){
            text += `<img src="esteghlal.png" alt="esteghlal" class="img"><p>برنده</p>`;
            endPage.style.display = "block";
            endPage.innerHTML = text;
        }
        else if (playerStatus.red == 1){
            text += `<img src="pers.png" alt="pres" class="img"><p>برنده</p>`;
            endPage.style.display = "block";
            endPage.innerHTML = text;
        }
    }
}
//