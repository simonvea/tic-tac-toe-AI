
function pickAIMove(board, available, player, depth = 0) {
  let nextPlayer = player === 'X' ? 'O': 'X';
  let value;
  let move;
  
  if(player === 'X'){
    value = - Infinity;
    for(let spot of available) {
      const newBoard = board.map(arr => arr.slice());
      const [i, j] = spot;
      const newAvail = available.filter(el => !(el[0] === i && el[1] === j))
      newBoard[i][j] = player;
      let current = getValue(newBoard, newAvail) - depth
      if(!current) {
        [futureSpot, current] = pickAIMove(newBoard, newAvail, nextPlayer, depth +1);
      }
      value = Math.max(value, current)
      if(value === current) move = spot;
    }
  } else {
    value = Infinity;
    for(let spot of available) {
      const newBoard = board.map(arr => arr.slice());
      const [i, j] = spot;
      const newAvail = available.filter(el => !(el[0] === i && el[1] === j))
      newBoard[i][j] = player;
      let current = getValue(newBoard, newAvail) + depth
      if(!current) {
        [futureSpot, current] = pickAIMove(newBoard, newAvail, nextPlayer, depth +1);
      }
      value = Math.min(value, current)
      if(value === current) move = spot;
    }
  }

  return [move, value]
}

function getValue(board, available) {

  if(winner(board, available) === 'X') return 100;
  else if(winner(board, available) === 'O' ) return -100;
  else if (winner(board, available) === 'draw') return 0;

  return undefined
}