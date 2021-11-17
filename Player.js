const NAME_LIMIT = 9;

class Player {

    constructor(name) {
        this.name = name.substring(0, NAME_LIMIT - 1);
        this.gameWins = 0;
        this.lifePoints = 8000;
    }

    getNameLeftAlign() {
        return this.name.padEnd(NAME_LIMIT, ' ');
    }

    getNameRightAlign() {
        return this.name.padStart(NAME_LIMIT, ' ');
    }

    getLifePointsPadded() {
        let lp = `${this.lifePoints}`;
        return lp.padStart(5, ' ');
    }

    loseLife(amount) {
        this.lifePoints -= amount;
    }

    gainLife(amount) {
        this.lifePoints += parseInt(amount);
    }

    resetLifePoints() {
        this.lifePoints = 8000;
    }
}

module.exports = Player;