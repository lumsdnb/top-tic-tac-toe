//should probably refactor this
document
  .getElementById('form-submit')
  .addEventListener('click', function (event) {
    event.preventDefault();
    const playerName = document.getElementById('form-name').value;
    console.log(playerName);
    if (playerName !== '') {
      startGame(playerName);
    }
  });

function startGame(name) {
  gameBoard.init(name);
  document.getElementById('form-group').style.display = 'none';
}

function resetGame(e) {
  console.log(e);
  gameBoard.reset();
  document.getElementById('form-group').style.display = 'inline-block';
}

let gameBoard = (function () {
  'use strict';
  let _gameScore = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  let playerName = '';
  let _playerTurn = true;
  let gameOver = false;
  const boardEl = document.querySelector('.gameboard-grid');
  const topEl = document.querySelector('.top-title');
  const turnEl = document.querySelector('.turn-indicator');
  const resetBtn = document.querySelector('.reset-btn');

  const getField = (num) => _gameScore[num];

  function _initBoard(name) {
    playerName = name;
    topEl.innerHTML = `welcome, ${name} `;
    boardEl.innerHTML = '';

    gameOver = false;
    _gameScore.forEach((box, i) => {
      const b = document.createElement('div');
      b.innerHTML = box;
      b.classList.add('board-item');
      b.classList.add('--hidden');
      b.dataset.index = i;
      b.onclick = _playerInput;
      boardEl.appendChild(b);
    });
    console.log(_gameScore);
  }
  function reset() {
    _gameScore = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    _playerTurn = true;
    resetBtn.classList.remove('--fade-in');
    _initBoard();
    turnEl.innerHTML = '';
    topEl.innerHTML = 'welcome to the game';
    intervalId = setInterval(function () {
      if (!gameBoard.checkForWin()) {
        dumbAI.playRound();
      }
    }, 1000);
  }

  function getBoard() {
    return _gameScore;
  }

  function getWhoseTurn() {
    return _playerTurn;
  }

  function _updateArray(i, c) {
    _gameScore[i] = c;
  }

  function _updateDisplay() {
    turnEl.innerHTML = _playerTurn ? 'your turn' : 'computers turn';
  }
  const endGame = (winner) => {
    if (winner !== 'tie') {
      console.warn('a win detected');
      topEl.innerHTML = 'game over!';
      turnEl.innerHTML = `${winner} won this round. `;
      resetBtn.classList.add('--fade-in');
    } else if (winner === 'tie') {
      console.warn('tie detected');
      topEl.innerHTML = 'game over!';
      turnEl.innerHTML = 'tie!';
      resetBtn.classList.add('--fade-in');
    }
    gameOver = true;
    clearInterval(intervalId);
  };

  function init(name) {
    _initBoard(name);
  }

  const checkForWin = () => {
    if (
      _checkForRows('X') ||
      _checkForColumns('X') ||
      _checkForDiagonals('X')
    ) {
      console.log('three x');
      endGame(playerName);
    } else if (
      _checkForRows('Y') ||
      _checkForColumns('Y') ||
      _checkForDiagonals('Y')
    ) {
      console.log('three y');
      endGame('compooter');
    } else if (!_gameScore.includes(-1)) {
      endGame('tie');
    }
  };

  const _checkForRows = (char) => {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        row.push(getField(j));
      }
      if (row.every((field) => field == char)) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks if a player has filled a column.
   * If someone filled a column it returns true, else it returns false.
   * @param {gameBoard} board - call with the gameBoard
   */
  const _checkForColumns = (char) => {
    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = 0; j < 3; j++) {
        column.push(getField(i + 3 * j));
      }

      if (column.every((field) => field == char)) {
        return true;
      }
    }
    return false;
  };

  const _checkForDiagonals = (char) => {
    const diagonal1 = [getField(0), getField(4), getField(8)];
    const diagonal2 = [getField(6), getField(4), getField(2)];
    if (diagonal1.every((field) => field == char)) {
      return true;
    } else if (diagonal2.every((field) => field == char)) {
      return true;
    }
  };

  function _playerInput(e) {
    if (!gameOver) {
      //check if player can input anything
      if (_playerTurn) {
        if (
          ![...e.target.classList].includes('player-select') ||
          ![...e.target.classList].includes('computer-select')
        ) {
          e.target.classList.add('player-select');
          e.target.innerHTML = 'X';
          //get index of array and update in data

          _updateArray(e.target.dataset.index, 'X');
        } else console.log('already selected');
        _playerTurn = false;
      } else console.log('not your turn');
      _updateDisplay();
    }
    checkForWin();
  }

  function computerInput(i) {
    //get dom element from passed index (1st ([0]) item from nodelist)
    const el = document.querySelectorAll(`[data-index="${i}"]`)[0];
    el.classList.add('computer-select');
    el.innerHTML = 'Y';
    //get index of array and update in data

    _updateArray(i, 'Y');

    _playerTurn = true;
    console.log('computer finished turn');
    _updateDisplay();
    checkForWin();
  }

  return { init, getBoard, computerInput, getWhoseTurn, checkForWin, reset };
})();

//---------------- player factories ----------------//
let playerFactory = (name) => {
  const sayHi = () => {
    console.log('hi');
  };
  const _win = () => {
    console.log(`${name} won the game`);
  };
  return { sayHi, name };
};
const player1 = playerFactory('bob');

const opponent = (name) => {
  const { sayHi } = playerFactory(name);
  const playRound = () => {
    const boardState = gameBoard.getBoard();
    const canPlay = gameBoard.getWhoseTurn();
    if (!canPlay) {
      console.log('computer can play');
      //find free field and click it
      const freeField = boardState.findIndex((empty) => empty === -1);
      if (freeField != -1) {
        gameBoard.computerInput(freeField);
      }
    }
  };
  return { playRound, sayHi };
};

const dumbAI = opponent('jef');

let intervalId = setInterval(function () {
  if (!gameBoard.checkForWin()) {
    dumbAI.playRound();
  }
}, 1000);
