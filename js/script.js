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
  // Расчет времени задержки на каждый символ
  return eraseDelay;
}

setTimeout(function() {
  eraseText();
}, 2000);



  //   // Функция для отправки данных формы с использованием AJAX
  //   function sendForm() {
  //     // Получение значений полей формы
  //     const name = document.getElementById('namemodal').value;
  //     const phone = document.getElementById('phonemodal').value;
  //     const date = document.getElementById('datepicker').value;
  //     const time = document.querySelector('.timepicker').value;

  //     const statusMessage = document.createElement('div');
  //     statusMessage.classList.add('status');
  //     statusMessage.textContent = message.loading;

  //     form.append(statusMessage);
  //     // Создание объекта с данными для отправки на сервер
  //     const formData = new FormData();
  //     formData.append('name', name);
  //     formData.append('phone', phone);
  //     formData.append('date', date);
  //     formData.append('time', time);

  //     // Отправка данных на сервер с использованием AJAX
  //     fetch('server.php', {
  //         method: 'POST',
  //         body: formData
  //     })
  //     .then(response => response.text())
  //     .then(data => {
  //         // Отображение ответа сервера
  //         console.log(data); // Замените на более подходящий способ отображения ответа
  //     })
  //     .catch(error => {
  //         console.error('Ошибка:', error);
  //     });
  // }

  // // Обработка события отправки формы
  // const form = document.querySelector('.modal__form');
  // form.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //     sendForm(); // Вызывает функцию для отправки данных
  // });

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
      // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
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