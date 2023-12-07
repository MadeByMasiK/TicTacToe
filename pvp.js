import Board from './classes/board.js';
import { drawWinningLine, hasClass, addClass } from './helpers.js';

function newGame(player1, player2) {
    const board = new Board(['','','','','','','','','']);
    const boardDIV = document.getElementById("board");
    boardDIV.className = '';
    boardDIV.innerHTML = 
        `<div class="cells-wrap">
            <button class="cell-0"></button>
            <button class="cell-1"></button>
            <button class="cell-2"></button>
            <button class="cell-3"></button>
            <button class="cell-4"></button>
            <button class="cell-5"></button>
            <button class="cell-6"></button>
            <button class="cell-7"></button>
            <button class="cell-8"></button>
        </div>`;
    const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];
    let currentPlayer = player1;

    board.state.forEach((cell, index) => {
        htmlCells[index].addEventListener('click', () => {
            if (hasClass(htmlCells[index], 'x') || hasClass(htmlCells[index], 'o') || board.isTerminal()) return false;
            const symbol = currentPlayer.symbol;
            board.insert(symbol, index);
            addClass(htmlCells[index], symbol);

            if (board.isTerminal()) {
                drawWinningLine(board.isTerminal());
                // Handle game over or tie
            } else {
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
            }
        }, false);

        if (cell) addClass(htmlCells[index], cell);
    });
}

class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }

    // Add other player-related methods if needed
}

const player1 = new Player('x');
const player2 = new Player('o');

document.addEventListener("DOMContentLoaded", () => {
    // New game with two human players (replace with AI if needed)
    const player1 = new Player('x');
    const player2 = new Player('o');

    // Start a new game with the specified depth and players
    newGame(player1, player2);

    // Button click event for starting a new game
    document.getElementById("newGameHard").addEventListener('click', () => {
        newGame(player1, player2);
    });
});