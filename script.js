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







/*var figure = $(".item-video").hover( hoverVideo, hideVideo );
$("video").prop('muted', false);
$(document).on('click', function(e) {
    clicked_id = e.target.id;
    if(clicked_id == "volume"){
        muteVideo(e);
    }
    })

function hoverVideo(e) {  
    $('video', this).get(0).play(); 
}

function hideVideo(e) {
    $('video', this).get(0).pause(); 
}

function muteVideo(e) {
    e.stopPropagation();
    e.stopImmediatePropagation()
    if ($('video').prop("muted")){
        $('video').prop("muted", false);
        $('#volume').removeClass("fas fa-volume-mute").addClass("fas fa-volume-up");
    } else {
        $('video').prop("muted", true)
        console.log($('video'))
        $('#volume').removeClass("fas fa-volume-up").addClass("fas fa-volume-mute")
    }
}*/