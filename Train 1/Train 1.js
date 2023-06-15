const box = document.getElementById("mainBox");
const coordinateX = document.getElementById("x");
const coordinateY = document.getElementById("y");

function updateCoordinate(event) {
    coordinateX.innerHTML = event.pageX;
    coordinateY.textContent = event.pageY;
    box.style.backgroundColor = randomColor();
}
function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red},${green},${blue})`;
    return color;
}
box.addEventListener("mousemove", updateCoordinate);
box.addEventListener("mouseenter", updateCoordinate);
box.addEventListener("mouseleave", updateCoordinate);
