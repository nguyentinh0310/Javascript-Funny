window.addEventListener("load", function () {
  const song = document.querySelector("#song");
  const playBtn = document.querySelector(".player-play");
  const prevBtn = document.querySelector(".player-prev");
  const nextBtn = document.querySelector(".player-next");
  const playerDuration = document.querySelector(".player-duration");
  const remaining = document.querySelector(".player-remaining");
  const progressBar = document.querySelector("#progress-bar");
  const playerImage = document.querySelector(".player-image");
  let playing = true;
  const list = ["holo.mp3", "summer.mp3", "home.mp3", "spark.mp3"];
  let songIndex = 0;
  playBtn.addEventListener("click", handlePlayMusic);
  nextBtn.addEventListener("click", function () {
    handleChangeMusic(1);
  });
  prevBtn.addEventListener("click", function () {
    handleChangeMusic(-1);
  });
  song.addEventListener("ended", function () {
    handleChangeMusic(1);
  });
  function handleChangeMusic(dir) {
    if (dir === 1) {
      // next song
      songIndex++;
      if (songIndex > list.length - 1) {
        songIndex = 0;
      }
      song.setAttribute("src", `./files/${list[songIndex]}`);
      playing = true;
      handlePlayMusic();
    } else if (dir === -1) {
      // prev song
      songIndex--;
      if (songIndex < 0) {
        songIndex = list.length - 1;
      }
      song.setAttribute("src", `./files/${list[songIndex]}`);
      playing = true;
      handlePlayMusic();
    }
  }
  function handlePlayMusic() {
    if (playing) {
      song.play();
      playerImage.classList.add("is-playing");
      playBtn.classList.add("fa-pause");
      playing = false;
    } else {
      song.pause();
      playerImage.classList.remove("is-playing");
      playBtn.classList.remove("fa-pause");
      playing = true;
    }
  }
  function displayTimer() {
    const { duration, currentTime } = song;
    progressBar.max = duration;
    progressBar.value = currentTime;
    remaining.textContent = formartTime(currentTime);
    if (!duration) {
      playerDuration.textContent = "00:00";
    } else {
      playerDuration.textContent = formartTime(duration);
    }
  }

  progressBar.addEventListener("change", function () {
    song.currentTime = progressBar.value;
  });
  function formartTime(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  displayTimer();
  setInterval(displayTimer, 500);
});
