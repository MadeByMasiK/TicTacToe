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

document.addEventListener("DOMContentLoaded", () => {
    const elementExistsHard = document.getElementById("newGameHard");
    const elementExistsEasy = document.getElementById("newGameEasy");

    if (elementExistsHard) {
        document.getElementById("newGameHard").addEventListener('click', () => {
            newGame();
        });
    }

    if (elementExistsEasy) {
        document.getElementById("newGameEasy").addEventListener('click', () => {
            newGame();
        });
    }
});

export function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

export function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}

export function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else if (hasClass(el, className)) {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        el.className = el.className.replace(reg, " ");
    }
}

export function drawWinningLine(statusObject) {
    if (!statusObject) return;
    const { winner, direction, row, column, diagonal } = statusObject;
    if (winner === "draw") return;
    const board = document.getElementById("board");
    addClass(board, `${direction.toLowerCase()}-${row || column || diagonal}`);
    setTimeout(() => {
        addClass(board, "fullLine");
    }, 50);
}
