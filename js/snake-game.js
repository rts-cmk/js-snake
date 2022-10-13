import SnakeBoard from './snake-board.js';

let board = new SnakeBoard();

['touchstart', 'touchmove', 'scroll'].forEach(eventType => document.addEventListener(eventType, event => event.preventDefault()));

document.body.appendChild(board.element);