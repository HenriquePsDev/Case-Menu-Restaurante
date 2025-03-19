document.addEventListener('DOMContentLoaded', function() {
  // ==============================
  // Sistema de Pedidos (Sacola)
  // ==============================
  let order = [];

  // Função para atualizar a lista de pedidos no modal (sacola)
  function updateOrderList() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // limpa a lista
    let total = 0;
    
    order.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
      
      // Botão para excluir o pedido
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.classList.add('delete-item');
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', function(e) {
         e.stopPropagation();
         order.splice(index, 1);
         updateOrderList();
      });
      
      li.appendChild(deleteBtn);
      orderList.appendChild(li);
      total += item.price;
    });
    
    document.getElementById('order-total').textContent = total.toFixed(2);
  }

  // Adiciona evento para os botões "Adicionar à Sacola"
  const addButtons = document.querySelectorAll('.add-to-order');
  addButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Pega os detalhes do item (nome e preço)
      const details = this.parentElement;
      const name = details.querySelector('h3').textContent;
      // Obtém o preço usando o atributo data-price
      const price = parseFloat(details.querySelector('.price').getAttribute('data-price'));
      
      order.push({ name, price });
      updateOrderList();
      alert(`"${name}" adicionado à sacola!`);
      // Abre o modal automaticamente após adicionar
      orderModal.style.display = 'block';
    });
  });

  // Modal do pedido (sacola)
  const orderModal = document.getElementById('order-modal');
  const orderBtn = document.querySelector('.order-btn');
  const closeModal = document.querySelector('.modal-content .close');

  orderBtn.addEventListener('click', () => {
    orderModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    orderModal.style.display = 'none';
  });

  // Fecha o modal se clicar fora do conteúdo
  window.addEventListener('click', (event) => {
    if (event.target === orderModal) {
      orderModal.style.display = 'none';
    }
  });

  // Evento para "Enviar Pedido"
  document.getElementById('submit-order').addEventListener('click', function() {
    if (order.length === 0) {
      alert('Sua sacola está vazia!');
      return;
    }
    // Integração com backend ou API pode ser feita aqui.
    alert('Pedido enviado com sucesso!');
    order = []; // limpa o pedido
    updateOrderList();
    orderModal.style.display = 'none';
  });

  // ==============================
  // Navbar: Menu Dropdown para Mobile
  // ==============================
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

  // ==============================
  // Carrossel de Destaques
  // ==============================
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.carousel .prev');
  const nextBtn = document.querySelector('.carousel .next');
  let currentIndex = 0;
  let totalSlides;

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 20; // inclui o gap de 20px
    if (window.innerWidth >= 769) {
      slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else {
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
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });

  // Auto slide a cada 5 segundos
  setInterval(() => {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }, 5000);

  // ==============================
  // Suporte para Swipe (Touch) no Carrossel
  // ==============================
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

  // ==============================
  // Suporte para Drag com o Mouse no Carrossel
  // ==============================
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

  // ==============================
  // Suporte para Swipe Horizontal nos nav-links
  // ==============================
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
