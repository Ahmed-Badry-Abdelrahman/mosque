const btnMenu = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    menu.classList.toggle('active');
    menu.classList.toggle('zoomIn');

    if (this.style.transform === 'scale(1.1) rotate(90deg)') {
        this.style.transform = 'scale(1) rotate(0deg)';
    } else {
        this.style.transform = 'scale(1.1) rotate(90deg)';
    }
});

document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && event.target !== btnMenu) {
        menu.classList.remove('active');
        menu.classList.remove('zoomIn');
        btnMenu.style.transform = 'scale(1) rotate(0deg)';
    }
});


const video = document.getElementById('myVideo');
const videoIcon = document.getElementById('myVideoIcon');
let mouseTimeout;

// Ensure the video is muted before attempting to play
video.muted = true;

video.addEventListener('mouseenter', () => {
    mouseTimeout = setTimeout(() => {
        video.play().then(() => {
            video.style.cursor = 'pointer';
            videoIcon.style.display = 'none';
        }).catch(error => {
            console.error('Error playing video:', error);
        });
    }, 300); // 300 milliseconds before playing the video
});

videoIcon.addEventListener('mouseenter', () => {
    mouseTimeout = setTimeout(() => {
        video.play().then(() => {
            video.style.cursor = 'pointer';
            videoIcon.style.display = 'none';
        }).catch(error => {
            console.error('Error playing video:', error);
        });
    }, 300); // 300 milliseconds before playing the video
});

video.addEventListener('mouseleave', () => {
    clearTimeout(mouseTimeout);
    videoIcon.style.display = 'block';
    video.pause();
});


const cards = document.querySelectorAll('.help-cards .card')
cards.forEach(card => {
    card.addEventListener('mousemove', function () {
        cards.forEach(card => {
            card.classList.remove('active');
        })
        this.classList.toggle('active');
    });
});

