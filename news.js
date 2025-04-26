
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('button.md\\:hidden');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function () {
      console.log('Mobile menu clicked');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Carousel functionality
  const carousel = document.getElementById('carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('[data-slide]');

  let currentSlide = 0;
  const slideCount = slides.length;

  function goToSlide(slideIndex) {
    if (slideIndex < 0) slideIndex = slideCount - 1;
    if (slideIndex >= slideCount) slideIndex = 0;

    carousel.scrollTo({
      left: slides[slideIndex].offsetLeft,
      behavior: 'smooth'
    });

    currentSlide = slideIndex;

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.remove('bg-gray-300');
        indicator.classList.add('bg-primary');
      } else {
        indicator.classList.remove('bg-primary');
        indicator.classList.add('bg-gray-300');
      }
    });
  }

  // Next and previous buttons
  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  // Indicator buttons
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Auto slide
  let autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Category filter buttons
  const filterButtons = document.querySelectorAll('.category-filter button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });

      // Add active class to clicked button
      this.classList.remove('bg-gray-100', 'text-gray-700');
      this.classList.add('bg-primary', 'text-white');

      // Filter functionality would go here
      console.log('Filter clicked:', this.textContent);
    });
  });
});
