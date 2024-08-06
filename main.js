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


// let selectedLocationBtn = document.getElementById('select-location')
// selectedLocationBtn.addEventListener('click', function () {
//     document.getElementById('location-modal').classList.toggle('show');
// });
const cityData = {
    Egypt: ["Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said", "Suez", "Luxor", "Aswan", "Tanta", "Ismailia"]
};

document.addEventListener('DOMContentLoaded', () => {
    populateCityList();
    setDefaultCity();
});

function populateCityList() {
    const cityList = document.getElementById("city-list");

    // Add cities to the datalist
    Object.keys(cityData).forEach(country => {
        cityData[country].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.dataset.country = country; // Store country info in data attribute
            cityList.appendChild(option);
        });
    });
}

function setDefaultCity() {
    const cityInput = document.getElementById("city");
    if (!cityInput.value) {
        cityInput.value = "Cairo";
        getThePrayerTime();
    }
}

function getSelectedLocation() {
    const cityInput = document.getElementById("city");
    const selectedCity = cityInput.value;
    const options = document.querySelectorAll("#city-list option");

    let country = "Unknown";
    options.forEach(option => {
        if (option.value === selectedCity) {
            country = option.dataset.country; // Retrieve country from data attribute
        }
    });

    return { city: selectedCity, country: country };
}

function convertTo12HourFormat(hour24, minute) {
    const isPM = hour24 >= 12;
    let hour12 = hour24 % 12;
    hour12 = hour12 === 0 ? 12 : hour12; // Handle the special case for 12 AM and 12 PM

    return `${hour12}:${minute.toString().padStart(2, '0')}${isPM ? ' PM' : ' AM'}`;
}

function addMinutesToTime(time24, minutesToAdd) {
    const [hour24, minute] = time24.split(':').map(Number);
    let newHour = hour24;
    let newMinute = minute + minutesToAdd;

    if (newMinute >= 60) {
        newMinute -= 60;
        newHour += 1;
    }

    if (newHour >= 24) {
        newHour -= 24;
    }

    return { hour: newHour, minute: newMinute };
}

function getThePrayerTime() {
    const location = getSelectedLocation();
    const url = `http://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(location.city)}&country=${encodeURIComponent(location.country)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            try {
                if (data.code !== 200) {
                    throw new Error('API error: ' + (data.status || 'Unknown error'));
                }

                const timings = data.data.timings;
                console.log('Prayer Times:', timings);

                displayAzanTime(timings);
                displayPrayerTime(timings);
                highlightNextPrayerTime(timings);
            } catch (e) {
                console.error('Data processing error:', e.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}

function displayAzanTime(timings) {
    const azanTimeContainers = document.querySelectorAll(".azan-time");
    azanTimeContainers.forEach(container => {
        const azanName = container.getAttribute('prayerName');
        if (timings[azanName]) {
            const [hour24, minute] = timings[azanName].split(':').map(Number);
            container.innerHTML = convertTo12HourFormat(hour24, minute);
        } else {
            container.innerHTML = 'N/A'; // Handle cases where the prayer name is not found
        }
    });
}

function displayPrayerTime(timings) {
    const prayerTimeContainers = document.querySelectorAll(".prayer-time");
    prayerTimeContainers.forEach(container => {
        const azanName = container.getAttribute('prayerName');
        if (timings[azanName]) {
            let time24 = timings[azanName];
            if (azanName === 'Maghrib') {
                const { hour, minute } = addMinutesToTime(time24, 5);
                container.innerHTML = convertTo12HourFormat(hour, minute);
            } else {
                const { hour, minute } = addMinutesToTime(time24, 15);
                container.innerHTML = convertTo12HourFormat(hour, minute);
            }
        } else {
            container.innerHTML = 'N/A'; // Handle cases where the prayer name is not found
        }
    });
}

function highlightNextPrayerTime(timings) {
    const currentTime = new Date();
    const prayerTimes = [];

    for (const [prayerName, time] of Object.entries(timings)) {
        const [hour, minute] = time.split(':').map(Number);
        const prayerTime = new Date(currentTime);
        prayerTime.setHours(hour);
        prayerTime.setMinutes(minute);
        prayerTimes.push({ prayerName, prayerTime });
    }

    prayerTimes.sort((a, b) => a.prayerTime - b.prayerTime);

    const nextPrayer = prayerTimes.find(prayer => prayer.prayerTime > currentTime) || prayerTimes[0];

    const rows = document.querySelectorAll("tr");
    rows.forEach(row => {
        row.classList.remove("highlight");
        const prayerNameElement = row.querySelector("td[prayerName]");
        if (prayerNameElement && prayerNameElement.getAttribute('prayerName') === nextPrayer.prayerName) {
            row.classList.add("highlight");
        }
    });
}
