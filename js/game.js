class Game {

    constructor(parentElement, size = 4) {
        this.size = size;
        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        this.headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        }, 'header');
        this.rating = 0;

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        })

        this.field = [];

        for (let i = 0; i < size; i++) {
            this.field[i] = []
            for (let k = 0; k < size; k++) {
                this.field[i][k] = new Cell(fieldElement, this);
            }
        }
        window.addEventListener('keyup', function (event) {
            switch (event.keyCode) {
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;

            }
        }.bind(this));
    }

    set rating(value) {
        this._rating = value;
        this.headerElement.innerHTML = `Score: ${value}`;
    }
    get rating() {
        return this._rating;
    }

    addRating(value) {
        this.rating += value;
    }
    spawnUnit() {
        let emptyCells = [];
        for (let i = 0; i < this.field.length; i++) {
            for (let k = 0; k < this.field[1].length; k++) {
                if (!this.field[i][k].value) {
                    emptyCells.push(this.field[i][k]);
                }

            }
        }
        if (emptyCells.length) {
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn()
        } else {
            alert('You lose!')
        }
    }

    isLastKey(key) {
        return key == (this.size - 1);
    }

    isFirstKey(key) {
        return key == 0;
    }

    moveRight() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let k = this.size - 2; k >= 0; k--) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = k + 1;
                while (nextCellKey < this.size) {
                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) || nextCell.isSameTo(currentCell)) {
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != k) {
                            this.field[i][nextCellKey - 1].merge(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey++;
                    nextCell = this.field[nextCellKey];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }

    moveLeft() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let k = 1; k < this.size; k++) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = k - 1;
                while (nextCellKey >= 0) {
                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) || nextCell.isSameTo(currentCell)) {
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != k) {
                            this.field[i][nextCellKey + 1].merge(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey--;
                    nextCell = this.field[nextCellKey];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }
    moveDown() {
        let hasMoved = false;
        for (let k = 0; k < this.size; k++) {
            for (let i = this.size - 2; i >= 0; i--) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i + 1;
                while (nextCellKey < this.size) {
                    let nextCell = this.field[nextCellKey][k];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) || nextCell.isSameTo(currentCell)) {
                            this.field[nextCellKey][k].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
                            this.field[nextCellKey - 1][k].merge(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey++;
                    nextCell = this.field[nextCellKey][k];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }
    moveUp() {
        let hasMoved = false;
        for (let k = 0; k < this.size; k++) {
            for (let i = 1; i < this.size; i++) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i - 1;
                while (nextCellKey < this.size) {
                    let nextCell = this.field[nextCellKey][k];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) || nextCell.isSameTo(currentCell)) {
                            this.field[nextCellKey][k].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
                            this.field[nextCellKey + 1][k].merge(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey--;
                    nextCell = this.field[nextCellKey][k];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }
}
