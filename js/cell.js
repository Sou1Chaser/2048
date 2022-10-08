class Cell {
    constructor(fieldElement, game) {
        this.game = game;

        this.fieldElement = fieldElement;

        this.element = createAndAppend({
            className: 'field__cell',
            parentElement: fieldElement
        })

        if (Math.random() > 0.8) {
            this.spawn();
        }
        // this.element.onclick = this.merge.bind(this)
    }
    get value() {
        return this._value || 0;
    }
    set value(value) {
        this._value = value;
        this.element.innerHTML = value === 0 ? '' : value;
        this.element.dataset.color = value;
    }
    clear() {
        this.value = '';
    }
    merge(cell) {
        if (this.value) {
            this.game.addRating(this.value + cell.value);
            new AnimationMerge(this)
        }
        this.value += cell.value;
        cell.clear();
    }
    isSameTo(cell) {
        return this.value == cell.value
    }
    spawn() {
        this.value = Math.random() > 0.5 ? 4 : 2;
    }
    get isEmpty() {
        return this.value == 0;
    }
}


class AnimationMerge {
    constructor(cell) {
        this.element = cell.element;
        this.element.classList.add('animation__merge');

        setTimeout(function () {
            this.element.classList.remove('animation__merge')
        }.bind(this), 100)
    }
}