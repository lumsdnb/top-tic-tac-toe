function startGame(e){
    e.preventDefault()
    console.log(e);
}

let gameBoard = (function() {
    'use strict';
    let _gameScore = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    let _playerTurn = true
    const boardEl = document.querySelector(".gameboard-grid")
    const turnEl = document.querySelector(".turn-indicator")
    
    function _initBoard() {
      boardEl.innerHTML=""
      _gameScore.forEach((box, i)=>{
          const b = document.createElement("div")
          b.innerHTML=box
          b.classList.add("board-item")
          b.classList.add("--hidden")
          b.dataset.index=i
          b.onclick= _playerInput
          boardEl.appendChild(b)
        })
        console.log(_gameScore);
    }
    
    function getBoard(){
        return _gameScore
    }

    function getWhoseTurn(){
        
        return _playerTurn
    }

    function _updateArray(i){
        _gameScore[i]="X"
    }

    function _updateDisplay(){
        turnEl.innerHTML=_playerTurn?"your turn":"computers turn"
    }
    
    function init() {
        _initBoard();
    }
    
    function _playerInput(e){
        console.log(e.target);
        //check if player can input anything
        if (_playerTurn) {
            if (![...e.target.classList].includes("player-select")||![...e.target.classList].includes("computer-select")) {
                e.target.classList.add("player-select")
                e.target.innerHTML="X"
                //get index of array and update in data
               
                _updateArray(e.target.dataset.index)
                
            } else console.log("already selected");
            _playerTurn=false
        } else console.log("not your turn");
        _updateDisplay()
    }

    function computerInput(e){
        console.log(e.target);
    }
    
    return {init, getBoard, computerInput, getWhoseTurn};
})();

gameBoard.init()

let playerFactory = (name) =>{
    const sayHi=()=>{
        console.log("hi")
    };
    const _win=()=>{
        console.log(`${name} won the game`);
    }
    return{sayHi, name}
}

const player1 = playerFactory("bob")

const opponent=(name)=>{
    const {sayHi} = playerFactory(name)
    const playRound=()=>{
        const boardState= gameBoard.getBoard()
        const canPlay=gameBoard.getWhoseTurn()
        if (!canPlay) {
            console.log("computer can play");
            console.log(boardState);
            const freeField=boardState.findIndex(empty=>empty===-1)
            //find free field and click it
            //gameBoard.computerInput(id)
            console.log(freeField);
        }
    }
    return{playRound,sayHi}
}

const dumbAI=opponent("jef")

let intervalId = setInterval(function() {
  dumbAI.playRound()
}, 5000);
