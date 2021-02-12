const YELLOW = '#FDE74C';

////////// SELECT STRINGS TO TEST //////////
const strings = document.querySelectorAll('.row.left svg');
let checkedStringsCount = 0;


for (string of strings) {
    let temp = null;
    string.createAttribute = 'checked'; // add boolean value for inclusion to each string
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
        checkedStringsCount -= 1;
    }
    else {
        string.checked = true;
        string.style.fill = YELLOW;
        checkedStringsCount += 1;
    }
}

const playBtn = document.querySelector('.playBtn');
playBtn.addEventListener('click', playGame);

function playGame() {
    if (checkedStringsCount > 0) {
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

let noteImgs = [];
function createNoteArray() {
    for (let i = 0; i < 6; i++) {
        if (strings[i].checked === true) {
            loadNoteImgs(strings[i].id - 1);
        }
    }
}

function loadNoteImgs(string) {
    for (let j = 0; j < notesByString[string].length; j++) {
        let temp = [];
        temp.push(notesByString[string][j]); // the note name is always at index 0
        temp.push(`img/noteSVGs/${notesByString[string][j]}_Quarter_Note.svg`)
        temp.push(`img/noteSVGs/${notesByString[string][j]}_Half_Note.svg`)
        temp.push(`img/noteSVGs/${notesByString[string][j]}_Whole_Note.svg`)

        noteImgs.push(temp);
    }
}

const displayedImage = document.querySelector('#staff');
let letterName; // holds the answer to the note being tested
let score = 0;

const controls = document.querySelectorAll('div.row.controls img');
for (let button of controls) {
    button.addEventListener('click', (Event) => {
        let studentAnswer = Event.target.attributes[2].textContent;
        eval(studentAnswer)
    })
}

function eval(studentResponse) {
    if (studentResponse == letterName.charAt(0)) {
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
    let indx = Math.floor(Math.random() * noteImgs.length);
    let image = Math.floor(Math.random() * (noteImgs[indx].length - 1)) + 1;
    letterName = noteImgs[indx][0];
    displayedImage.src = noteImgs[indx][image];
}