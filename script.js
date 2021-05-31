let gameBoard = [0,0,1,0,0,0,0,0,0]
const boardEl = document.querySelector(".gameboard")
boardEl.innerHTML=""
gameBoard.forEach(box=>{
    const b = document.createElement("span")
    b.innerHTML=box
    b.classList.add("board-item")

    boardEl.appendChild(b)
})