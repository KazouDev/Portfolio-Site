var grid = document.querySelector('.grid');

var more_info_buttons = document.querySelectorAll('.buttons');

const delay = ms => new Promise(res => setTimeout(res, ms));

function addButton(div){
    let buttons = div.querySelector('.buttons');
    buttons.addEventListener('click', async event =>  {
        let element = buttons.parentElement;
        grid.scrollIntoView({behavior: 'smooth', block: 'end'});
        await delay(900);
        element.innerHTML = ""
        element.classList.toggle('hidden');
    });
}

var items = document.querySelectorAll('.link-item');
items.forEach(item => {
    item.addEventListener('click', event => {
        let element = document.querySelector('.more-info');
        element.classList.toggle('hidden');
        let page = item.getAttribute('data-page');
        console.log(page)
        fetch("pages/"+page).then(res => {
            return res.text();
        }).then(html => {
            element.innerHTML = html;
            addButton(element);
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
    });
});



const mute = function(i){
    i.classList.toggle("fa-volume-mute");
    i.classList.toggle("fa-volume-up");
    let previousVideo = i.previousSibling.previousSibling
    previousVideo.muted = !(previousVideo.muted)
}

const firstTimeClicked = [];

const videoItems = document.querySelectorAll('.item-video');

videoItems.forEach(element => {
    element.addEventListener('mouseenter', hoverVideo)
    element.addEventListener('mouseleave', hideVideo)
});

function hoverVideo(v){
    console.log(v.target.children)
    let video = v.target.children[0];
    if(!firstTimeClicked.includes(video)){
        video.muted = true;
        firstTimeClicked.push(video);
    }
    v.target.children[0].play();
}

function hideVideo(v){
    v.target.children[0].pause();
}

function reaveal(){
    let window_height = window.innerHeight;
    let elements_reveals = document.querySelectorAll('.reveal');
    elements_reveals.forEach(element => {
        if (element.getBoundingClientRect().top + 100 < window_height){
            element.classList.add('active');
        } else if (element.getBoundingClientRect().top > window_height){
            element.classList.remove('active');
        }
    });
}

function updateNavbar(){
    let sections = document.querySelectorAll('section');
    let navButtons = document.querySelectorAll('nav ul li');
    sections.forEach(section => {
        let windowTop = window.scrollY;
        let sectionOffset = section.offsetTop;
        let sectionHeight = section.offsetHeight;
        
    });
}

let menu = document.querySelector('nav');
let nav_mobile_button = document.querySelector('.mobile-button');
nav_mobile_button.addEventListener('click', async event => {
    menu.classList.toggle('open');
});

window.addEventListener('scroll', reaveal);