const SITE_URL = "https://thegoodguyty35-ux.github.io/615-vinyl/";

const products = [
  {
    id: "coast-script",
    name: "Good Vibes Script",
    collection: "coastal",
    type: "text",
    price: 8,
    businessPrice: 6.5,
    description: "A breezy script for tumblers, coolers, and sunny days.",
    materials: "Permanent outdoor vinyl",
    dimensions: "3 x 1 x 0.05 in",
    places: ["Tumblers", "car windows", "coolers"],
    includes: ["Outdoor-friendly finish", "Small-batch production"]
  },
  {
    id: "coast-shell",
    name: "Shell Yeah",
    collection: "coastal",
    type: "image",
    price: 9,
    businessPrice: 7.25,
    description: "A tiny shell with a little attitude for your everyday carry.",
    materials: "Matte permanent vinyl",
    dimensions: "3 x 3 x 0.05 in",
    places: ["Phone cases", "cups", "notebooks"],
    includes: ["Matte finish", "Detail-friendly cut"]
  },
  {
    id: "garden-grow",
    name: "Grow Through It",
    collection: "garden",
    type: "text",
    price: 8,
    businessPrice: 6.5,
    description: "A hand-lettered reminder for your favorite garden things.",
    materials: "Matte permanent vinyl",
    dimensions: "5 x 2 x 0.05 in",
    places: ["Planters", "water bottles", "totes"],
    includes: ["Garden favorite", "Low-profile adhesion"]
  },
  {
    id: "garden-bloom",
    name: "Bloom Number",
    collection: "garden",
    type: "number",
    price: 7,
    businessPrice: 5.75,
    description: "A cheerful number decal for a mailbox, door, or market booth.",
    materials: "Gloss permanent vinyl",
    dimensions: "4 x 4 x 0.05 in",
    places: ["Cars", "doors", "mailboxes"],
    includes: ["Gloss finish", "High visibility number"]
  },
  {
    id: "midnight-moon",
    name: "Moon Club",
    collection: "midnight",
    type: "image",
    price: 10,
    businessPrice: 8,
    description: "A quiet little moon for night owls and dreamers.",
    materials: "Holographic vinyl",
    dimensions: "4 x 4 x 0.05 in",
    places: ["Laptops", "mugs", "car glass"],
    includes: ["Holographic sparkle", "Night-ready look"]
  },
  {
    id: "midnight-name",
    name: "Name in Lights",
    collection: "midnight",
    type: "text",
    price: 8,
    businessPrice: 6.5,
    description: "Your name, your font, your color. Simple and unmistakably yours.",
    materials: "Gloss permanent vinyl",
    dimensions: "6 x 2 x 0.05 in",
    places: ["Mugs", "keychains", "mouse pads"],
    includes: ["Custom text preview", "Font selection ready"]
  }
];

const events = [
  {
    month: "SEP",
    day: "06",
    name: "Avenue Makers Market",
    time: "10:00 AM - 3:00 PM",
    place: "The Avenue, Nashville, TN",
    map: "https://www.google.com/maps?q=The+Avenue+Nashville+TN&output=embed"
  },
  {
    month: "SEP",
    day: "20",
    name: "Harvest & Handmade",
    time: "11:00 AM - 4:00 PM",
    place: "Franklin Factory, Franklin, TN",
    map: "https://www.google.com/maps?q=Franklin+Factory+Franklin+TN&output=embed"
  },
  {
    month: "OCT",
    day: "04",
    name: "615 Fall Craft Fair",
    time: "9:00 AM - 2:00 PM",
    place: "Nashville Fairgrounds, Nashville, TN",
    map: "https://www.google.com/maps?q=Nashville+Fairgrounds&output=embed"
  }
];

const triviaDeck = [
  { question: "Which movie made the phrase 'I’ll be back' famous?", answer: "The Terminator" },
  { question: "Which cartoon family lived in the town of Springfield?", answer: "The Simpsons" },
  { question: "What do you call the little round sticker people use on water bottles?", answer: "A vinyl decal" },
  { question: "Which classic ride is known for its fins and chrome?", answer: "A Cadillac" },
  { question: "Which 90s movie featured a toy cowboy named Woody?", answer: "Toy Story" }
];

let cart = JSON.parse(localStorage.getItem("615-vinyl-cart") || "[]");
let activeCollection = "all";
let activeProductId = null;
let currentQuestion = 0;

const money = value => `$${Number(value).toFixed(2)}`;

function getProductRate(product, mode) {
  return mode === "business" ? Number((product.businessPrice ?? product.price).toFixed(2)) : Number(product.price.toFixed(2));
}

function getDetailPrice(product, mode = "personal", size = "small", finish = "matte") {
  const base = getProductRate(product, mode);
  const sizeExtra = { small: 0, medium: 2, large: 4 }[size] || 0;
  const finishExtra = { matte: 0, gloss: 1, holographic: 3 }[finish] || 0;
  return Number((base + sizeExtra + finishExtra).toFixed(2));
}

function persistCart() {
  localStorage.setItem("615-vinyl-cart", JSON.stringify(cart));
  renderCart();
}

function renderProducts() {
  const visible = activeCollection === "all" ? products : products.filter(product => product.collection === activeCollection);

  document.getElementById("product-grid").innerHTML = visible.map(product => `
    <article class="product-card" data-product="${product.id}" tabindex="0">
      <div class="product-art"><span>${product.type === "image" ? "✦" : product.type === "number" ? "615" : "hello"}</span></div>
      <div class="product-meta">
        <h3>${product.name}</h3>
        <p>${product.places.join(" • ")}</p>
        <strong class="price">from ${money(product.price)}</strong>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => openProduct(card.dataset.product));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter") openProduct(card.dataset.product);
    });
  });
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  activeProductId = productId;
  const defaultMode = "personal";
  const defaultSize = "small";
  const defaultFinish = "matte";

  document.getElementById("dialog-content").innerHTML = `
    <div class="detail-layout">
      <div class="detail-art"><span>${product.type === "image" ? "✦" : product.type === "number" ? "615" : "hello"}</span></div>
      <div class="detail-copy">
        <p class="kicker">${product.collection} collection / ${product.type}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Use it on:</strong> ${product.places.join(", ")}</p>
        <p><strong>Dimensions:</strong> ${product.dimensions}<br><strong>Material:</strong> ${product.materials}</p>

        <div class="option-row mode-options">
          <button type="button" class="selected" data-mode="personal">Personal</button>
          <button type="button" data-mode="business">Business bulk</button>
        </div>

        <label>Size
          <div class="option-row size-options">
            <button type="button" data-size="small" class="selected">Small</button>
            <button type="button" data-size="medium">Medium +$2</button>
            <button type="button" data-size="large">Large +$4</button>
          </div>
        </label>

        <label>Finish
          <div class="option-row finish-options">
            <button type="button" data-finish="matte" class="selected">Matte</button>
            <button type="button" data-finish="gloss">Gloss +$1</button>
            <button type="button" data-finish="holographic">Holographic +$3</button>
          </div>
        </label>

        <button class="button button-dark" id="detail-add" type="button">Add to cart <span>${money(getDetailPrice(product, defaultMode, defaultSize, defaultFinish))}</span></button>
      </div>
    </div>
  `;

  const detailDialog = document.getElementById("product-dialog");
  const updatePrice = () => {
    const mode = document.querySelector(".mode-options .selected")?.dataset.mode || defaultMode;
    const size = document.querySelector(".size-options .selected")?.dataset.size || defaultSize;
    const finish = document.querySelector(".finish-options .selected")?.dataset.finish || defaultFinish;
    const price = getDetailPrice(product, mode, size, finish);
    const addButton = document.getElementById("detail-add");
    if (addButton) addButton.innerHTML = `Add to cart <span>${money(price)}</span>`;
  };

  document.querySelectorAll(".mode-options button, .size-options button, .finish-options button").forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentElement;
      parent.querySelectorAll("button").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      updatePrice();
    });
  });

  document.getElementById("detail-add").addEventListener("click", () => {
    const mode = document.querySelector(".mode-options .selected").dataset.mode;
    const size = document.querySelector(".size-options .selected").dataset.size;
    const finish = document.querySelector(".finish-options .selected").dataset.finish;
    const price = getDetailPrice(product, mode, size, finish);
    const key = `${product.id}-${mode}-${size}-${finish}`;
    const existing = cart.find(item => item.key === key);

    if (existing) existing.quantity += 1;
    else cart.push({ key, id: product.id, name: product.name, mode, size, finish, price, quantity: 1 });

    persistCart();
    detailDialog.close();
    openCart();
  });

  detailDialog.showModal();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = count >= 25 ? 0.2 : count >= 10 ? 0.1 : 0;
  const total = subtotal * (1 - discount);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = money(total);
  document.getElementById("discount-note").textContent = discount ? `${discount * 100}% bundle pricing applied.` : "Add 10+ decals for bundle pricing.";

  document.getElementById("cart-items").innerHTML = cart.length
    ? cart.map(item => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <small>${item.mode} / ${item.size} / ${item.finish} / qty ${item.quantity}</small>
        </div>
        <div>
          <strong>${money(item.price * item.quantity)}</strong>
          <button data-remove="${item.key}" type="button">Remove</button>
        </div>
      </div>
    `).join("")
    : '<p class="muted">Your cart is waiting for something personal.</p>';

  document.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      cart = cart.filter(item => item.key !== button.dataset.remove);
      persistCart();
    });
  });

  const checkoutName = document.getElementById("checkout-name");
  const checkoutEmail = document.getElementById("checkout-email");
  if (checkoutName && !checkoutName.value) {
    checkoutName.value = localStorage.getItem("615-vinyl-checkout-name") || "";
  }
  if (checkoutEmail && !checkoutEmail.value) {
    checkoutEmail.value = localStorage.getItem("615-vinyl-checkout-email") || "";
  }
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("drawer-backdrop").classList.add("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("drawer-backdrop").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
}

function renderEvents() {
  document.getElementById("event-list").innerHTML = events.map(event => `
    <article class="event-card">
      <div class="event-date"><small>${event.month}</small>${event.day}</div>
      <div>
        <h3>${event.name}</h3>
        <p>${event.place}</p>
        <time>${event.time}</time>
      </div>
      <a class="button button-dark" href="${event.map.replace('&output=embed', '')}" target="_blank" rel="noreferrer">Directions</a>
    </article>
  `).join("");

  document.getElementById("next-event-name").textContent = `${events[0].name} / ${events[0].place}`;
  document.getElementById("event-map-link").href = events[0].map.replace("&output=embed", "");
  const mapFrame = document.createElement("iframe");
  mapFrame.src = events[0].map;
  mapFrame.title = "Nearby map for the next booth stop";
  mapFrame.loading = "lazy";
  mapFrame.referrerPolicy = "no-referrer-when-downgrade";
  mapFrame.style.width = "100%";
  mapFrame.style.height = "240px";
  mapFrame.style.border = "0";
  mapFrame.style.borderRadius = "12px";
  const mapPlaceholder = document.querySelector(".map-placeholder");
  mapPlaceholder.appendChild(mapFrame);
}

function setupUpload() {
  document.getElementById("image-upload").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    const image = new Image();
    image.onload = () => {
      const canvas = document.getElementById("image-preview");
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      context.drawImage(image, x, y, width, height);

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${image.width} ${image.height}"><image href="${image.src}" width="${image.width}" height="${image.height}" preserveAspectRatio="xMidYMid meet"/></svg>`;
      const download = document.getElementById("svg-download");
      download.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      download.hidden = false;
      document.getElementById("custom-status").textContent = "SVG preview ready. Final vector tracing and cleanup can be reviewed with your quote.";
    };
    image.src = URL.createObjectURL(file);
  });
}

function setupTrivia() {
  const wheel = document.getElementById("wheel");
  const spinButton = document.getElementById("spin-wheel");
  const qText = document.getElementById("trivia-question");
  const resultText = document.getElementById("trivia-result");

  let spinLocked = false;
  let spinRotation = 0;

  const nextQuestion = () => {
    const item = triviaDeck[currentQuestion % triviaDeck.length];
    qText.textContent = item.question;
    resultText.textContent = "Answer the next question for a chance to earn a free sticker or a raffle entry.";
  };

  nextQuestion();

  spinButton.addEventListener("click", () => {
    if (spinLocked) return;
    spinLocked = true;
    spinButton.disabled = true;

    const prizeIndex = Math.floor(Math.random() * triviaDeck.length);
    const extraTurns = 360 * 5;
    const segmentSize = 360 / triviaDeck.length;
    const landingAngle = 360 - (prizeIndex * segmentSize + segmentSize / 2);
    spinRotation += extraTurns + landingAngle;
    wheel.style.transform = `rotate(${spinRotation}deg)`;

    const item = triviaDeck[prizeIndex];
    qText.textContent = item.question;
    resultText.textContent = `Answer: ${item.answer} — you are entered into the 615 Vinyl raffle.`;
    currentQuestion = prizeIndex + 1;

    setTimeout(() => {
      spinLocked = false;
      spinButton.disabled = false;
    }, 3600);
  });
}

function getOwnerProfile() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-owner-profile") || "null") || {};
  } catch (error) {
    return {};
  }
}

function renderOwnerProfile() {
  const profile = getOwnerProfile();
  const emailInput = document.getElementById("owner-email");
  const passwordInput = document.getElementById("owner-password");
  const otpInput = document.getElementById("owner-otp");
  const statusNode = document.getElementById("owner-login-status");

  if (emailInput && profile.email) emailInput.value = profile.email;
  if (passwordInput && profile.password) passwordInput.value = profile.password;
  if (otpInput && typeof profile.enableOtp === "boolean") otpInput.checked = profile.enableOtp;
  if (statusNode) {
    statusNode.textContent = profile.email ? `Profile saved for ${profile.email}.` : "Local profile ready for quick access.";
  }
}

function getInventory() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-inventory") || "[]");
  } catch (error) {
    return [];
  }
}

function renderInventorySummary() {
  const wrapper = document.getElementById("inventory-summary");
  if (!wrapper) return;

  const inventory = getInventory();
  const hourlyRate = Number(document.getElementById("hourly-rate")?.value || 25);
  const redesignFee = Number(document.getElementById("redesign-fee")?.value || 15);
  const rushFee = Number(document.getElementById("rush-fee")?.value || 20);
  const queueCapacity = Number(document.getElementById("queue-capacity")?.value || 8);

  if (!inventory.length) {
    wrapper.innerHTML = `
      <div class="summary-card">
        <h4>No supply items yet</h4>
        <p>Add a supply or material to forecast reorder timing and labor planning.</p>
      </div>
    `;
    return;
  }

  const items = inventory.map(item => {
    const stock = Number(item.stock || 0);
    const reorderPoint = Number(item.reorderPoint || 0);
    const leadTime = Number(item.leadTime || 7);
    const laborCost = Number(item.cost || 0) * 0.15 + hourlyRate;
    const reorderNow = stock <= reorderPoint;
    const etaText = reorderNow ? `Reorder now — expected in ${leadTime} days` : `Healthy level — about ${Math.max(0, Math.ceil((stock - reorderPoint) / Math.max(1, reorderPoint || 1)))} units ahead`;
    const queueLoad = Math.min(100, Math.round((stock / Math.max(1, queueCapacity)) * 100));

    return `
      <div class="summary-card">
        <h4>${item.name || "Supply item"}</h4>
        <p><strong>Stock:</strong> ${stock} / reorder ${reorderPoint}</p>
        <p><strong>Timeline:</strong> ${etaText}</p>
        <p><strong>Labor + supplies:</strong> ${money(laborCost + redesignFee + rushFee)} estimated for an average custom run</p>
        <p><strong>Queue load:</strong> ${queueLoad}% of weekly capacity</p>
      </div>
    `;
  }).join("");

  wrapper.innerHTML = items;
}

function setupOperations() {
  const ownerForm = document.getElementById("owner-login-form");
  if (ownerForm) {
    ownerForm.addEventListener("submit", event => {
      event.preventDefault();
      const payload = {
        email: document.getElementById("owner-email")?.value.trim() || "",
        password: document.getElementById("owner-password")?.value || "",
        enableOtp: document.getElementById("owner-otp")?.checked || false
      };
      localStorage.setItem("615-vinyl-owner-profile", JSON.stringify(payload));
      const statusNode = document.getElementById("owner-login-status");
      if (statusNode) {
        statusNode.textContent = payload.email ? `Profile saved for ${payload.email}.` : "Local profile ready for quick access.";
      }
    });
  }

  const inventoryForm = document.getElementById("inventory-form");
  if (inventoryForm) {
    inventoryForm.addEventListener("submit", event => {
      event.preventDefault();
      const inventory = getInventory();
      inventory.push({
        name: document.getElementById("supply-name")?.value.trim() || "New supply item",
        code: document.getElementById("supply-code")?.value.trim() || "",
        stock: Number(document.getElementById("supply-stock")?.value || 0),
        reorderPoint: Number(document.getElementById("supply-reorder")?.value || 0),
        leadTime: Number(document.getElementById("supply-lead")?.value || 7),
        cost: Number(document.getElementById("supply-cost")?.value || 0),
        hourlyRate: Number(document.getElementById("hourly-rate")?.value || 25),
        redesignFee: Number(document.getElementById("redesign-fee")?.value || 15),
        rushFee: Number(document.getElementById("rush-fee")?.value || 20),
        queueCapacity: Number(document.getElementById("queue-capacity")?.value || 8)
      });
      localStorage.setItem("615-vinyl-inventory", JSON.stringify(inventory));
      inventoryForm.reset();
      renderInventorySummary();
    });
  }

  ["hourly-rate", "redesign-fee", "rush-fee", "queue-capacity", "supply-stock", "supply-reorder", "supply-lead", "supply-cost"].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) field.addEventListener("input", renderInventorySummary);
  });

  renderOwnerProfile();
  renderInventorySummary();
}

function setup() {
  const homeLink = document.getElementById("brand-home");
  if (homeLink) {
    homeLink.addEventListener("click", event => {
      event.preventDefault();
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      history.replaceState(null, "", "#home");
    });
  }

  const savedScroll = Number(sessionStorage.getItem("615-vinyl-scroll") || "0");
  if (savedScroll > 0) {
    window.scrollTo({ top: savedScroll, behavior: "auto" });
  }
  window.addEventListener("scroll", () => {
    sessionStorage.setItem("615-vinyl-scroll", String(window.scrollY));
  }, { passive: true });

  renderProducts();
  renderEvents();
  renderCart();
  setupUpload();
  setupTrivia();
  setupOperations();

  document.querySelectorAll(".collection-tabs button, [data-collection]").forEach(button => {
    button.addEventListener("click", (event) => {
      document.querySelectorAll(".collection-tabs button").forEach(btn => btn.classList.remove("selected", "active"));
      event.target.classList.add("selected", "active");
      activeCollection = event.target.dataset.collection || "all";
      renderProducts();
    });
  });

  const menuBtn = document.getElementById("menu-toggle");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const nav = document.getElementById("site-nav");
      nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  const cartOpenBtn = document.getElementById("cart-open");
  if (cartOpenBtn) cartOpenBtn.addEventListener("click", openCart);
  const cartCloseBtn = document.getElementById("cart-close");
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  const backdrop = document.getElementById("drawer-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeCart);
  const dialogCloseBtn = document.getElementById("dialog-close");
  if (dialogCloseBtn) dialogCloseBtn.addEventListener("click", () => document.getElementById("product-dialog").close());

  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) {
        alert("Your cart is empty. Add a decal before sending your order request.");
        return;
      }

      const nameInput = document.getElementById("checkout-name");
      const emailInput = document.getElementById("checkout-email");
      const buyerName = (nameInput && nameInput.value.trim()) || "Customer";
      const buyerEmail = (emailInput && emailInput.value.trim()) || "clarkone@gmail.com";

      localStorage.setItem("615-vinyl-checkout-name", buyerName);
      localStorage.setItem("615-vinyl-checkout-email", buyerEmail);

      const lines = cart.map(item => `${item.name} (${item.mode} / ${item.size} / ${item.finish}) x${item.quantity} = ${money(item.price * item.quantity)}`);
      const total = document.getElementById("cart-total").textContent;
      const message = [
        "Hello Christine,",
        "",
        "I would like to place an order through 615 Vinyl.",
        "",
        "Order summary:",
        ...lines,
        "",
        `Customer: ${buyerName}`,
        `Email: ${buyerEmail}`,
        `Order total: ${total}`,
        "",
        "Please confirm the design, timeline, and final total before production.",
        "",
        "If a design proof is needed, I would be happy to review it before production begins."
      ].join("%0D%0A");

      window.location.href = `mailto:clarkone@gmail.com?subject=${encodeURIComponent("615 Vinyl order request")}&body=${encodeURIComponent(message)}`;
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

  const qrImg = document.getElementById("qr-code");
  if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(SITE_URL)}`;
}

document.addEventListener("DOMContentLoaded", setup);
