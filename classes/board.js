
class Board {
    // pelilaudan alustaminen
    constructor(state = ["", "", "", "", "", "", "", "", ""]) {
        this.state = state;
    }
    // tulostaa pelilaudan nykyisellä tilallaan
    printFormattedBoard() {
        // luo thjän merkkijonon laudan tarkastamiseen
        let formattedString = "";
        // käy läpi jokaisen solun tilan laudalla
        this.state.forEach((cell, index) => {
            // lisää symbolin tai tyhjän tilan merkkijonoon
            formattedString += cell ? ` ${cell} |` : "   |";
             /*  Joka kolmannen solun jälkeen se poistaa viimeisen merkin (peräkkäisen pystyviivan) formattedStringistä. 
             Tämän jälkeen, jos nykyinen indeksi on alle 8 (mikä tarkoittaa, että lisää rivejä on tulossa), se lisää rivinvaihdon ja erotinviivan, 
             joka koostuu viivoista. */
            if ((index + 1) % 3 === 0) {
                formattedString = formattedString.slice(0, -1);
                 // Lisää vaakasuorat erot rivien välille, paitsi viimeiselle riville
                if (index < 8)
                    formattedString +=
                        "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
            }
        });
        
    }
    // tarkistaa onko pelilauta tyhjä
    isEmpty() {
        return this.state.every(cell => !cell);
    }
    // tarkistaa on pelilaudalla enempää tilaa
    isFull() {
        return this.state.every(cell => cell);
    }

    insert(symbol, position) {
        // tarkistaa onko haluttu paikka kelvollinen soluindeksi
        if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
            throw new Error("Cell index does not exist!");
        }
        // tarkistaa onko symboli oikea eli x tai o
        if (!["x", "o"].includes(symbol)) {
            throw new Error("The symbol can only be x or o!");
        }
        // tarkistaa onko tietty solu tyhjä
        if (this.state[position]) {
            return false;
        }
        // asettaa symbolin haluttuun paikkaan
        this.state[position] = symbol;
        return true;
    }
    // palauttaa taulukon, joka sisältää nykyisen tilan mahdolliset siirrot
    getAvailableMoves() {
        const moves = [];
        this.state.forEach((cell, index) => {
            if (!cell) moves.push(index);
        });
        return moves;
    }
    
    isTerminal() {
        // palauttaa falsen jos pelilauta on tyhjä
        if (this.isEmpty()) return false;
        // tarkistaa vaakauorat voitot
        if (this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
            return { winner: this.state[0], direction: "H", row: 1 };
        }
        if (this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
            return { winner: this.state[3], direction: "H", row: 2 };
        }
        if (this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
            return { winner: this.state[6], direction: "H", row: 3 };
        }

        // tarkistaa pystysuorat voitot
        if (this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
            return { winner: this.state[0], direction: "V", column: 1 };
        }
        if (this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
            return { winner: this.state[1], direction: "V", column: 2 };
        }
        if (this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
            return { winner: this.state[2], direction: "V", column: 3 };
        }

        // tarkistaa diagonaaliset voitot
        if (this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
            return { winner: this.state[0], direction: "D", diagonal: "main" };
        }
        if (this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
            return { winner: this.state[2], direction: "D", diagonal: "counter" };
        }

        // jos voittajaa ei tule se on tasapeli
        if (this.isFull()) {
            return { winner: "draw" };
        }

        return false;
    }
}
export default Board;