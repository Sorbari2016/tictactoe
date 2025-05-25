// JAVASCRIPT CODE FOR THE TIC TAC TOE GAME


// Module; Represent the state of the board.
const Gameboard = (function () {
    // Private items
    let gameboard = ["", "", "", "", "", "", "", "", ""];  
  
    // helps us return the gameboard private variable.  
    function getBoard() {
      return gameboard;
    }

    // Clears the board, this will be needed when restarting a new game.  
    function resetBoard() {
      gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    // This sets the value of each cell to X or O only if it is empty 
    function updateCell(index, symbol) {
      if (gameboard[index] === "") {
        gameboard[index] = symbol;
        return true;
      }
      return false;
    }
    // Public items...   
    return { getBoard, resetBoard, updateCell }; // returns the following methods.
  })();


// Create a player Factory function, template for player instances. 
function player(name, symbol) { 
    return {
        name, 
        symbol
    }; 
}

// Module to control the state of the game 
const GameController = (function () {
// Manage form inputs  

 nameForm = document.getElementById('nameForm') // Select the DOM form.   
 
 nameForm.addEventListener('submit', function (e) {  // Add event listener submit; then prevent form submission default behaviuour.  
  e.preventDefault();

  const name1 = document.getElementById('player1Name').value.trim() || "Player 1"; // Get value filled by player 1, trim.
  const name2 = document.getElementById('player2Name').value.trim() || "Player 2"; // Get value filled by player 2, trim. 
  GameController.launchGameWithNames(name1, name2); // Start the game with the names obtained from the form. 
});

// Initialize the players and gameOver variables
  let player1, player2; 
  let currentPlayer = player1; 
  let gameOver = false; 

  let score; // initialize score. 

// Method to set players names, their symbols and initial scores. 
function setPlayersNames(name1, name2) {
  player1 = player(name1, "X"); 
  player2 = player(name2, "O"); 

  score = {
    [player1.name]: 0,
    [player2.name]: 0
  };
  
  updateScoreBoard();
}

// Method to set the content of the UI display to track scores.
function updateScoreBoard() {
  player1ScoreBox.textContent = `${player1.name}: ${score[player1.name]}`;
  player2ScoreBox.textContent = `${player2.name}: ${score[player2.name]}`;
}


// Track rounds
let round = 1;
 

// An array to store the different winnnig combinations.
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  // Select the class created here, and the other DOM elements.  
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');
  const boardContainer = document.getElementById('gameboard');
  const player1ScoreBox = document.getElementById('player1ScoreBox');
  const player2ScoreBox = document.getElementById('player2ScoreBox');


// Method to setup or reset the game
function startNewGame(resetAll = false) {
  Gameboard.resetBoard();
  if (!player1 || !player2) return; // Ensure players are initialized
  currentPlayer = player1;

  gameOver = false;
  boardContainer.innerHTML = ""; // Clears the board. 

  if (resetAll) {
    round = 1;
    score[player1.name] = 0;
    score[player2.name] = 0;
    updateScoreBoard();
  }


  // Create 9 cells for the board
    for (let i = 0; i < 9; i++) { 
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;  // stores the cell’s position (0–8).
      cell.addEventListener('click', handleMove);
      boardContainer.appendChild(cell); // Attach cell to baordContainer. 
    }
    
    updateStatus(`Round ${round}<br>${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
  }

// Method to handle cell clicks
function handleMove(event) {
  const index = event.target.dataset.index;

  if (!gameOver && Gameboard.updateCell(index, currentPlayer.symbol)) {
    event.target.textContent = currentPlayer.symbol;

    if (checkWin()) {
      updateStatus(`${currentPlayer.name} wins Round ${round}! 🎉`);
      score[currentPlayer.name]++;
      updateScoreBoard();
      gameOver = true;
      endRound();
    } else if (checkTie()) {
      updateStatus(`Round ${round} is a tie! 🤝`);
      gameOver = true;
      endRound();
    } else {
      switchPlayer(); // Switch turns
      updateStatus(`Round ${round}<br>${currentPlayer.name}'s turn (${currentPlayer.symbol})`); 
    }
  }
}


// A Method that will simply help to switch from one player to another.
  function switchPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

// Method which will loop through all the winCombos to check if the currentPlayer has filled all 3 cells in the combo.
function checkWin() {
  const board = Gameboard.getBoard();

  return winCombos.some(function(combo) {
    return combo.every(function(i) {
      return board[i] === currentPlayer.symbol;
    });
  });
}


// Method which will check if every cell is filled and there is no winner. 
function checkTie() {
  return Gameboard.getBoard().every(function(cell) {
    return cell !== "";
  });
}

// Method to update who won or tie
function updateStatus(message) {
  statusDisplay.innerHTML = message;
}

// Method to end each round. 
function endRound() {
  if (round < 3) {
    round++;
    setTimeout(startNewGame, 1500); // Start next round after delay
  } else {
    declareFinalWinner();
  }
}

// Method to declare the final winner
function declareFinalWinner() {
  let message;

  if (score[player1.name] > score[player2.name]) {
    message = `${player1.name} wins the game! 🏆`;
  } else if (score[player2.name] > score[player1.name]) {
    message = `${player2.name} wins the game! 🏆`;
  } else {
    message = "The game ends in a tie! 🤝";
  }
  updateStatus(message);
}


// Add a click eventlistener to the restart button
restartBtn.addEventListener('click', () => startNewGame(true));

// Method to start the game with names players inputed.
function launchGameWithNames(name1, name2) {
  setPlayersNames(name1, name2);
  document.getElementById('nameFormContainer').style.display = 'none'; // Disable the form.
  document.getElementById('gameContainer').style.display = 'block'; // Make the game appear. 
  startNewGame(true);
}


// public item
return { startNewGame, launchGameWithNames };
})();







