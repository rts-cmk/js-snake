import Snake from "./snake.js";
import SwipeHandler from "./swpie-handler.js";

export default class SnakeBoard {

    get #DEFAULT_WIDTH() { return 40; }
    get #DEFAULT_HEIGHT() { return 40; }

    get #DEFAULT_MAX_SIZE() { return 5; }

    #width;
    #height;

    #element;

    #snake;

    #interval;

    get element() { return this.#element; }

    constructor(width = this.#DEFAULT_WIDTH, height = this.#DEFAULT_HEIGHT) {
        this.#width = width;
        this.#height = height;

        this.#element = document.createElement('table');
        this.#element.classList.add('snake-board');

        this.#snake = new Snake([{x: Math.round(width / 2), y: Math.round(height / 2)}], 5);

        this.#snake.addEventListener('move', () => this.update());
        this.#snake.addEventListener('death', () => clearInterval(this.#interval));

        for (let y = 0; y < this.#height; y++) {
            let row = document.createElement('tr');
            for (let x = 0; x < this.#width; x++) {
                let cell = document.createElement('td');
                row.appendChild(cell);
            }
            this.#element.appendChild(row);
        }

        SwipeHandler.add(document);

        ['keydown', 'swipe'].forEach(eventType => document.addEventListener(eventType, event => {
            event.preventDefault();

            let key = event.key || event.detail.direction;

            switch (key) {
                case 'ArrowUp': case 'Up': this.#snake.moveUp(); break;
                case 'ArrowDown': case 'Down': this.#snake.moveDown(); break;
                case 'ArrowLeft': case 'Left': this.#snake.moveLeft(); break;
                case 'ArrowRight': case 'Right': this.#snake.moveRight(); break;
            }
        }));

        this.placeFood();

        this.update();

        this.#interval = setInterval(() => this.#snake.move(), 50);
    }

    update() {
        this.#element.querySelectorAll('td.snake').forEach(td => td.classList.remove('snake'));
        this.#snake.body.forEach(coordinate => {
            if (coordinate.x <= 0) coordinate.x += this.#width;
            else if (coordinate.x > this.#width) coordinate.x -= this.#width;

            if (coordinate.y <= 0) coordinate.y += this.#height;
            else if (coordinate.y > this.#height) coordinate.y -= this.#height;

            this.#element.children[coordinate.y - 1].children[coordinate.x - 1].classList.add('snake');

            if (this.#element.children[coordinate.y - 1].children[coordinate.x - 1].classList.contains('food')) {
                this.#element.children[coordinate.y - 1].children[coordinate.x - 1].classList.remove('food');
                this.#snake.grow();
                this.placeFood();
            }
        });
    }

    placeFood() {
        let emptyCells = this.#element.querySelectorAll('td:not(.snake)');
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        randomCell.classList.add('food');
    }
}