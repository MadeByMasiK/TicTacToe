import Board from './classes/board.js';
import { drawWinningLine, hasClass, addClass } from './helpers.js';
    // aloittaa uuden pelin, missä pelaajana 2 ihmistä
function newGame(player1, player2) {
    // luodaan pelilauta
    const board = new Board(['','','','','','','','','']);
    // tyhjennetään kaikki classin board sisältävät html tagit ja luodaan solut html:llä
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
        // html solut talletetaan array
    const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];
    let currentPlayer = player1;
    // Luodaan klikkausta odottava event listener jokaiselle solulle
    board.state.forEach((cell, index) => {
        htmlCells[index].addEventListener('click', () => {
            // jos solussa on jo merkki, peliä ei voi jatkaa tai ei ole pelaajan vuoro, palauta false
            if (hasClass(htmlCells[index], 'x') || hasClass(htmlCells[index], 'o') || board.isTerminal()) return false;
            const symbol = currentPlayer.symbol;
            // päivitetään classin Board sisältöä (?) sekä UI
            board.insert(symbol, index);
            addClass(htmlCells[index], symbol);
            // jos peliä ei voi jatkaa, eikä kyse ole tasapelistä, ihmispelaaja voittaa
            if (board.isTerminal()) {
                drawWinningLine(board.isTerminal());
                // piirretään viiva voittavalle suoralle
            } else {
                // vaihtaa vuoron toiselle pelaajalle/merkille
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
            }
        }, false);

        if (cell) addClass(htmlCells[index], cell);
    });
}
// player luokan määritys
class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }

}
// luo pelaajajien omat symbolit
const player1 = new Player('x');
const player2 = new Player('o');

// odottaa, että sivu on ladannut ennkuin aloittaa uutta peliä
document.addEventListener("DOMContentLoaded", () => {
   
    const player1 = new Player('x');
    const player2 = new Player('o');

    //aloittaa uuden pelin määritetyillä pelaajilla
    newGame(player1, player2);

    // tuo nappulan html-sivulle, mikä aloittaa uuden pelin
    document.getElementById("newGameHard").addEventListener('click', () => {
        newGame(player1, player2);
    });
});