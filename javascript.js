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
    // returns the following methods.
    return { getBoard, resetBoard, updateCell };
  })();


// Create a player Factory function, template for player instances. 
function player(name, symbol) { 
    return {
        name, 
        symbol
    }; 
}

// Module to control game state
const GameController = (function () {
// variables for player instances, currentplayer, & gameOver.  

  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");
  let currentPlayer = player1; 
  let gameOver = false; 

// Track rounds, and scores 
let round = 1;
let score = {
  [player1.name]: 0,
  [player2.name]: 0
};


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

// Method to setup or reset the game
function startNewGame(resetAll = false) {
  Gameboard.resetBoard();
  currentPlayer = player1;
  gameOver = false;
  boardContainer.innerHTML = ""; // Clears the board. 

  if (resetAll) {
    round = 1;
    score[player1.name] = 0;
    score[player2.name] = 0;
  }
  // Create 9 elements for the board
    for (let i = 0; i < 9; i++) { 
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;  // stores the cell’s position (0–8).
      cell.addEventListener('click', handleMove);
      boardContainer.appendChild(cell); // Attach cell to baordContainer. 
    }

    updateStatus(`${currentPlayer.name}'s turn (${currentPlayer.symbol}) — Round ${round}`);
  }

// Method to handle cell clicks
function handleMove(event) {
  const index = event.target.dataset.index;

  if (!gameOver && Gameboard.updateCell(index, currentPlayer.symbol)) {
    event.target.textContent = currentPlayer.symbol;

    if (checkWin()) {
      updateStatus(`${currentPlayer.name} wins Round ${round}! 🎉`);
      score[currentPlayer.name]++;
      gameOver = true;
      endRound();
    } else if (checkTie()) {
      updateStatus(`Round ${round} is a tie! 🤝`);
      gameOver = true;
      endRound();
    } else {
      switchPlayer(); // Switch turns
      updateStatus(`${currentPlayer.name}'s turn (${currentPlayer.symbol}) — Round ${round}`);
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
  return winCombos.some(combo =>
    combo.every(i => board[i] === currentPlayer.symbol)
  );
}

// Method which will check if every cell is filled and there is no winner. 
function checkTie() {
  return Gameboard.getBoard().every(cell => cell !== "");
}

// Method to update who won or tie
function updateStatus(message) {
  statusDisplay.textContent = message;
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
  updateStatus(`Final Result: ${message}`);
}


// Add a click eventlistener to the restart button
restartBtn.addEventListener('click', () => startNewGame(true));


// public item
return { startNewGame };
})();


// To run only when the whole DOM are fully loaded and ready. 
window.addEventListener('DOMContentLoaded', GameController.startNewGame);






