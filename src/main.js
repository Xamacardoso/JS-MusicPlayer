// Track information elements
let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

// Track control buttons
let playPause = document.querySelector(".playpause-track");
let nextTrackBtn = document.querySelector(".next-track");
let prevTrackBtn = document.querySelector(".prev-track");

// Current track controllers
let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

// Control variables
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Audio element for the player
let currTrack = document.createElement("audio");

// Initial tracks
let tracks = [
    {
        name:"Them Bones",
        artist:"Alice in Chains",
        image:"https://i.ytimg.com/vi/MNMqyrhPrXY/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDMI_ETF0bZ2ZgM0AQccoUzlqbkhA",
        path:"../ThemBones.mp3",
    },
    {
        name:"As I Am",
        artist:"Dream Theater",
        image:"https://i.ytimg.com/vi/P9Lnan8t0v8/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCloR5VYPKZ6kuPz_YoPmE-paa5kQ",
        path:"../AsIAm.mp3",
    },
    {
        name:"Honor Thy Father",
        artist:"Dream Theater",
        image:"https://i.ytimg.com/vi/P9Lnan8t0v8/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCloR5VYPKZ6kuPz_YoPmE-paa5kQ",
        path:"../HonorThyFather.mp3",
    }
];

function resetValues(){
    // Resets text values of the track

    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function loadTrack(trackIndex){
    clearInterval(updateTimer);

    let newTrack = tracks[trackIndex];

    currTrack.src = newTrack.path; // Setting current track path to load
    currTrack.load() // Loads new audio resource

    // Updating track details
    trackArt.style.backgroundImage = "url(" + newTrack.image + ")";
    trackName.textContent = newTrack.name;
    trackArtist.textContent = newTrack.artist;
    nowPlaying.textContent = "PLAYING " + (trackIndex + 1) + "of " + tracks.length;

    // Setting 1 second interval for updating seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Goes to next track when ended playing
    currTrack.addEventListener("ended", nextTrack);

    // Applying random color to background
    randomBgColor();
}

function randomBgColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let bgColor = "rgb(" + r + "," + g + "," + b + ")";

    // Changes background color
    document.body.style.background = bgColor;
}

function playPauseTrack(){
    !isPlaying ? playTrack() : pauseTrack();
}

function playTrack(){
    currTrack.play(); // Starts track playback

    isPlaying = true;
    // Replace icon with the pause icon
    playPause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    // Pauses the current track
    currTrack.pause();

    isPlaying = false;
    // Replace icon with the resume track icon
    playPause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    // TrackIndex increments if it's lesser than the maximum, otherwise, comes back to the start
    trackIndex = trackIndex < tracks.length - 1 ? trackIndex + 1 : 0;

    loadTrack(trackIndex);
    playTrack();
}

function prevTrack(){
    // TrackIndex decrements if it's more than 0, else, it goes to the end
    trackIndex = trackIndex > 0 ? trackIndex - 1 : tracks.length - 1;

    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    /* Calculates seek position based
    *  on the seek slider percentage
    *  and gets relative duration
    */

    let seektoVal = currTrack.duration * (seekSlider.value / 100);

    currTrack.currentTime = seektoVal;
}

function setVolume() {
    /* Sets the volume according
    to the percentage of the volume slider
    */

    currTrack.volume = volumeSlider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(currTrack.duration)) {
      seekPosition = currTrack.currentTime * (100 / currTrack.duration);
      seekSlider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(currTrack.currentTime / 60);
      let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currTrack.duration / 60);
      let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      currTime.textContent = currentMinutes + ":" + currentSeconds;
      totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

loadTrack(trackIndex);