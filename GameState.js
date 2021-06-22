const Player = require('./Player.js');

class GameState {

    constructor(leftPlayerName, rightPlayerName, gameType) {
        this.leftPlayer = new Player(leftPlayerName);
        this.rightPlayer = new Player(rightPlayerName);
        this.gameType = gameType;
    }

    toString() {
        if (this.leftPlayer.lifePoints <= 0) {
            return this.declareDuelWinner(this.rightPlayer);
        } else if (this.rightPlayer.lifePoints <= 0) {
            return this.declareDuelWinner(this.leftPlayer);
        }

        return this.scoreBoard();
    }

    scoreBoard() {
        return this.leftPlayer.toString() + '\n' + this.rightPlayer.toString();
    }

    startNewDuel() {
        this.rightPlayer.resetLifePoinst();
        this.leftPlayer.resetLifePoinst();
    }

    duelWinBanner(winner) {
        return winner.name + ' has won the Duel!\n' +
        '------------' + `${this.leftPlayer.name} (${this.leftPlayer.gameWins}) - ${this.rightPlayer.name} (${this.rightPlayer.gameWins}) ` +
        '------------\n';
    }

    gameWinBanner(winner) {
        return winner.name + ' has won the Game!\n' +
        '------------' + `${this.leftPlayer.name} (${this.leftPlayer.gameWins}) - ${this.rightPlayer.name} (${this.rightPlayer.gameWins}) ` +
        '------------\n';
    }

    declareDuelWinner(winner) {
        winner.gameWins++;
        if (this.gameType.winThreshold > winner.gameWins) {
            this.startNewDuel();
            return this.duelWinBanner(winner) + this.scoreBoard();
        } else {
            return this.gameWinBanner(winner);
        }
    }
}

module.exports = GameState;