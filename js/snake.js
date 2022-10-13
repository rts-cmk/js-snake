export default class Snake extends EventTarget {

    get #DEFAULT_SPEED() { return 1; }

    #body;
    #size;

    #direction;

    get body() { return this.#body; }

    get head() { return this.#body[0]; }
    
    constructor(coordinates = [{x: 0, y: 0}], startSize = 1) {
        
        super();

        this.#body = coordinates;
        this.#size = startSize;

        this.#direction = {x: this.#DEFAULT_SPEED, y: 0};
    }

    move() {
        this.#body.unshift({x: this.head.x + this.#direction.x, y: this.head.y + this.#direction.y});

        while (this.#body.length > this.#size) this.#body.pop();

        if (this.#body.filter(coordinate => this.head.x === coordinate.x && this.head.y === coordinate.y).length > 1) {
            this.dispatchEvent(new Event('death'));
        }

        this.dispatchEvent(new Event('move'));
    }

    grow(amount = 1) {
        this.#size += amount;
    }

    moveUp() {
        if (this.#direction.y !== 1) this.#direction = {x: 0, y: -1};
    }

    moveDown() {
        if (this.#direction.y !== -1) this.#direction = {x: 0, y: 1};
    }

    moveLeft() {
        if (this.#direction.x !== 1) this.#direction = {x: -1, y: 0};
    }

    moveRight() {
        if (this.#direction.x !== -1) this.#direction = {x: 1, y: 0};
    }
}