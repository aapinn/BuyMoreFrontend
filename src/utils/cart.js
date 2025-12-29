export function getCart() {
  const data = localStorage.getItem("cart");

  if (!data || data === "undefined") {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Cart JSON error:", err);
    return [];
  }
  saveCart(cart);
  notifyCartUpdate();
}


export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartUpdate();
}

export function removeFromCart(id) {
  const cart = getCart().filter((item) => item._id !== id);
  saveCart(cart);
  notifyCartUpdate();
}
export function clearCart() {
  localStorage.removeItem("cart");
  notifyCartUpdate();
}


export function updateQty(id, type) {
  const cart = getCart().map((item) => {
    if (item._id === id) {
      const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;
      return { ...item, qty: newQty };
    }
    return item;
  }).filter(item => item.qty > 0);

  saveCart(cart);
  notifyCartUpdate();
}
export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  notifyCartUpdate();
}
export function notifyCartUpdate() {
  window.dispatchEvent(new Event("cart:update"));
}
export const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};
export function getTotalQty() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
export function getTotalPrice() {
  return getCart().reduce((sum, item) => sum + item.basePrice * item.qty, 0);
}
export function getFinalPrice(item) {
  return item.discount > 0
    ? item.basePrice - (item.basePrice * item.discount) / 100
    : item.basePrice;
}

export function getTotalFinalPrice() {
  return getCart().reduce((total, item) => {
    return total + getFinalPrice(item) * item.qty;
  }, 0);
}


