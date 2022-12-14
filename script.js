const gameBoard = function() {
    // create array storing results
    let board = new Array(9).fill('');

    // cache DOM
    const gridBoard = document.querySelector('.game-board');
    const playerOneDisplay = document.querySelector('.playerOne');
    const playerTwoDisplay = document.querySelector('.playerTwo');
    // Render board
    const render = function(array) {
        gridBoard.replaceChildren();
        let count = 0;
        array.forEach(element => {
            let square = document.createElement('div');
            square.dataset.number = count;
            square.textContent = element;
            gridBoard.appendChild(square);
            count++;
        });
    };
    // Add event listener
    const eventListen = function() {
        const grids = document.querySelectorAll('.game-board>div');
        grids.forEach(grid => {
            grid.addEventListener('click', replaceGridText.bind(grid));
        });
    };
    // replace grid text
    const replaceGridText = function() {
        let index = this.dataset.number;
        if (board[index] === 'X'||board[index] === 'O') {
            alert('stop u CANT DO THAT');
            return;
        }
        if (currentPlayer===playerOne) {
            board[index] = playerOne.marker;
            render(board);
            if (winCondition(board)) {
                alert(`${playerOne.name} won!`)
                resetBoard();
            }
            if (tieCondition(board)) {
                alert(`Tie!`)
                resetBoard();
            }
            currentPlayer = playerTwo;
        } else {
            board[index] = playerTwo.marker;
            render(board);
            if (winCondition(board)) {
                alert(`${playerTwo.name} won!`)
                resetBoard();
            }
            if (tieCondition(board)) {
                alert(`Tie!`)
                resetBoard();
            }
            currentPlayer = playerOne;
        };
        
        eventListen();
    };
    const resetBoard = function() {
        board = ['','','','','','','','',''];
        render(board);
        return;
    }
    const tieCondition = function(array) {
        return (!array.includes(''));
    }
    const winCondition = function(array) {
        const horizontal = [0,3,6].map(num => {return [num, num+1,num+2]});
        const vertical = [0,1,2].map(num => {return [num, num+3,num+6]});
        const diagonal = [[0,4,8],[2,4,6]];
        let winningArrays = [].concat(horizontal).concat(vertical).concat(diagonal);
        let checkWin = winningArrays.some(winIndex => {
            return (array[winIndex[0]] === currentPlayer.marker && array[winIndex[1]] === currentPlayer.marker && array[winIndex[2]] === currentPlayer.marker)
        });
        return checkWin;
    };
    render(board); 
    eventListen();
    return {playerOneDisplay, playerTwoDisplay};
}();

const createPlayer = function(name, marker) {
    if (marker === 'X') gameBoard.playerOneDisplay.textContent = `Player One : ${name} (${marker})`
    gameBoard.playerTwoDisplay.textContent = `Player Two : ${name} (${marker})`
    return {name, marker};
};


let playerOne = createPlayer('bob', 'X');
let playerTwo = createPlayer('jon', 'O');
let currentPlayer = playerOne; 