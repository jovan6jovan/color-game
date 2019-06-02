var numOfSquares = 6;
var colors = [];
var pickedColor;
var bodyColor = "rgb(30, 30, 36)";
var headerColor = "rgb(86, 142, 163)";

var squares = document.querySelectorAll(".square");
var p = document.getElementById("picked-color");
var header = document.getElementById("header");
var modal = document.querySelector(".modal");
var correct = document.querySelector(".correct");
var tryAgain = document.querySelector(".try-again");
var newColors = document.querySelector(".new-colors");
var levelBtns = document.querySelectorAll(".level");

init();

function init() {
    setUpLevels();
    setUpSquares();
    reset();
}

function setUpLevels() {
    // levels event listener
    for(var i = 0; i < levelBtns.length; i++) {
        levelBtns[i].addEventListener("click", function(){
            levelBtns[0].classList.remove("active-level");
            levelBtns[1].classList.remove("active-level");
            this.classList.add("active-level");
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        })
    };
}

function setUpSquares() {
    for(var i = 0; i < squares.length; i++) {
        // add a click listener to squares
        squares[i].addEventListener("click", function(){
            // grab color of picked square
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                for(var i = 0; i < squares.length; i++) {
                    squares[i].style.backgroundColor = clickedColor;
                }
                header.style.backgroundColor = clickedColor;
                p.textContent = clickedColor;
                openModal();
                correct.classList.add("visible");
                tryAgain.classList.remove("visible");
                closeModal();
                newColors.textContent = "PLAY AGAIN?";
            } else {
                this.style.backgroundColor = bodyColor;
                openModal();
                correct.classList.remove("visible");
                tryAgain.classList.add("visible");
                closeModal();
            }
        });
    }
}

newColors.addEventListener("click", function(){
    reset();
});

function reset() {
    //generate new colors
    colors = generateRandomColors(numOfSquares);
    // pick new color from array
    pickedColor = pickColor();
    // change color display
    p.textContent = pickedColor;
    // change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }
    header.style.backgroundColor = headerColor;
    newColors.textContent = "NEW COLORS";
}

function openModal() {
    modal.classList.add("visible");
}

function closeModal() {
    setTimeout(function(){
        this.modal.classList.remove("visible");
    }, 1200);
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arrayOfColors = [];
    // add num random colors to array
    for(var i = 0; i < num; i++) {
        arrayOfColors.push(randomColor());
    }
    // return that array
    return arrayOfColors;
}

function randomColor(){
    var randomRed = Math.floor(Math.random() * 256);
    var randomGreen = Math.floor(Math.random() * 256);
    var randomBlue = Math.floor(Math.random() * 256);
    return "rgb("+randomRed+", "+randomGreen+", "+randomBlue+")";
}

