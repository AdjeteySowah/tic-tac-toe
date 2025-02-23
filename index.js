
let gameboard = {
   markers: Array(9).fill(null),
};


let playerFactory = function(name, marker) {
   return {
      name,
      marker,
   };
};


let gameController = {
   players: [],

   currentPlayer: null, 

   winningCombinations: [
      [0,1,2] , [3,4,5] , [6,7,8] ,       // rows
      [0,3,6] , [1,4,7] , [2,5,8] ,       // colums
      [0,4,8] , [2,4,6]                   // diagonals
   ],

   init: function() {
      this.players = [playerFactory("Player1", "X"), playerFactory("Player2", "O")];
      this.currentPlayer = this.players[0];
      this.cacheDom();
      this.pageSpecificInit();
   },

   cacheDom: function() {
      let body = document.querySelector("body");
      return body;
   },

   switchPlayer: function() {
      if (this.currentPlayer === this.players[0]) {
         this.currentPlayer = this.players[1];
      } else {
         this.currentPlayer = this.players[0];
      }
   },

   playTurn: function(cell) {
      if (gameboard.markers[cell] === null) {
         gameboard.markers[cell] = this.currentPlayer.marker;

         if (this.checkWinner()) {
            pageTwoController.updateScores();
            pageTwoController.showWinningCombination();
            setTimeout(pageTwoController.displayWinner.bind(pageTwoController), 1000);        // It waits for the blinking to occur
         } else if (this.isDraw()) {
            pageTwoController.displayDraw();
         } else {
            this.switchPlayer();
            pageTwoController.displayCurrentPlayerTurn();
         }
      }
   },

   checkWinner: function() {
      let winnerFound = false;
      this.winningCombinations.forEach((combination) => {
         let [a, b, c] = combination;
         if (gameboard.markers[a] &&
             gameboard.markers[a] === gameboard.markers[b] &&
             gameboard.markers[a] === gameboard.markers[c]) {
               winnerFound = true;
               pageTwoController.desiredWinningCombinations.push(combination);
            }
      });
      return winnerFound;
   },

   isDraw: function() {
      let draw = true;
      gameboard.markers.forEach((cell) => {
         if (cell === null) {
            draw = false;
         }
      });
      return draw;
   },

   resetGameboard: function() {
      gameboard.markers.fill(null);
   },

   pageSpecificInit: function() {
      if (this.cacheDom().classList.contains("page--1")) {
         pageOneController.init();
      } else if (this.cacheDom().classList.contains("page--2")) {
         pageTwoController.init();
      }
   },
};


   // select players
let pageOneController = {
   init: function() {
      this.cacheDom();
      this.bindEvents();
   },

   cacheDom: function() {
      this.startGame = gameController.cacheDom().querySelector(".game__start");
      this.playerSelectionOne = gameController.cacheDom().querySelector(".standalone");
      this.playerSelectionTwo = gameController.cacheDom().querySelectorAll(".choose-only-one");
   },

   bindEvents: function() {
      this.startGame.addEventListener("click", this.redirectToMainGame.bind(this));
      this.playerSelectionOne.addEventListener("click", this.changeBtnColor.bind(this));
      this.playerSelectionTwo.forEach((player) => {
         player.addEventListener("click", this.changeBtnColor.bind(this));
      });
      window.addEventListener("load", this.showAlert);
   },

   showAlert: function() {
      if (!localStorage.getItem("alertShown")) {
         alert(`Welcome to my Tic-Tac-Toe game! \n\nChoose your game mode: Player vs Player or Player vs AI. \nPlayer X always starts first. Take turns placing your markers, and get three in a row, column, or diagonal to win. \nHave Fun!`);
         localStorage.setItem("alertShown", "true");
      }
   },

   selectedPlayers: [],

   changeBtnColor: function(event) {
      if (event.target.classList.contains("standalone") && !event.target.classList.contains("selected-player")) {
         event.target.classList.add("selected-player");
      } else {
         this.playerSelectionTwo.forEach((player) => {
            if ((player === event.target) && !event.target.classList.contains("selected-player")) {
               event.target.classList.add("selected-player");
            } else if (player !== event.target) {
               player.classList.remove("selected-player");
            }
         });
      }
      this.fillSelectedPlayersArray(event);
   },

   fillSelectedPlayersArray: function(event) {
      if (event.target.classList.contains("standalone")) {
         this.selectedPlayers[0] = event.target.textContent;
      } else {
         this.selectedPlayers[1] = event.target.textContent;
      }
   },

   redirectToMainGame: function() {
      if (this.selectedPlayers[0] === undefined || this.selectedPlayers[1] === undefined) {
         alert("Please select a player type for each player");
      } else {
         window.location.href = "tic-tac-toe.html";
         sessionStorage.setItem("selectedPlayers",  JSON.stringify(this.selectedPlayers));
      }
   },
};

   // play game
let pageTwoController = {
   init: function() {
      this.cacheDom();
      this.bindEvents();
      this.render();
   },

   cacheDom: function() {
      this.dynamicContent = gameController.cacheDom().querySelector(".dynamic-content");
      this.scoreXDiv = gameController.cacheDom().querySelector(".score--for-X");
      this.scoreODiv = gameController.cacheDom().querySelector(".score--for-O");
      this.scoreX = gameController.cacheDom().querySelector(".score-X");
      this.scoreO = gameController.cacheDom().querySelector(".score-O");
      this.restartGame = gameController.cacheDom().querySelector(".game__restart");
   },

   bindEvents: function() {
      this.dynamicContent.addEventListener("click", this.placeMarkerInCell.bind(this));
      this.restartGame.addEventListener("click", this.playNewGame.bind(this));
   },

   selectedPlayers: JSON.parse(sessionStorage.getItem("selectedPlayers")),

   render: function() {
      this.dynamicContent.innerHTML = "";
         let paragraph = document.createElement("p");
         paragraph.setAttribute("class", "game__player-turn");
         paragraph.textContent = `${gameController.currentPlayer.marker} Turn`;
         this.playerTurnParagraph = paragraph;

         let div2 = document.createElement("div");
         div2.setAttribute("class", "game__gameboard");
            let div21 = document.createElement("div");
            div21.setAttribute("class", "gameboard-cell");
            div21.setAttribute("data-index", "0");
            let div22 = document.createElement("div");
            div22.setAttribute("class", "gameboard-cell");
            div22.setAttribute("data-index", "1");
            let div23 = document.createElement("div");
            div23.setAttribute("class", "gameboard-cell");
            div23.setAttribute("data-index", "2");
            let div24 = document.createElement("div");
            div24.setAttribute("class", "gameboard-cell");
            div24.setAttribute("data-index", "3");
            let div25 = document.createElement("div");
            div25.setAttribute("class", "gameboard-cell");
            div25.setAttribute("data-index", "4");
            let div26 = document.createElement("div");
            div26.setAttribute("class", "gameboard-cell");
            div26.setAttribute("data-index", "5");
            let div27 = document.createElement("div");
            div27.setAttribute("class", "gameboard-cell");
            div27.setAttribute("data-index", "6");
            let div28 = document.createElement("div");
            div28.setAttribute("class", "gameboard-cell");
            div28.setAttribute("data-index", "7");
            let div29 = document.createElement("div");
            div29.setAttribute("class", "gameboard-cell");
            div29.setAttribute("data-index", "8");
         div2.appendChild(div21);
         div2.appendChild(div22);
         div2.appendChild(div23);
         div2.appendChild(div24);
         div2.appendChild(div25);
         div2.appendChild(div26);
         div2.appendChild(div27);
         div2.appendChild(div28);
         div2.appendChild(div29);   
      this.dynamicContent.appendChild(paragraph);
      this.dynamicContent.appendChild(div2);
   },

   displayCurrentPlayerTurn: function() {
         // make the divs' border recording the scores for the players thicker
      if (gameController.currentPlayer.marker === "X") {
         this.scoreXDiv.classList.add("thick-border");
      } else {
         this.scoreXDiv.classList.remove("thick-border");
      }

      if (gameController.currentPlayer.marker === "O") {
         this.scoreODiv.classList.add("thick-border");
      } else {
         this.scoreODiv.classList.remove("thick-border");
      }
         // show whose turn it is
      this.playerTurnParagraph.textContent = `${gameController.currentPlayer.marker} Turn`;
   },

   placeMarkerInCell: function(event) {
      if (event.target.classList.contains("gameboard-cell") && gameController.currentPlayer.marker === "X") {
         if (event.target.innerHTML === "") {
            let dataIndex = event.target.getAttribute('data-index');
            let img = document.createElement("img");
            img.src = "./assets/imgs/close.svg";
            img.alt = "X";
            event.target.appendChild(img);
            gameController.playTurn(dataIndex);
         }
      } else if (event.target.classList.contains("gameboard-cell")) {
         if (event.target.innerHTML === "") {
            let dataIndex = event.target.getAttribute('data-index');
            let img = document.createElement("img");
            img.src = "./assets/imgs/circle.svg";
            img.alt = "O";
            event.target.appendChild(img);
            gameController.playTurn(dataIndex);
         }
      }
      setTimeout(this.placeMarkerInCellByAI.bind(this), 1000);
   },

   placeMarkerInCellByAI: function () {
      if (this.selectedPlayers[1] === "AI") {
         if (
            gameController.currentPlayer.marker === "O" &&
            gameController.checkWinner() === false &&
            gameController.isDraw() === false
         ) {
            let gameboardM = gameboard.markers;
            let selectedIndex = null; // To store the final move index
   
            // Check for winning move
            for (let i = 0; i < 9; i++) {
               if (gameboardM[i] === null) {
                  gameboardM[i] = "O";
                  if (gameController.checkWinner()) {
                     gameboardM[i] = null;
                     selectedIndex = i;
                     break;
                  }
                  gameboardM[i] = null;
               }
            }
   
            // Check for blocking move
            if (selectedIndex === null) {
               for (let i = 0; i < 9; i++) {
                  if (gameboardM[i] === null) {
                     gameboardM[i] = "X";
                     if (gameController.checkWinner()) {
                        gameboardM[i] = null;
                        selectedIndex = i;
                        break;
                     }
                     gameboardM[i] = null;
                  }
               }
            }
   
            // Random move (fallback)
            if (selectedIndex === null) {
               for (let i = 0; i < 9; i++) {
                  if (gameboardM[i] === null) {
                     selectedIndex = i;
                     break;
                  }
               }
            }
   
            // Place the final move
            if (selectedIndex !== null) {
               // Append image to the DOM
               let targetCell = document.querySelector(`[data-index="${selectedIndex}"]`);
               if (targetCell && targetCell.innerHTML === "") {
                  let img = document.createElement("img");
                  img.src = "./assets/imgs/circle.svg";
                  img.alt = "O";
                  targetCell.appendChild(img);
               }
   
               // Pass control back to the game
               gameController.playTurn(selectedIndex);
            }
         }
      }
   },

   desiredWinningCombinations: [],

   showWinningCombination: function() {
      let desiredWinningCombination = this.desiredWinningCombinations[this.desiredWinningCombinations.length - 1];
      let [a, b, c] = desiredWinningCombination;
      let targetCell1 = document.querySelector(`[data-index="${a}"]`);
      let targetCell2 = document.querySelector(`[data-index="${b}"]`);
      let targetCell3 = document.querySelector(`[data-index="${c}"]`);
      let targetCells = [targetCell1, targetCell2, targetCell3];

      targetCells.forEach((cell) => {
         if (cell && cell.innerHTML) {
            let tempContainer = document.createElement("div");
            tempContainer.innerHTML = cell.innerHTML;

            let imgElement = tempContainer.querySelector("img");
            if (imgElement) {
               imgElement.classList.add("blink");
               cell.innerHTML = tempContainer.innerHTML;
            }
         }
      });
   },
  

   displayWinner: function() {
      this.dynamicContent.innerHTML = "";
         let paragraph1 = document.createElement("p");
         paragraph1.setAttribute("class", "gameover-text");
         paragraph1.textContent = "Game Over";
         let paragraph2 = document.createElement("p");
         paragraph2.setAttribute("class", "gameover__marker");
            if (gameController.currentPlayer.marker === "X") {
               let img = document.createElement("img");
               img.setAttribute("src", "./assets/imgs/close.svg");
               img.setAttribute("alt", "X");
               img.setAttribute("class", "big-marker");
               paragraph2.appendChild(img);
            } else if (gameController.currentPlayer.marker === "O") {
               let img = document.createElement("img");
               img.setAttribute("src", "./assets/imgs/circle.svg");
               img.setAttribute("alt", "O");
               img.setAttribute("class", "big-marker");
               paragraph2.appendChild(img);
            }
         let paragraph3 = document.createElement("p");
         paragraph3.setAttribute("class", "gameover__result");
         paragraph3.textContent = "WINNER!"
      this.dynamicContent.appendChild(paragraph1);
      this.dynamicContent.appendChild(paragraph2);
      this.dynamicContent.appendChild(paragraph3);
   },

   displayDraw: function() {
      this.dynamicContent.innerHTML = "";
         let paragraph1 = document.createElement("p");
         paragraph1.setAttribute("class", "gameover-text");
         paragraph1.textContent = "Game Over";
         let paragraph2 = document.createElement("p");
         paragraph2.setAttribute("class", "gameover__marker");
            let img1 = document.createElement("img");
            img1.setAttribute("src", "./assets/imgs/close.svg");
            img1.setAttribute("alt", "X");
            img1.setAttribute("class", "big-marker");
            let img2 = document.createElement("img");
            img2.setAttribute("src", "./assets/imgs/circle.svg");
            img2.setAttribute("alt", "O");
            img2.setAttribute("class", "big-marker");
         paragraph2.appendChild(img1);
         paragraph2.appendChild(img2);
         let paragraph3 = document.createElement("p");
         paragraph3.setAttribute("class", "gameover__result");
         paragraph3.textContent = "DRAW!"
      this.dynamicContent.appendChild(paragraph1);
      this.dynamicContent.appendChild(paragraph2);
      this.dynamicContent.appendChild(paragraph3);
   },

   currentScoreX: 0,
   currentScoreO: 0,

   updateScores: function() {
      if (gameController.currentPlayer.marker === "X") {
         this.currentScoreX = this.currentScoreX + 1;
         this.scoreX.textContent = this.currentScoreX;
      } else {
         this.currentScoreO = this.currentScoreO + 1;
         this.scoreO.textContent = this.currentScoreO;
      }
   },

   playNewGame: function() {
      gameController.resetGameboard();
      gameController.players = [playerFactory("Player1", "X"), playerFactory("Player2", "O")];
      gameController.currentPlayer = gameController.players[0];
      this.displayCurrentPlayerTurn();
      this.render();
   },
};


gameController.init();