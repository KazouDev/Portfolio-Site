const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!entry.target.classList.contains('active')){
                entry.target.classList.add('active');
            }
        }
    });
},
{
    threshold: 0.3
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
            console.log('[section-link='+entry.target+']');
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