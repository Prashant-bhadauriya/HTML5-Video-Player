// Getting Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Build Function
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    console.log('update');
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
    video[this.name] = this.value;
}

function progressHandle(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//Hook up the eventListener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressHandle);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',rangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);