const drums = document.querySelectorAll('.drums')
document.addEventListener('keypress', onKeyPress)


const KeyToSound = {
    'q': document.querySelector('#s1'),
    'w': document.querySelector('#s2'),
    'e': document.querySelector('#s3'),
    'a': document.querySelector('#s4'),
    's': document.querySelector('#s5'),
    'd': document.querySelector('#s6'),
    'z': document.querySelector('#s7'),
    'x': document.querySelector('#s8'),
    'c': document.querySelector('#s9')
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}