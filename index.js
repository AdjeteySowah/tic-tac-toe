
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
      this.initializeGame();
   },

   pageSpecificInit: function() {
      if (this.cacheDom().classList.contains("page--1")) {
         pageOneController.init();
      } else if (this.cacheDom().classList.contains("page--1")) {
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
      if (event.target.classList.contains("standalone")) {
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
   // init: function() {
   //    this.cacheDom();
   //    this.bindEvents();
   //    this.render();
   // },

   // cacheDom: function() {

   // },

   // bindEvents: function() {

   // },

   // render: function() {

   // },
};


gameController.init();