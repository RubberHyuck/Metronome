// The following lines are from https://css-tricks.com/form-validation-web-audio/
const context = new window.AudioContext();
let clickTone = context.createBufferSource();
let clickBuffer = {};
let clockSpring;

window.onload = (event) => {
  
  loadFile('./assets/click.mp3');

  let toggleButton = document.querySelector("#toggle");  
  toggleButton.addEventListener("click", function() {
    let tempoSlider = document.querySelector("#tempo"); 
    toggle(tempoSlider.value);
  });

};
  
function loadFile(filepath) {
  // see https://jakearchibald.com/2016/sounds-fun/
  // Fetch the file
  
  fetch(filepath)
  // Read it into memory as an arrayBuffer
  .then(response => response.arrayBuffer())
  // Turn it from mp3/aac/whatever into raw audio data
  .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    // Create a source:
    // This represents a playback head.
    const soundSource = context.createBufferSource();
    // Give it the audio data we loaded:
    clickBuffer = audioBuffer;
  });
}

function playSound() {
  let localTone = context.createBufferSource();
  localTone.buffer = clickBuffer;
  // Plug it into the output:
  localTone.connect(context.destination);
  // Now we're ready to play!
  localTone.start();
}

function tempoClock(tempo = 90) {
  console.log(tempo);
  let delay = 60000/tempo;
  if (!clockSpring) {
      let clockSpring = setInterval(function() {
      playSound();
    }, delay);
  }
}

function toggle(tempo = 90) {
  if (!clockSpring) {
    tempoClock(tempo);
  } else {
    clearInterval(clockSpring);
  }
}