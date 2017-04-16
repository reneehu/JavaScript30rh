//get elements ✅✅✅
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build functions 🤖🤖🤖
function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	// console.log(video[method]);
	video[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	//console.log(this);
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
	//console.log(video.currentTime);
}

function rangeControl() {
	console.log(this.value);
	video[this.name] = this.value;
}

function progressControl() {
	const currentProgress = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${currentProgress}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}


//hook up 💑💑💑
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressControl);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeControl));
ranges.forEach(range => range.addEventListener('mousemove', rangeControl));


let scrubClear = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => scrubClear && scrub(e));
progress.addEventListener('mousedown', () => scrubClear = true);
progress.addEventListener('mouseup', () => scrubClear = false);

