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
