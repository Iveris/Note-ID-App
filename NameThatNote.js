// SETTINGS
const strings = document.querySelectorAll(".string svg");
const playButton = document.querySelector(".playButton button");

playButton.addEventListener('click', startGame);

let stringTestCount = 0;

for (string of strings) {
    string.setAttribute("selected", false);
    string.addEventListener('click', function (Event) {
        select(Event.target.parentElement);
    })
}

function select(string) {
    if (string.getAttribute("selected") == "false") {
        string.setAttribute("selected", true);
        string.style.fill = '#FDE74C';
        stringTestCount += 1;
        playButton.disabled = false;
        return;
    }
    else if (string.getAttribute("selected") == "true") {
        string.setAttribute("selected", false);
        string.style.fill = 'black';
        stringTestCount -= 1;
        if (stringTestCount == 0) playButton.disabled = true;
        return;
    }
}

const settings = document.querySelector(".settings");
const game = document.querySelector(".game");

// LOAD GAME

const choices = document.querySelectorAll(".noteChoice img");
for (choice of choices) {
    choice.addEventListener('click', function (event) {
        isCorrect(event.target.id[0]);
    });
}

// letter name of notes on string i where notesByString[i] = string number - 1
const notesByString =
    [['E5', 'F5', 'G5'],
    ['B4', 'C5', 'D5'],
    ['G4', 'A4'],
    ['D4', 'E4', 'F4'],
    ['A3', 'B3', 'C4'],
    ['E3', 'F3', 'G3']];

let noteImgs = [];

function startGame() {
    settings.style.display = "none";
    game.style.display = "grid";
    getSelectedStrings();
    displayNextNote();
};

function getSelectedStrings() {
    for (string of strings) {
        if (string.getAttribute("selected") == "true") {
            loadImgs(notesByString[string.id - 1]);
        }
    }
};

function loadImgs(arrayOfNotes) {
    for (let i = 0; i < arrayOfNotes.length; i++) {
        let tempArray = [];
        note = arrayOfNotes[i];
        tempArray.push(`${note}`)
        tempArray.push(`img/NoteSVGs/${note}_Quarter_Note.svg`);
        tempArray.push(`img/NoteSVGs/${note}_Half_Note.svg`);
        tempArray.push(`img/NoteSVGs/${note}_Whole_Note.svg`);
        noteImgs.push(tempArray);
    };
};

function randIndex(limit) { return Math.floor(Math.random() * limit); };

// PLAY GAME
answer = "";
function isCorrect(str) {
    if (str == answer[0]) {
        incrementScore();
        displayNextNote();
    }
    else {
        decrementScore();
    }
}

display = document.querySelector(".display img");


function displayNextNote() {
    string = randIndex(noteImgs.length);
    note = randIndex(noteImgs[string].length - 1);
    display.src = noteImgs[string][note + 1];
    answer = noteImgs[string][0];
}

let score = 0;
let consecutiveAnswers = 0

function incrementScore() {
    score += 10;
    updateScore();
    giveEncouragement(++consecutiveAnswers);
}

function decrementScore() {
    if (score >= 10) {
        score -= 10;
        updateScore();
        consecutiveAnswers = 0;
    }
}

const displayedScore = document.querySelector(".score");
function updateScore() { displayedScore.innerHTML = `SCORE: ${score}`; }

const encourageDiv = document.querySelector(".encouragement");
const encouragements = ["Great Job", "Good Job", "Nice Going", "Keep it up", "Don't Stop Now"];

function giveEncouragement(num) {
    if (num == 5 || num == 10 || num == 20 || num == 50 || num == 100) {
        let encouragement = createEncouragement(num);
        encourageDiv.innerText = encouragement;
        let clearEDiv = setTimeout(function () {
            encourageDiv.innerText = "";
        }, 5000);
    }
}

function createEncouragement(num) {
    let encouragement = "";
    switch (num) {
        case 5:
            encouragement = encouragements[randIndex(encouragements.length)];
            break;
        case 10:
            encouragement = encouragements[randIndex(encouragements.length)];
            break;
        case 20:
            encouragement = "You're on FIRE";
            break;
        case 50:
            encouragement = "Careful! Don't break the game";
            break;
        case 100:
            encouragement = "YOU WIN!!!\nYOU BROKE THE GAME!!";
            break;
    }
    return `${num} in a row!\n${encouragement}!`;
    // return `${num} in a row!\nYOU BROKE\nTHE GAME!!`;
}