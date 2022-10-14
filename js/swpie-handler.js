export default class SwipeHandler {

    static #xDown = null;
    static #yDown = null;

    static add(element) {
        element.addEventListener('touchstart', SwipeHandler.#handleTouchStart, false);
        element.addEventListener('touchmove', SwipeHandler.#handleTouchMove, false);
    }

    static #handleTouchStart(event) {
        SwipeHandler.#xDown = event.touches[0].clientX;
        SwipeHandler.#yDown = event.touches[0].clientY;
    }

    static #handleTouchMove(event) {
        if (!SwipeHandler.#xDown || !SwipeHandler.#yDown) return;

        let xUp = event.touches[0].clientX;
        let yUp = event.touches[0].clientY;

        let xDiff = SwipeHandler.#xDown - xUp;
        let yDiff = SwipeHandler.#yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) event.target.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'Left'}}));
            else event.target.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'Right'}}));
        } else {
            if (yDiff > 0) event.target.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'Up'}}));
            else event.target.dispatchEvent(new CustomEvent('swipe', {detail: {direction: 'Down'}}));
        }

        SwipeHandler.#xDown = null;
        SwipeHandler.#yDown = null;
    }
}