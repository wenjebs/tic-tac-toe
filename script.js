const gameBoard = function() {
    // create array storing results
    // let board = new Array(9).fill('X',0,5).fill('O',5,9);
    let board = new Array(9).fill('');

    // cache DOM
    const gridBoard = document.querySelector('.game-board');
    
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
        board[index] = 'X';
        render(board);
        eventListen();
    };

    render(board); 
    eventListen();
    return {board};
}();