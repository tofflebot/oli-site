const body = document.querySelector('body');
let isHomepage = false;

function checkIfHomepage() {
    if (document.querySelector('.hero')) {
        isHomepage = true;
    }
}


// Navigation
const nav = document.querySelector('.nav');
const header = document.querySelector('.page-header');
const navOpenButton = document.querySelector('.nav-open-button');
const navCloseButton = document.querySelector('.nav-close-button');

function openNav() {
    nav.dispatchEvent(new CustomEvent('navOpened'));
    nav.classList.add('nav-open');
    body.classList.add('no-scroll');
    setTimeout(() => {
        navOpenButton.style.opacity = 0;
    }, 200);
    nav.focus();
}

function closeNav() {
    nav.dispatchEvent(new CustomEvent('navClosed'));
    nav.classList.remove('nav-open');
    body.classList.remove('no-scroll');
    setTimeout(() => {
        navOpenButton.style.opacity = 1
    }, 200);                              
}

navOpenButton.addEventListener('click', openNav);
navCloseButton.addEventListener('click', closeNav);

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeNav();
    }
});

// Homepage 
function homepageFunctions() {

    if (!isHomepage) {
        return
    } else {
        const heroSection = document.querySelector('.hero');
        const homeSectionText = document.querySelectorAll('.home-section-text');
        const heroVideo = document.querySelector('.hero video');
        const showreelButton = document.querySelector('.showreel-play-button');
        const modal = document.querySelector('.modal-outer');
        const modalCloseButton = document.querySelector('.close-modal-button');
        let showreelOpened = false;


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

        };

        function stopShowreel() {
            if (player.playing) {
                player.pause();
            } else {
                setTimeout(stopShowreel, 200);
            }
        }

        function closeModal() {
            modal.classList.remove('modal-open');
            body.classList.remove('no-scroll');
            heroVideo.play();
            stopShowreel();
        }

        showreelButton.addEventListener('click', openModal);
        modalCloseButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        });


        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        nav.addEventListener('navOpened',
            () => {
                setTimeout(() => {
                    heroVideo.pause()
                }, 400);
            });

        nav.addEventListener('navClosed',
            () => {
                heroVideo.play();
            });

            
            



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
        const modalElements = Array.from(modal.querySelectorAll('a, button'));
    };

}; //end homepage functions 


function headerBuffer() {
    const headerHeight = document.querySelector('.header-height');
    headerHeight.style.height = `${header.clientHeight}px`;
}

// TODO prevent focus on nav and modal when closed and on body when they are open 

//Not homepage functions
function notHomepageFunctions() {
    if (isHomepage) {
        return;
    } else {
        header.classList.add('scrolled');
        headerBuffer();
    };
    window.addEventListener('resize', headerBuffer)
}





// Set the year at the bottom of the page
document.querySelector('.year').innerHTML = new Date().getFullYear();


//Functions to run on page load
checkIfHomepage();
homepageFunctions();
notHomepageFunctions();

window.addEventListener('load', () => console.log('loaded'));
window.addEventListener('DOMContentLoaded', () => console.log('DOMContentLoaded'));
