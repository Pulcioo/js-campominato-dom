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

/////// 1.Creo una griglia di gioco su CSS
/////// 2.Aggiungo il div con #griglia nel documento HTML
/////// 3.Imposto la griglia su 10 righe e 10 colonne in JS

// seleziono 'griglia' tramite ID
const griglia = document.getElementById('griglia');
// variabili d'appoggio per definire righe e colonne
let colonne = 10;
let righe = 10;
// calcolo le celle totali
let celleTotali = colonne * righe;
// dichiaro variabile array vuoto dove andrò ad inserire le bombe
let arrayBombe = [];
// dichiaro variabile numero totale bombe 
const bombe = 16;

// 4.CICLO per ogni cella della griglia
for (let i = 1; i < celleTotali + 1; i++) {
    // creo la cella usando la funzione creata sotto
    const cella = creoCella();
    // aggiungo .cella nella griglia
    griglia.appendChild(cella)
    // inserisco numeri da 1 a 100 all'interno delle celle
    cella.innerText = i
    cella.addEventListener('click', function (event) {
        //se il numero della cella è contenuto nell'array bombe il bg_color sarà rosso 
        if (arrayBombe.includes(i)) {
            cella.classList.add('bg_red')
            alert('Hai calpestato una bomba...hai perso!')

            const container = document.getElementById('container');
            container.classList.add('display_none')

            const perso = document.getElementById('perso')
            perso.classList.remove('display_none')
        }
        // altrimenti il bg_color sarà blu
        cella.classList.add('bg_blue')
    })
}

// 5.Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
for (let i = 1; i <= bombe; i++) {

    let numeroRandom = generaNumeroRandom(1, celleTotali);
    while (arrayBombe.includes(numeroRandom)) {
        numeroRandom = generaNumeroRandom(1, celleTotali);
    }
    arrayBombe.push(numeroRandom);
    console.log(arrayBombe)
}

/////// FUNZIONE //////
// creo una cella tramite funzione
function creoCella() {
    const item = document.createElement('div');
    item.classList.add('cella');
    return item;
}

// creo funzione per generare un numero random da min a max
function generaNumeroRandom(min, max) {
    const range = max - min + 1;
    const risultatoRandom = Math.floor(Math.random() * range) + min;
    return risultatoRandom;

}