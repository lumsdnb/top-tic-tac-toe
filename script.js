const boardEl = document.querySelector(".gameboard-grid")
boardEl.innerHTML=""


let gameBoard = (function() {
  'use strict';

  let _gameScore = [0,0,1,0,0,0,0,0,0];
  var publicProperty = 'I am a public property';

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

  function render() {
    _renderDisplay();
  }
  
  function playerInput(e){
      console.log(e.target);
      if (![...e.target.classList].includes("selected")) {
          e.target.classList.add("selected")
          
      } else console.log("already selected");
  }

  return {
    render,
    publicProperty: publicProperty
  };
})();

gameBoard.render()