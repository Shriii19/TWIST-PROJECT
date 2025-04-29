// Sample songs data (replace with your actual MP3 files in a 'songs' folder)
const sampleSongs = [
    { name: "alone", file: "songs/alone.mp3" },
    { name: "lost-in-dreams", file: "songs/lost-in-dreams.mp3" },
    { name: "nightfall", file: "songs/nightfall.mp3" }
  ];
  
  // Global variables
  let audio = null;
  let currentSongIndex = 0;
  let songs = [...sampleSongs];
  let isPlaying = false;
  
  // DOM elements
  const playPauseBtn = document.getElementById("playPauseBtn");
  const seekBar = document.getElementById("seekBar");
  const currentTimeSpan = document.getElementById("currentTime");
  const totalTimeSpan = document.getElementById("totalTime");
  const volumeBar = document.getElementById("volumeBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const forward5Btn = document.getElementById("forward5Btn");
  const backward5Btn = document.getElementById("backward5Btn");
  const volumeUpBtn = document.getElementById("volumeUpBtn");
  const volumeDownBtn = document.getElementById("volumeDownBtn");
  const songList = document.getElementById("songList");
  const cardContainer = document.getElementById("cardContainer");
  const uploadBtn = document.getElementById("uploadBtn");
  const songUploader = document.getElementById("songUploader");
  
  // Format time (mm:ss)
  function formatTime(time) {
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  
  // Update time and seek bar
  function updateProgress() {
    if (audio && !isNaN(audio.duration)) {
      const progress = (audio.currentTime / audio.duration) * 100;
      seekBar.value = progress;
      currentTimeSpan.textContent = formatTime(audio.currentTime);
    }
  }
  
  // Setup audio event listeners
  function setupAudioListeners() {
    if (!audio) return;
  
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      totalTimeSpan.textContent = formatTime(audio.duration);
    });
    audio.addEventListener("ended", playNextSong);
    audio.addEventListener("play", () => {
      isPlaying = true;
      playPauseBtn.textContent = "⏸";
    });
    audio.addEventListener("pause", () => {
      isPlaying = false;
      playPauseBtn.textContent = "▶";
    });
  }
  
  // Play song
  function playSong(songIndex) {
    if (songIndex < 0 || songIndex >= songs.length) return;
  
    currentSongIndex = songIndex;
    const song = songs[songIndex];
  
    if (audio) {
      audio.pause();
      audio = null;
    }
  
    audio = new Audio(song.file);
    setupAudioListeners();
    audio.play();
    updateActiveSongInList();
  }
  
  // Play next song
  function playNextSong() {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  }
  
  // Play previous song
  function playPrevSong() {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  }
  
  // Toggle play/pause
  function togglePlayPause() {
    if (!audio) {
      playSong(0);
      return;
    }
  
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }
  
  // Update active song in list
  function updateActiveSongInList() {
    const listItems = songList.querySelectorAll("li");
    listItems.forEach((item, index) => {
      if (index === currentSongIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
  
  // Render song list
  function renderSongList() {
    songList.innerHTML = "";
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.name;
      li.addEventListener("click", () => playSong(index));
      songList.appendChild(li);
    });
  }
  
  // Render cards
  function renderCards() {
    cardContainer.innerHTML = "";
    songs.forEach((song, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_in_default.jpg" alt="Cover" />
        <h2>${song.name}</h2>
        <p>Your Upload</p>
        <div class="play-btn">▶</div>
      `;
      card.addEventListener("click", () => playSong(index));
      cardContainer.appendChild(card);
    });
  }
  
  // Initialize the player
  function initPlayer() {
    renderSongList();
    renderCards();
  
    // Play/Pause button
    playPauseBtn.addEventListener("click", togglePlayPause);
  
    // Seek bar
    seekBar.addEventListener("input", () => {
      if (audio) {
        const seekTime = (seekBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
      }
    });
  
    // Volume control
    volumeBar.addEventListener("input", () => {
      if (audio) audio.volume = volumeBar.value;
    });
  
    // Navigation buttons
    prevBtn.addEventListener("click", playPrevSong);
    nextBtn.addEventListener("click", playNextSong);
    forward5Btn.addEventListener("click", () => {
      if (audio) audio.currentTime += 5;
    });
    backward5Btn.addEventListener("click", () => {
      if (audio) audio.currentTime = Math.max(0, audio.currentTime - 5);
    });
    volumeUpBtn.addEventListener("click", () => {
      if (audio) {
        audio.volume = Math.min(1, audio.volume + 0.1);
        volumeBar.value = audio.volume;
      }
    });
    volumeDownBtn.addEventListener("click", () => {
      if (audio) {
        audio.volume = Math.max(0, audio.volume - 0.1);
        volumeBar.value = audio.volume;
      }
    });
  
    // Upload functionality
    uploadBtn.addEventListener("click", () => songUploader.click());
    songUploader.addEventListener("change", handleFileUpload);
  }
  
  // Handle file upload
  function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;
  
    for (let file of files) {
      if (!file.name.endsWith(".mp3")) continue;
  
      const newSong = {
        name: file.name.replace(".mp3", ""),
        file: URL.createObjectURL(file)
      };
  
      songs.push(newSong);
    }
  
    renderSongList();
    renderCards();
    songUploader.value = "";
  }
  
  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", initPlayer);