const scoreNumber = document.querySelector('.score-number')
const bestScoreNumber = document.querySelector('.best-number')
const newButton = document.querySelector('.new-button')
const itemBoxs = document.querySelectorAll('.item-box')
const gameItems = [2, 4]
const X = 4
const Y = 4
let board = []
let score = 0
let copyScore = 0
let bestScore = 0

// function
function newGame() {
  board.splice(0, board.length)
  score = 0
  copyScore = 0
  scoreNumber.innerText = 0
  itemBoxs.forEach(itemBox => {
    itemBox.innerHTML = ''
    itemBox.classList.value = ''
  })
  addClassName()
  generateItem()
  recordLocation()
}

function moveLeft() {
  const copyBoard = JSON.parse(JSON.stringify(board))
  for (let y = 0; y < 4; y++) {
    let row = board[y]
    row = moveRow(row)
    board.splice(y, 1, row)
  }
  const yesOrNo = checkMove(copyBoard, board)
  if (yesOrNo) {
    updateItemBoxs(itemBoxs, board)
    return yesOrNo
  } else {
    return yesOrNo
  }
}

function moveRight() {
  const copyBoard = JSON.parse(JSON.stringify(board))
  for (let y = 0; y < 4; y++) {
    let row = board[y]
    row.reverse()
    row = moveRow(row)
    row.reverse()
    board.splice(y, 1, row)
  }
  const yesOrNo = checkMove(copyBoard, board)
  if (yesOrNo) {
    updateItemBoxs(itemBoxs, board)
    return yesOrNo
  } else {
    return yesOrNo
  }
}

function moveUp() {
  const copyBoard = JSON.parse(JSON.stringify(board))
  for (let x = 0; x < 4; x++) {
    let column = [board[0][x], board[1][x], board[2][x], board[3][x]]
    column = moveRow(column)
    column.forEach((element, index) => {
      board[index][x] = element
    })

  }
  const yesOrNo = checkMove(copyBoard, board)
  if (yesOrNo) {
    updateItemBoxs(itemBoxs, board)
    return yesOrNo
  } else {
    return yesOrNo
  }
}

function moveDown() {
  const copyBoard = JSON.parse(JSON.stringify(board))
  for (let x = 0; x < 4; x++) {
    let column = [board[0][x], board[1][x], board[2][x], board[3][x]]
    column.reverse()
    column = moveRow(column)
    column.reverse()
    column.forEach((element, index) => {
      board[index][x] = element
    })
  }
  const yesOrNo = checkMove(copyBoard, board)
  if (yesOrNo) {
    updateItemBoxs(itemBoxs, board)
    return yesOrNo
  } else {
    return yesOrNo
  }
}

function moveRow(row) {
  row = row.filter(num => num > 0)
  for (let x = 0; x < row.length; x++) {
    if (row[x] === row[x + 1]) {
      row[x] *= 2
      row[x + 1] = 0
      score += row[x]
      // if (score > bestScore) {
      //   bestScore = score
      // }
    }
  }
  row = row.filter(num => num > 0)
  while (row.length < 4) {
    row.push(0)
  }
  return row
}

function updateItemBoxs(itemBox, location) {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let num = location[y][x]
      let box = itemBox[4 * y + x]
      box.classList.value = ''
      box.innerText = ''
      if (num > 0) {
        const newItem = document.createElement('div')
        newItem.innerText = num
        newItem.classList.add(`number${num}`)
        box.append(newItem)
      }
    }
  }
  addClassName()
}

function recordLocation() {
  board.splice(0, board.length)
  for (let y = 0; y < 4; y++) {
    let row = []
    for (let x = 0; x < 4; x++) {
      let num = itemBoxs[4 * y + x].innerText
      if (num > 0) {
        num = Number(num)
        row.push(num)
      } else {
        num = 0
        row.push(num)
      }
    }
    board.push(row)
  }
}

function generateItem() {
  while (true) {
    let randomX = Math.floor(Math.random() * 4)
    let randomY = Math.floor(Math.random() * 4)
    let coordinate = randomY + '-' + randomX
    let box = ''
    for (let i = 0; i < itemBoxs.length; i++) {
      if (itemBoxs[i].classList.contains(`item${coordinate}`)) {
        box = itemBoxs[i]
      }
    }
    if (box.innerHTML === '') {
      const itemBox = document.querySelector(`.item${coordinate}`)
      const gameItem = randomGameItem(gameItems)
      const newItem = document.createElement('div')
      newItem.innerText = gameItem
      newItem.classList.add(`number${gameItem}`)
      itemBox.append(newItem)
      break
    }
  }
  recordLocation()
}

function checkEmptyBox() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let num = board[y][x]
      if (num === 0) {
        return true
      }
    }
  }
  return false
}

function checkMove(copy, current) {
  let total = 0
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (copy[y][x] === current[y][x]) {
        total += 0
      } else {
        total += 1
      }
    }
  }
  if (total === 0) {
    return false
  } else {
    return true
  }
}

function randomGameItem(item) {
  const num = Math.floor(Math.random() * 2)
  return item[num]
}

function addClassName() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      itemBoxs[4 * y + x].classList.add(`item${y}-${x}`, 'item-box')
    }
  }
}

function plusScore() {
  let plusNum = score - copyScore
  if (plusNum > 0) {
    if (score > bestScore) {
      const scoreBox = document.createElement('span')
      const bestScoreBox = document.createElement('span')
      scoreBox.innerText = `+${plusNum}`
      bestScoreBox.innerText = `+${plusNum}`
      scoreBox.classList.add('score-addition')
      bestScoreBox.classList.add('score-addition')
      scoreNumber.prepend(scoreBox)
      bestScoreNumber.prepend(bestScoreBox)
      copyScore = score
      bestScore = score
      setTimeout(changeScore, 400)
    } else {
      const box = document.createElement('span')
      box.innerText = `+${plusNum}`
      box.classList.add('score-addition')
      scoreNumber.prepend(box)
      copyScore = score
      setTimeout(changeScore, 400)
    }
  }
}

function changeScore() {
  scoreNumber.innerText = score
  bestScoreNumber.innerText = bestScore
}

function move(e) {
  const key = e.key
  if (key === 'ArrowLeft') {
    recordLocation()
    const isMoved = moveLeft()
    effectiveMovement(isMoved)
  } else if (key === 'ArrowRight') {
    recordLocation()
    const isMoved = moveRight()
    effectiveMovement(isMoved)
  } else if (key === 'ArrowUp') {
    recordLocation()
    const isMoved = moveUp()
    effectiveMovement(isMoved)
  } else if (key === 'ArrowDown') {
    recordLocation()
    const isMoved = moveDown()
    effectiveMovement(isMoved)
  }
}

function effectiveMovement(movement) {
  if (movement) {
    plusScore()
    const condition = checkEmptyBox()
    if (condition) {
      generateItem()
    } else {
      window.alert('Oops!You Lose!')
      newGame()
    }
  }
}


// addEventListener
window.addEventListener('DOMContentLoaded', function (e) {
  newGame()
})

document.addEventListener('keyup', move)

newButton.addEventListener('click', newGame)