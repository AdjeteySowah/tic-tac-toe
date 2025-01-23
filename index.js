
let gameboard = {
   markers: Array(9).fill(null),
};


let playerFactory = function(name, marker) {
   return {
      name,
      marker,
   }
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
         console.log(`${this.currentPlayer.name}(${this.currentPlayer.marker}) has selected cell ${cell}`);

         if (this.checkWinner()) {
            console.log(`${this.currentPlayer.name} wins!`);
            this.resetGameboard();
         } else if (this.isDraw()) {
            console.log("It's a draw!")
            this.resetGameboard();
         } else {
            this.switchPlayer();
         }
      } else {
         console.log("Selected cell is already taken!");
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

   resetGameboard: function() {           // check this function
      gameboard.markers.fill(null);
      this.init();
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
   },

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
   },

   redirectToMainGame: function() {
      window.location.href = "tic-tac-toe.html";
   },
};

   // play game
let pageTwoController = {
   init: function() {
      this.cacheDom();
      // this.bindEvents();
      this.render();
   },

   cacheDom: function() {
      this.dynamicContent = gameController.cacheDom().querySelector(".dynamic-content");
   },

   // bindEvents: function() {

   // },

   render: function() {
      this.dynamicContent.innerHTML = "";
         let div1 = document.createElement("div");
         div1.setAttribute("class", "game__scores");
            let div11 = document.createElement("div");
            div11.setAttribute("class", "score--for-X");
               let img1 = document.createElement("img");
               img1.setAttribute("src", "./assets/imgs/close.svg");
               img1.setAttribute("alt", "X");
               let paragraph1 = document.createElement("p");
               paragraph1.setAttribute("class", "score-X");
               paragraph1.innerHTML = "&#x2013;";
            div11.appendChild(img1);
            div11.appendChild(paragraph1);
            let div12 = document.createElement("div");
            div12.setAttribute("class", "score--for-O");
               let img2 = document.createElement("img");
               img2.setAttribute("src", "./assets/imgs/circle.svg");
               img2.setAttribute("alt", "O");
               let paragraph2 = document.createElement("p");
               paragraph2.setAttribute("class", "score-O");
               paragraph2.innerHTML = "&#x2013;";
            div12.appendChild(img2);
            div12.appendChild(paragraph2);
         div1.appendChild(div11);
         div1.appendChild(div12);

         let paragraph = document.createElement("p");
         paragraph.setAttribute("class", "game__player-turn");
         paragraph.textContent = `${gameController.currentPlayer.marker} Turn`;

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
      this.dynamicContent.appendChild(div1);
      this.dynamicContent.appendChild(paragraph);
      this.dynamicContent.appendChild(div2);
   },
};


gameController.init();