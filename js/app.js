"use strict";
/*
 * Create a list that holds all of your cards
 */
const cardList=["fa-diamond",
         "fa-paper-plane-o",
         "fa-anchor",
         "fa-bolt",
         "fa-cube",
         "fa-leaf",
         "fa-bicycle",
         "fa-bomb"];
const cards=cardList.concat(cardList);

function generateCard(card){
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

let openCards=[];

let moves=0;
let moveCounter=document.querySelector('.moves');

let newStart=true;

let stars=document.querySelector('.stars');

let time=0;
let timer=document.querySelector('.timer');

let matchedCards=document.querySelector('.matched');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function initGame(){
   const deck=document.querySelector('.deck');
   const cardHtml=shuffle(cards).map(function(card){
     return generateCard(card);
   });
   deck.innerHTML=cardHtml.join('');

   newStart=true;

   moves=0;
   moveCounter.innerHTML=moves;
   //reset stars
   stars.children[0].style.display='';
   stars.children[1].style.display='';

   time=0;
   timer.innerHTML=time;

   clickCards();
 }

 initGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

function clickCards(){
let allCards=document.querySelectorAll('.card');
//click cards
allCards.forEach(function(card){
  card.addEventListener('click',function(evt){
    //start timer at the first click
    if(newStart){
      newStart=false;
      startTimer();
    }
    //check if cards already clicked first and can't click more than two cards
    if(!card.classList.contains('open')&&!card.classList.contains('show')&&!card.classList.contains('match')&&openCards.length<2){
    openCards.push(card);
    card.classList.add('open','show');
    if (openCards.length==2){
      //count Moves
      countMoves();
      //remove stars
      removeStar();
      //match Cards
      if(openCards[0].dataset.card===openCards[1].dataset.card){
        matched();
        //finshi game if all cards are matched
        finishGame();
      } else {
        unmatched();
      }
    }}
  });
});
}

function countMoves(){
  moves++;
  const moveCounter=document.querySelector('.moves');
  moveCounter.innerHTML=moves;
}

function removeStar(){
  if(moves==17){
    stars.children[0].style.display='none';
  }else if(moves==25){
    stars.children[1].style.display='none';
  }
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

    openCards[1].classList.remove('open');
    openCards[1].classList.remove('show');

    openCards=[];
},1000);
}

function startTimer(){
  if(newStart==false){
    setTimeout('startTimer()',1000);
    timer.innerHTML=time;
    time++;
  }
}

/*
 * Congratulations Popup
 */
 let modal= document.querySelector('.modal');
 let modalOverlay= document.querySelector('.modal-overlay');

 function finishGame(){
   if (document.querySelectorAll('.match').length===16){
     newStart=true;
     openModal();
     showResult();
   }
 }

 function openModal(){
   modal.addEventListener('keydown', trapTabKey);
   modalOverlay.addEventListener('click', closeModal);
   //Play again button
   let replayBtn=modal.querySelector('#replay');
   replayBtn.addEventListener('click',replay);
   //Cancel button
   let cancelBtu=modal.querySelector('#cancel');
   cancelBtu.addEventListener('click', closeModal);

   let focusable=modal.querySelectorAll('button, [href], input, [tabindex="0"]');
   let first=focusable[0];
   let last=focusable[focusable.length - 1];

   modal.style.display='block';
   modalOverlay.style.display='block';

   first.focus();

   function trapTabKey(e){
     if(e.keyCode === 9){
       if(e.shiftKey){
         if(document.activeElement===first){
           e.preventDefault();
           last.focus();
         }
       } else {
         if(document.activeElement===last){
           e.preventDefault();
           first.focus();
         }
       }
     }
     if (e.keyCode === 27){
       closeModal();
     }
   }
 }

function replay(){
  closeModal();
  initGame();
}

function closeModal(){
  modal.style.display="none";
  modalOverlay.style.display="none";
}

function showResult(){
  const endTime=document.querySelector('.endTime');
  const countingTime=document.querySelector('.timer').innerHTML;
  endTime.innerHTML =`Time: ${countingTime} Seconds`;

  const endStars=document.querySelector('.endStars');
  const visibleStars=document.querySelector('.stars').innerHTML;
  endStars.innerHTML=`Star Rating: ${visibleStars}`;

  const endMoves=document.querySelector('.endMoves');
  endMoves.innerHTML = `Moves: ${moves}`;
}
