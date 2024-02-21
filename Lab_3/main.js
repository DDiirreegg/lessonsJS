function playSound(x) {
    const sound = document.querySelector(`audio[data-key="${x.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${x.keyCode}"]`);
    sound.currentTime = 0;
    sound.play();
}

window.addEventListener("keydown", playSound);


document.addEventListener("keypress", onKeyPress);