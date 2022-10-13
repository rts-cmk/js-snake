import SnakeBoard from './snake-board.js';

let board = new SnakeBoard();

document.addEventListener('touchstart', event => event.preventDefault());

document.body.appendChild(board.element);