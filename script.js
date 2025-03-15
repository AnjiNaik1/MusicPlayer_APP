const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const songTitle = document.getElementById("song-title");
const playlistEl = document.getElementById("playlist");

let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentIndex = 0;

const songs = [
    { name: "Song 1", src: "songs/s1.mp3" },
    { name: "Song 2", src: "songs/s2.mp3" },
    { name: "Song 3", src: "songs/s3.mp3" },
    { name: "Song 4", src: "songs/s4.mp3" },
    { name: "Song 5", src: "songs/s5.mp3" },
    { name: "Song 6", src: "songs/s6.mp3" },
    { name: "Song 7", src: "songs/s7.mp3" },
    { name: "Song 8", src: "songs/s8.mp3" },
    { name: "Song 9", src: "songs/s9.mp3" }
];

function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].name;
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
}

function nextSong() {
    currentIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? "yellow" : "white";
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? "yellow" : "white";
    audio.loop = isRepeat;
}

if (playBtn) playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
if (nextBtn) nextBtn.addEventListener("click", nextSong);
if (prevBtn) prevBtn.addEventListener("click", prevSong);
if (shuffleBtn) shuffleBtn.addEventListener("click", toggleShuffle);
if (repeatBtn) repeatBtn.addEventListener("click", toggleRepeat);

audio.addEventListener("ended", nextSong);

songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => {
        currentIndex = index;
        loadSong(currentIndex);
        playSong();
    });
    playlistEl.appendChild(li);
});

loadSong(currentIndex);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then((registration) => console.log("Service Worker registered with scope:", registration.scope))
            .catch((error) => console.error("Service Worker registration failed:", error));
    });
}
