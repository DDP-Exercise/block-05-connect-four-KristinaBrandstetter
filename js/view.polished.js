"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.

export let view = {
    init() {
        let field = document.getElementById("gamingField");
        for (let row = 0; row <= 5; row++) {
            for (let col = 0; col <= 6; col++) {
                let cell = document.createElement("div");
                cell.dataset.row = row;
                cell.dataset.col = col;
                let circle = document.createElement("div");
                circle.classList.add("circle");
                circle.dataset.col = col;
                cell.appendChild(circle);
                field.appendChild(cell);
            }
        }
        document.addEventListener("connectfour:insertStone", function(event) {
            let field = event.detail.gamingField;
            let cells = document.querySelectorAll("#gamingField > div");
            cells.forEach(cell => {
                let row = parseInt(cell.dataset.row);
                let col = parseInt(cell.dataset.col);
                let circle = cell.querySelector(".circle");
                if (field[row][col] === 1) {
                    circle.style.backgroundColor = "#555d6a"; // Tom
                } else if (field[row][col] === 2) {
                    circle.style.backgroundColor = "#8b5e3c"; // Jerry
                } else {
                    circle.style.backgroundColor = "#d4a843"; // leer
                }
            });
        });
        document.addEventListener("connectfour:playerchange", function(event) {
            let currentPlayer = event.detail.currentPlayer;

            document.getElementById("Tom").classList.remove("active");
            document.getElementById("Jerry").classList.remove("active");
            document.getElementById("TomDisplay").classList.remove("active");
            document.getElementById("JerryDisplay").classList.remove("active");

            if (currentPlayer.id === 1) {
                document.getElementById("Tom").classList.add("active");
                document.getElementById("TomDisplay").classList.add("active");
            } else {
                document.getElementById("Jerry").classList.add("active");
                document.getElementById("JerryDisplay").classList.add("active");
            }
        });
        document.addEventListener("connectfour:gameOver", function(event) {
            let winner = event.detail.winner;
            let winningStones = event.detail.winningStones;
            let message = document.getElementById("message");

            if (winner === null) {
                message.textContent = "Unentschieden!";
            } else {
                message.textContent = winner.name + " hat gewonnen!";

                for (let i = 0; i < winningStones.length; i++) {
                    let row = winningStones[i].row;
                    let col = winningStones[i].col;
                    let cell = document.querySelector("[data-row='" + row + "'][data-col='" + col + "']");
                    cell.querySelector(".circle").style.border = "3px solid gold";
                }
            }
        });
        document.addEventListener("connectfour:columnFull", function(event) {
            let message = document.getElementById("message");
            message.textContent = "Spalte " + (event.detail.col + 1) + " ist voll!";
        });
    }
}

//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played.


//TODO: Show the current player

//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.
