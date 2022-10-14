import SnakeBoard from './snake-board.js';

let board = new SnakeBoard();

['touchstart', 'touchmove', 'scroll'].forEach(eventType => document.body.addEventListener(eventType, event => event.preventDefault(), false));

document.body.appendChild(board.element);