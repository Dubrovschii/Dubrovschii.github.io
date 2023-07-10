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



