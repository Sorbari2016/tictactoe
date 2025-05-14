// JAVASCRIPT CODE FOR THE TIC TAC TOE GAME

// Module; Represent the state of the board.
const Gameboard = (function () {
    let gameboard = ["", "", "", "", "", "", "", "", ""]; // Private variable. 
  
    // This gives us access the gameboard variable while making it private. 
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

    // Prints the game to the console.   
    function printBoard() {
      console.log(`
        ${gameboard[0] || '1'} | ${gameboard[1] || '2'} | ${gameboard[2] || '3'}
        ---------
        ${gameboard[3] || '4'} | ${gameboard[4] || '5'} | ${gameboard[5] || '6'}
        ---------
        ${gameboard[6] || '7'} | ${gameboard[7] || '8'} | ${gameboard[8] || '9'}
      `);
    }
  
    // returns the following methods.
    return {
      getBoard: getBoard,
      resetBoard: resetBoard,
      updateCell: updateCell,
      printBoard: printBoard
    };
  })();


// Create a player Factory function, template for player instances. 
function player(name, symbol) { 
    return {
        name:name, 
        symbol: symbol
    }; 
}

// Create the module that runs the game:controls turns, checks win/tie, interacts with players
const GameController = (function () {
// The first part will be the player instances

  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");
  let currentPlayer = player1; 

// An array to store the different winnnig combinations.
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

// A Method that will simply help to switch from one player to another.
  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

// Method which will loop through all the winCombos to check if the currentPlayer has filled all 3 cells in the combo.
  function checkWin() {
    const board = Gameboard.getBoard();
    return winCombos.some(function (combo) {
      return combo.every(function (i) {
        return board[i] === currentPlayer.symbol;
      });
    });
  }

// Method which will check if every cell is filled and there is no winner. 
  function checkTie() {
    return Gameboard.getBoard().every(function (cell) {
      return cell !== "";
    });
  }

// Game Loop with input
  function startGame() {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function askMove() {
      Gameboard.printBoard();
      readline.question(currentPlayer.name + " (" + currentPlayer.symbol + "), choose a cell (1-9): ", function (input) {
        const index = parseInt(input) - 1;

        if (index >= 0 && index < 9) {
          if (Gameboard.updateCell(index, currentPlayer.symbol)) {
            if (checkWin()) {
              Gameboard.printBoard();
              console.log(currentPlayer.name + " wins!");
              readline.close();
              return;
            }

            if (checkTie()) {
              Gameboard.printBoard();
              console.log("It's a tie!");
              readline.close();
              return;
            }

            switchPlayer();
            askMove();
          } else {
            console.log("Cell already taken. Try again.");
            askMove();
          }
        } else {
          console.log("Invalid input. Choose a number between 1 and 9.");
          askMove();
        }
      });
    }

    askMove();
  }

  return {
    startGame: startGame
  };
})();






