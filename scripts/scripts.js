const body = document.querySelector('body');
const menuOpenButton = document.querySelector('.nav-open-button');
const menuCloseButton = document.querySelector('.nav-close-button');
const nav = document.querySelector('.nav');
const heroSection = document.querySelector('.hero');
const header = document.querySelector('.page-header');
const homeSectionText = document.querySelectorAll('.home-section-text');
const heroVideo = document.querySelector('.hero video');
const showreelButton = document.querySelector('.showreel-play-button');
const modal = document.querySelector('.modal-outer');
const modalCloseButton = document.querySelector('.close-modal-button');
let showreelOpened = false;








// TODO prevent focus on nav when closed and on body when open 

function checkIfVideoLoaded() {
    if (heroVideo.src) {
        console.log('video loaded');

    } else {
        setTimeout(checkIfVideoLoaded, 250);
    }
}

checkIfVideoLoaded();

function openNav() {
    nav.classList.add('nav-open');
    body.classList.add('no-scroll');
    heroVideo.pause();
    setTimeout(() => {
        menuOpenButton.style.opacity = 0;
    }, 200);
}

function closeNav() {
    nav.classList.remove('nav-open');
    body.classList.remove('no-scroll');
    heroVideo.play();
    setTimeout(() => {
        menuOpenButton.style.opacity = 1
    }, 200);
}

function openModal() {
    modal.classList.add('modal-open');
    body.classList.add('no-scroll');
    heroVideo.pause();
    if (!showreelOpened) {
        // https://github.com/sampotts/plyr/#options
        const player = new Plyr('#player', {
            autoplay: true,
        });
        // Expose player so it can be used from the console
        window.player = player;
        showreelOpened = true;
    } else {
        player.play();
    }

}

function closeModal() {
    modal.classList.remove('modal-open');
    body.classList.remove('no-scroll');
    player.pause();
    heroVideo.play();
}

showreelButton.addEventListener('click', openModal);
modalCloseButton.addEventListener('click', closeModal);
menuOpenButton.addEventListener('click', openNav);
menuCloseButton.addEventListener('click', closeNav);
modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        closeNav();
    }
})


// Change colour of header on scrol
const headerScrollOptions = {
    rootMargin: "-90% 0px 0px 0px"
};

const filmmakingSectionObserver = new IntersectionObserver(function (
        entries,
        filmmakingSectionObserver
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    },
    headerScrollOptions);

filmmakingSectionObserver.observe(heroSection);

// Animate home page elements on scroll 
function homeTextCallback(homeText) {
    homeText.forEach((homeTextObserverEntry) => {
        if (homeTextObserverEntry.isIntersecting) {
            homeTextObserverEntry.target.classList.add('scrolled');
        }
    })
}

const homeTextObserver = new IntersectionObserver(homeTextCallback, {
    threshold: 0.3,
});

homeSectionText.forEach((text) => homeTextObserver.observe(text));







// Set the year at the bottom of the page
document.querySelector('.year').innerHTML = new Date().getFullYear();