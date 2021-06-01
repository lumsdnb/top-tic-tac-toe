const boardEl = document.querySelector(".gameboard-grid")
boardEl.innerHTML=""


let gameBoard = (function() {
  'use strict';
  
  let _gameScore = [0,0,1,0,0,0,0,0,0];
  
  function _renderDisplay() {
      _gameScore.forEach(box=>{
          const b = document.createElement("div")
          b.innerHTML=box
          b.classList.add("board-item")
          b.classList.add("--hidden")
          b.onclick= playerInput
          boardEl.appendChild(b)
        })
        console.log(_gameScore);
    }

    function getBoard(){
        return _gameScore
    }
    
    function render() {
        _renderDisplay();
    }
    
    function playerInput(e){
        console.log(e.target);
        if (![...e.target.classList].includes("selected")) {
            e.target.classList.add("selected")
            
        } else console.log("already selected");
    }
    
    return {render, getBoard};
})();

gameBoard.render()

let playerFactory = (name) =>{
    const sayHi=()=>{
        console.log("hi")
    };
    return{sayHi, name}
}

const player1 = playerFactory("bob")

const opponent=(name)=>{
    const {sayHi} = playerFactory(name)
    const playRound=()=>{
        const boardState= gameBoard.getBoard()
        console.log(boardState);
    }
    return{playRound,sayHi}
}

const dumbAI=opponent("jef")