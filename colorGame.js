var numOfSquares = 6;
var colors = [];
var pickedColor = "";
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
    reset();
});

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function changeColors(color) {
    // loop through all squares
    for(var i = 0; i < squares.length; i++)
    {
        // change each color to match given color
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    
    // repeat num times
    for(var i = 0; i < num; i++)
    {
        // get random color and push into arr
        arr.push(randomColor());
    }
    
    // return that array
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numOfSquares);
    
    // pick a new random color from array
    pickedColor = pickColor();
    
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    
    // change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        else
            squares[i].style.display = "none";
    }
    h1.style.background = "steelblue";
}

function setupModeButtons() {
    // Mode button listener
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;

            reset();
        });
    }
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.background; 
            
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            } else{
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}