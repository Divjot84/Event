const hamburger = document.getElementById('hamburger'),
      navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  hamburger.classList.toggle('hamburger-active');
});

const themeToggle = document.getElementById('themeToggle'),
      logo = document.getElementById('logo'),
      icon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
  const light = document.body.classList.toggle('light-theme');
  icon.textContent = light ? '☀️' : '🌙';
  logo.src = light ? '' : 'ILEAD_white 34@2x.png';
});

const slideData = [
  { title: "Makkah Gathering", src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop" },
  { title: "Jeddah Corniche", src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop" },
  { title: "Riyadh Cityscape", src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop" },
  { title: "Desert Bloom", src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c" },
  { title: "Ocean Festival", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
];

const slidesContainer = document.getElementById('slidesContainer'),
      prevBtn = document.getElementById('prevBtn'),
      nextBtn = document.getElementById('nextBtn');

let current = 0;

function visibleCount() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function maxIndex() {
  return slideData.length - visibleCount();
}

function renderSlides() {
  slidesContainer.innerHTML = '';
  slideData.forEach(s => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${s.src}" alt="${s.title}">
            <h2>${s.title}</h2>
          </div>
          <div class="flip-card-back">
            <img src="${s.src}" alt="${s.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
            <p style="padding: 10px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel pulvinar libero.</p>
          </div>
        </div>
      </div>`;
    slidesContainer.appendChild(slide);
  });
}

renderSlides();

slidesContainer.addEventListener('click', e => {
  const clickedCard = e.target.closest('.flip-card');
  if (!clickedCard) return;

  document.querySelectorAll('.flip-card').forEach(card => {
    if (card !== clickedCard) card.classList.remove('flipped');
  });

  clickedCard.classList.toggle('flipped');
});

function updateCarousel() {
  const shift = -(100 / visibleCount()) * current;
  slidesContainer.style.transform = `translateX(${shift}%)`;
}

prevBtn.addEventListener('click', () => {
  current = current <= 0 ? maxIndex() : current - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  current = current >= maxIndex() ? 0 : current + 1;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

document.querySelectorAll('.leMagnify span').forEach((span, i) => {
  span.style.setProperty('--i', i);
});
