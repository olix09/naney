document.addEventListener("DOMContentLoaded", () => {
  // Modal Elements
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const modalSize = document.getElementById("modalSize");
  const modalPrice = document.getElementById("modalPrice");
  const modalQuantity = document.getElementById("modalQuantity");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const modalClose = document.querySelector(".modal-close");

  let currentProduct = null;

  function openModal(product) {
    modalImage.src = product.image;
    modalSize.textContent = product.size ? `Size: ${product.size}` : "";
    modalPrice.textContent = product.price ? `Price: ${product.price}` : "";
    modalQuantity.value = 1;
    currentProduct = product;
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  // Show modal on product click
  document.querySelectorAll(".product-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const product = {
        image: link.getAttribute("data-image"),
        size: link.getAttribute("data-size"),
        price: link.getAttribute("data-price"),
      };
      openModal(product);
    });
  });

  // Close modal
  modalClose.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const CART_KEY = "naneyFashionCart";

  function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  addToCartBtn.addEventListener("click", () => {
    if (!currentProduct) return;

    let qty = parseInt(modalQuantity.value);
    if (isNaN(qty) || qty < 1) qty = 1;

    let cart = getCart();

    // Match by image and size
    const existingIndex = cart.findIndex(
      (item) =>
        item.image === currentProduct.image &&
        item.size === currentProduct.size
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        image: currentProduct.image,
        size: currentProduct.size,
        price: currentProduct.price,
        quantity: qty,
      });
    }

    saveCart(cart);

    const sizeLabel = currentProduct.size ? ` (Size: ${currentProduct.size})` : "";
    alert(`${qty} item(s)${sizeLabel} added to cart.`);
    closeModal();
  });
});
