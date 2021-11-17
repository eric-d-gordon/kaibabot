const Player = require('./Player.js');
const DIVIDER = '------------------------------';

class GameState {

    constructor(leftPlayerName, rightPlayerName, gameType) {
        this.leftPlayer = new Player(leftPlayerName);
        this.rightPlayer = new Player(rightPlayerName);
        this.gameType = gameType;
    }

    toString() {
        if (this.leftPlayer.lifePoints <= 0) {
            this.leftPlayer.lifePoints = 0;
            return this.declareDuelWinner(this.rightPlayer);
        } else if (this.rightPlayer.lifePoints <= 0) {
            this.rightPlayer.lifePoints = 0;
            return this.declareDuelWinner(this.leftPlayer);
        }

        return this.scoreBoard();
    }

    scoreBoard() {
        let board = '```\n' + DIVIDER + '\n';
        board += this.leftPlayer.getNameLeftAlign();
        board += this.leftPlayer.getLifePointsPadded();
        board += '  ';
        board += this.rightPlayer.getLifePointsPadded();
        board += this.rightPlayer.getNameRightAlign() + '\n';
        board += `[${this.leftPlayer.gameWins}/${this.gameType.winThreshold}]`;
        board += '                    ';
        board += `[${this.rightPlayer.gameWins}/${this.gameType.winThreshold}]\n`;
        board += DIVIDER + '```';
        return board;
    }

    startNewDuel() {
        this.rightPlayer.resetLifePoints();
        this.leftPlayer.resetLifePoints();
    }

    duelWinBanner(winner) {
        return winner.name + ` has won Game ${this.leftPlayer.gameWins + this.rightPlayer.gameWins}!\n`;
    }

    gameWinBanner(winner) {
        return winner.name + ' has won the Match!\n';
    }

    declareDuelWinner(winner) {
        winner.gameWins++;
        if (this.gameType.winThreshold > winner.gameWins) {
            this.startNewDuel();
            return this.duelWinBanner(winner) + this.scoreBoard();
        } else {
            return this.gameWinBanner(winner) + this.scoreBoard();
        }
    }
}

module.exports = GameState;