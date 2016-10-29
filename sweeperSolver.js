'use strict';
const net = require('net');
const solver = require('./solver');

let previousBoard;
let currentBoard;

let client = net.connect({port:2000}, () => {
    client.setEncoding('UTF-8');
    client.on('data', (data) => {
	console.log('received:', data);
	try {
	    // The heck is this about?
	    const gameInfo = JSON.parse(data);
	    const response = playGame(gameInfo);
	    if (response) {
		client.write(JSON.stringify(response));
		console.log('sending:', response);
		client.write('"display"');

	    }
	} catch (e) {
	    console.log('Unexpected Data: ', + data);
	    console.log(e);
	    process.exit();
	}
    });
});

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

function playGame(gameInfo) {
    let request;
    switch(gameInfo.boardState) {
    case 'READY': {
	const reveal = solver.processBoard(gameInfo.board);
	if (reveal.length) request = revealRequest(reveal[0]);
	break;
    }
    default:
	process.exit();
    }
    return request;
}

console.log('sending: sendBoard');
client.write('"sendBoard"');
