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


// news card

document.addEventListener('DOMContentLoaded', function () {
    function commentCards() {
        document.querySelectorAll('.news-cards').forEach(function (cardContainer) {
            const cards = cardContainer.querySelectorAll('.n-card');
            let currentCard = cardContainer.querySelector('.card--current') || cards[0];
            let nextCard = currentCard.nextElementSibling || cards[0];

            cards.forEach(function (card) {
                card.addEventListener('click', function () {
                    currentCard.classList.remove('card--current');
                    currentCard.classList.add('card--out');

                    currentCard = nextCard;
                    currentCard.classList.remove('card--out');
                    currentCard.classList.add('card--current');

                    nextCard = currentCard.nextElementSibling || cards[0];
                    nextCard.classList.add('card--next');
                });
            });

            currentCard.classList.add('card--current');
            nextCard.classList.add('card--next');
            cardContainer.classList.add('cards--active');
        });
    }

    commentCards();
});



// $.fn.commentCards = function () {

//     return this.each(function () {

//         var $this = $(this),
//             $cards = $this.find('.card'),
//             $current = $cards.filter('.card--current'),
//             $next;

//         $cards.on('click', function () {
//             if (!$current.is(this)) {
//                 $cards.removeClass('card--current card--out card--next');
//                 $current.addClass('card--out');
//                 $current = $(this).addClass('card--current');
//                 $next = $current.next();
//                 $next = $next.length ? $next : $cards.first();
//                 $next.addClass('card--next');
//             }
//         });

//         if (!$current.length) {
//             $current = $cards.last();
//             $cards.first().trigger('click');
//         }

//         $this.addClass('cards--active');

//     })

// };

// $('.cards').commentCards();