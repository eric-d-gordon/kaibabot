class Player {

    constructor(name) {
        this.name = name;
        this.gameWins = 0;
        this.lifePoints = 8000;
    }

    toString() {
        return `${this.name}: ${this.lifePoints}`;
    }

    loseLife(amount) {
        this.lifePoints -= amount;
    }

    gainLife(amount) {
        this.lifePoints += parseInt(amount);
    }

    resetLifePoinst() {
        this.lifePoints = 8000;
    }
}

module.exports = Player;