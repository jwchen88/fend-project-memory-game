/*
 * Create a list that holds all of your cards
 */
 let cards=["fa-diamond",
         "fa-paper-plane-o",
         "fa-anchor",
         "fa-bolt",
         "fa-cube",
         "fa-anchor",
         "fa-leaf",
         "fa-bicycle",
         "fa-diamond",
         "fa-bomb",
         "fa-leaf",
         "fa-bomb",
         "fa-bolt",
         "fa-bicycle",
         "fa-paper-plane-o",
         "fa-cube"];

function generateCard(card){
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

let moves=0;
let moveCounter=document.querySelector('.moves');
let stars=document.querySelector('.stars');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function initGame(){
   const deck=document.querySelector('.deck');
   let moveCounter=document.querySelector('.moves');
   const cardHtml=shuffle(cards).map(function(card){
     return generateCard(card);
   });
   deck.innerHTML=cardHtml.join('');

   moves=0;
   moveCounter.innerHTML=moves;


 }

 initGame();

 const allCards=document.querySelectorAll('.card');
 let openCards=[];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//click cards
allCards.forEach(function(card){
  card.addEventListener('click',function(evt){
    //check if cards already clicked first
    if(!card.classList.contains('open')&&!card.classList.contains('show')&&!card.classList.contains('match')&&openCards.length<2){
    openCards.push(card);
    card.classList.add('open','show');
    if (openCards.length==2){
      //count Moves
      countMoves();
      //match Cards
      if(openCards[0].dataset.card===openCards[1].dataset.card){
        matched()
      } else {
        unmatched()
      }
    }}
  });
});

function countMoves(){
  moves++;
  const moveCounter=document.querySelector('.moves');
  moveCounter.innerHTML=moves;
}

function matched(){
  openCards[0].classList.add('match');
  openCards[0].classList.remove('open');
  openCards[0].classList.remove('show');

  openCards[1].classList.add('match');
  openCards[1].classList.remove('open');
  openCards[1].classList.remove('show');

  openCards=[];
}

function unmatched(){
  setTimeout(function(){
    openCards[0].classList.remove('open');
    openCards[0].classList.remove('show');
    openCards[0].classList.remove("unmatched");

    openCards[1].classList.remove('open');
    openCards[1].classList.remove('show');
    openCards[1].classList.remove("unmatched");

    openCards=[];
},1000);
}
