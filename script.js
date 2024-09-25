// Catch HTML elements
let slider = document.getElementById('slider');
let images = document.querySelector('.images');
let img = document.querySelectorAll('.images img');
let prev_btn = document.getElementById('prev');
let next_btn = document.getElementById('next');
let dots = document.getElementById('dots');

let currentIndex = 0;
let totalImages = img.length;
let auto;
let transitionDuration = 3000; // Control the auto-scroll speed

// Create dots based on number of images
for (let i = 0; i < totalImages; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => gotoImg(i));
  dots.appendChild(dot);
}

let allDots = document.querySelectorAll('.dot');

// Go to specific image
function gotoImg(index) {
  currentIndex = index;
  images.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// Update active dot status
function updateDots() {
  allDots.forEach(dot => dot.classList.remove('active'));
  allDots[currentIndex].classList.add('active');
}

// Move to next image
function nextImg() {
  currentIndex = (currentIndex + 1) % totalImages;
  gotoImg(currentIndex);
}

// Move to previous image
function prevImg() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  gotoImg(currentIndex);
}

// Auto-scroll function
function autoScroll() {
  clearInterval(auto);
  auto = setInterval(nextImg, transitionDuration);
}

// Event listeners for buttons
next_btn.addEventListener('click', nextImg);
prev_btn.addEventListener('click', prevImg);

// Handle auto-scroll with mouse events
images.addEventListener('mouseenter', () => clearInterval(auto));
images.addEventListener('mouseleave', autoScroll);

// Touch devices support
let startX = 0;
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
  const diffX = startX - e.touches[0].clientX;
  if (diffX > 50) {
    nextImg();
  } else if (diffX < -50) {
    prevImg();
  }
});

// Support keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextImg();
  } else if (e.key === 'ArrowLeft') {
    prevImg();
  }
});

// Initialize auto-scroll
autoScroll();
