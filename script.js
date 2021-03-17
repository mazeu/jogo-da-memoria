const cards = document.querySelectorAll('.card');
let hasFlipCard = false;
let firstCard, secondCard;
let lockBoard = false;
let numCartas = 20;
let pontos = 0;
let isGameOver = false;
audio = document.getElementById('audio');

function play() {
    audio.play();
    audio.volume = 0.2;
}
function pause(){
    audio.pause();
}

function pararAudio(){
pause();
audio.currentTime = 0;
}

function flipCard(){
    if(lockBoard)return;
    if(this === firstCard)return;
    
    this.classList.add('flip');
    if(!hasFlipCard){
        hasFlipCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipCard = false;
    checkForMatch();
}

function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        pontos++;
        disableCards();
        
        if(pontos == (numCartas/2)){
            isGameOver = true;
            setTimeout(() => {
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
                createButton();
                
                pontos = 0;
                pararAudio();
            }, 1500);
            
        }
        return;
    }
    unflipCard();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCard(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

function resetBoard(){
    [hasFlipCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function embaralha(){
    cards.forEach((card)=>{
        let randomPosition = Math.floor(Math.random()*numCartas);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card)=>{
    card.addEventListener('click', flipCard)
});



function jogar(){
    window.location.reload();
}

function createButton()
{
     var btn = document.createElement('BUTTON');
     var lbl = document.createTextNode("Jogar");        
     btn.appendChild(lbl);   
     btn.onclick = function()
     {
        jogar()
     }
     document.body.appendChild(btn);    
}
