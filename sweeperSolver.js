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
		console.log('sending:', response);
		client.write(JSON.stringify(response));
	    }
	} catch (e) {
	    console.log('Unexpected Data: ', + data);
	    console.log(e);
	    process.exit();
	}
    });
});


function playGame(gameInfo) {
    let requests;
    switch(gameInfo.boardState) {
    case 'READY': {
	requests = solver.processBoard(gameInfo.board);
	break;
    }
    default:
	process.exit();
    }
    return requests;
}

console.log('sending: sendBoard');
client.write('["sendBoard"]');
