const audioElement = document.getElementById("audio");
const button = document.getElementById("button");
const bubble = document.getElementById("bubble");

// PAssing Joke to VoiceRSS API
function tellMe(joke) {
  button.disabled = true;
  VoiceRSS.speech({
    key: "74bb0db28d3640a492d84ec0d8782735",
    src: joke,
    hl: "en-gb",
    v: "Alice",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJoke() {
  let joke = "";
  const apuUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apuUrl);
    const jokeData = await response.json();
    if (jokeData.setup) {
      joke = `${jokeData.setup} ... ${jokeData.delivery}`;
    } else {
      joke = jokeData.joke;
    }

    // Disable Button while playing
    bubble.textContent = joke;
    tellMe(joke);
  } catch (error) {
    console.log("getJoke(): ", error);
  }
}

button.addEventListener("click", getJoke);

// When Playing has ended enable the button again
audioElement.addEventListener("ended", () => {
  button.disabled = false;
});
