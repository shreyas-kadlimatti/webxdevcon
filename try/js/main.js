
/**
 * DevShop - Main JavaScript
 * This file contains the main JavaScript for the e-commerce website
 */

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartIndicator();

// DOM elements that exist on all pages
const cartButton = document.getElementById('cart-button');
const cartDropdown = document.getElementById('cart-dropdown');
const closeCartButton = document.getElementById('close-cart');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners for elements that exist on all pages
  setupCartFunctionality();
  setupMobileMenu();
  
  // Initialize page-specific functions
  if (document.querySelector('#featured-products')) {
    initializeHomePage();
  } else if (document.querySelector('#products-grid')) {
    initializeProductsPage();
  } else if (document.querySelector('#product-title')) {
    initializeProductDetailPage();
  } else if (document.querySelector('#cart-summary')) {
    initializeCheckoutPage();
  }
  
  // Initialize scroll animations for common elements
  initializeScrollAnimations();
});

/**
 * Initialize scroll animations for various page elements
 */
function initializeScrollAnimations() {
  // Apply animations to section headings
  addScrollAnimation('section h2', 'fade-up');
  
  // Apply animations to product cards with staggered delay
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.classList.add('scroll-animate');
    card.dataset.animation = 'fade-up';
    card.classList.add('invisible');
    
    // Add staggered delay based on index
    const delayClass = `delay-${(index % 5) * 100}`;
    card.classList.add(delayClass);
  });
  
  // Apply animations to category cards with staggered delay
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card, index) => {
    card.classList.add('scroll-animate');
    card.dataset.animation = 'zoom-in';
    card.classList.add('invisible');
    
    // Add staggered delay based on index
    const delayClass = `delay-${(index % 4) * 100}`;
    card.classList.add(delayClass);
  });
  
  // Apply animations to hero section
  const heroSection = document.querySelector('.bg-gradient-to-r');
  if (heroSection) {
    const heroContent = heroSection.querySelector('h1').parentElement;
    const heroImage = heroSection.querySelector('img').parentElement;
    
    heroContent.classList.add('scroll-animate', 'invisible');
    heroContent.dataset.animation = 'fade-right';
    
    heroImage.classList.add('scroll-animate', 'invisible');
    heroImage.dataset.animation = 'fade-left';
  }
  
  // Apply animations to call-to-action section
  const ctaSection = document.querySelector('.bg-gray-800');
  if (ctaSection) {
    ctaSection.classList.add('scroll-animate', 'invisible');
    ctaSection.dataset.animation = 'fade-up';
  }
  
  // Apply animations to product detail sections
  const productDetailSections = document.querySelectorAll('.product-detail-section');
  productDetailSections.forEach(section => {
    section.classList.add('scroll-animate', 'invisible');
    section.dataset.animation = 'fade-up';
  });
  
  // Apply animations to checkout form sections
  const checkoutSections = document.querySelectorAll('.checkout-section');
  checkoutSections.forEach((section, index) => {
    section.classList.add('scroll-animate', 'invisible');
    section.dataset.animation = 'fade-up';
    
    // Add staggered delay based on index
    const delayClass = `delay-${index * 100}`;
    section.classList.add(delayClass);
  });
}

/**
 * Home Page Functions
 */
function initializeHomePage() {
  // Load featured products
  loadFeaturedProducts();
  
  // Load new products
  loadNewProducts();
}

function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  if (!featuredProductsContainer) return;
  
  // Clear loading state
  featuredProductsContainer.innerHTML = '';
  
  // Get featured products
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);
  
  // Display featured products
  featuredProducts.forEach(product => {
    featuredProductsContainer.appendChild(createProductCard(product));
  });
}

function loadNewProducts() {
  const newProductsContainer = document.getElementById('new-products');
  if (!newProductsContainer) return;
  
  // Clear loading state
  newProductsContainer.innerHTML = '';
  
  // Get new products
  const newProducts = products.filter(product => product.isNew).slice(0, 4);
  
  // If there are not enough new products, add more products
  if (newProducts.length < 4) {
    const additionalProducts = products.filter(product => !product.isNew).slice(0, 4 - newProducts.length);
    newProducts.push(...additionalProducts);
  }
  
  // Display new products
  newProducts.forEach(product => {
    newProductsContainer.appendChild(createProductCard(product));
  });
}

/**
 * Products Page Functions
 */
function initializeProductsPage() {
  loadAllProducts();
  setupFilters();
  setupSorting();
  setupViewToggle();
}

function loadAllProducts() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;
  
  // Clear loading state
  productsGrid.innerHTML = '';
  
  // Get URL parameters for filtering
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const sortParam = urlParams.get('sort');
  
  // Filter products based on URL params
  let filteredProducts = [...products];
  
  if (categoryParam) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    document.getElementById('product-page-title').textContent = categories[categoryParam] || 'Products';
    
    // Check the corresponding category checkbox
    const categoryCheckbox = document.querySelector(`.category-filter[value="${categoryParam}"]`);
    if (categoryCheckbox) categoryCheckbox.checked = true;
  }
  
  // Sort products based on URL params
  if (sortParam) {
    sortProducts(filteredProducts, sortParam);
    const sortSelect = document.getElementById('sort-options');
    if (sortSelect) sortSelect.value = sortParam;
  }
  
  // Update product count
  const productCountElement = document.getElementById('product-count');
  if (productCountElement) productCountElement.textContent = filteredProducts.length;
  
  // Display products or no results message
  if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
      productsGrid.appendChild(createProductCard(product));
    });
    document.getElementById('no-results').classList.add('hidden');
  } else {
    productsGrid.innerHTML = '';
    document.getElementById('no-results').classList.remove('hidden');
  }
}

function setupFilters() {
  // Category filters
  const categoryFilters = document.querySelectorAll('.category-filter');
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
  
  // Price filters
  const priceFilters = document.querySelectorAll('.price-filter');
  priceFilters.forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
  
  // Rating filters
  const ratingFilters = document.querySelectorAll('.rating-filter');
  ratingFilters.forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
  
  // Clear filters button
  const clearFiltersButton = document.getElementById('clear-filters');
  if (clearFiltersButton) {
    clearFiltersButton.addEventListener('click', clearFilters);
  }
  
  // Reset search button
  const resetSearchButton = document.getElementById('reset-search');
  if (resetSearchButton) {
    resetSearchButton.addEventListener('click', clearFilters);
  }
}

function applyFilters() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;
  
  // Clear products
  productsGrid.innerHTML = '';
  
  // Get selected categories
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(checkbox => checkbox.value);
  
  // Get selected price range
  const selectedPrice = document.querySelector('.price-filter:checked')?.value;
  
  // Get selected rating
  const selectedRating = document.querySelector('.rating-filter:checked')?.value;
  
  // Get sort option
  const sortOption = document.getElementById('sort-options')?.value;
  
  // Filter products
  let filteredProducts = [...products];
  
  // Apply category filter
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
  }
  
  // Apply price filter
  if (selectedPrice) {
    const [min, max] = selectedPrice.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
  }
  
  // Apply rating filter
  if (selectedRating) {
    const minRating = Number(selectedRating);
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
  }
  
  // Sort products
  if (sortOption) {
    sortProducts(filteredProducts, sortOption);
  }
  
  // Update product count
  const productCountElement = document.getElementById('product-count');
  if (productCountElement) productCountElement.textContent = filteredProducts.length;
  
  // Display products or no results message
  if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
      productsGrid.appendChild(createProductCard(product));
    });
    document.getElementById('no-results').classList.add('hidden');
  } else {
    productsGrid.innerHTML = '';
    document.getElementById('no-results').classList.remove('hidden');
  }
}

function clearFilters() {
  // Uncheck all filter checkboxes
  document.querySelectorAll('.category-filter').forEach(checkbox => checkbox.checked = false);
  document.querySelectorAll('.price-filter').forEach(radio => radio.checked = false);
  document.querySelectorAll('.rating-filter').forEach(radio => radio.checked = false);
  
  // Reset sort to default
  const sortSelect = document.getElementById('sort-options');
  if (sortSelect) sortSelect.value = 'featured';
  
  // Reload all products
  loadAllProducts();
}

function setupSorting() {
  const sortSelect = document.getElementById('sort-options');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      applyFilters();
    });
  }
}

function sortProducts(productList, sortOption) {
  switch(sortOption) {
    case 'price-low-high':
      productList.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      productList.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      productList.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'rating':
      productList.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      productList.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
}

function setupViewToggle() {
  const gridViewButton = document.getElementById('grid-view');
  const listViewButton = document.getElementById('list-view');
  const productsGrid = document.getElementById('products-grid');
  
  if (gridViewButton && listViewButton && productsGrid) {
    gridViewButton.addEventListener('click', function() {
      productsGrid.classList.remove('list-view');
      gridViewButton.classList.add('bg-purple-100', 'text-purple-700');
      gridViewButton.classList.remove('text-gray-600', 'hover:bg-gray-100');
      listViewButton.classList.remove('bg-purple-100', 'text-purple-700');
      listViewButton.classList.add('text-gray-600', 'hover:bg-gray-100');
    });
    
    listViewButton.addEventListener('click', function() {
      productsGrid.classList.add('list-view');
      listViewButton.classList.add('bg-purple-100', 'text-purple-700');
      listViewButton.classList.remove('text-gray-600', 'hover:bg-gray-100');
      gridViewButton.classList.remove('bg-purple-100', 'text-purple-700');
      gridViewButton.classList.add('text-gray-600', 'hover:bg-gray-100');
    });
  }
}

/**
 * Product Detail Page Functions
 */
function initializeProductDetailPage() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (isNaN(productId)) {
    // If no valid product ID, load a default product
    loadProductDetails(products[0]);
  } else {
    // Find the product by ID
    const product = products.find(p => p.id === productId);
    
    if (product) {
      loadProductDetails(product);
    } else {
      loadProductDetails(products[0]);
    }
  }
  
  setupTabs();
  setupFAQToggles();
  setupQuantityControls();
  loadRelatedProducts();
  setupAddToCart();
}

function loadProductDetails(product) {
  // Set page title
  document.title = `${product.name} - DevShop`;
  
  // Update breadcrumbs
  document.getElementById('product-breadcrumb').textContent = product.name;
  document.getElementById('category-breadcrumb').textContent = categories[product.category];
  document.getElementById('category-breadcrumb').href = `products.html?category=${product.category}`;
  
  // Update product details
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
  
  // Set original price if on sale
  if (product.originalPrice > product.price) {
    document.getElementById('product-original-price').textContent = `$${product.originalPrice.toFixed(2)}`;
    document.getElementById('product-original-price').classList.remove('hidden');
    
    // Calculate and show discount percentage
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    document.getElementById('product-discount').textContent = `${discountPercentage}% OFF`;
    document.getElementById('product-discount').classList.remove('hidden');
  }
  
  // Update product tags
  if (product.isNew) {
    document.getElementById('product-new-tag').classList.remove('hidden');
  }
  
  if (product.isOnSale) {
    document.getElementById('product-sale-tag').classList.remove('hidden');
  }
  
  // Update product rating
  document.getElementById('product-review-count').textContent = `${product.reviewCount} reviews`;
  
  // Update product description
  document.getElementById('product-description').textContent = product.description;
  
  // Update product availability
  if (product.stock > 0) {
    document.getElementById('product-availability').innerHTML = `<i class="fas fa-check-circle mr-1"></i> In Stock`;
    document.getElementById('product-availability').className = 'text-green-600';
  } else {
    document.getElementById('product-availability').innerHTML = `<i class="fas fa-times-circle mr-1"></i> Out of Stock`;
    document.getElementById('product-availability').className = 'text-red-600';
    document.getElementById('add-to-cart').disabled = true;
    document.getElementById('add-to-cart').classList.add('opacity-50', 'cursor-not-allowed');
  }
  
  // Update product meta information
  document.getElementById('product-sku').innerHTML = `<span class="font-medium mr-2">SKU:</span><span>${product.sku}</span>`;
  document.getElementById('product-category').innerHTML = `<span class="font-medium mr-2">Category:</span><a href="products.html?category=${product.category}" class="text-purple-700 hover:underline">${categories[product.category]}</a>`;
  
  // Update main product image
  document.getElementById('main-product-image').src = product.image;
  
  // Update product thumbnails
  const productThumbnails = document.getElementById('product-thumbnails');
  productThumbnails.innerHTML = '';
  
  if (product.images && product.images.length > 0) {
    product.images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'cursor-pointer border hover:border-purple-500 rounded overflow-hidden';
      thumbnail.innerHTML = `<img src="${image}" alt="${product.name} image ${index + 1}" class="w-full h-full object-cover">`;
      thumbnail.addEventListener('click', () => {
        document.getElementById('main-product-image').src = image;
      });
      productThumbnails.appendChild(thumbnail);
    });
  }
  
  // Setup color selection if available
  if (product.colors && product.colors.length > 0) {
    document.getElementById('color-selection-container').classList.remove('hidden');
    const colorOptions = document.getElementById('color-options');
    colorOptions.innerHTML = '';
    
    product.colors.forEach(color => {
      const colorOption = document.createElement('div');
      colorOption.className = 'color-option cursor-pointer w-8 h-8 rounded-full border-2 border-transparent hover:border-gray-500';
      colorOption.style.backgroundColor = getColorCode(color);
      colorOption.setAttribute('data-color', color);
      colorOption.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('ring', 'ring-purple-500', 'ring-offset-1'));
        this.classList.add('ring', 'ring-purple-500', 'ring-offset-1');
      });
      colorOptions.appendChild(colorOption);
    });
  }
  
  // Setup size selection if available
  if (product.sizes && product.sizes.length > 0) {
    document.getElementById('size-selection-container').classList.remove('hidden');
    const sizeOptions = document.getElementById('size-options');
    sizeOptions.innerHTML = '';
    
    product.sizes.forEach(size => {
      const sizeOption = document.createElement('div');
      sizeOption.className = 'size-option cursor-pointer border border-gray-300 rounded-md p-2 text-center hover:border-purple-500';
      sizeOption.setAttribute('data-size', size);
      sizeOption.textContent = size;
      sizeOption.addEventListener('click', function() {
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('bg-purple-50', 'border-purple-500', 'text-purple-700'));
        this.classList.add('bg-purple-50', 'border-purple-500', 'text-purple-700');
      });
      sizeOptions.appendChild(sizeOption);
    });
  }
  
  // Store current product in data attribute for add to cart
  document.getElementById('add-to-cart').setAttribute('data-product-id', product.id);
}

function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabButtons.forEach(btn => {
        btn.classList.remove('active', 'border-purple-700', 'text-purple-700');
        btn.classList.add('border-transparent', 'text-gray-500');
      });
      
      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.add('hidden');
      });
      
      // Add active class to current tab
      this.classList.add('active', 'border-purple-700', 'text-purple-700');
      this.classList.remove('border-transparent', 'text-gray-500');
      
      // Show current tab content
      document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    });
  });
}

function setupFAQToggles() {
  const faqToggles = document.querySelectorAll('.faq-toggle');
  
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      // Toggle icon rotation
      icon.classList.toggle('rotate-180');
      
      // Toggle content visibility
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
  });
}

function setupQuantityControls() {
  const decreaseButton = document.getElementById('decrease-quantity');
  const increaseButton = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('product-quantity');
  
  if (decreaseButton && increaseButton && quantityInput) {
    decreaseButton.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    increaseButton.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
    
    quantityInput.addEventListener('change', function() {
      if (this.value < 1) {
        this.value = 1;
      }
    });
  }
}

function loadRelatedProducts() {
  const relatedProductsContainer = document.getElementById('related-products');
  if (!relatedProductsContainer) return;
  
  // Clear loading state
  relatedProductsContainer.innerHTML = '';
  
  // Get URL parameters for current product
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  // Find current product
  const currentProduct = products.find(p => p.id === productId);
  
  // Get related products (same category, excluding current product)
  let relatedProducts = [];
  
  if (currentProduct) {
    relatedProducts = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
  } else {
    relatedProducts = products.filter(p => p.isFeatured);
  }
  
  // Display up to 4 related products
  relatedProducts.slice(0, 4).forEach(product => {
    relatedProductsContainer.appendChild(createProductCard(product));
  });
  
  // Load recently viewed products
  loadRecentlyViewed(productId);
}

function loadRecentlyViewed(currentProductId) {
  const recentlyViewedContainer = document.getElementById('recently-viewed-products');
  if (!recentlyViewedContainer) return;
  
  // Get recently viewed products from localStorage
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Add current product to recently viewed
  if (currentProductId) {
    // Remove if already in the list
    recentlyViewed = recentlyViewed.filter(id => id !== currentProductId);
    
    // Add to the beginning of the list
    recentlyViewed.unshift(currentProductId);
    
    // Keep only latest 4 products
    recentlyViewed = recentlyViewed.slice(0, 4);
    
    // Save to localStorage
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }
  
  // Display recently viewed products
  if (recentlyViewed.length > 0) {
    recentlyViewedContainer.innerHTML = '';
    
    recentlyViewed.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        recentlyViewedContainer.appendChild(createProductCard(product));
      }
    });
  }
}

function setupAddToCart() {
  const addToCartButton = document.getElementById('add-to-cart');
  if (!addToCartButton) return;
  
  addToCartButton.addEventListener('click', function() {
    const productId = parseInt(this.getAttribute('data-product-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Get selected color and size (if applicable)
    const selectedColor = document.querySelector('.color-option.ring')?.getAttribute('data-color');
    const selectedSize = document.querySelector('.size-option.bg-purple-50')?.getAttribute('data-size');
    
    // Get quantity
    const quantity = parseInt(document.getElementById('product-quantity').value) || 1;
    
    // Add to cart
    addToCart(product, quantity, selectedColor, selectedSize);
    
    // Show toast notification
    showToast(`${product.name} added to cart!`, 'success');
  });
  
  const buyNowButton = document.getElementById('buy-now');
  if (buyNowButton) {
    buyNowButton.addEventListener('click', function() {
      // Simulate add to cart then redirect to checkout
      document.getElementById('add-to-cart').click();
      window.location.href = 'checkout.html';
    });
  }
}

/**
 * Checkout Page Functions
 */
function initializeCheckoutPage() {
  loadCartSummary();
  setupShippingOptions();
  setupPaymentOptions();
  setupOrderPlacement();
}

function loadCartSummary() {
  const cartSummaryContainer = document.getElementById('cart-summary');
  if (!cartSummaryContainer) return;
  
  // Clear container
  cartSummaryContainer.innerHTML = '';
  
  // Load from cart
  if (cart.length === 0) {
    cartSummaryContainer.innerHTML = `<div class="flex items-center"><span class="text-gray-500">Your cart is empty</span></div>`;
    
    // Disable checkout button
    document.getElementById('place-order').disabled = true;
    document.getElementById('place-order').classList.add('opacity-50', 'cursor-not-allowed');
    
    updateOrderSummary(0, 0, 0, 0);
    return;
  }
  
  let subtotal = 0;
  
  // Create cart items
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'flex items-center mb-4';
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-md mr-4">
      <div class="flex-grow">
        <h3 class="font-medium text-gray-800">${product.name}</h3>
        ${item.color ? `<p class="text-sm text-gray-600">Color: ${item.color}</p>` : ''}
        ${item.size ? `<p class="text-sm text-gray-600">Size: ${item.size}</p>` : ''}
        <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
      </div>
      <div class="text-right">
        <p class="font-medium">$${itemTotal.toFixed(2)}</p>
      </div>
    `;
    
    cartSummaryContainer.appendChild(cartItem);
  });
  
  // Calculate shipping, tax, and total
  const shipping = getSelectedShippingCost();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  updateOrderSummary(subtotal, shipping, tax, total);
}

function updateOrderSummary(subtotal, shipping, tax, total) {
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('shipping-cost').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('order-total').textContent = `$${total.toFixed(2)}`;
}

function getSelectedShippingCost() {
  const selectedShipping = document.querySelector('input[name="shipping"]:checked')?.value;
  
  switch (selectedShipping) {
    case 'express':
      return 9.99;
    case 'overnight':
      return 19.99;
    case 'standard':
    default:
      return 0;
  }
}

function setupShippingOptions() {
  const shippingOptions = document.querySelectorAll('.shipping-option');
  
  shippingOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Update selected styles
      shippingOptions.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      
      // Update order summary
      loadCartSummary();
    });
  });
}

function setupPaymentOptions() {
  const paymentOptions = document.querySelectorAll('.payment-option');
  const creditCardForm = document.getElementById('credit-card-form');
  
  paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Update selected styles
      paymentOptions.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      
      // Toggle credit card form
      if (this.querySelector('input').value === 'credit') {
        creditCardForm.classList.remove('hidden');
      } else {
        creditCardForm.classList.add('hidden');
      }
    });
  });
}

function setupOrderPlacement() {
  const placeOrderButton = document.getElementById('place-order');
  if (!placeOrderButton) return;
  
  placeOrderButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Simple validation
    let isValid = true;
    const requiredFields = ['email', 'first-name', 'last-name', 'address', 'city', 'state', 'zip'];
    
    requiredFields.forEach(field => {
      const input = document.getElementById(field);
      if (input && !input.value.trim()) {
        input.classList.add('border-red-500');
        isValid = false;
      } else if (input) {
        input.classList.remove('border-red-500');
      }
    });
    
    // Check if credit card payment is selected
    const isCreditCard = document.querySelector('input[name="payment"]:checked')?.value === 'credit';
    
    if (isCreditCard) {
      const cardFields = ['card-number', 'expiry', 'cvc', 'cardholder'];
      cardFields.forEach(field => {
        const input = document.getElementById(field);
        if (input && !input.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else if (input) {
          input.classList.remove('border-red-500');
        }
      });
    }
    
    if (!isValid) {
      showToast('Please fill in all required fields', 'error');
      window.scrollTo(0, 0);
      return;
    }
    
    // Process order (in a real app this would be handled by backend)
    showToast('Order placed successfully!', 'success');
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIndicator();
    
    // Redirect to confirmation page
    setTimeout(() => {
      // In a real app, this would redirect to a confirmation page
      window.location.href = 'index.html';
    }, 2000);
  });
  
  // Handle promo code application
  const promoButton = document.getElementById('apply-promo');
  if (promoButton) {
    promoButton.addEventListener('click', function() {
      const promoCode = document.getElementById('promo').value.trim();
      
      if (promoCode) {
        if (promoCode.toUpperCase() === 'DEVSHOP10') {
          // Apply 10% discount
          showToast('Promo code applied successfully!', 'success');
          // In a real app, this would update the order total
        } else {
          showToast('Invalid promo code', 'error');
        }
      }
    });
  }
}

/**
 * Common Functions
 */
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md';
  
  // Build the product card HTML
  let cardHTML = `
    <a href="product-detail.html?id=${product.id}" class="block">
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover product-image">
        <div class="absolute top-2 left-2 flex flex-col space-y-1">
          ${product.isNew ? '<span class="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">NEW</span>' : ''}
          ${product.isOnSale ? '<span class="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">SALE</span>' : ''}
        </div>
      </div>
      
      <div class="p-4">
        <h3 class="text-lg font-medium text-gray-900 mb-1">${product.name}</h3>
        
        <div class="flex items-center mb-2">
          <div class="flex text-yellow-400 text-sm mr-1">
            ${getStarRating(product.rating)}
          </div>
          <span class="text-xs text-gray-500">(${product.reviewCount})</span>
        </div>
        
        <div class="flex items-center">
          <span class="text-lg font-bold text-gray-900">$${product.price.toFixed(2)}</span>
          ${product.originalPrice > product.price ? `<span class="ml-2 text-sm text-gray-500 line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
    </a>
    
    <div class="px-4 pb-4">
      <button class="add-to-cart-btn w-full bg-purple-700 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  
  card.innerHTML = cardHTML;
  
  // Add event listener to the "Add to Cart" button
  setTimeout(() => {
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = parseInt(this.getAttribute('data-product-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
          addToCart(product, 1);
          showToast(`${product.name} added to cart!`, 'success');
        }
      });
    }
  }, 0);
  
  return card;
}

function addToCart(product, quantity = 1, color = null, size = null) {
  // Check if product is already in cart
  const existingItem = cart.find(item => {
    return item.id === product.id && item.color === color && item.size === size;
  });
  
  if (existingItem) {
    // Update quantity if already in cart
    existingItem.quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      quantity: quantity,
      color: color,
      size: size
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart UI
  updateCartIndicator();
  updateCartDropdown();
}

function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartIndicator();
    updateCartDropdown();
    
    // Update checkout page if on it
    if (document.getElementById('cart-summary')) {
      loadCartSummary();
    }
  }
}

function updateCartIndicator() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
      cartCount.classList.remove('hidden');
    } else {
      cartCount.classList.add('hidden');
    }
    
    // Update checkout button state
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
      if (totalItems > 0) {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('opacity-50', 'cursor-not-allowed');
      } else {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }
  }
}

function updateCartDropdown() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartSubtotalElement = document.getElementById('cart-subtotal');
  
  if (!cartItemsContainer) return;
  
  // Clear cart items
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    // Show empty cart message
    if (emptyCartMessage) {
      emptyCartMessage.classList.remove('hidden');
    }
    
    if (cartSubtotalElement) {
      cartSubtotalElement.textContent = '$0.00';
    }
    
    return;
  }
  
  // Hide empty cart message
  if (emptyCartMessage) {
    emptyCartMessage.classList.add('hidden');
  }
  
  // Calculate subtotal
  let subtotal = 0;
  
  // Add cart items
  cart.forEach((item, index) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'flex items-center py-2 border-b border-gray-200 last:border-0';
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded-md mr-3">
      <div class="flex-grow">
        <h4 class="text-sm font-medium text-gray-800">${product.name}</h4>
        ${item.color ? `<p class="text-xs text-gray-500">Color: ${item.color}</p>` : ''}
        ${item.size ? `<p class="text-xs text-gray-500">Size: ${item.size}</p>` : ''}
        <div class="flex items-center justify-between mt-1">
          <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
          <p class="text-sm font-medium">$${itemTotal.toFixed(2)}</p>
        </div>
      </div>
      <button class="remove-item-btn ml-2 text-gray-400 hover:text-red-500" data-index="${index}">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
    
    // Add event listener to remove button
    const removeButton = cartItem.querySelector('.remove-item-btn');
    if (removeButton) {
      removeButton.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeFromCart(index);
      });
    }
  });
  
  // Update subtotal
  if (cartSubtotalElement) {
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
}

function setupCartFunctionality() {
  // Toggle cart dropdown
  if (cartButton) {
    cartButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      cartDropdown.classList.toggle('hidden');
      updateCartDropdown();
    });
  }
  
  // Close cart dropdown
  if (closeCartButton) {
    closeCartButton.addEventListener('click', function() {
      cartDropdown.classList.add('hidden');
    });
  }
  
  // Close cart dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (cartDropdown && !cartDropdown.classList.contains('hidden')) {
      if (!cartDropdown.contains(e.target) && e.target !== cartButton) {
        cartDropdown.classList.add('hidden');
      }
    }
  });
  
  // Update cart on page load
  updateCartDropdown();
}

function setupMobileMenu() {
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => {
    toast.remove();
  });
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Set icon based on type
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'exclamation-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  
  toast.innerHTML = `
    <div class="flex items-center">
      <i class="fas fa-${icon} mr-2"></i>
      <span>${message}</span>
    </div>
    <button class="ml-4 text-gray-500 hover:text-gray-800">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add to document
  document.body.appendChild(toast);
  
  // Add close button functionality
  const closeButton = toast.querySelector('button');
  closeButton.addEventListener('click', function() {
    toast.remove();
  });
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function getColorCode(colorName) {
  // Map of common color names to hex codes
  const colorMap = {
    'black': '#000000',
    'white': '#ffffff',
    'red': '#ff0000',
    'green': '#00ff00',
    'blue': '#0000ff',
    'yellow': '#ffff00',
    'purple': '#800080',
    'orange': '#ffa500',
    'pink': '#ffc0cb',
    'gray': '#808080',
    'brown': '#a52a2a',
    'navy': '#000080',
    'silver': '#c0c0c0'
  };
  
  return colorMap[colorName.toLowerCase()] || colorName;
}
