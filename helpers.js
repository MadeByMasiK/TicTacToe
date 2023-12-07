//Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)

// tämä funktio tarkastaa onko annetulla HTML elementillä (parametri el) class (parametri className) ja palauttaa tiedon boolean-muodossa
export function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    // vaihtoehtoinen koodi, jos käytetty selain ei tue classList ominaisuutta
    else return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

// tämä funktio lisää annetulle HTML elementille (parametri el) classin (parametri className)
export function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    // vaihtoehtoinen koodi, jos käytetty selain ei tue classList ominaisuutta
    else if (!hasClass(el, className)) el.className += " " + className;
}

//Helper function that takes the object returned from isTerminal() and adds a
//class to the board that will handle drawing the winning line's animation

// helper-funktio, joka ottaa funktion isTerminal() palauttaman objektin ja lisää pelilaudalle classin joka piirtää voittavan linjan animaation
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