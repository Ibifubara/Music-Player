const musicContainer = document.querySelector('.music-container');
const audio = document.querySelector('#audio');
const prevButton = document.querySelector('#prev');
const playButton = document.querySelector('#play');
const nextButton = document.querySelector('#next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const songTitle = document.querySelector('h4');
const musicCover = document.querySelector('img');

const songs = ['Bass Loop', 'Guitar Loop', 'Piano Loop'];

let songIndex = 2;

loadSong(songs[songIndex])

function loadSong(song){
    songTitle.innerText = song;
    audio.src = `music/${song}.mp3`;
    musicCover.src = `images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playButton.querySelector('i.bx').classList.remove('bx-play-circle');
    playButton.querySelector('i.bx').classList.add('bx-pause-circle');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
     playButton.querySelector('i.bx').classList.add('bx-play-circle');
    playButton.querySelector('i.bx').classList.remove('bx-pause-circle');

    audio.pause();
}

function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgess(e){
    const {currentTime, duration} = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
}

playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgess);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
