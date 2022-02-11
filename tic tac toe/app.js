// HTML elements

const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');//catching as arrays

//  game constants
const xSymbol  = '✕';
const oSymbol = '◯';
 


 
// game variables

let gameIsLive = true;
let xIsNext = true; // if true then X has turn and if its false then its O's turn
let winner  = null;
//functions

const letterToSymbol = (letter)=> letter === 'x' ? xSymbol : oSymbol;

const handlewin = (letter)=> {
    gameIsLive =false;
    winner = letter;
    if(winner == 'x')
        {
            statusDiv.innerHTML = `${letterToSymbol(winner)} has won`;
        }
        else{
            statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won</span>`;
        }    

};

const checkGameStatus = ()=>{
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRIght = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    //is there a winner
    //horizontal cases
    if(topLeft && topLeft === topMiddle && topLeft == topRIght){
        handlewin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }
    else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handlewin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handlewin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    //vertical cases
    else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft)
    {
        handlewin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handlewin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(topRIght && topRIght === middleRight && topRIght === bottomRight){
        handlewin(topRIght);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    // diagonal cases
    else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        handlewin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topRIght && topRIght === middleMiddle && topRIght === bottomLeft)
    {
        handlewin(topRIght);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    //tie logic
    else if(topLeft && topMiddle && topRIght && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight)
    {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    }
    //final condition
    else{
            xIsNext = !xIsNext;
            if(xIsNext){
                statusDiv.innerHTML = `${xSymbol} is next`;
            }
            else{
                statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
            }
    }



};


//event handlers

const handleReset = ()=>{
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};

const handleCellClick = (e)=>{
    const classList = e.target.classList;
    
    if(!gameIsLive || classList[2] == 'x' || classList[2] == 'o')
    {
        return;
    }


    if (xIsNext){
        classList.add('x');
        checkGameStatus();
        

    }
    else{
        classList.add('o');
        checkGameStatus();
        
    }
};


// event listeners
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick);
}