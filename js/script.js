// Tools for this game 
const arr = ['stone','paper','scissors']

// The form element at startscreen
const setPlayerForm = document.getElementById('setPlayerForm')

// Scoreboard
const playerScoreboard = document.getElementById('playerScoreboard')
const botScoreboard = document.getElementById('botScoreboard')
const gameResult = document.getElementById('gameResult')

// Buttons 
const createPlayerBtn = document.getElementById('createPlayerBtn')
const stoneBox = document.getElementById('stoneBox')
const paperBox = document.getElementById('paperBox')
const scissorsBox = document.getElementById('scissorsBox')
const resetBtn = document.getElementById('resetBtn')

// Event listner to the buttons
createPlayerBtn.addEventListener('click', addPlayerAndStartGame)
stoneBox.addEventListener('click', clickOnStoneBox)
paperBox.addEventListener('click', clickOnPaperBox)
scissorsBox.addEventListener('click', clickOnScissorsBox)
resetBtn.addEventListener('click', reset)

// Player's name
let player 

// BOT's weapon 
let botTool

// Counter 
let round = 1
let playerScore = 0
let botScore = 0

function addPlayerAndStartGame(event) {
    event.preventDefault()
    const playerName = document.getElementById('playerName')
    const playerTitle = document.getElementById('playerTitle')

    player = playerName.value.toUpperCase()
    playerTitle.innerText = `${player}'S SCORE`
    setPlayerForm.remove()
    
    // Change windows from startpage to game 
    const startGameScreen = document.getElementById('startGameScreen')
    startGameScreen.classList.remove('welcomeScreen')
}

// Create random weapon to BOT
function createRndTool(){
    const rndNumber = Math.floor( Math.random() * arr.length )
    botTool = arr[rndNumber]
}

// Timeout 2 second
function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved')
      }, 2000)
    })
}

// Change windows from game to another with a request about restart the game
function askIfResetGame(){
    const playoffScreen = document.getElementById('resetGameScreen')
    resetGameScreen.classList.add('askIfRestart')
}

// Restart the game
function reset() {

    // Restore the counters
    round = 1
    playerScore = 0
    botScore = 0

    // Restore the scoreboard
    roundH1.innerText = `Round ${round}`
    playerScoreboard.innerHTML = '&star; &star; &star;'
    botScoreboard.innerHTML = '&star; &star; &star;'

    // Change to game window
    const resetGameScreen = document.getElementById('resetGameScreen')
    resetGameScreen.classList.remove('askIfRestart')

    // Restore winner 
    const showWinnerH1 = document.getElementById('showWinnerH1')
    const showScoreH2 = document.getElementById('showScoreH2')                 
    showWinnerH1.innerText = ''
    showScoreH2.innerText = ''
}

// Change title after every round
function roundCounter() {
    const roundH1 = document.getElementById('roundH1')
    round++
    roundH1.innerText = `Round ${round}`
}

// If the player win at this round
function playerWin(){
    playerScore++

    if (playerScore== 1){
        playerScoreboard.innerHTML = '&starf; &star; &star;'

    } else if (playerScore == 2) {
        playerScoreboard.innerHTML = '&starf; &starf; &star;'

    } else {
        playerScoreboard.innerHTML = '&starf; &starf; &starf;'
        askIfResetGame()

        const showWinnerH1 = document.getElementById('showWinnerH1')
        const showScoreH2 = document.getElementById('showScoreH2')
    
        showWinnerH1.innerText = `The winner is ${player}!`
        showScoreH2.innerText = `${playerScore} : ${botScore}`
    }
}

// If the BOT win at this round
function botWin(){
    botScore++

    if (botScore== 1){
        botScoreboard.innerHTML = '&starf; &star; &star;'

    } else if (botScore == 2) {
        botScoreboard.innerHTML = '&starf; &starf; &star;'

    } else {
        botScoreboard.innerHTML = '&starf; &starf; &starf;'
        askIfResetGame()

        const showWinnerH1 = document.getElementById('showWinnerH1')
        const showScoreH2 = document.getElementById('showScoreH2')
    
        showWinnerH1.innerText = `The winner is BOT!`
        showScoreH2.innerText = `${playerScore} : ${botScore}`

    }
}


// ----------------[STONE EVENT]----------------
async function clickOnStoneBox(event){
    event.preventDefault()
    createRndTool()

    if (botTool=='scissors'){
        stoneBox.style.backgroundColor = 'green'
        gameResult.innerText = 'BOT HAD SCISSORS THEN YOU WIN!'
        playerWin()

    } else if (botTool=='paper'){
        stoneBox.style.backgroundColor = 'red'
        gameResult.innerText = 'BOT HAD PAPER THEN YOU LOSE!'
        botWin()

    } else {
        stoneBox.style.backgroundColor = 'yellow'
        gameResult.innerText = 'BOTH OF YOU DID THE SAME CHOICE.. LET!'
    }

    roundCounter()
    await resolveAfter2Seconds();

    // Restore the texts
    gameResult.innerText = ''
    stoneBox.style.backgroundColor = '#f1f1f1'
}


// -----------------[PAPER EVENT]-----------------
async function clickOnPaperBox(event){
    event.preventDefault()
    createRndTool()


    if (botTool=='stone'){
        paperBox.style.backgroundColor = 'green'
        gameResult.innerText = 'BOT HAD STONE THEN YOU WIN!'
        playerWin()

    } else if (botTool=='scissors'){
        paperBox.style.backgroundColor = 'red'
        gameResult.innerText = 'BOT HAD SCISSORS THEN YOU LOSE!'
        botWin()

    } else {
        paperBox.style.backgroundColor = 'yellow'
        gameResult.innerText = 'BOTH OF YOU DID THE SAME CHOICE.. LET!'
    }

    roundCounter()
    await resolveAfter2Seconds();

    // Restore the texts
    gameResult.innerText = ''
    paperBox.style.backgroundColor = '#f1f1f1'
}


// ------------------[SCISSORS EVENT]------------------
async function clickOnScissorsBox(event){
    event.preventDefault()
    createRndTool()

    if (botTool=='paper'){
        scissorsBox.style.backgroundColor = 'green'
        gameResult.innerText = 'BOT HAD PAPER THEN YOU WIN!'
        playerWin()

    } else if (botTool=='stone'){
        scissorsBox.style.backgroundColor = 'red'
        gameResult.innerText = 'BOT HAD STONE THEN YOU LOSE!'
        botWin()

    } else {
        scissorsBox.style.backgroundColor = 'yellow'
        gameResult.innerText = 'BOTH OF YOU DID THE SAME CHOICE.. LET!'
    }

    roundCounter()
    await resolveAfter2Seconds();

    // Restore the texts
    gameResult.innerText = ''
    scissorsBox.style.backgroundColor = '#f1f1f1'
}

