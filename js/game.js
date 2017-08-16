var Furry = require("./furry.js");
var Coin = require("./coin.js");
// var self;
var Game = function() {

    this.furry = new Furry();
    this.coin = new Coin();
    this.board = document.querySelector("#board").children;
    this.score = 0;
    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.hideVisibleFurry = function() {
        if (document.querySelector('.furry') != null){
            document.querySelector('.furry').classList.remove('furry');
        }
    }
    this.showFurry = function() {
        this.hideVisibleFurry();
        if (!(this.furry.y > 9 || this.furry.y < 0 || this.furry.x > 9 || this.furry.x < 0))
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }
    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');

    }
    this.checkCoinCollision = function() {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            document.querySelector(".coin").classList.remove("coin");
            this.score++;
            document.querySelector("#score strong").innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    this.moveFurry = function() {
        if (this.furry.direction === "right") {
            this.furry.x = (this.furry.x + 1);
        } else if (this.furry.direction === "left") {
            this.furry.x = (this.furry.x - 1);
        } else if (this.furry.direction === "down") {
            this.furry.y = (this.furry.y + 1);
        } else if (this.furry.direction === "up") {
            this.furry.y = (this.furry.y - 1);
        }
        this.checkCoinCollision();
        this.gameOver();
    }
    this.turnFurry = function(e) {
        switch (e.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }
    this.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {

            self.moveFurry();
            self.showFurry();
            console.log(self.furry.x);
        }, 250);
    }
    this.gameOver = function() {
        if (this.furry.y > 9 || this.furry.y < 0 || this.furry.x > 9 || this.furry.x < 0) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert("game over \n score: " + this.score);
        }
    }

}
module.exports = Game;
