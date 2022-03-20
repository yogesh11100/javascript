
function ageInDays(){
    var birthYear = prompt('What year were you born.....Good Fiend');
    var ageInDaysss = [2021-birthYear] * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDaysss+' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-results').append(h1);
 
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat(){
    var img = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    img.src="E:\\Pictures\\dip\\1.jpg ";
    div.appendChild(img);
}

// challenge 4
var all_buttons = document.getElementsByTagName("button");
console.log(all_buttons);

var copyAllButtons = [];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    console.log(buttonThingy.value);
    if(buttonThingy.value === 'red'){
        buttonRed();
    }
    else if(buttonThingy.value === 'green'){
        buttonGreen();
    }
    else if (buttonThingy.value === 'reset'){
        buttonColorReset();
    }
    else if(buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ['btn-primary','btn-danger','btn-success','btn-warning'];
   
    for(let i=0;i<all_buttons.length;i++){
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
        
    }
}

// challenge 6
let  blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap' :{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a')
const winSound = new Audio('sounds/cash.mp3')
const lossSound = new Audio('sounds/aww.mp3')


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-success-button').addEventListener('click',blackjackReset);


function blackjackHit(){
    let card = randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    console.log(YOU['score'])
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];

}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    let win = computeWinner();
    showResults(win);
    
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(let i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }

    for(let i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color= '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color= '#ffffff';

//    document.querySelector('#blackjack-results').textContent ="Let's play";
//    document.querySelector('#blackjack-results').style.color = 'black';

}

function updateScore(card,activePlayer){
    
    if(card === 'A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] +=blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card];
        }
    }

    activePlayer['score']+=blackjackGame['cardsMap'][card];
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];

    }
   
}


function dealerLogic(){
    let card= randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    
}

//compute winner and return who just won
function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
           
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score']<DEALER['score']){
           
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            
            blackjackGame['draws']++;

        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
       
        blackjackGame['draws']++;

    }

    console.log(blackjackGame);
    return winner;
} 

function showResults(winner){
    let message,messageColor;

    
    if(winner === YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    }
    else if (winner === DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You lost!';
        messageColor='red';
        lossSound.play();

    }
    else{
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You drew';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color=messageColor;
}

