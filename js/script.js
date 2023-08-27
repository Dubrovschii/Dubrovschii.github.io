'use strict';

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

let element = document.querySelector('.promo__clock');

element.setAttribute('data-original-text', element.textContent);

function eraseText() {
  let text = element.textContent;
  if (text.length > 0) {
    element.textContent = text.slice(0, -1);
    setTimeout(eraseText, calculateEraseDelay(text.length)); 
  } else {
    setTimeout(typeText, 100); 
  }
}

function typeText() {
  let originalText = element.getAttribute('data-original-text');
  let currentIndex = 0;
  let finalIndex = originalText.length;

  function type() {
    if (currentIndex < finalIndex) {
      element.textContent += originalText[currentIndex];
      currentIndex++;
      setTimeout(type, currentIndex <= 10 ? 100 : 100); 
    }
  }

  type();
}

function calculateEraseDelay(length) {
  let eraseTime = 700;
  let eraseDelay = eraseTime / length; 
  return eraseDelay;
}

setTimeout(function() {
  eraseText();
}, 2000);





const inputName = document.querySelector('#name');
const inputMail = document.querySelector('#phone');
const inputTextarea = document.querySelector('#message');
const forms = document.querySelectorAll('form');
const message = {
  loading: 'Загрузка...',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};


forms.forEach(item => {
  postData(item);
  
});
function postData(form) {
  form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.appendChild(statusMessage);


      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });
      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
          if (request.status === 200) {
              console.log(request.response);
              statusMessage.textContent = message.success;
              form.reset();
              setTimeout(() => {
                  statusMessage.remove();
              }, 20000);
          } else {
              statusMessage.textContent = message.failure;
          }
      });
  });
}



const inputModalName = document.querySelector('#namemodal');
const inputModalMail = document.querySelector('#phonemodal');
const inputModalTextarea = document.querySelector('#message');
const form = document.querySelectorAll('modal');
form.forEach(item => {
  postData(item);
});
function postData(form) {
  form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.appendChild(statusMessage);
  
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key){
          object[key] = value;
      });
      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
          if (request.status === 200) {
              console.log(request.response);
              statusMessage.textContent = message.success;
              form.reset();
              setTimeout(() => {
                  statusMessage.remove();
              }, 2000);
          } else {
              statusMessage.textContent = message.failure;
          }
      });
  });
}

const modalTrigger = document.querySelector('.promo__btn');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');
const lay = document.querySelector('.overlay');


function openModal(){
  modal.classList.add('show')
  modal.classList.remove('hide')
  lay.classList.add('show')
  clearInterval(modalTimerId);
}
modalTrigger.addEventListener('click', openModal);

function closeModal (){
  modal.classList.add('hide')
  modal.classList.remove('show')
  lay.classList.remove('show')
}
modalCloseBtn.addEventListener('click', closeModal);
lay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.code === "Escape" && modal.classList.contains('show')){
    closeModal();
  }
})
const modalTimerId = setTimeout(openModal, 3000)
