import Board from "./board.js";

export default class Player {
    constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }
    getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
        // tyhjätään nodesMap jos funktiota kutsutaan uutta liikettä varten
        if (depth == 0) this.nodesMap.clear();

        //If the board state is a terminal one, return the heuristic value
        if (board.isTerminal() || depth === this.maxDepth) {
            if (board.isTerminal().winner === "x") {
                return 100 - depth;
            } else if (board.isTerminal().winner === "o") {
                return -100 + depth;
            }
            return 0;
        }

        // jos tietokone aloittaa
        if (maximizing) {
             // Alusta muuttuja best alhaisimmalla mahdollisella arvolla
            let best = -100;
            // Käy läpi kaikki tyhjät solut
            board.getAvailableMoves().forEach(index => {
                // Alusta uusi pelilauta kopiona nykyisestä pelilaudan tilasta
                const child = new Board([...board.state]);
                 // Luo lapsisolmu (?) lisäämällä symbooli x nykyiseen tyhjään soluun
                child.insert("x", index);
                 // Kutsu rekursiivisesti getBestMove-funktiota tällä kertaa uudella laudalla, tietokoneen vuorolla ja lisäämällä depth-muuttujaan 1
                const nodeValue = this.getBestMove(child, false, callback, depth + 1);
                // Päivitä paras arvo
                best = Math.max(best, nodeValue);

                //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
                if (depth == 0) {
                    //Comma separated indices if multiple moves have the same heuristic value
                    const moves = this.nodesMap.has(nodeValue)
                        ? `${this.nodesMap.get(nodeValue)},${index}`
                        : index;
                    this.nodesMap.set(nodeValue, moves);
                }
            });
            // Jos kyseessä on pääfunktion kutsu, palauta parhaan liikkeen indeksi tai satunnainen indeksi, jos useilla indekseillä on sama arvo
            if (depth == 0) {
                let returnValue;
                if (typeof this.nodesMap.get(best) == "string") {
                    const arr = this.nodesMap.get(best).split(",");
                    const rand = Math.floor(Math.random() * arr.length);
                    returnValue = arr[rand];
                } else {
                    returnValue = this.nodesMap.get(best);
                }
                // Suorita callback laskennan jälkeen ja palauta indeksi
                callback(returnValue);
                return returnValue;
            }
            // Jos kyseessä ei ole pääfunktion kutsu, palauta seuraavan laskennan heuristinen arvo
            return best;
        }

        // jos tietokone ei aloita
        if (!maximizing) {
            // Alusta muuttuja best korkeimmalla mahdollisella arvolla
            let best = 100;
            // Käy läpi kaikki tyhjät solut
            board.getAvailableMoves().forEach(index => {
                // Alusta uusi pelilauta kopiona nykyisestä pelilaudan tilasta
                const child = new Board([...board.state]);

                // Luo lapsisolmu (?) lisäämällä symbooli o nykyiseen tyhjään soluun
                child.insert("o", index);

                // Kutsu rekursiivisesti getBestMove-funktiota tällä kertaa uudella laudalla, tietokoneen vuorolla ja lisäämällä depth-muuttujaan 1
                let nodeValue = this.getBestMove(child, true, callback, depth + 1);
                // Päivitä paras arvo
                best = Math.min(best, nodeValue);

                // Jos kyseessä on pääfunktion kutsu, joka ei ole rekursiivinen, yhdistä jokainen heuristinen arvo sen siirtojen indekseihin
                if (depth == 0) {
                    // Pilkuilla erotetut indeksit, jos usealla liikkeellä on sama heuristinen arvo
                    const moves = this.nodesMap.has(nodeValue)
                        ? this.nodesMap.get(nodeValue) + "," + index
                        : index;
                    this.nodesMap.set(nodeValue, moves);
                }
            });
            // Jos kyseessä on pääfunktion kutsu, palauta parhaan liikkeen indeksi tai satunnainen indeksi, jos useilla indekseillä on sama arvo
            if (depth == 0) {
                let returnValue;
                if (typeof this.nodesMap.get(best) == "string") {
                    const arr = this.nodesMap.get(best).split(",");
                    const rand = Math.floor(Math.random() * arr.length);
                    returnValue = arr[rand];
                } else {
                    returnValue = this.nodesMap.get(best);
                }
                // Suorita callback laskennan jälkeen ja palauta indeksi
                callback(returnValue);
                return returnValue;
            }
            // Jos kyseessä ei ole pääfunktion kutsu, palauta seuraavan laskennan heuristinen arvo
            return best;
        }
    }
}