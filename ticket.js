
document.addEventListener('DOMContentLoaded', function () {
  // Timer countdown
  let timerMinutes = 10;
  let timerSeconds = 0;
  const timerElement = document.getElementById('timer');

  function updateTimer() {
    if (timerSeconds === 0) {
      if (timerMinutes === 0) {
        clearInterval(timerInterval);
        alert('Your session has expired. The page will reload.');
        location.reload();
        return;
      }
      timerMinutes--;
      timerSeconds = 59;
    } else {
      timerSeconds--;
    }

    timerElement.textContent = `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
  }

  const timerInterval = setInterval(updateTimer, 1000);

  // Ticket quantity selector
  const quantityInput = document.getElementById('ticket-quantity');
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const summaryQuantity = document.getElementById('summary-quantity');
  const subtotalElement = document.getElementById('subtotal');
  const serviceFeeElement = document.getElementById('service-fee');
  const deliveryFeeElement = document.getElementById('delivery-fee');
  const totalPriceElement = document.getElementById('total-price');

  let currentPrice = 25;
  let serviceFeePct = 0.10; // 10% service fee

  function updatePrices() {
    const quantity = parseInt(quantityInput.value);
    const subtotal = currentPrice * quantity;
    const serviceFee = Math.round(subtotal * serviceFeePct * 100) / 100;
    let deliveryFee = 0;

    // Check if box office delivery is selected
    const boxDelivery = document.getElementById('box-delivery');
    if (boxDelivery && boxDelivery.checked) {
      deliveryFee = 2;
    }

    const total = subtotal + serviceFee + deliveryFee;

    summaryQuantity.textContent = quantity;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    serviceFeeElement.textContent = `$${serviceFee.toFixed(2)}`;
    deliveryFeeElement.textContent = `$${deliveryFee.toFixed(2)}`;
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  decreaseBtn.addEventListener('click', function () {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      updatePrices();
    }
  });

  increaseBtn.addEventListener('click', function () {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
      quantityInput.value = currentValue + 1;
      updatePrices();
    }
  });

  quantityInput.addEventListener('change', function () {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }
    this.value = value;
    updatePrices();
  });

  // Seating category selection
  const seatCategories = document.querySelectorAll('.seat-category');
  const stadiumSections = document.querySelectorAll('.stadium-section');
  const selectedCategoryElement = document.getElementById('selected-category');
  const seatPriceElement = document.getElementById('seat-price');

  function updateSelectedCategory(category, price, color) {
    selectedCategoryElement.textContent = category;
    seatPriceElement.textContent = `$${price.toFixed(2)}`;
    currentPrice = price;
    updatePrices();

    // Update the color indicator
    const colorIndicator = document.querySelector('#selected-category').previousElementSibling;
    colorIndicator.className = '';
    colorIndicator.classList.add('w-3', 'h-3', 'rounded-sm', 'mr-2');
    colorIndicator.classList.add(color);
  }

  seatCategories.forEach(category => {
    category.addEventListener('click', function () {
      // Remove selected class from all categories
      seatCategories.forEach(cat => cat.classList.remove('selected'));
      stadiumSections.forEach(section => section.classList.remove('selected'));

      // Add selected class to clicked category
      this.classList.add('selected');

      // Update stadium map selection
      const categoryId = this.id;
      if (categoryId === 'standard-category') {
        document.getElementById('north-stand').classList.add('selected');
        document.getElementById('south-stand').classList.add('selected');
        updateSelectedCategory('Standard Seats', 25, 'bg-blue-300');
      } else if (categoryId === 'premium-category') {
        document.getElementById('east-stand').classList.add('selected');
        updateSelectedCategory('Premium Seats', 45, 'bg-yellow-300');
      } else if (categoryId === 'club-category') {
        document.getElementById('west-stand').classList.add('selected');
        updateSelectedCategory('Club Seats', 75, 'bg-red-300');
      } else if (categoryId === 'vip-category') {
        document.getElementById('vip-boxes').classList.add('selected');
        updateSelectedCategory('VIP Boxes', 150, 'bg-purple-300');
      }
    });
  });

  stadiumSections.forEach(section => {
    section.addEventListener('click', function () {
      // Remove selected class from all sections
      stadiumSections.forEach(sec => sec.classList.remove('selected'));
      seatCategories.forEach(cat => cat.classList.remove('selected'));

      // Add selected class to clicked section
      this.classList.add('selected');

      // Update category selection
      const sectionId = this.id;
      if (sectionId === 'north-stand' || sectionId === 'south-stand') {
        document.getElementById('standard-category').classList.add('selected');
        updateSelectedCategory('Standard Seats', 25, 'bg-blue-300');
      } else if (sectionId === 'east-stand') {
        document.getElementById('premium-category').classList.add('selected');
        updateSelectedCategory('Premium Seats', 45, 'bg-yellow-300');
      } else if (sectionId === 'west-stand') {
        document.getElementById('club-category').classList.add('selected');
        updateSelectedCategory('Club Seats', 75, 'bg-red-300');
      } else if (sectionId === 'vip-boxes') {
        document.getElementById('vip-category').classList.add('selected');
        updateSelectedCategory('VIP Boxes', 150, 'bg-purple-300');
      }
    });
  });

  // Delivery method selection
  const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
  deliveryOptions.forEach(option => {
    option.addEventListener('change', function () {
      updatePrices();
    });
  });

  // Country dropdown
  function setupDropdown(btnId, dropdownId) {
    const btn = document.getElementById(btnId);
    const dropdown = document.getElementById(dropdownId);
    if (btn && dropdown) {
      btn.addEventListener('click', function () {
        dropdown.classList.toggle('hidden');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (event) {
        if (!btn.contains(event.target) && !dropdown.contains(event.target)) {
          dropdown.classList.add('hidden');
        }
      });

      // Select item from dropdown
      const items = dropdown.querySelectorAll('.p-2');
      items.forEach(item => {
        item.addEventListener('click', function () {
          btn.querySelector('span').textContent = this.textContent;
          dropdown.classList.add('hidden');
        });
      });
    }
  }

  setupDropdown('countryBtn', 'countryDropdown');

  // Payment modal
  const proceedToPaymentBtn = document.getElementById('proceed-to-payment');
  const paymentModal = document.getElementById('payment-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const completePurchaseBtn = document.getElementById('complete-purchase');
  const successModal = document.getElementById('success-modal');

  proceedToPaymentBtn.addEventListener('click', function () {
    paymentModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  closeModalBtn.addEventListener('click', function () {
    paymentModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  completePurchaseBtn.addEventListener('click', function () {
    paymentModal.classList.add('hidden');
    successModal.classList.remove('hidden');
  });

  // Initialize with default selection
  document.getElementById('standard-category').classList.add('selected');
  document.getElementById('north-stand').classList.add('selected');
  document.getElementById('south-stand').classList.add('selected');
});