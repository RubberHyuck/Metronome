// The following lines are from https://css-tricks.com/form-validation-web-audio/
const context = new window.AudioContext();
let clickTone = context.createBufferSource();
let clickBuffer = {};
let lastTick = 0;

window.onload = (event) => {
  
  loadFile('./assets/click.mp3');

  let goButton = document.querySelector("#go");  
  goButton.addEventListener("click", function() {
    let tempoSlider = document.querySelector("#tempo"); 
    go(tempoSlider.value);
  });

  let stopButton = document.querySelector("#stop");  
  stopButton.addEventListener("click", function() {
    let tempoSlider = document.querySelector("#tempo"); 
    stop(tempoSlider.value);
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

let clockSpring = false;
function go(tempo = 90) {
  
  let pendulum = document.getElementById('pendulum');
  if ( pendulum.classList.contains('locked') ) {
    pendulum.classList.remove('locked');
    pendulum.classList.add('unlocked');

    let delay = 60000/tempo;
    clockSpring = setInterval(function(){playSound();}, delay);
    
    let swingDuration = 60 / tempo;
    pendulum.style['animationDuration'] = swingDuration + 's';
  }
}

function stop(tempo = 90) {
  if ( pendulum.classList.contains('unlocked') ) {
    pendulum.classList.remove('unlocked');
    pendulum.classList.add('locked');

    clearInterval(clockSpring);
  }
}

function step(tempo = 90) {
  let gap = 0;
  if (lastTick > 0) {
    let timePassed = Date.now() - lastTick;
    gap = timePassed - delay;
  }
  
  delay = 60000/tempo;
  if (gap > 0) {
    delay -= gap;
    gap = 0;
    console.log('delay: ' + delay);
  }

  //console.log(i++);
  lastTick = Date.now();
  //playSound();
  //setTimeout(step(), delay);
}