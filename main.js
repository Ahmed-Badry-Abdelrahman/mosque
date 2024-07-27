const btnMenu = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    menu.classList.toggle('active');
    menu.classList.toggle('zoomIn');

    if (this.style.transform === 'scale(1.1) rotate(90deg)') {
        this.style.transform = 'scale(1) rotate(0deg)';
    } else {
        this.style.transform = 'scale(1.1) rotate(90deg)';
    }
});

document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && event.target !== btnMenu) {
        menu.classList.remove('active');
        menu.classList.remove('zoomIn');
        btnMenu.style.transform = 'scale(1) rotate(0deg)';
    }
});
