export default function playAudio(url) {
  const audio = new Audio(url);
  audio.play()
    .then(() => {
      console.log("Audio is playing...");
    })
    .catch(error => {
      console.error("Error playing audio:", error);
    });
}
