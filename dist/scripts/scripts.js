const body = document.querySelector('body');
const menuOpenButton = document.querySelector('.nav-open-button');
const menuCloseButton = document.querySelector('.nav-close-button');
const nav = document.querySelector('.nav');
const heroSection = document.querySelector('.hero');
const header = document.querySelector('.page-header');
const homeSectionText = document.querySelectorAll('.home-section-text');



// TODO prevent focus on nav when closed and on body when open 

function openNav() {
    nav.classList.add('nav-open');
    body.classList.add('nav-open');
    setTimeout(() => {
        menuOpenButton.style.opacity = 0;
    }, 200);
}

function closeNav() {
    nav.classList.remove('nav-open');
    body.classList.remove('nav-open');
    setTimeout(() => {
        menuOpenButton.style.opacity = 1
    }, 200);
}

menuOpenButton.addEventListener('click', openNav);
menuCloseButton.addEventListener('click', closeNav);


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