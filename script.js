import Board from './classes/board.js';
import Player from './classes/player.js';
import { drawWinningLine, hasClass, addClass } from './helpers.js';

// aloittaa uuden pelin vaikeusasteella -1 (vaikea) ja aloittavana pelaajana 1 (ihminen)
function newGame(depth = -1, startingPlayer = 1) {
    // luodaan uusi pelaaja ja tyhjä pelilauta
	const player = new Player(parseInt(depth));
	const board = new Board(['','','','','','','','','']);
    // tyhjätään kaikki classin board sisältävät html tagit ja luodaan solut html:llä
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
    // html solut talletetaan arrayn sisälle
	const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];
	//Initializing some variables for internal use
	const starting = parseInt(startingPlayer),
		maximizing = starting;
    let playerTurn = starting;
    // luodaan klikkausta odottava event listener jokaiselle solulle.
    board.state.forEach((cell, index) => {
        htmlCells[index].addEventListener('click', () => {
            // jos solussa on jo merkki, peliä ei voi jatkaa tai ei ole pelaajan vuoro, palauta false
            if(hasClass(htmlCells[index], 'x') || hasClass(htmlCells[index], 'o') || board.isTerminal() || !playerTurn) return false;
            const symbol = maximizing ? 'x' : 'o'; //Maximizing player is always 'x'
            // päivitetään classin Board sisältö (?) sekä UI
            board.insert(symbol, index);
            addClass(htmlCells[index], symbol);
            // jos peliä ei voida jatkaa, eikä kyse ole tasapelistä, ihmispelaaja voittaa
            if(board.isTerminal()) {
                // piirretään viiva voittavalle suoralle
                drawWinningLine(board.isTerminal());
            }
            playerTurn = 0; // vaihdetaan pelaajaa
            //Get computer's best move and update the UI
            player.getBestMove(board, !maximizing, best => {
                const symbol = !maximizing ? 'x' : 'o';
                board.insert(symbol, parseInt(best));
                addClass(htmlCells[best], symbol);
                if(board.isTerminal()) {
                    drawWinningLine(board.isTerminal());
                }
                playerTurn = 1; //Switch turns
            });
        }, false);
        if(cell) addClass(htmlCells[index], cell);
    });
}

let elementExistsHard = document.getElementById("newGameHard");
let elementExistsEasy = document.getElementById("newGameEasy");

// tarkista onko sivuna PvE Hard tarkistamalla löytyykö id newGameHard sivulta sillä, että muuttujan tyyppi ei ole undefined ja sisältö ei ole tyhjä
if (typeof(elementExistsHard) != 'undefined' && elementExistsHard != null) {
    document.addEventListener("DOMContentLoaded", () => { 
	    //Aloita uusi peli vaikealla vaikeusasteella
	    const depth = -1;
	    const startingPlayer = 1;
        newGame(depth, startingPlayer);
        // napin painallus aloittaa uuden pelin vaikealla vaikeusasteella
        document.getElementById("newGameHard").addEventListener('click', () => {
            const depth = -1;
	        const startingPlayer = 1;
            newGame(depth, startingPlayer);
        });
    });
}

// tarkista onko sivuna PvE Hard tarkistamalla löytyykö id newGameEasyy sivulta sillä, että muuttujan tyyppi ei ole undefined ja sisältö ei ole tyhjä
if (typeof(elementExistsEasy) != 'undefined' && elementExistsEasy != null) {
    document.addEventListener("DOMContentLoaded", () => { 
        //Aloita uusi peli helpolla vaikeusasteella
        const depth = 1;
        const startingPlayer = 1;
        newGame(depth, startingPlayer);

        // napin painallus aloittaa uuden pelin helpolla vaikeusasteella
        document.getElementById("newGameEasy").addEventListener('click', () => {
            const depth = 1;
            const startingPlayer = 1;
            newGame(depth, startingPlayer);
        });
    });
}