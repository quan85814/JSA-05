
document.addEventListener('DOMContentLoaded', function () {
  let cartCount = 3;
  const cartCountElement = document.querySelector('.cart-container span');

  function showToast(productName, price, imageUrl) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification w-80 p-4';
    toast.innerHTML = `
  <div class="flex items-center gap-3">
    <img src="${imageUrl}" alt="${productName}" class="w-12 h-12 object-cover rounded">
      <div class="flex-1">
        <h4 class="font-medium text-gray-900">Added to Cart</h4>
        <p class="text-sm text-gray-600">${productName}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-sm font-medium text-gray-900">${price}</span>
          <a href="#" class="text-primary text-sm hover:underline">View Cart</a>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
        <div class="w-5 h-5 flex items-center justify-center">
          <i class="ri-close-line"></i>
        </div>
      </button>
  </div>
  `;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  function updateCartCount() {
    cartCount++;
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
    }
  }

  const addToCartButtons = document.querySelectorAll('#add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.product-card');
      if (productCard) {
        const productName = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.font-bold').textContent;
        const imageUrl = productCard.querySelector('img').src;
        showToast(productName, price, imageUrl);
        updateCartCount();
      }
    });
  });
  // Sort dropdown
  const sortBtn = document.getElementById('sortBtn');
  const sortDropdown = document.getElementById('sortDropdown');
  if (sortBtn && sortDropdown) {
    sortBtn.addEventListener('click', function () {
      sortDropdown.classList.toggle('hidden');
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
      if (!sortBtn.contains(event.target) && !sortDropdown.contains(event.target)) {
        sortDropdown.classList.add('hidden');
      }
    });
    // Select item from dropdown
    const sortItems = sortDropdown.querySelectorAll('.p-2');
    sortItems.forEach(item => {
      item.addEventListener('click', function () {
        sortBtn.querySelector('span').textContent = this.textContent;
        sortDropdown.classList.add('hidden');
      });
    });
  }
  // Quick view modal
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  const quickViewModal = document.getElementById('quick-view-modal');
  const closeModalBtn = document.getElementById('close-modal');
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      quickViewModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      quickViewModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }
  // Close modal when clicking outside
  quickViewModal.addEventListener('click', function (event) {
    if (event.target === quickViewModal) {
      quickViewModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
  // Quantity selector in modal
  const quantityInput = document.querySelector('#quick-view-modal input[type="number"]');
  const decreaseBtn = document.querySelector('#quick-view-modal button:first-of-type');
  const increaseBtn = document.querySelector('#quick-view-modal button:last-of-type');
  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', function () {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    increaseBtn.addEventListener('click', function () {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
    quantityInput.addEventListener('change', function () {
      let value = parseInt(this.value);
      if (isNaN(value) || value < 1) {
        value = 1;
      }
      this.value = value;
    });
  }
});