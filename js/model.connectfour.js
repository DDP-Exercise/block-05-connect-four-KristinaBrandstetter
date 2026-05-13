"use strict";

//TODO: Think of this model as the game-logic.
//      The model knows everything that is neccessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.


export let gameModel = {
    PLAYER1: {
        name: "Tom",
        id: 1,
        color: "grey",
    },

    PLAYER2: {
        name: "Jerry",
        id: 2,
        color: "brown",
    },

    gamingField: [
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
    ],

    currentPlayer: null,
    init() {
        this.currentPlayer = this.PLAYER1;
    },

    gameCounter: 2,
    gameOver: false,
    winningStones: [],

    insertStone(col) {
        if (this.gamingField [0][col] === 1 || this.gamingField [0][col] === 2){
            this.dispatchColumnFull(col)
            return;
        } else {
            for (let i = 5; i >= 0; i--) {
                if (this.gamingField[i][col] === 0) {
                    this.gamingField[i][col] = this.currentPlayer.id;
                    this.dispatchInsertStone();
                    this.checkWin(i, col);
                    this.checkDraw()
                    if (!this.gameOver) {
                        this.setCurrentPlayer();
                    }
                    break;

                }
            }
        }

    },

    setCurrentPlayer() {
        if (this.gameCounter % 2 == 0) {
            this.currentPlayer = this.PLAYER2;
            this.gameCounter++;
        } else {
            this.currentPlayer = this.PLAYER1
            this.gameCounter++;
        }
        this.dispatchPlayerChange()
    },

    checkDraw() {
        for (let i = 0; i < 7; i++) {
            if (this.gamingField[0][i] === 0) {
                return;
            }
        }
        this.gameOver = true;
        this.dispatchGameOver(null);
    },

    checkWin(row, col) {
        let counter = 0;
        for (let i = 0; i <= 6; i++) { //checks horizintal
            if (this.gamingField[row][i] === this.currentPlayer.id) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 4) {
                let winner = this.currentPlayer;
                this.gameOver = true;
                this.winningStones[0] = { row: row, col: i };
                this.winningStones[1] = { row: row, col: i - 1 };
                this.winningStones[2] = { row: row, col: i - 2 };
                this.winningStones[3] = { row: row, col: i - 3 };
                this.dispatchGameOver(winner);
                return
            }
        }
        counter = 0;
        for (let i = 0; i <= 5; i++) { //checks vertical
            if (this.gamingField[i][col] === this.currentPlayer.id) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 4) {
                let winner = this.currentPlayer;
                this.gameOver = true;
                this.winningStones[0] = { row: i, col: col };
                this.winningStones[1] = { row: i - 1, col: col };
                this.winningStones[2] = { row: i - 2, col: col};
                this.winningStones[3] = { row: i - 3, col: col };
                this.dispatchGameOver(winner);
                return
            }
        }

        let tempStones1 = [];
        tempStones1.push({ row: row, col: col });

        let counterDiag1 = 0;
        for (let i = 1; row + i <= 5 && col + i <= 6; i++) {
            if (this.gamingField[row + i][col + i] === this.currentPlayer.id) {
                counterDiag1++;
                tempStones1.push({ row: row + i, col: col + i})

            } else {
                break;
            }
        }
        for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
            if (this.gamingField[row - i][col - i] === this.currentPlayer.id) {
                counterDiag1++;
                tempStones1.push({ row: row - i, col: col - i})
            } else {
                break;
            }
        }
        if (counterDiag1 + 1 >= 4) {
            let winner = this.currentPlayer;
            this.gameOver = true;
            this.winningStones = tempStones1;
            this.dispatchGameOver(winner);
            return;
        }

        let tempStones2 = [];
        tempStones2.push({ row: row, col: col });

        let counterDiag2 = 0;
        for (let i = 1; row - i >= 0 && col + i <= 6; i++) {
            if (this.gamingField[row  -i][col + i] === this.currentPlayer.id) {
                counterDiag2++;
                tempStones2.push({ row: row - i, col: col + i})

            } else {
                break;
            }
        }
        for (let i = 1; row + i <= 5 && col - i >= 0; i++) {
            if (this.gamingField[row + i][col - i] === this.currentPlayer.id) {
                counterDiag2++;
                tempStones2.push({ row: row + i, col: col - i})
            } else {
                break;
            }
        }
        if (counterDiag2 + 1 >= 4) {
            let winner = this.currentPlayer;
            this.gameOver = true;
            this.winningStones = tempStones2;
            this.dispatchGameOver(winner);
            return;
        }

    },

    dispatchPlayerChange() {
        const playerChange = new CustomEvent("connectfour:playerchange", {
            detail: {currentPlayer: this.currentPlayer}
        });
        document.dispatchEvent(playerChange);
    },

    dispatchInsertStone() {
        const insertStone = new CustomEvent("connectfour:insertStone", {
            detail: {gamingField: this.gamingField}
        });
        document.dispatchEvent(insertStone);
    },

    dispatchGameOver(winner) {
        const gameOver = new CustomEvent("connectfour:gameOver", {
            detail: {
                winner: winner,
                winningStones: this.winningStones,
            }
        });
        document.dispatchEvent(gameOver);
    },

    dispatchColumnFull(col) {
        const columnFull = new CustomEvent("connectfour:columnFull", {
            detail: {col: col}
        });
        document.dispatchEvent(columnFull);
    }

}

//TODO: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.



//TODO: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

//TODO: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.
//      Hint: This method will be called later by your controller, when the
//      user makes an according input.


//TODO: Methods to check if the game is over, either by draw or a win.
//      Let the world know in both cases what happend. If it's a win,
//      Don't forget to store the winning stones and add this >detail<
//      to your custom event.

//TODO: Method to change the current player (and dispatch the according event).
