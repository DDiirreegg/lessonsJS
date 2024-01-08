
window.addEventListener('deviceorientation', onDeviceMove)

function onDeviceMove(event) {
  // Обработка данных об ориентации устройства
  const alpha = event.alpha; // азимут (градусы)
  const beta = event.beta;   // угол наклона вперёд-назад (градусы)
  const gamma = event.gamma; // угол наклона влево-вправо (градусы)


}



function onDeviceMove(event) {
    console.log(event)
}

function animate() {
    //    console.log(Date.now())
    // requestAnimationFrame(animate)
}

requestAnimationFrame(animate)