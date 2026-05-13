"use strict";

/*******************************************************
 *     Connect Four - 100p
 *
 *     It's gaming time! The kids from Kindergarten would
 *     love to play some connect four! Unfortunately, kids
 *     nowadays can't use any wood or paper games anymore.
 *     It's digital or they go crazy. And we don't want crazy,
 *     do we?
 *
 *     Your task is to create a nice game of connect four.
 *     Make it an interesting >digital product< (I've heard
 *     you are an expert for that)! Make it visually appealing.
 *     Wrap it into a story. Choose or create two characters
 *     with rivalry to give your game more flesh. Try to
 *     match the appearance and/or the behavior of the game to
 *     the background-story (character arch).
 *
 *     Technical requirements:
 *     The game should be intuitive to play. It's a children's
 *     game after all. Think of a good way to handle your input.
 *
 *     The two players use the same input method and play in turns
 *     (= No need for separate input).
 *
 *     The game should give some hint or warning, when a player
 *     wants to put a stone on a file that is already full.
 *
 *     The game should give a clear visual representation of
 *     the winning stones and announce the winner.
 *
 *     Use MVC and custom Events. The model dispatches events for:
 *      - Player Change (view visually highlights current player)
 *      - Stone was inserted (view visually represents all the stones)
 *      - Game is over (Draw or Winner)
 *
 *     The creation of this game should take you somewhere between
 *     8-10 hours of concentrated work.
 *     Kristina - 2026-05-13
 *******************************************************/


//TODO: Create your controller-object. When initiated, it should boot
//      the view (or views, if you decide to make a console-view).

import { gameModel } from "./model.connectfour.js";
import { view } from "./view.polished.js";

export let controller = {
    init() {
        gameModel.init();
        view.init();
        document.getElementById("gamingField").addEventListener("click", function(event) {
            let col = event.target.dataset.col;
            if (col !== undefined) {
                gameModel.insertStone(col);
            }
        })
    }
}

//TODO: Add EventListeners, to forward the user inputs to the model.

controller.init();