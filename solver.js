function processBoard(gameBoard) {
    const board = analyzeBoard(gameBoard);
    let reveal = [];
    function randomCell() {
	const row = Math.floor((Math.random() * board.numRows));
	const col = Math.floor((Math.random() * board.numCols));
	return {row, col};
    }
    if (board.allHidden) {
	reveal.push(randomCell());
    }
    return reveal;
}

function analyzeBoard(gameBoard) {
    let result = {
	board: [],
	allHidden: true,
	numRows: gameBoard.length,
	numCols: gameBoard[0].length
    };
    gameBoard.forEach((row, rowNum) => {
	let curRow = [];
	row.forEach((symbol, colNum) => {
	    let cell;
	    switch (symbol) {
	    case '?': {
		cell = {
		    isRevealed: false,
		    isFlagged: false,
		    numTouching: -1
		}
		break;
	    }
	    case 'F': {
		result.allHidden = false;
		cell = {
		    isRevealed: false,
		    isFlagged: true,
		    numTouching: -1
		}
		break;
	    }
	    default: {
		result.allHidden = false;
		cell = {
		    isRevealed: true,
		    isFlagged: false,
		    numTouching: symbol
		}
		break;
	    }
	    }
	    cell.row = rowNum;
	    cell.col = colNum;
	    curRow.push(cell);
	});
	result.board.push(curRow);
    });
    return result;
}

module.exports = {
    processBoard
};
