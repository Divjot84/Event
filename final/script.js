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
  {
    title: "Makkah Gathering",
    src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop",
    description: "A spiritual and peaceful gathering in Makkah city, filled with blessings and serenity.",
    gallery: [
      "https://images.unsplash.com/photo-1581320545532-9976a2ab1d66?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1587502537745-8a2dfc1d4f4c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1602526207925-9aa1573fa36e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1603574670812-03859dca3e42?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Jeddah Corniche",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
    description: "A vibrant evening along the Red Sea with scenic views and modern architecture.",
    gallery: [
      "https://images.unsplash.com/photo-1616531770196-1a642c404cc3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1534237710431-e2fc698436b9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9891deff6?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Riyadh Cityscape",
    src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop",
    description: "The heart of Saudi Arabia with tall skyscrapers and an exciting urban atmosphere.",
    gallery: [
      "https://images.unsplash.com/photo-1520681185598-fc299e6c1df4?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558002038-daf7aaae4d8b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1559648485-6fd0bca89843?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Desert Bloom",
    src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c",
    description: "A magical desert transformed by rare rains into a field of colorful wildflowers.",
    gallery: [
      "https://images.unsplash.com/photo-1580740561925-e7128f34c696?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1605379399642-01c0edbe28dc?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1605540704902-2672cc5c9f53?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1633279862046-d6046deec891?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    title: "Ocean Festival",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "An energetic celebration by the sea with music, food, and ocean-themed decorations.",
    gallery: [
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1504609813445-cb293fcd7745?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1582213782179-3749e6cb6ac7?auto=format&fit=crop&w=400&q=80"
    ]
  }
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
      <div class="card-face front">
        <div class="card-top">
          <img src="${s.src}" alt="${s.title}" />
        </div>
        <div class="event-name">${s.title}</div>
      </div>
      <div class="card-face back">
        <div class="card-back-top">
          <button class="scroll-arrow left">‹</button>
          <div class="image-carousel">
            ${s.gallery.map(img => `<img src="${img}" alt="Gallery image" />`).join('')}
          </div>
          <button class="scroll-arrow right">›</button>
        </div>
        <div class="card-back-bottom">
          <h3>${s.title}</h3>
          <p>${s.description}</p>
        </div>
      </div>
    </div>
  `;

  slidesContainer.appendChild(slide);

  // Delay to allow slide to mount before querying DOM
  setTimeout(() => {
  const back = slide.querySelector('.card-face.back');
  if (!back) return;

  const carousel = back.querySelector('.image-carousel');
  const leftBtn = back.querySelector('.scroll-arrow.left');
  const rightBtn = back.querySelector('.scroll-arrow.right');

  const galleryImgs = Array.from(carousel.querySelectorAll('img'));
  const totalImages = galleryImgs.length;

  let currentIndex = 0;
  let autoScroll;

  // === Scroll-to-index helper ===
  const scrollToImage = (index) => {
    carousel.scrollTo({
      left: carousel.clientWidth * index,
      behavior: 'smooth',
    });
  };

  // === Dots ===
  const dotsWrapper = document.createElement('div');
  dotsWrapper.className = 'carousel-dots';
  back.appendChild(dotsWrapper);

  galleryImgs.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = index;
      scrollToImage(currentIndex);
    });
    dotsWrapper.appendChild(dot);
  });

  const updateActiveDot = () => {
    const width = carousel.clientWidth;
    const scrollLeft = carousel.scrollLeft;
    const index = Math.round(scrollLeft / width);
    currentIndex = index;

    dotsWrapper.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  };

  // === Scroll Arrows ===
  leftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = Math.max(currentIndex - 1, 0);
    scrollToImage(currentIndex);
  });

  rightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = Math.min(currentIndex + 1, totalImages - 1);
    scrollToImage(currentIndex);
  });

  // === Auto-scroll every 2 sec ===
  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalImages;
      scrollToImage(currentIndex);
    }, 2000);
  };

  const stopAutoScroll = () => clearInterval(autoScroll);

  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);
  carousel.addEventListener('scroll', updateActiveDot);

  // === Swipe Support ===
  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      e.stopPropagation();
      if (deltaX < 0) {
        currentIndex = Math.min(currentIndex + 1, totalImages - 1);
      } else {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
      scrollToImage(currentIndex);
    }
  });

  // Start auto-slide
  startAutoScroll();
}, 0);
  })
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

  const isHighlighted = clickedCard.classList.contains('highlighted');
  const inner = clickedCard.querySelector('.slide-inner');

  // Prevent flip if scroll arrow was clicked
  if (e.target.closest('.scroll-arrow')) return;

  // Only allow flipping the center card
  if (isHighlighted) {
    // Toggle .flipped on the center card only
    if (inner.classList.contains('flipped')) {
      inner.classList.remove('flipped');
    } else {
      // Remove .flipped from all cards first
      slidesContainer.querySelectorAll('.slide-inner').forEach(i => i.classList.remove('flipped'));
      inner.classList.add('flipped');
    }
  } else {
    // Set the clicked card as center
    const cards = Array.from(slidesContainer.querySelectorAll('.card'));
    const index = cards.indexOf(clickedCard);
    current = Math.max(index - 1, 0);
    updateCarousel();
    // Remove .flipped from all cards
    slidesContainer.querySelectorAll('.slide-inner').forEach(i => i.classList.remove('flipped'));
  }
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
    // Instantly set scale without animation
    card.style.transform = 'scale(0.85)';
  });

  // Highlight and scale the center card
  const centerIndex = current + 1; // the 2nd visible card in a 3-card view
  const centerCard = allCards[centerIndex];
  if (centerCard) {
    centerCard.classList.add('highlighted');
    // Instantly set scale without animation
    centerCard.style.transform = 'scale(1)';
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