function recordAudio() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const input = audioContext.createMediaStreamSource(stream);

      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = function () {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // В этом месте вы можете использовать audioUrl по вашему усмотрению,
        // например, отправить его на сервер или воспроизвести в браузере.

        console.log("Запись завершена. Аудио доступно по URL:", audioUrl);
      };

      recorder.start();

      // Запись будет длиться 10 секунд
      setTimeout(function () {
        recorder.stop();
        stream.getTracks().forEach(track => track.stop());
      }, 10000);
    })
    .catch(function (error) {
      console.error('Ошибка при получении доступа к аудио:', error);
    });
}

// Вызов функции для начала записи
recordAudio();
