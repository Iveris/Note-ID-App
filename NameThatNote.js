const YELLOW = '#FDE74C';

////////// SELECT STRINGS TO TEST //////////
const strings = document.querySelectorAll('.row.left svg');
let checkedStrings = 0;

// add boolean value for inclusion to each string
for (string of strings) {
    let temp = null;
    string.createAttribute = 'checked';
    string.checked = false;
    string.addEventListener('click', (Event) => {
        temp = Event.target.parentElement;
        check(temp);
    });
}

// change value and color based on click
function check(string) {
    if (string.checked == true) {
        string.checked = false;
        string.style.fill = 'black';
        checkedStrings -= 1;
    }
    else {
        string.checked = true;
        string.style.fill = YELLOW;
        checkedStrings += 1;
    }
}

const playBtn = document.querySelector('.playBtn');
playBtn.addEventListener('click', playGame);

function playGame() {
    if (checkedStrings > 0) {
        loadGame();
    }
}

///////// GAME //////////

// Array to hold IDs serving as partial file names for svg graphics
// row = string # -1
const notesByString = [
    ['E5', 'F5', 'G5'],
    ['B4', 'C5', 'D5'],
    ['G4', 'A4'],
    ['D4', 'E4', 'F4'],
    ['A3', 'B3', 'C4'],
    ['E3', 'F3', 'G3']
];

// Load Images

let notes = []; // array to hold images to be tested
function createNoteArray() {
    for (let i = 0; i < 6; i++) {
        if (strings[i].checked === true) {
            loadNotes(strings[i].id - 1);
        }
    }
}

// creates an array of image file urls, and contains the note name representing those images
// the note name is always at index 0
// after each array is created it is pushed to the notes array
function loadNotes(string) {
    for (let j = 0; j < notesByString[string].length; j++) {
        let temp = [];
        temp.push(notesByString[string][j]);
        temp.push(`img/noteSVGs/${notesByString[string][j]}_Quarter_Note.svg`)
        temp.push(`img/noteSVGs/${notesByString[string][j]}_Half_Note.svg`)
        temp.push(`img/noteSVGs/${notesByString[string][j]}_Whole_Note.svg`)

        notes.push(temp);
    }
}

// set up game controls, constants, and variables
const displayedImage = document.querySelector('#staff');
let letterName; // holds the answer to the note being tested
let score = 0;

// set event listeners
const controls = document.querySelectorAll('div.row.controls img');
for (let button of controls) {
    button.addEventListener('click', (Event) => {
        let studentAnswer = Event.target.attributes[2].textContent;
        eval(studentAnswer)
    })
}

function eval(studentA) {
    if (studentA == letterName.charAt(0)) {
        score += 10;
        nextNote();
        updateScore();
    }
    else {
        if (!score == 0) {
            score -= 10;
            updateScore();
        }
    }
}

// load game
function loadGame() {
    let settingsPage = document.querySelector('.settings');
    let gamePage = document.querySelector('.game');
    createNoteArray();
    settingsPage.style.display = 'none';
    gamePage.style.display = 'flex';
    nextNote();
}

function updateScore() {
    document.querySelector('#currentScore').innerText = score.toString();
    if (score === 50 || score === 100 || score === 200) {
        // playAnimation();
    }
}

// start game loop

const colorArray = ['#03045E', '#FF66C4', '#0077B6', '#FDE74C', '#6DA6B0', '#FF7F11', '#B2EDEF'];
const cntrLetters = document.querySelectorAll('div.row.controls span');


function nextNote() {
    letterName = "";
    displayedImage.src = '';
    let indx = Math.floor(Math.random() * notes.length);
    let image = Math.floor(Math.random() * (notes[indx].length - 1)) + 1;
    letterName = notes[indx][0];
    displayedImage.src = notes[indx][image];
}

// function playAnimation() {
//     let animation = null;
//     switch (score) {
//         case 200: animation = upperCut;
//             break;
//         case 100:
//             animation = punch;
//             break;
//         case 50:
//             animation = kick;
//             break;
//     }

//     playAni(animation);
// }