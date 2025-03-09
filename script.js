document.addEventListener('DOMContentLoaded', function() {
  /* --- Navbar: Menu Dropdown para Mobile --- */
  const menuBtn = document.querySelector('.menu-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  menuBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
  });

  // Fecha o dropdown ao clicar em qualquer link
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('active');
    });
  });

  /* --- Carrossel de Destaques --- */
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.carousel .prev');
  const nextBtn = document.querySelector('.carousel .next');
  let currentIndex = 0;
  let totalSlides;

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 20; // inclui o gap de 20px
    if (window.innerWidth >= 769) {
      // Para desktop, usa a largura do slide + gap de 20px
      slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else {
      // Para mobile, usa o transform baseado em porcentagem
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  function updateTotalSlides() {
    if (window.innerWidth >= 769) {
      totalSlides = slides.length - 3 + 1; // Em desktop, 3 slides visíveis por vez
    } else {
      totalSlides = slides.length; // Em mobile, exibe 1 slide por vez
    }
    if (currentIndex >= totalSlides) {
      currentIndex = totalSlides - 1;
      updateCarousel();
    }
  }

  updateTotalSlides();
  window.addEventListener('resize', () => {
    updateTotalSlides();
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    // Se estamos no primeiro slide, volta para o último slide
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    // Se estamos no último slide, volta para o primeiro slide
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });

  // Auto slide a cada 5 segundos
  setInterval(() => {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }, 5000);

  /* --- Suporte para Swipe (Touch) no Carrossel --- */
  let startX = 0;
  let isTouchDragging = false;

  slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isTouchDragging = true;
  });

  slidesContainer.addEventListener('touchmove', (e) => {
    if (!isTouchDragging) return;
    const moveX = e.touches[0].clientX - startX;
    if (Math.abs(moveX) > 50) {
      if (moveX > 0) {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
      } else {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
      }
      updateCarousel();
      isTouchDragging = false;
    }
  });

  slidesContainer.addEventListener('touchend', () => {
    isTouchDragging = false;
  });

  /* --- Suporte para Drag com o Mouse no Carrossel --- */
  let isMouseDragging = false;
  let mouseStartX = 0;

  slidesContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isMouseDragging = true;
    mouseStartX = e.clientX;
  });

  slidesContainer.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return;
    const diff = e.clientX - mouseStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
      } else {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
      }
      updateCarousel();
      isMouseDragging = false;
    }
  });

  slidesContainer.addEventListener('mouseup', () => {
    isMouseDragging = false;
  });
  slidesContainer.addEventListener('mouseleave', () => {
    isMouseDragging = false;
  });

  /* --- Suporte para Swipe Horizontal nos nav-links --- */
  const navLinks = document.querySelector('.nav-links');
  let navStartX = 0;
  let navIsDragging = false;

  navLinks.addEventListener('touchstart', (e) => {
    navStartX = e.touches[0].clientX;
    navIsDragging = true;
  });

  navLinks.addEventListener('touchmove', (e) => {
    if (!navIsDragging) return;
    const moveX = e.touches[0].clientX - navStartX;
    navLinks.scrollLeft -= moveX;
    navStartX = e.touches[0].clientX;
  });

  navLinks.addEventListener('touchend', () => {
    navIsDragging = false;
  });
});
