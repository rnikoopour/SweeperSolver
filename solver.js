function revealRequest(request) {
    const {row, col} = request;
    return {
	type: 'reveal',
	contents: {
	    row,
	    col
	}
    };
}

function processBoard(gameBoard) {
    const board = analyzeBoard(gameBoard);
    const requests = [];
    function randomCell() {
	const row = Math.floor((Math.random() * board.numRows));
	const col = Math.floor((Math.random() * board.numCols));
	return {row, col};
    }
    if (board.allHidden) {
	const request = revealRequest(randomCell());
	requests.push(request);
    } else {
	requests.push("display");
    }
    return requests;
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
