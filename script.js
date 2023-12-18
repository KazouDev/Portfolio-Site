const storage = window.localStorage;
const MAIL_MESSAGE_SIZE = 15;

emailjs.init("VRcmXpRSmU6Ge9i1M");

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

var inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
        let text = getNewText(input.value, e);
        if (text){
            input.classList.add('typed');
            input.classList.remove('invalid');
            if (input.attributes.getNamedItem('required')){
                if (input.getAttribute('id') == 'email'){
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text) ? input.classList.remove('invalid') : input.classList.add('invalid');
                }
            } else if (input.getAttribute('id') === "telephone"){
                if ((!(/^\d+$/.test(e.key)) || input.value.length > 9)  && !(e.key == 'Delete' || e.key == 'Backspace' || e.key == 'Tab')) e.preventDefault();
            }
        } else {
            input.classList.remove('typed')
            if (input.attributes.getNamedItem('required')) input.classList.add('invalid');       
        }
    });
});

var getNewText = (txt, e) => {
    const ignoredKeys = ['ArrowLeft','ArrowRight','Tab','End','Home','ArrowUp','ArrowDown'];
    const selection = (e.target.selectionEnd - e.target.selectionStart);
    if (ignoredKeys.includes(e.key)) return txt;
    let txtArray = txt.split('');
    switch (e.key) {
        case 'Backspace':
            (selection === 0 && e.target.selectionStart > 0) ? txtArray.splice(e.target.selectionStart - 1, selection + 1) : txtArray.splice(e.target.selectionStart, selection);
            break;
        case 'Delete':
            (selection === 0) ? txtArray.splice(e.target.selectionStart, selection + 1) : txtArray.splice(e.target.selectionStart, selection);
            break;
        default:
            txtArray.splice(e.target.selectionStart, selection, e.key);
            break;
    }
    return txtArray.join(''); 
}

let messageArea = document.getElementById('message');
messageArea.addEventListener('keydown', (e) => {
    let text = getNewText(messageArea.value, e);
    console.log(text.length)
    if (text && text.length > MAIL_MESSAGE_SIZE){
        messageArea.classList.add('typed');
        messageArea.classList.remove('invalid');
    } else {
        messageArea.classList.remove('typed')
        messageArea.classList.add('invalid');       
    }
});

const contactForm = document.querySelector('.contact-form');
let btnForm = document.querySelector('.contact-form > button');

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    inputs.forEach(input => {
        if (input.classList.contains('invalid')) {
            input.focus();
            return;
        }
    });
    if (messageArea.value && messageArea.value.length < MAIL_MESSAGE_SIZE){
        messageArea.classList.add('invalid');
        messageArea.focus();
        return;
    }
    btnForm.innerHTML = 'Envoie...';

    const serviceID = 'default_service';
    const templateID = 'template_4tgwr3k';
 
    emailjs.sendForm(serviceID, templateID, e.target)
        .then(() => {
        btnForm.innerHTML = 'Envoyé !';
        alert('Email envoyé avec succès !');
        btnForm.disabled = true;
    }, (err) => {
        btnForm.innerHTML = 'Envoyer';
        alert(JSON.stringify(err));
    });

    inputs.forEach(input => {
        input.value = "";
    });
    messageArea.value = "";
 });

 function loadImage() {
    var largeurHeader = document.getElementById("header").offsetWidth;
    var hauteurHeader = document.getElementById("header").offsetHeight;
    var imagesFlottantes = document.querySelectorAll(".image-flottant");
  
    for (var i = 0; i < imagesFlottantes.length; i++) {
      var imageFlottante = imagesFlottantes[i];
      var positionX = Math.random() * (largeurHeader - imageFlottante.offsetWidth);
      var positionY = Math.random() * (hauteurHeader - imageFlottante.offsetHeight);
      imageFlottante.style.left = positionX + "px";
      imageFlottante.style.top = positionY + "px";
    }
  }
  
  function animerImagesFlottantes() {
    var largeurHeader = document.getElementById("header").offsetWidth;
    var hauteurHeader = document.getElementById("header").offsetHeight;
    var imagesFlottantes = document.querySelectorAll(".image-flottant");
  
    if (window.innerWidth > 1000) {
      for (var i = 0; i < imagesFlottantes.length; i++) {
        var imageFlottante = imagesFlottantes[i];
  
        deplacerImage(imageFlottante, largeurHeader, hauteurHeader);
      }
    }
    requestAnimationFrame(animerImagesFlottantes);
  }
  
  function deplacerImage(image, largeurHeader, hauteurHeader) {
    if (image.classList.contains('draggable')) return;
    var positionX = parseFloat(image.style.left);
    var positionY = parseFloat(image.style.top);
    var vitesseX = parseFloat(image.getAttribute("data-vitesseX")) || (Math.random() - 0.5) * 3;
    var vitesseY = parseFloat(image.getAttribute("data-vitesseY")) || (Math.random() - 0.5) * 3;
  
    positionX += vitesseX;
    positionY += vitesseY;
  
    if (positionX <= 0 || positionX >= largeurHeader - image.offsetWidth) {
      vitesseX *= -1;
    }
    if (positionY <= 0 || positionY >= hauteurHeader - image.offsetHeight) {
      vitesseY *= -1;
    }
  
    positionX = Math.max(0, Math.min(positionX, largeurHeader - image.offsetWidth));
    positionY = Math.max(0, Math.min(positionY, hauteurHeader - image.offsetHeight));
  
    image.style.left = positionX + "px";
    image.style.top = positionY + "px";
    image.setAttribute("data-vitesseX", vitesseX);
    image.setAttribute("data-vitesseY", vitesseY);
  }
  
  loadImage();
  animerImagesFlottantes();

  var isDragging = false;
  function makeImagesDraggable() {
    var imagesFlottantes = document.querySelectorAll(".image-flottant");
  
    imagesFlottantes.forEach(function (imageFlottante) {
  
      imageFlottante.addEventListener("mousedown", function (e) {
        e.preventDefault();
        if (e.target === imageFlottante || e.target.parentElement === imageFlottante) {
          initDrag(e, imageFlottante);
        }
      });
  
      imageFlottante.addEventListener("mousemove", drag);
      imageFlottante.addEventListener("mouseup", endDrag);
    });
  
    var activeImage = null;
    var initialX = 0;
    var initialY = 0;
    var offsetX = 0;
    var offsetY = 0;
  
    function initDrag(e, imageFlottante) {
      activeImage = imageFlottante;
      initialX = e.clientX;
      initialY = e.clientY;
      offsetX = parseFloat(activeImage.style.left) || 0;
      offsetY = parseFloat(activeImage.style.top) || 0;
  
      activeImage.classList.add("draggable");
    }
  
    function drag(e) {
      if (activeImage) {
        var currentX = e.clientX - initialX;
        var currentY = e.clientY - initialY;
        var newX = offsetX + currentX;
        var newY = offsetY + currentY;
  
        activeImage.style.left = newX + "px";
        activeImage.style.top = newY + "px";
      }
    }
  
    function endDrag(e) {
        e.preventDefault();
        activeImage.classList.remove("draggable");
        activeImage = null;
    }
  }
  
  makeImagesDraggable();

  console.log("Mise à jour !");