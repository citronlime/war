let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const messageDisplay = document.getElementById("message")
const remainingDisplay = document.getElementById("remaining")
const c1ScoreDisplay = document.getElementById("c1Score")
const c2ScoreDisplay = document.getElementById("c2Score")
let message
let winner
let computerScore = 0
let playerScore = 0
let arrClothes = ["JACK", "QUEEN", "KING", "ACE"]
let arrClothes2 = ["2","3","4","5","6","7","8","9","10","JACK", "QUEEN", "KING", "ACE"]

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            drawCardsBtn.disabled = false;
            c1ScoreDisplay.textContent = "0"
            c2ScoreDisplay.textContent = "0"
            messageDisplay.textContent = "WAR GAME"
            remainingDisplay.textContent = "Cards remaining: " + data.remaining
          
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardsBtn.addEventListener("click", () => {
    messageDisplay.textContent = ""
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                   
                     <img src=${data.cards[0].image} class="card" />
                 `
            cardsContainer.children[1].innerHTML = `
                     
                     <img src=${data.cards[1].image} class="card" />
                 `
                              remainingDisplay.textContent = "Cards remaining " + data.remaining
            console.log(data)

            messageDisplay.textContent = getWinner(data.cards[0], data.cards[1])
                          drawCardsBtn.disabled =  checkTotalWinner(data.remaining)

        })
})
function checkTotalWinner(remaining){
    if(remaining > 0 ){
        return false
    }else{
        let winner
        if(computerScore === playerScore){
            winner = "- IT IS A DRAW"
        } else{
           winner =  computerScore > playerScore ? "COMPUTER" : "PLAYER"
        }

      messageDisplay.textContent = "The WINNER of the GAME is " + winner
        return true
    }
}

function getWinner(card1, card2){
    let c1 = card1.value
    let c2 = card2.value
    let c1Clothes
    let c2Clothes
    if (c1 === c2){
       message = "It is draw"
        winner = 0
       return message
    }
       c1Clothes = arrClothes2.indexOf(c1)
    c2Clothes = arrClothes2.indexOf(c2)

    if(Number(c1Clothes) > Number(c2Clothes)) {
        winner = c1
        message = "The winner is card 1 " + c1
        computerScore++
               c1ScoreDisplay.textContent = computerScore.toString()
    }else {
        winner = c2
        message = "The winner is card 2 " + c2
        playerScore++
         c2ScoreDisplay.textContent = playerScore.toString()
    }

    return message
}
