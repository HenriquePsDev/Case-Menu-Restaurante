let slideIndex = 0;

function mudarSlide(n) {
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  
  // Define quantos slides serão exibidos com base na largura da tela
  const slidesPerView = window.innerWidth > 768 ? 3 : 1;
  const maxIndex = totalSlides - slidesPerView;
  
  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = maxIndex;
  }
  if (slideIndex > maxIndex) {
    slideIndex = 0;
  }
  
  // Calcula o deslocamento em pixels levando em conta a largura do slide e o gap
  const slide = slides[0];
  const slideWidth = slide.offsetWidth;
  // Pega o gap definido na propriedade CSS (ou 0 se não estiver definido)
  const gap = parseInt(getComputedStyle(slidesContainer).gap) || 0;
  const effectiveWidth = slideWidth + gap;
  
  slidesContainer.style.transform = `translateX(-${slideIndex * effectiveWidth}px)`;
}
