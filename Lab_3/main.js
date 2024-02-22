function playSound(x) {
    const sound = document.querySelector(`audio[data-key="${x.keyCode}"]`);
    if (!sound) return; // Exit function if no sound element found
    sound.currentTime = 0;
    sound.play();
  }
  
  window.addEventListener("keydown", playSound);
  
  const recordedSounds = {
    "10": [],
    "11": [],
    "12": [],
    "13": []
  }
  
  function recordSound(channel) {
    const record = (x) => {
      const sound = document.querySelector(`audio[data-key="${x.keyCode}"]`);
      if (sound && recordedSounds[channel].length < 10) { // Check if less than 10 sounds are recorded
        recordedSounds[channel].push(sound.cloneNode()); // Clone the audio element and push it to the array
      }
    };
  
    window.addEventListener("keydown", record);
  
    setTimeout(() => {
      window.removeEventListener("keydown", record);
    }, 1000);
  }
  
  function playRecordedSound(channel) {
    if (recordedSounds[channel].length === 0) {
      window.alert("Nie ma żadnego nagrania");
      return;
    }
    const sounds = recordedSounds[channel];
    let index = 0;
    const playNextSound = () => {
      if (index < sounds.length) {
        const sound = sounds[index++];
        sound.currentTime = 0;
        sound.play();
        sound.addEventListener('ended', playNextSound);
      }
    };
    playNextSound();
  }
  
  document.querySelector("#channel10-record").addEventListener("click", () => { recordSound(10); });
  document.querySelector("#channel11-record").addEventListener("click", () => { recordSound(11); });
  document.querySelector("#channel12-record").addEventListener("click", () => { recordSound(12); });
  document.querySelector("#channel13-record").addEventListener("click", () => { recordSound(13); });
  
  document.querySelector("#channel10-play").addEventListener("click", () => { playRecordedSound(10); });
  document.querySelector("#channel11-play").addEventListener("click", () => { playRecordedSound(11); });
  document.querySelector("#channel12-play").addEventListener("click", () => { playRecordedSound(12); });
  document.querySelector("#channel13-play").addEventListener("click", () => { playRecordedSound(13); });
  
  document.querySelector("#play-all").addEventListener("click", () => { 
    playRecordedSound(10); 
    playRecordedSound(11); 
    playRecordedSound(12); 
    playRecordedSound(13); 
  });
  