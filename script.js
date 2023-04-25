const storage = window.localStorage;

let dark_mode_button = document.querySelector('.light-button');

initTheme();

function initTheme(){
    var theme = storage.getItem('theme') == null ? 'light' : storage.getItem('theme');
    if (theme === 'dark'){
        dark_mode_button.classList.toggle('fa-regular');
        dark_mode_button.classList.toggle('fa-solid');
        document.body.classList.toggle('darkmode');
    }
}

const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!entry.target.classList.contains('active')){
                entry.target.classList.add('active');
                observerReveal.unobserve(entry.target);
            }
        }
    });
},
{
    threshold: 0.1
}
);

var last_current = null;

let menu = document.querySelector('nav');

const observerCurrent = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (last_current != null){
                last_current.classList.toggle('current');
            }
            let current = document.querySelector('[section-link='+entry.target.getAttribute('id')+']');
            current.classList.toggle('current');
            last_current = current;
        }
    });
},
{
    threshold: 0.7
}
);


let elements_reveals = document.querySelectorAll('.reveal');
elements_reveals.forEach(reveal => {
    observerReveal.observe(reveal);
})

let sections = document.querySelectorAll('section');
sections.forEach(reveal => {
    observerCurrent.observe(reveal);
})

let nav_mobile_button = document.querySelector('.mobile-button');
nav_mobile_button.addEventListener('click', async event => {
    menu.classList.toggle('open');
});

dark_mode_button.addEventListener('click', async event => {
    let button = dark_mode_button.querySelector('.fa-moon');
    if (document.body.classList.contains('darkmode')){
        storage.setItem('theme', 'light');
    } else {
        storage.setItem('theme', 'dark');
    }
    button.classList.toggle('fa-regular');
    button.classList.toggle('fa-solid');
    document.body.classList.toggle('darkmode');
});

let menu_mobile_buttons = document.querySelectorAll('nav ul li a');
menu_mobile_buttons.forEach(button => {
    button.addEventListener('click', async event => {
        if (window.innerWidth <= 850){
            document.querySelector('nav').classList.toggle('open');
        }
    });
});

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    let target = button.getAttribute('data-target');
    if (target != null){
        button.addEventListener('click', async event => {
            document.querySelector(`#${target}`).classList.toggle('show');
            document.body.style.paddingRight = `${getScrollbarWidth()}px`
            document.body.classList.toggle('modal-show');
        });
    }
});

let modal_close_buttons = document.querySelectorAll('.modal-close');
modal_close_buttons.forEach(button => {
    button.addEventListener('click', async event => {
        var sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
        document.body.style.paddingRight = `0px`
        
        document.body.classList.toggle('modal-show');
        document.querySelector('.projet-modal.show').classList.toggle('show');
    })
});

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

// Swiper.js

var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  });