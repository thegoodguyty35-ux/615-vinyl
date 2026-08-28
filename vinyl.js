const products = [
  { id: "coast-script", name: "Good Vibes Script", collection: "coastal", type: "text", price: 8, description: "A breezy script for tumblers, coolers, and sunny days.", materials: "Permanent outdoor vinyl", dimensions: "3 x 1 x 0.05 in", places: "Tumblers, car windows, coolers" },
  { id: "coast-shell", name: "Shell Yeah", collection: "coastal", type: "image", price: 9, description: "A tiny shell with a little attitude for your everyday carry.", materials: "Matte permanent vinyl", dimensions: "3 x 3 x 0.05 in", places: "Phone cases, cups, notebooks" },
  { id: "garden-grow", name: "Grow Through It", collection: "garden", type: "text", price: 8, description: "A hand-lettered reminder for your favorite garden things.", materials: "Matte permanent vinyl", dimensions: "5 x 2 x 0.05 in", places: "Planters, water bottles, totes" },
  { id: "garden-bloom", name: "Bloom Number", collection: "garden", type: "number", price: 7, description: "A cheerful number decal for a mailbox, door, or market booth.", materials: "Gloss permanent vinyl", dimensions: "4 x 4 x 0.05 in", places: "Cars, doors, mailboxes" },
  { id: "midnight-moon", name: "Moon Club", collection: "midnight", type: "image", price: 10, description: "A quiet little moon for night owls and dreamers.", materials: "Holographic vinyl", dimensions: "4 x 4 x 0.05 in", places: "Laptops, mugs, car glass" },
  { id: "midnight-name", name: "Name in Lights", collection: "midnight", type: "text", price: 8, description: "Your name, your font, your color. Simple and unmistakably yours.", materials: "Gloss permanent vinyl", dimensions: "6 x 2 x 0.05 in", places: "Mugs, keychains, mouse pads" }
];
const events = [
  { month: "SEP", day: "06", name: "Avenue Makers Market", time: "10:00 AM - 3:00 PM", place: "The Avenue, Nashville, TN", map: "https://www.google.com/maps/search/?api=1&query=The+Avenue+Nashville+TN" },
  { month: "SEP", day: "20", name: "Harvest & Handmade", time: "11:00 AM - 4:00 PM", place: "Franklin Factory, Franklin, TN", map: "https://www.google.com/maps/search/?api=1&query=Franklin+Factory+Franklin+TN" },
  { month: "OCT", day: "04", name: "615 Fall Craft Fair", time: "9:00 AM - 2:00 PM", place: "Nashville Fairgrounds, Nashville, TN", map: "https://www.google.com/maps/search/?api=1&query=Nashville+Fairgrounds" }
];
let cart = JSON.parse(localStorage.getItem("615-vinyl-cart") || "[]");
let activeCollection = "all";
const money = value => `$${value.toFixed(2)}`;
function persistCart() { localStorage.setItem("615-vinyl-cart", JSON.stringify(cart)); renderCart(); }
function renderProducts() {
  const visible = activeCollection === "all" ? products : products.filter(product => product.collection === activeCollection);
  document.getElementById("product-grid").innerHTML = visible.map(product => `<article class="product-card" data-product="${product.id}" tabindex="0"><div class="product-art"><span>${product.type === "image" ? "✦" : product.type === "number" ? "615" : "hello"}</span></div><div class="product-meta"><h3>${product.name}</h3><p>${product.places}</p><strong class="price">from ${money(product.price)}</strong></div></article>`).join("");
  document.querySelectorAll(".product-card").forEach(card => { card.addEventListener("click", () => openProduct(card.dataset.product)); card.addEventListener("keydown", event => { if (event.key === "Enter") openProduct(card.dataset.product); }); });
}
function openProduct(id) {
  const product = products.find(item => item.id === id);
  document.getElementById("dialog-content").innerHTML = `<div class="detail-layout"><div class="detail-art"><span>${product.type === "image" ? "✦" : product.type === "number" ? "615" : "hello"}</span></div><div class="detail-copy"><p class="kicker">${product.collection} collection / ${product.type}</p><h2>${product.name}</h2><p>${product.description}</p><p><strong>Umbrellas:</strong> ${product.places}</p><p><strong>Dimensions:</strong> ${product.dimensions}<br><strong>Material:</strong> ${product.materials}</p><label>Size<div class="option-row size-options"><button data-size="small" class="selected">Small</button><button data-size="medium">Medium +$2</button><button data-size="large">Large +$4</button></div></label><label>Finish<div class="option-row finish-options"><button data-extra="0" class="selected">Matte</button><button data-extra="1">Gloss +$1</button><button data-extra="3">Holographic +$3</button></div></label><button class="button button-dark" id="detail-add">Add to cart <span>${money(product.price)}</span></button></div></div>`;
  document.querySelectorAll(".option-row button").forEach(button => button.addEventListener("click", () => { button.parentElement.querySelectorAll("button").forEach(item => item.classList.remove("selected")); button.classList.add("selected"); updateDetailPrice(product); }));
  document.getElementById("detail-add").addEventListener("click", () => { const size = document.querySelector(".size-options .selected").dataset.size; const finish = document.querySelector(".finish-options .selected").textContent.split(" +")[0]; const price = getDetailPrice(product); const existing = cart.find(item => item.key === `${id}-${size}-${finish}`); if (existing) existing.quantity += 1; else cart.push({ key: `${id}-${size}-${finish}`, id, name: product.name, size, finish, price, quantity: 1 }); persistCart(); document.getElementById("product-dialog").close(); openCart(); });
  document.getElementById("product-dialog").showModal();
}
function getDetailPrice(product) { const sizeExtra = { small: 0, medium: 2, large: 4 }[document.querySelector(".size-options .selected").dataset.size]; const finishExtra = Number(document.querySelector(".finish-options .selected").dataset.extra); return product.price + sizeExtra + finishExtra; }
function updateDetailPrice(product) { document.querySelector("#detail-add span").textContent = money(getDetailPrice(product)); }
function renderCart() { const count = cart.reduce((sum, item) => sum + item.quantity, 0); const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); const discount = count >= 25 ? .2 : count >= 10 ? .1 : 0; const total = subtotal * (1 - discount); document.getElementById("cart-count").textContent = count; document.getElementById("cart-total").textContent = money(total); document.getElementById("discount-note").textContent = discount ? `${discount * 100}% bundle pricing applied.` : "Add 10+ decals for bundle pricing."; document.getElementById("cart-items").innerHTML = cart.length ? cart.map(item => `<div class="cart-line"><div><strong>${item.name}</strong><small>${item.size} / ${item.finish} / qty ${item.quantity}</small></div><div><strong>${money(item.price * item.quantity)}</strong><button data-remove="${item.key}" type="button">Remove</button></div></div>`).join("") : "<p class=\"muted\">Your cart is waiting for something personal.</p>"; document.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => { cart = cart.filter(item => item.key !== button.dataset.remove); persistCart(); })); }
function openCart() { document.getElementById("cart-drawer").classList.add("open"); document.getElementById("drawer-backdrop").classList.add("open"); document.getElementById("cart-drawer").setAttribute("aria-hidden", "false"); }
function closeCart() { document.getElementById("cart-drawer").classList.remove("open"); document.getElementById("drawer-backdrop").classList.remove("open"); document.getElementById("cart-drawer").setAttribute("aria-hidden", "true"); }
function renderEvents() { document.getElementById("event-list").innerHTML = events.map(event => `<article class="event-card"><div class="event-date"><small>${event.month}</small>${event.day}</div><div><h3>${event.name}</h3><p>${event.place}</p><time>${event.time}</time></div><a class="button button-dark" href="${event.map}" target="_blank" rel="noreferrer">Directions</a></article>`).join(""); document.getElementById("next-event-name").textContent = `${events[0].name} / ${events[0].place}`; document.getElementById("event-map-link").href = events[0].map; }
function setupUpload() { document.getElementById("image-upload").addEventListener("change", event => { const file = event.target.files[0]; if (!file) return; const image = new Image(); image.onload = () => { const canvas = document.getElementById("image-preview"); const context = canvas.getContext("2d"); context.clearRect(0, 0, canvas.width, canvas.height); const scale = Math.min(canvas.width / image.width, canvas.height / image.height); const width = image.width * scale; const height = image.height * scale; const x = (canvas.width - width) / 2; const y = (canvas.height - height) / 2; context.drawImage(image, x, y, width, height); const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${image.width} ${image.height}"><image href="${image.src}" width="${image.width}" height="${image.height}" preserveAspectRatio="xMidYMid meet"/></svg>`; const download = document.getElementById("svg-download"); download.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`; download.hidden = false; document.getElementById("custom-status").textContent = "SVG preview ready. Final vector tracing and cleanup can be reviewed with your quote."; }; image.src = URL.createObjectURL(file); }); }
function setup() { 
  // 1. Initial renders
  renderProducts(); 
  renderEvents(); 
  renderCart(); 
  setupUpload(); 

  // 2. Fixed collection tab tracking layout
  document.querySelectorAll(".collection-tabs button, [data-collection]").forEach(button => {
    button.addEventListener("click", (e) => {
      // Manage visual highlight on buttons
      document.querySelectorAll(".collection-tabs button").forEach(btn => btn.classList.remove("selected", "active"));
      e.target.classList.add("selected", "active");
      
      // Update data state and redraw matching vinyl cards
      activeCollection = e.target.dataset.collection || "all";
      renderProducts(); 
    });
  });

  // 3. Keep mobile menu toggles running cleanly
  const menuBtn = document.getElementById("menu-toggle");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => { 
      const nav = document.getElementById("site-nav"); 
      nav.classList.toggle("open"); 
      menuBtn.setAttribute("aria-expanded", nav.classList.contains("open")); 
    }); 
  }

  // 4. Cart modal toggles
  const cartOpenBtn = document.getElementById("cart-open");
  if (cartOpenBtn) cartOpenBtn.addEventListener("click", openCart);
  
  const cartCloseBtn = document.getElementById("cart-close");
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  
  const backdrop = document.getElementById("drawer-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeCart);
  
  const dialogCloseBtn = document.getElementById("dialog-close");
  if (dialogCloseBtn) dialogCloseBtn.addEventListener("click", () => document.getElementById("product-dialog").close());

  // 5. Checkout email processing handlers
  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => { 
      if (!cart.length) return; 
      const lines = cart.map(item => `${item.name} (${item.size}, ${item.finish}) x${item.quantity}`).join("%0D%0A"); 
      window.location.href = `mailto:clarkone@gmail.com?subject=615 Vinyl order request&body=${lines}%0D%0A%0D%0ATotal before final quote: ${document.getElementById("cart-total").textContent}`; 
    }); 
  }

  const customForm = document.getElementById("custom-form");
  if (customForm) {
    customForm.addEventListener("submit", event => { 
      event.preventDefault(); 
      const path = document.getElementById("order-path").value; 
      const text = document.getElementById("custom-text").value || "uploaded artwork"; 
      const subject = path === "business" ? "615 Vinyl business quote" : "615 Vinyl custom quote"; 
      window.location.href = `mailto:clarkone@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Idea: ${text}\nCategory: ${document.getElementById("custom-category").value}\nSize: ${document.getElementById("custom-size").value}\nFinish: ${document.getElementById("custom-finish").value}`)}`; 
    }); 
  }

  // 6. Dynamic Live QR Code generator tracking the active production link
  const qrImg = document.getElementById("qr-code");
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href.split("#")[0])}`; 
  }
}

document.addEventListener("DOMContentLoaded", setup);

