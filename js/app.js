myAudioElement = new Audio('./assets/click.mp3');

myAudioElement.addEventListener("clickTone", (event) => {
    /* the audio is now playable; play it if permissions allow */
    myAudioElement.play();
  });

function Toggle(tempo) {
    //alert(tempo);
    myAudioElement.dispatchEvent(myAudioElement);
}