const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const selector = document.getElementById('selector')
const winningMessage = document.getElementById('winningMessage')
const markBtns = document.querySelectorAll('#markBtn')

const playBtn = document.getElementById('playBtn')
playBtn.addEventListener('click', startGame)
playBtn.addEventListener('click', function() {
    selector.style.display = 'none'
})

const restartBtn = document.getElementById('restartButton');
restartBtn.addEventListener('click', startGame)

const cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer;


function clearBoard() {
    winningMessage.style.display = 'none'
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('highlight')
    })
    markBtns.forEach(button => {
        button.classList.remove('selected')
    })
}

function assignMark(e) {
    clearBoard()
    e.target.classList.add('selected');
    currentPlayer = e.target.textContent;
}

function highlightCells(combination) {
    combination.forEach(function(index){
        cells[index].classList.add('highlight')
    })
}

function declareWinner(who) {
    document.querySelector('[data-winning-message-text]').textContent = `Player ${who} is the winner!`
}


function checkForWinner() {
    let gameWon
    winningCombinations.forEach(function(combination) {
        let check = combination.every(index => cells[index].innerText.trim() == currentPlayer)
        if (check) {
            highlightCells(combination)
            winningMessage.style.display = 'flex'
            declareWinner(currentPlayer)
            gameWon = true
        }
    })
    return gameWon
}

function checkForTie() {
    let emptyCells = cells.filter(cell => cell.innerText == '')
    if (emptyCells.length == 0 && !checkForWinner()) {
        winningMessage.style.display = 'flex'
        document.querySelector('[data-winning-message-text]').textContent = `It's a tie!!`
    }
}

function startGame() {

    // Clear board //
    clearBoard()

    // Assign mark to player //
    selector.style.display = 'flex'
    markBtns.forEach(button => {
        button.addEventListener('click', assignMark)
    });
    
    // Handle clicks //
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            if (cell.innerText.trim() != '') return
            cell.innerText = currentPlayer
            checkForWinner()
            checkForTie()
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        })
    })
}

startGame()