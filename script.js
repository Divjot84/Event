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
  return 3;
}

function maxIndex() {
  return slideData.length - 1; // so we can center the last card
}

function renderSlides() {
  slidesContainer.innerHTML = '';
  slideData.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = `card slide ${['one', 'two', 'three', 'four', 'five'][i] || ''}`;
    slide.innerHTML = `
      <div class="slide-inner">
        <div class="card-top">
          <img src="${s.src}" alt="${s.title}" />
        </div>
        <div class="event-name">${s.title}</div>
        <div class="card-bottom">
          <div class="card-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor</p>
          </div>
        </div>
      </div>
    `;

    slidesContainer.appendChild(slide);
  });
}


gsap.registerPlugin(ScrollTrigger);

// Initial scale setup
gsap.set(".card", { scale: 0.85 });
gsap.set(".card.one", { scale: 1 });

const tl = gsap.timeline({ defaults: { duration: 1, ease: "none" } }).pause();

tl.addLabel("start")
  .to(".card.one", { scale: 0.85, duration: 0.85 })
  .to(".card.two", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("two")
  .to(".card.two", { scale: 0.85, duration: 0.85 })
  .to(".card.three", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("three")
  .to(".card.three", { scale: 0.85, duration: 0.85 })
  .to(".card.four", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("four")
  .to(".card.four", { scale: 0.85, duration: 0.85 })
  .to(".card.five", { scale: 1, duration: 0.85 }, ">-0.85")
  .addLabel("end");

const scroller = document.querySelector(".carousel-wrapper");

const trigger = ScrollTrigger.create({
  scroller: scroller,
  horizontal: true,
  start: 0,
  end: () => `+=${ScrollTrigger.maxScroll(scroller, true)}`,
  scrub: true,
  animation: tl,
  snap: {
    snapTo: "labels",
    duration: { min: 0.1, max: 0.2 }
  }
});

// Maintain scroll position on refresh
let progress = 0;
ScrollTrigger.addEventListener("refreshInit", () => {
  progress = trigger.progress;
});
ScrollTrigger.addEventListener("refresh", () => {
  trigger.scroll(progress * ScrollTrigger.maxScroll(scroller, true));
});


renderSlides();

slidesContainer.addEventListener('click', e => {
  const clickedCard = e.target.closest('.card');
  if (!clickedCard) return;

  // Highlight the clicked card
  slidesContainer.querySelectorAll('.card').forEach(c => c.classList.remove('highlighted'));
  clickedCard.classList.add('highlighted');

  // Find index of clicked card
  const cards = Array.from(slidesContainer.querySelectorAll('.card'));
  const index = cards.indexOf(clickedCard);

  const centerOffset = 1; // because 3 cards per view → center is index + 1
  const total = slideData.length;
  const max = total - 1;

  let newStart = index - centerOffset;

  // ✅ Allow negative value (to create left empty space)
  // ✅ Allow value beyond maxIndex (to create right empty space)
  const hardMin = -centerOffset;
  const hardMax = max - 1; // Allow scroll beyond last item

  if (newStart < hardMin) newStart = hardMin;
  if (newStart > hardMax) newStart = hardMax;

  current = newStart;

  updateCarousel();
});
let autoSlide = setInterval(autoAdvance, 5000);

function autoAdvance() {
  if (current < maxIndex() - 1) {
    current += 1;
  } else {
    current = 0;
  }
  updateCarousel();
  updateHighlight();
}

slidesContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
slidesContainer.addEventListener('mouseleave', () => {
  autoSlide = setInterval(autoAdvance, 5000);
});


slidesContainer.addEventListener('click', e => {
  const clickedCard = e.target.closest('.card');
  if (!clickedCard) return;

  const isHighlighted = clickedCard.classList.contains('highlighted');
  const inner = clickedCard.querySelector('.slide-inner');

  if (isHighlighted) {
    // Toggle fold on the already highlighted (center) card
    inner.classList.toggle('folded');
  } else {
    // Set the clicked card as center
    const cards = Array.from(slidesContainer.querySelectorAll('.card'));
    const index = cards.indexOf(clickedCard);
    current = Math.max(index - 1, 0);
    updateCarousel();

    // Remove fold from all cards
    slidesContainer.querySelectorAll('.slide-inner').forEach(i => i.classList.remove('folded'));
  }
});



function updateHighlight() {
  slidesContainer.querySelectorAll('.card').forEach(c => c.classList.remove('highlighted'));

  const cards = Array.from(slidesContainer.querySelectorAll('.card'));
  const centerIndex = current + 1; // second card in 3-view layout
  if (cards[centerIndex]) {
    cards[centerIndex].classList.add('highlighted');
  }
}




function updateCarousel() {
  const shift = -(100 / visibleCount()) * current;
  slidesContainer.style.transform = `translateX(${shift}%)`;

  // Reset all card scales and remove highlight
  const allCards = slidesContainer.querySelectorAll('.card');
  allCards.forEach(card => {
    card.classList.remove('highlighted');
    gsap.to(card, { scale: 0.85, duration: 0.4, ease: 'power2.out' });
  });

  // Highlight and scale the center card
  const centerIndex = current + 1; // the 2nd visible card in a 3-card view
  const centerCard = allCards[centerIndex];
  if (centerCard) {
    centerCard.classList.add('highlighted');
    gsap.to(centerCard, { scale: 1, duration: 0.4, ease: 'power2.out' });
  }
}

// function updateCarousel() {
//   const shift = -(100 / visibleCount()) * current;
//   slidesContainer.style.transform = `translateX(${shift}%)`;
// }
// function updateCarousel() {
//   const shift = -(100 / visibleCount()) * current;
//   slidesContainer.style.transform = `translateX(${shift}%)`;
// }





prevBtn.addEventListener('click', () => {
  if (current > -1) {
    current -= 1;
    updateCarousel();
    updateHighlight();
  }
});

nextBtn.addEventListener('click', () => {
  if (current < maxIndex() - 1) {
    current += 1;
    updateCarousel();
    updateHighlight();
  }
});


function clearHighlight() {
  slidesContainer.querySelectorAll('.card').forEach(c => c.classList.remove('highlighted'));
}


window.addEventListener('resize', updateCarousel);
updateCarousel();

// Set delay index for animation
document.querySelectorAll('.leMagnify span').forEach((span, i) => {
  span.style.setProperty('--i', i);
});
// const themeToggle = document.getElementById('themeToggle'),
//       logo = document.getElementById('logo'),
//       icon = document.getElementById('themeIcon');

// themeToggle.addEventListener('click', () => {
//   const isLight = document.body.classList.toggle('light-theme');
//   icon.textContent = isLight ? '☀️' : '🌙';

//   // Switch logo based on theme
//   logo.src = isLight ? 'Images/logo-light.png' : 'Images/logo-dark.png';
// });



