import Board from './classes/board.js';
import Player from './classes/player.js';
import { drawWinningLine, hasClass, addClass } from './helpers.js';

function newGame() {
    const board = new Board(['', '', '', '', '', '', '', '', '']);
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
    let playerTurn = 1;

    htmlCells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (hasClass(cell, 'x') || hasClass(cell, 'o') || board.isTerminal() || playerTurn !== 1) return false;

            const symbol = playerTurn ? 'x' : 'o';
            board.insert(symbol, index);
            addClass(cell, symbol);

            if (board.isTerminal()) {
                drawWinningLine(board.isTerminal());
            }

            playerTurn = 1 - playerTurn; // Switch turns
        });

        if (board.state[index]) addClass(cell, board.state[index]);
    });
}



