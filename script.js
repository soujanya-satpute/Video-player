
const video = document.querySelector('video')
const player = document.querySelector('.player_container')
const progressRange = document.querySelector('.progress_range')
const progressBar = document.querySelector('.progress_bar')
const playBtn = document.getElementById('play_btn')
const volumBtn = document.getElementById('voulme_btn')
const volumeRange = document.querySelector('.volume_range')
const volumeBar = document.querySelector('.volume_bar')
const playerSpeed = document.querySelector('.player_speed')
const currentTime = document.querySelector('.time_elapsed')
const duration = document.querySelector('.time_duaration')
const fullScreenBtn = document.querySelector('.fullscreen')

function showPlaybutton() {
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
}
// Play & Pause ----------------------------------- //
function toggleVideoPlay() {
  if (video.paused) {
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
  } else {
    video.pause()
    showPlaybutton()
  }
}

// Progress Bar ---------------------------------- //
// Caluculate display time for video
function CaluculateTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${minutes}:${seconds}`
}
// Update progress
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
  currentTime.textContent = `${CaluculateTime(video.currentTime)}/`
  duration.textContent = `${CaluculateTime(video.duration)}`
}
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth
  progressBar.style.width = `${newTime * 100}%`
  video.currentTime = newTime * video.duration
}

// Volume Controls --------------------------- //
let lastVolume
// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume
  //   Change Icon
  volumBtn.className = ''
  if (volume > 0.6) {
    volumBtn.classList.add('fas', 'fa-volume-up')
  } else if (volume < 0.6 && volume > 0) {
    volumBtn.classList.add('fas', 'fa-volume-down')
  } else if (volume === 0) {
    volumBtn.classList.add('fas', 'fa-volume-off')
  }
  lastVolume = volume
}
// Mute Unmute Audion
function toggleMute() {
  volumBtn.className = ''
  if (video.volume) {
    lastVolume = video.volume
    video.volume = 0
    volumeBar.style.width = 0
    volumBtn.classList.add('fas', 'fa-volume-mute')
    volumBtn.setAttribute('title', 'Unmute')
  } else {
    video.volume = lastVolume
    volumeBar.style.width = `${lastVolume * 100}%`
    volumBtn.classList.add('fas', 'fa-volume-up')
    volumBtn.setAttribute('title', 'Mute')
  }
}
// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = playerSpeed.value
}
// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen()
  }
  video.classList.add('video_fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen()
  }
  video.classList.remove('video_fullscreen')
}
let fullScreenValue = false
function toggleFullScreen() {
  !fullScreenValue ? openFullscreen(player) : closeFullscreen()

  fullScreenValue = !fullScreenValue
}
// Event Listener ------------------------------- //

playBtn.addEventListener('click', toggleVideoPlay)
video.addEventListener('click', toggleVideoPlay)
video.addEventListener('ended', showPlaybutton)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumBtn.addEventListener('click', toggleMute)
playerSpeed.addEventListener('change', changeSpeed)
fullScreenBtn.addEventListener('click', toggleFullScreen)
