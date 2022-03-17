console.log("JS OK")
/*
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati -
abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro
e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/

// array vuoto dove andrò ad inserire le bombe
let arrayBombe = [];
// variabile punteggio
let punteggio = 0;
// numero totale bombe 
const bombe = 16;



// recupero bottoni ed aggiungo eventi al click a seconda della difficoltà
const bottoneFacile = document.getElementById('facile');
const bottoneMedia = document.getElementById('media');
const bottoneDifficile = document.getElementById('difficile');


bottoneFacile.addEventListener('click', () => iniziaGioco(100, 'facile'));
bottoneMedia.addEventListener('click', () => iniziaGioco(81, 'media'));
bottoneDifficile.addEventListener('click', () => iniziaGioco(17, 'difficile'));



function iniziaGioco(celleTotali, classiDifficoltà) {

    generaBombe(celleTotali);

    creaElementiInGriglia(celleTotali, classiDifficoltà);

    aggiungiClickCelle(celleTotali);

}



function aggiungiClickCelle(celleTotali) {

    // aggiungo evento al click
    for (let i = 1; i <= celleTotali; i++) {
        const cella = document.getElementById('cella-' + i);
        cella.addEventListener('click', () => {
            const fineGioco = controlloClick(cella, i)

            if (fineGioco) {
                bloccoCelle()
                console.log(punteggio);
                alert('Bravo! Il tuo punteggio è di ' + punteggio)

            } else {
                punteggio++;
                console.log(punteggio);
                cella.classList.add('click');
                const celleNonBombe = celleTotali - bombe
                if (punteggio >= celleNonBombe) {
                    bloccoCelle();
                    alert('Bravo! Il tuo punteggio è di ' + punteggio)
                }
            }
        })

    }
}


// blocco le celle in caso di fine gioco
function bloccoCelle() {
    const griglia = document.getElementById('griglia');
    griglia.classList.add('blocco_griglia')
}



function controlloClick(cella, i) {
    // se il numero i è contenuto nell'array bombe allora bg_red
    // altrimenti gb_blue
    const èBomba = arrayBombe.includes(i) === true

    if (èBomba) {
        cella.classList.add('bg_red')
    } else {
        cella.classList.add('bg_blue')
    }

    return èBomba;
}



function creaElementiInGriglia(celleTotali, classiDifficoltà) {

    // seleziono 'griglia' tramite ID
    const griglia = document.getElementById('griglia');

    // resetto il contenuto della griglia 
    griglia.innerHTML = '';

    // CICLO per ogni cella della griglia
    for (let i = 1; i < celleTotali + 1; i++) {
        // creo la cella usando la funzione creata sotto
        const cella = creo();
        cella.id = 'cella-' + i;
        cella.classList.add(classiDifficoltà)
        // aggiungo .cella nella griglia
        griglia.appendChild(cella)
        // inserisco numeri da 1 a 100 all'interno delle celle
        cella.innerText = i
    }

}


// creo una cella tramite funzione
function creo() {
    const item = document.createElement('div');
    item.classList.add('cella');
    return item;
}



// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
function generaBombe(celleTotali) {

    for (let i = 1; i <= bombe; i++) {
        let numeroRandom = generaNumeroRandom(1, celleTotali);
        while (arrayBombe.includes(numeroRandom)) {
            numeroRandom = generaNumeroRandom(1, celleTotali);
        }
        arrayBombe.push(numeroRandom);
        console.log(arrayBombe)
    }
}



// creo funzione per generare un numero random da min a max
function generaNumeroRandom(min, max) {
    const range = max - min + 1;
    const risultatoRandom = Math.floor(Math.random() * range) + min;
    return risultatoRandom;

}