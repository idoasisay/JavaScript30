const videoViewer = document.querySelector(".player__video");
const playBtn = document.querySelector(".player__button");
const progressBar = document.querySelector(".progress");
const progress = document.querySelector(".progress__filled");
const sliders = document.querySelectorAll(".player__slider");
const skipBtns = document.querySelectorAll(".player__button");

function updateProgress() {
  const duration = videoViewer.duration;
  const currentTime = videoViewer.currentTime;
  progress.style.flexBasis = `${(currentTime / duration) * 100}%`;
}

function handleVideoPlay() {
  if (videoViewer.paused) {
    videoViewer.play();
    playBtn.textContent = "❚ ❚";
  } else {
    videoViewer.pause();
    playBtn.textContent = "►";
  }
}

function handleSkipBtn(e) {
  videoViewer.currentTime += parseFloat(e.target.dataset.skip);
}

function handleRangeUpdate(e) {
  if (e.target.name === "volume") {
    videoViewer.volume = e.target.value;
  } else if (e.target.name === "playbackRate") {
    videoViewer.playbackRate = e.target.value;
  }
}

function scrub(e) {
  const progressBarWidth = progressBar.clientWidth;
  const currentX = e.clientX;
  videoViewer.currentTime = (currentX / progressBarWidth) * videoViewer.duration;
}

videoViewer.addEventListener("click", handleVideoPlay);
videoViewer.addEventListener("timeupdate", updateProgress);
playBtn.addEventListener("click", handleVideoPlay);
skipBtns.forEach(button => button.addEventListener("click", handleSkipBtn));
sliders.forEach(slider => slider.addEventListener("change", handleRangeUpdate));
progressBar.addEventListener("click", scrub);
