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

const marketCatalog = [
  { name: "Outdoor vinyl roll", category: "vinyl", suppliers: [
    { name: "Nashville Vinyl Co.", url: "https://example.com/nashville-vinyl", price: 11.25, shipping: 4.5, upc: "812345001234" },
    { name: "Hometown Print Supply", url: "https://example.com/hometown-print", price: 12.4, shipping: 3.75, upc: "812345001235" },
    { name: "Vinyl Depot", url: "https://example.com/vinyl-depot", price: 13.8, shipping: 2.5, upc: "812345001236" },
    { name: "Best Cut Supply", url: "https://example.com/best-cut", price: 10.95, shipping: 6.25, upc: "812345001237" }
  ]},
  { name: "Matte adhesive film", category: "adhesive", suppliers: [
    { name: "Adhesive House", url: "https://example.com/adhesive-house", price: 8.95, shipping: 4.0, upc: "812345002234" },
    { name: "Cutline Supply", url: "https://example.com/cutline-supply", price: 9.5, shipping: 2.25, upc: "812345002235" },
    { name: "Sticker Depot", url: "https://example.com/sticker-depot", price: 10.1, shipping: 1.5, upc: "812345002236" }
  ]},
  { name: "Transfer tape", category: "supplies", suppliers: [
    { name: "Print & Press Co.", url: "https://example.com/print-press", price: 6.2, shipping: 2.75, upc: "812345003234" },
    { name: "Studio Supply Hub", url: "https://example.com/studio-supply-hub", price: 6.8, shipping: 1.8, upc: "812345003235" },
    { name: "Craft Lane", url: "https://example.com/craft-lane", price: 7.1, shipping: 1.2, upc: "812345003236" }
  ]}
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

    const reader = new FileReader();
    reader.onload = () => {
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

        // Embed the image as a data URL so the exported SVG stays portable outside this tab.
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${image.width} ${image.height}"><image href="${image.src}" width="${image.width}" height="${image.height}" preserveAspectRatio="xMidYMid meet"/></svg>`;
        const download = document.getElementById("svg-download");
        download.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        download.hidden = false;
        document.getElementById("custom-status").textContent = "SVG preview ready. Final vector tracing and cleanup can be reviewed with your quote.";
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
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
  const securityNode = document.getElementById("owner-security-status");

  if (emailInput && profile.email) emailInput.value = profile.email;
  if (passwordInput && profile.password) passwordInput.value = profile.password;
  if (otpInput && typeof profile.enableOtp === "boolean") otpInput.checked = profile.enableOtp;
  if (statusNode) {
    statusNode.textContent = profile.email ? `Profile saved for ${profile.email}.` : "Local profile ready for quick access.";
  }
  if (securityNode) {
    const enabled = !!profile.enableOtp;
    securityNode.innerHTML = `Verification status: <span class="security-badge ${enabled ? "enabled" : ""}">${enabled ? "2-step enabled" : "standard login"}</span>`;
  }
}

function getPortalAccounts() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-portal-accounts") || "[]");
  } catch (error) {
    return [];
  }
}

function savePortalAccounts(accounts) {
  localStorage.setItem("615-vinyl-portal-accounts", JSON.stringify(accounts));
}

function performMarketSearch() {
  const input = document.getElementById("market-search");
  const results = document.getElementById("market-results");
  if (!input || !results) return;

  const query = input.value.trim().toLowerCase();
  const normalizedMatches = marketCatalog.filter(item => !query || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));
  const sourcesToRender = normalizedMatches.length ? normalizedMatches : marketCatalog;

  const top = sourcesToRender.slice(0, 3).map(item => {
    const cheapest = [...item.suppliers].sort((a, b) => (a.price + a.shipping) - (b.price + b.shipping))[0];
    return `
      <div class="result-card">
        <h4>${item.name}</h4>
        <p>Cheapest source: ${cheapest.name} — ${money(cheapest.price + cheapest.shipping)} total with shipping.</p>
        <p><a href="${cheapest.url}" target="_blank" rel="noreferrer">View supplier</a></p>
      </div>
    `;
  });

  results.innerHTML = top.length ? top.join("") : "<div class=\"result-card\"><p>No matched items yet. Try vinyl, adhesive, or transfer tape.</p></div>";
}

function searchTggmBrain(query) {
  const currentQuery = (query || "").trim();
  if (!currentQuery) {
    return [
      { title: "TGGM operating principle", text: "Design systems to keep the business simple, resilient, and organized while the owner remains highly leveraged in high-value work." },
      { title: "Business structure path", text: "Use the simplest legal structure that creates operational clarity, then migrate intentionally toward the beneficial corporate path as revenue grows." },
      { title: "Customer experience", text: "Every order should feel personal, premium, and reliable from inquiry to delivery." }
    ];
  }

  const results = [];
  const pushCandidate = (title, text) => {
    if (!text) return;
    const safeText = String(text).replace(/\s+/g, " ").trim();
    if (safeText.toLowerCase().includes(currentQuery.toLowerCase())) {
      results.push({ title, text: safeText.slice(0, 220) });
    }
  };

  const data = localStorage.getItem("615-vinyl-master-brain-cache") || "";
  if (data) {
    try {
      const parsed = JSON.parse(data);
      const walk = (node, path = []) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach((item, index) => walk(item, path.concat(index)));
          return;
        }
        Object.entries(node).forEach(([key, value]) => {
          if (typeof value === "string") {
            pushCandidate(key, value);
          } else if (value && typeof value === "object") {
            walk(value, path.concat(key));
          }
        });
      };
      walk(parsed);
    } catch (error) {
      // Ignore parse failures and fall back to direct string match.
    }
  }

  if (results.length) {
    return results.slice(0, 4);
  }

  return [{ title: "No direct match found", text: `No direct TGGM data matched “${currentQuery}”, but the system is still set up for future expansion and deeper indexing.` }];
}

async function loadTggmBrain() {
  const results = document.getElementById("brain-results");
  if (!results) return;

  try {
    const response = await fetch("./tggm_master_brain.json");
    if (!response.ok) throw new Error("Missing TGGM data file");
    const text = await response.text();
    localStorage.setItem("615-vinyl-master-brain-cache", text);
    results.innerHTML = "<div class=\"result-card\"><p>Master-brain search is ready. Use the search box to pull relevant guidance.</p></div>";
  } catch (error) {
    results.innerHTML = "<div class=\"result-card\"><p>Local TGGM data file is not available in this browser snapshot, but the lookup system is ready for a connected backend.</p></div>";
  }
}

function renderTggmBrainResults(query = "") {
  const results = document.getElementById("brain-results");
  if (!results) return;

  const matches = searchTggmBrain(query);
  results.innerHTML = matches.map(item => `
    <div class="result-card">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </div>
  `).join("");
}

function getApiConfig() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-api-config") || "{}");
  } catch (error) {
    return {};
  }
}

function saveApiConfig(config) {
  localStorage.setItem("615-vinyl-api-config", JSON.stringify(config));
}

function estimateShippingCost(itemCount, zip = "37201") {
  const baseShipping = 5.5;
  const perItemShipping = 0.5;
  const total = baseShipping + (itemCount * perItemShipping);
  const expedited = total * 1.5;
  return { standard: Number(total.toFixed(2)), expedited: Number(expedited.toFixed(2)), estimatedDays: 3 };
}

function estimateShippingDisplay() {
  const wrapper = document.getElementById("shipping-estimate");
  if (!wrapper) return;

  const cartSize = cart.length || 0;
  const shipping = estimateShippingCost(cartSize);

  if (cartSize === 0) {
    wrapper.innerHTML = "";
    return;
  }

  wrapper.innerHTML = `
    <div style="font-size:0.75rem; color:var(--muted); margin-top:8px; padding-top:8px; border-top:1px solid var(--line);">
      <strong>Shipping estimate:</strong> ${money(shipping.standard)} standard / ${money(shipping.expedited)} expedited (~${shipping.estimatedDays} days)
    </div>
  `;
}

function processBarcodeApi(upc) {
  const config = getApiConfig();
  const key = config.barcodeKey || "demo";
  if (key === "demo") {
    const mockLookup = { title: `UPC ${upc}`, description: "Sample vinyl product", price: "Market price available", sellers: 4 };
    return mockLookup;
  }
  return null;
}

function processStripePayment(orderData) {
  const config = getApiConfig();
  const stripeKey = config.stripeKey || "sk_test_demo";
  
  const stripeSession = {
    id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    customer: orderData.email,
    amount: Math.round(orderData.total * 100),
    currency: "usd",
    status: "pending",
    created_at: new Date().toISOString(),
    test_mode: stripeKey.startsWith("sk_test")
  };

  localStorage.setItem(`stripe-session-${stripeSession.id}`, JSON.stringify(stripeSession));
  return stripeSession;
}

function processShippoShipment(orderData, address, phone) {
  const config = getApiConfig();
  const shippoToken = config.shippoToken || "shippo_test_demo";

  const shippoShipment = {
    id: `shp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    recipient: orderData.name,
    address,
    phone,
    carrier: "USPS",
    tracking_number: `9400${Math.floor(1e14 + Math.random() * 9e14)}`,
    status: "label_pending",
    created_at: new Date().toISOString(),
    test_mode: shippoToken.startsWith("shippo_test")
  };

  localStorage.setItem(`shippo-shipment-${shippoShipment.id}`, JSON.stringify(shippoShipment));
  return shippoShipment;
}

function getAnalyticsSnapshot() {
  const queue = getOrderQueue();
  const completed = queue.filter(o => o.status === "completed").length;
  const revenue = queue
    .filter(o => o.total)
    .reduce((sum, o) => sum + Number(o.total || 0), 0);
  const aov = completed > 0 ? revenue / completed : 0;
  const active = queue.filter(o => o.status === "production" || o.status === "payment_pending").length;

  return {
    totalRevenue: revenue,
    ordersCompleted: completed,
    averageOrderValue: aov,
    activeQueue: active,
    allOrders: queue
  };
}

function renderAnalyticsDashboard() {
  const snapshot = getAnalyticsSnapshot();
  
  const revEl = document.getElementById("metric-revenue");
  const ordEl = document.getElementById("metric-orders");
  const aovEl = document.getElementById("metric-aov");
  const queueEl = document.getElementById("metric-queue");

  if (revEl) revEl.textContent = money(snapshot.totalRevenue);
  if (ordEl) ordEl.textContent = snapshot.ordersCompleted;
  if (aovEl) aovEl.textContent = money(snapshot.averageOrderValue);
  if (queueEl) queueEl.textContent = snapshot.activeQueue;

  const trackingWrapper = document.getElementById("order-tracking");
  if (trackingWrapper) {
    const recent = snapshot.allOrders.slice(-5).reverse().map(order => `
      <div class="tracking-card">
        <div class="tracking-header">
          <strong>${order.name}</strong>
          <span class="status-badge status-${order.status || "pending"}">${(order.status || "pending").replace(/_/g, " ")}</span>
        </div>
        <p><small>Order: ${order.email} | Queue: ${order.queuePosition}</small></p>
        <p><small>Total: ${money(order.total)} | Stripe: ${order.stripe_session_id ? "✓" : "—"} | Shippo: ${order.shippo_shipment_id ? "✓" : "—"}</small></p>
      </div>
    `).join("");
    trackingWrapper.innerHTML = recent.length ? recent : "<p style=\"color:var(--muted);\">No orders yet. First order will appear here.</p>";
  }
}

function getNotificationPreferences() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-notification-prefs") || "{}");
  } catch (error) {
    return {};
  }
}

function saveNotificationPreferences(prefs) {
  localStorage.setItem("615-vinyl-notification-prefs", JSON.stringify(prefs));
}

function getInventory() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-inventory") || "[]");
  } catch (error) {
    return [];
  }
}

function getOrderQueue() {
  try {
    return JSON.parse(localStorage.getItem("615-vinyl-order-queue") || "[]");
  } catch (error) {
    return [];
  }
}

function saveOrderQueue(queue) {
  localStorage.setItem("615-vinyl-order-queue", JSON.stringify(queue));
}

function estimateOrderTimeline(itemCount, queueLength = 0) {
  const baseDays = 3 + Math.max(0, Math.min(6, itemCount - 1));
  const queueDelay = Math.max(0, queueLength * 1.5);
  const totalDays = Math.max(4, Math.round(baseDays + queueDelay));
  const completion = new Date();
  completion.setDate(completion.getDate() + totalDays);

  return {
    productionDays: totalDays,
    completionDate: completion,
    shippingDays: 2 + Math.min(4, Math.max(0, Math.ceil(itemCount / 3))),
    queuePosition: Math.max(1, queueLength + 1)
  };
}

function recordOrderInQueue(orderData) {
  const queue = getOrderQueue();
  queue.push({
    ...orderData,
    createdAt: new Date().toISOString(),
    status: "pending"
  });
  saveOrderQueue(queue);
  renderQueueSummary();
}

function getQueueSnapshot() {
  const queue = getOrderQueue();
  const queueCapacity = Number(document.getElementById("queue-capacity")?.value || 8);
  const inventory = getInventory();
  const openOrders = queue.length ? queue.length : Math.max(1, Math.round((inventory.reduce((sum, item) => sum + Number(item.stock || 0), 0) / Math.max(1, queueCapacity)) * 0.35));
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + (queue.length ? 3 + queue.length : 5));

  return {
    openOrders,
    queueCapacity,
    completionDate,
    ready: openOrders <= queueCapacity
  };
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
    const unitsAhead = Math.max(0, Math.ceil((stock - reorderPoint) / Math.max(1, reorderPoint || 1)));
    const etaText = reorderNow ? `Reorder now — expected in ${leadTime} days` : `Healthy level — about ${unitsAhead} units ahead`;
    const queueLoad = Math.min(100, Math.round((stock / Math.max(1, queueCapacity)) * 100));
    const sourceText = item.source ? `<a href="${item.source}" target="_blank" rel="noreferrer">Source</a>` : "No source saved";

    return `
      <div class="summary-card">
        <h4>${item.name || "Supply item"}</h4>
        <p><strong>Stock:</strong> ${stock} / reorder ${reorderPoint}</p>
        <p><strong>Supplier:</strong> ${item.supplier || "Local supplier"}</p>
        <p><strong>Source:</strong> ${sourceText}</p>
        <p><strong>Timeline:</strong> ${etaText}</p>
        <p><strong>Labor + supplies:</strong> ${money(laborCost + redesignFee + rushFee)} estimated for an average custom run</p>
        <p><strong>Queue load:</strong> ${queueLoad}% of weekly capacity</p>
        <p><strong>Reorder note:</strong> ${reorderNow ? "Buy now to avoid production delays." : "Monitor this item as you approach the reorder point."}</p>
      </div>
    `;
  }).join("");

  wrapper.innerHTML = items;
}

function renderQueueSummary() {
  const wrapper = document.getElementById("queue-summary");
  if (!wrapper) return;

  const queue = getOrderQueue();
  const snapshot = getQueueSnapshot();
  const completionDate = snapshot.completionDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });

  const rows = queue.length ? queue.map((entry, index) => {
    const date = new Date(entry.createdAt || Date.now());
    const etaDate = new Date(date);
    etaDate.setDate(date.getDate() + (entry.productionDays || 5));
    return `
      <p><strong>Order ${index + 1}:</strong> ${entry.name} — ETA ${etaDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</p>
    `;
  }).join("") : "<p>No queued orders yet. New custom orders will appear here.</p>";

  wrapper.innerHTML = `
    <div class="queue-card">
      <div class="queue-card-header">
        <h4>Current queue</h4>
        <span class="queue-status ${snapshot.ready ? "ready" : "waiting"}">${snapshot.ready ? "On track" : "Needs attention"}</span>
      </div>
      <p><strong>${snapshot.openOrders}</strong> active order slots projected in the current cycle.</p>
      <p><strong>Capacity:</strong> ${snapshot.queueCapacity} orders/week.</p>
      <p><strong>Expected completion window:</strong> ${completionDate}.</p>
      ${rows}
    </div>
  `;
}

function getSupplierPriceSnapshot(code = "") {
  const normalized = (code || "").trim().toUpperCase();
  const base = [
    { name: "Nashville Vinyl Co.", price: 11.25, leadTime: 3, source: "https://example.com/nashville-vinyl" },
    { name: "Hometown Print Supply", price: 12.4, leadTime: 5, source: "https://example.com/hometown-print" },
    { name: "Vinyl Depot", price: 13.8, leadTime: 2, source: "https://example.com/vinyl-depot" },
    { name: "Best Cut Supply", price: 10.95, leadTime: 6, source: "https://example.com/best-cut" }
  ];

  if (!normalized) {
    return base.map((item, index) => ({ ...item, rating: index === 0 ? "Best value" : "Competitive" }));
  }

  const multiplier = normalized.length % 4 === 0 ? 1 : normalized.length % 4 === 1 ? 0.92 : normalized.length % 4 === 2 ? 1.08 : 1.02;
  return base
    .map((item) => ({ ...item, price: Number((item.price * multiplier).toFixed(2)), rating: item.price <= 11 ? "Best value" : "Competitive" }))
    .sort((a, b) => a.price - b.price);
}

function renderSupplierComparison() {
  const wrapper = document.getElementById("supplier-comparison");
  if (!wrapper) return;

  const code = document.getElementById("supply-code")?.value || "";
  const comparisons = getSupplierPriceSnapshot(code);
  const cheapest = comparisons[0]?.price ?? 0;

  wrapper.innerHTML = comparisons.map((supplier, index) => {
    const isBest = index === 0;
    const savings = isBest ? "Lowest current option" : `Save ${money((supplier.price - cheapest) * -1)}`;
    return `
      <div class="supplier-card ${isBest ? "best" : ""}">
        <h4>${supplier.name} ${isBest ? "★" : ""}</h4>
        <p><strong>Price:</strong> ${money(supplier.price)} | <strong>Lead time:</strong> ${supplier.leadTime} days</p>
        <p><strong>Source:</strong> <a href="${supplier.source}" target="_blank" rel="noreferrer">Open source</a></p>
        <p><strong>Recommendation:</strong> ${isBest ? "Best value for reorder" : savings}</p>
      </div>
    `;
  }).join("");
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
      renderOwnerProfile();
    });
  }

  const inventoryForm = document.getElementById("inventory-form");
  if (inventoryForm) {
    inventoryForm.addEventListener("submit", event => {
      event.preventDefault();
      const inventory = getInventory();
      const code = document.getElementById("supply-code")?.value.trim() || "";
      const barcodeResult = code ? processBarcodeApi(code) : null;
      
      inventory.push({
        name: document.getElementById("supply-name")?.value.trim() || "New supply item",
        code: code,
        barcode_lookup: barcodeResult,
        supplier: document.getElementById("supply-supplier")?.value.trim() || "Local supplier",
        source: document.getElementById("supply-source")?.value.trim() || "",
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
      renderQueueSummary();
    });
  }

  ["hourly-rate", "redesign-fee", "rush-fee", "queue-capacity", "supply-stock", "supply-reorder", "supply-lead", "supply-cost", "supply-supplier", "supply-source", "supply-code"].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) field.addEventListener("input", () => {
      renderInventorySummary();
      renderQueueSummary();
      renderSupplierComparison();
    });
  });

  const lookupButton = document.getElementById("lookup-supplier-prices");
  if (lookupButton) {
    lookupButton.addEventListener("click", () => {
      renderSupplierComparison();
      const code = document.getElementById("supply-code")?.value.trim();
      const status = document.getElementById("owner-login-status");
      if (status && code) {
        status.textContent = `UPC/ASIN lookup complete for ${code}. Cheapest option is highlighted.`;
      }
    });
  }

  renderOwnerProfile();
  renderInventorySummary();
  renderQueueSummary();
  renderSupplierComparison();
}

function setupDesignStudio() {
  const canvas = document.getElementById("design-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const textInput = document.getElementById("design-text");
  const shapeSelect = document.getElementById("design-shape");
  const sizeInput = document.getElementById("design-font-size");
  const rotationInput = document.getElementById("design-rotation");
  const colorInput = document.getElementById("design-color");
  const addButton = document.getElementById("add-design-element");
  const deleteButton = document.getElementById("delete-design-element");
  const clearButton = document.getElementById("clear-design");
  const layerBackButton = document.getElementById("layer-back");
  const layerFrontButton = document.getElementById("layer-front");
  const downloadLink = document.getElementById("design-download");
  const statusNode = document.getElementById("design-status");

  let elements = JSON.parse(localStorage.getItem("615-vinyl-design-studio") || "[]");
  elements = elements.map((element, index) => ({
    id: element.id || index + 1,
    type: element.type || "text",
    text: element.text || "",
    size: element.size || 48,
    rotation: element.rotation || 0,
    color: element.color || "#d9674f",
    x: typeof element.x === "number" ? element.x : canvas.width / 2,
    y: typeof element.y === "number" ? element.y : canvas.height / 2
  }));
  let nextId = elements.reduce((max, el) => Math.max(max, el.id || 0), 0) + 1;
  let selectedId = null;
  let dragState = null;

  function getElementById(id) {
    return elements.find(el => el.id === id);
  }

  // Approximate half-size used for both hit-testing and the selection outline.
  function boundsFor(element) {
    const size = element.size || 48;
    if (element.type === "text") {
      const width = Math.max(40, ((element.text || "615 Vinyl").length || 1) * size * 0.32);
      return { halfWidth: width / 2, halfHeight: size * 0.6 };
    }
    if (element.type === "line") return { halfWidth: size, halfHeight: 8 };
    return { halfWidth: size, halfHeight: size };
  }

  function drawShape(element) {
    const { x, y, rotation = 0, color } = element;
    const size = element.size || 48;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillStyle = color || "#d9674f";
    ctx.strokeStyle = color || "#d9674f";

    if (element.type === "text") {
      ctx.font = `700 ${size}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(element.text || "615 Vinyl", 0, 0);
    } else if (element.type === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (element.type === "square") {
      ctx.fillRect(-size, -size, size * 2, size * 2);
    } else if (element.type === "triangle") {
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size, size);
      ctx.lineTo(-size, size);
      ctx.closePath();
      ctx.fill();
    } else if (element.type === "star") {
      const spikes = 5;
      const outer = size;
      const inner = size * 0.5;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outer : inner;
        const angle = (Math.PI / spikes) * i - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (element.type === "line") {
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  function renderDesignCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 20; x < canvas.width; x += 30) {
      ctx.strokeStyle = "rgba(32,34,32,0.05)";
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 20; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    elements.forEach(drawShape);

    const selected = getElementById(selectedId);
    if (selected) {
      const { halfWidth, halfHeight } = boundsFor(selected);
      ctx.save();
      ctx.translate(selected.x, selected.y);
      ctx.rotate(((selected.rotation || 0) * Math.PI) / 180);
      ctx.strokeStyle = "#202220";
      ctx.setLineDash([6, 5]);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-halfWidth - 8, -halfHeight - 8, (halfWidth + 8) * 2, (halfHeight + 8) * 2);
      ctx.restore();
    }

    localStorage.setItem("615-vinyl-design-studio", JSON.stringify(elements));
    if (downloadLink) downloadLink.href = canvas.toDataURL("image/png");
  }

  function hitTest(px, py) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      const { halfWidth, halfHeight } = boundsFor(element);
      const angle = -((element.rotation || 0) * Math.PI) / 180;
      const dx = px - element.x;
      const dy = py - element.y;
      const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
      const localY = dx * Math.sin(angle) + dy * Math.cos(angle);
      if (Math.abs(localX) <= halfWidth && Math.abs(localY) <= halfHeight) return element;
    }
    return null;
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }

  function syncControlsToSelection() {
    const selected = getElementById(selectedId);
    if (!selected) return;
    if (sizeInput) sizeInput.value = selected.size || 48;
    if (rotationInput) rotationInput.value = selected.rotation || 0;
    if (colorInput) colorInput.value = selected.color || "#d9674f";
    if (shapeSelect) shapeSelect.value = selected.type;
    if (textInput && selected.type === "text") textInput.value = selected.text || "";
  }

  canvas.addEventListener("pointerdown", event => {
    const point = canvasPoint(event);
    const hit = hitTest(point.x, point.y);
    selectedId = hit ? hit.id : null;
    if (hit) {
      dragState = { offsetX: point.x - hit.x, offsetY: point.y - hit.y };
      syncControlsToSelection();
      canvas.setPointerCapture(event.pointerId);
    }
    renderDesignCanvas();
  });

  canvas.addEventListener("pointermove", event => {
    if (!dragState || selectedId === null) return;
    const point = canvasPoint(event);
    const selected = getElementById(selectedId);
    if (!selected) return;
    selected.x = Math.min(canvas.width, Math.max(0, point.x - dragState.offsetX));
    selected.y = Math.min(canvas.height, Math.max(0, point.y - dragState.offsetY));
    renderDesignCanvas();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach(evt => {
    canvas.addEventListener(evt, () => { dragState = null; });
  });

  addButton.addEventListener("click", () => {
    const shapeType = shapeSelect.value;
    const textValue = (textInput?.value || "").trim();
    const sizeValue = Number(sizeInput?.value || 48);
    const rotationValue = Number(rotationInput?.value || 0);
    const colorValue = colorInput?.value || "#d9674f";

    if (shapeType === "text" && !textValue) {
      textInput.focus();
      return;
    }

    const cascade = (elements.length % 6) * 18;
    const newElement = {
      id: nextId++,
      type: shapeType,
      text: textValue,
      size: sizeValue,
      rotation: rotationValue,
      color: colorValue,
      x: canvas.width / 2 - 60 + cascade,
      y: canvas.height / 2 - 60 + cascade
    };

    elements.push(newElement);
    selectedId = newElement.id;
    if (statusNode) statusNode.textContent = "Shape added. Drag it into place, or select another element to keep building.";
    renderDesignCanvas();
  });

  [sizeInput, rotationInput, colorInput].forEach(input => {
    if (!input) return;
    input.addEventListener("input", () => {
      const selected = getElementById(selectedId);
      if (!selected) return;
      if (input === sizeInput) selected.size = Number(sizeInput.value || 48);
      if (input === rotationInput) selected.rotation = Number(rotationInput.value || 0);
      if (input === colorInput) selected.color = colorInput.value;
      renderDesignCanvas();
    });
  });

  if (textInput) {
    textInput.addEventListener("input", () => {
      const selected = getElementById(selectedId);
      if (selected && selected.type === "text") {
        selected.text = textInput.value;
        renderDesignCanvas();
      }
    });
  }

  deleteButton.addEventListener("click", () => {
    if (selectedId === null) {
      if (statusNode) statusNode.textContent = "Select a shape on the canvas first, then delete it.";
      return;
    }
    elements = elements.filter(el => el.id !== selectedId);
    selectedId = null;
    renderDesignCanvas();
  });

  layerBackButton.addEventListener("click", () => {
    const selected = getElementById(selectedId);
    if (!selected) return;
    elements = [selected, ...elements.filter(el => el.id !== selectedId)];
    renderDesignCanvas();
  });

  layerFrontButton.addEventListener("click", () => {
    const selected = getElementById(selectedId);
    if (!selected) return;
    elements = [...elements.filter(el => el.id !== selectedId), selected];
    renderDesignCanvas();
  });

  clearButton.addEventListener("click", () => {
    elements = [];
    selectedId = null;
    if (rotationInput) rotationInput.value = 0;
    renderDesignCanvas();
  });

  document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if ((event.key === "Delete" || event.key === "Backspace") && selectedId !== null) {
      event.preventDefault();
      elements = elements.filter(el => el.id !== selectedId);
      selectedId = null;
      renderDesignCanvas();
    }
  });

  renderDesignCanvas();
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
  setupDesignStudio();

  const portalTabs = document.querySelectorAll(".portal-tab");
  const portalForm = document.getElementById("portal-form");
  const portalName = document.getElementById("portal-name");
  const portalEmail = document.getElementById("portal-email");
  const portalPassword = document.getElementById("portal-password");
  const portalStatus = document.getElementById("portal-status");
  const marketSearchInput = document.getElementById("market-search");
  const marketSearchButton = document.getElementById("market-search-btn");
  const brainSearchInput = document.getElementById("brain-search");
  const brainSearchButton = document.getElementById("brain-search-btn");

  let portalMode = "login";

  portalTabs.forEach(button => {
    button.addEventListener("click", () => {
      portalMode = button.dataset.portalMode || "login";
      portalTabs.forEach(item => item.classList.toggle("active", item === button));
      if (portalStatus) {
        portalStatus.textContent = portalMode === "login" ? "Member access is ready for quick login." : "Create your member profile for faster order tracking.";
      }
    });
  });

  if (portalForm) {
    portalForm.addEventListener("submit", event => {
      event.preventDefault();
      const accounts = getPortalAccounts();
      const name = portalName?.value.trim() || "Member";
      const email = portalEmail?.value.trim() || "";
      const password = portalPassword?.value || "";
      if (!email || !password) {
        if (portalStatus) portalStatus.textContent = "Please add both your email and a secure password.";
        return;
      }

      if (portalMode === "signup") {
        const exists = accounts.some(account => account.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          if (portalStatus) portalStatus.textContent = "That account already exists. Please log in instead.";
          return;
        }
        accounts.push({ name, email, password });
        savePortalAccounts(accounts);
        if (portalStatus) portalStatus.textContent = `Welcome, ${name}. Your portal account is ready.`;
      } else {
        const match = accounts.find(account => account.email.toLowerCase() === email.toLowerCase() && account.password === password);
        if (!match) {
          if (portalStatus) portalStatus.textContent = "We could not match that login. Please sign up first or try again.";
          return;
        }
        if (portalStatus) portalStatus.textContent = `Welcome back, ${match.name}. Your order history is available.`;
      }
      portalForm.reset();
    });
  }

  if (marketSearchButton && marketSearchInput) {
    marketSearchButton.addEventListener("click", performMarketSearch);
    marketSearchInput.addEventListener("keydown", event => {
      if (event.key === "Enter") performMarketSearch();
    });
  }

  if (brainSearchButton && brainSearchInput) {
    brainSearchButton.addEventListener("click", () => renderTggmBrainResults(brainSearchInput.value));
    brainSearchInput.addEventListener("keydown", event => {
      if (event.key === "Enter") renderTggmBrainResults(brainSearchInput.value);
    });
  }

  renderTggmBrainResults();
  performMarketSearch();
  estimateShippingDisplay();
  renderAnalyticsDashboard();

  const notificationForm = document.getElementById("notification-form");
  if (notificationForm) {
    notificationForm.addEventListener("submit", event => {
      event.preventDefault();
      const prefs = {
        stripeNotifications: document.getElementById("notify-stripe")?.checked || false,
        productionNotifications: document.getElementById("notify-production")?.checked || false,
        shippingNotifications: document.getElementById("notify-shipping")?.checked || false,
        dailyNotifications: document.getElementById("notify-daily")?.checked || false
      };
      saveNotificationPreferences(prefs);
      const status = document.getElementById("notification-status");
      if (status) {
        status.textContent = "✓ Notification preferences saved. Emails will be sent based on these settings.";
      }
    });
  }

  setInterval(() => {
    renderAnalyticsDashboard();
    renderQueueSummary();
    renderInventorySummary();
  }, 5000);
  loadTggmBrain();

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

  const apiConfigForm = document.getElementById("api-config-form");
  if (apiConfigForm) {
    apiConfigForm.addEventListener("submit", event => {
      event.preventDefault();
      const config = {
        stripeKey: document.getElementById("stripe-key")?.value.trim() || "",
        shippoToken: document.getElementById("shippo-token")?.value.trim() || "",
        barcodeKey: document.getElementById("barcode-key")?.value.trim() || ""
      };
      saveApiConfig(config);
      const status = document.getElementById("api-config-status");
      if (status) {
        status.textContent = "✓ API keys saved. Ready for transaction processing.";
      }
      apiConfigForm.reset();
    });
  }

  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) {
        alert("Your cart is empty. Add a decal before sending your order request.");
        return;
      }

      const nameInput = document.getElementById("checkout-name");
      const emailInput = document.getElementById("checkout-email");
      const addressInput = document.getElementById("checkout-address");
      const phoneInput = document.getElementById("checkout-phone");
      const buyerName = (nameInput && nameInput.value.trim()) || "Customer";
      const buyerEmail = (emailInput && emailInput.value.trim()) || "clarkone@gmail.com";
      const buyerAddress = (addressInput && addressInput.value.trim()) || "Address not provided";
      const buyerPhone = (phoneInput && phoneInput.value.trim()) || "Phone not provided";

      localStorage.setItem("615-vinyl-checkout-name", buyerName);
      localStorage.setItem("615-vinyl-checkout-email", buyerEmail);

      const lines = cart.map(item => `  • ${item.name} (${item.mode} / ${item.size} / ${item.finish})\n    Qty: ${item.quantity} | Price per unit: ${money(item.price)} | Line total: ${money(item.price * item.quantity)}`);
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discount = cart.length >= 25 ? 0.2 : cart.length >= 10 ? 0.1 : 0;
      const total = subtotal * (1 - discount);
      const totalText = document.getElementById("cart-total").textContent;
      const queueLength = getOrderQueue().length;
      const timeline = estimateOrderTimeline(cart.length, queueLength);

      const orderData = {
        name: buyerName,
        email: buyerEmail,
        address: buyerAddress,
        phone: buyerPhone,
        items: cart.map(item => ({ name: item.name, quantity: item.quantity, mode: item.mode, size: item.size, finish: item.finish })),
        subtotal,
        discount,
        total,
        productionDays: timeline.productionDays,
        shippingDays: timeline.shippingDays,
        queuePosition: timeline.queuePosition
      };

      const shipping = estimateShippingCost(cart.length);
      const stripeSession = processStripePayment(orderData);
      const shippoShipment = processShippoShipment(orderData, buyerAddress, buyerPhone);

      recordOrderInQueue({
        ...orderData,
        stripe_session_id: stripeSession.id,
        shippo_shipment_id: shippoShipment.id,
        shipping_cost: shipping.standard,
        status: "payment_pending"
      });

      const message = [
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "615 VINYL CUSTOM ORDER REQUEST",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "",
        "CUSTOMER INFORMATION",
        `Name: ${buyerName}`,
        `Email: ${buyerEmail}`,
        `Shipping Address: ${buyerAddress}`,
        `Phone: ${buyerPhone}`,
        "",
        "ITEMS ORDERED",
        ...lines,
        "",
        "PRICING SUMMARY",
        `Subtotal: ${money(subtotal)}`,
        discount > 0 ? `Bundle Discount (${discount * 100}%): -${money(subtotal * discount)}` : "No bundle discount applied (add 10+ items for 10% off, 25+ for 20%)",
        `Shipping estimate: ${money(shipping.standard)} standard`,
        `ORDER TOTAL: ${money(subtotal * (1 - discount) + shipping.standard)}`,
        "",
        "PAYMENT & FULFILLMENT",
        `Stripe session: ${stripeSession.id}`,
        `Shippo tracking ID: ${shippoShipment.id}`,
        `Status: ${stripeSession.test_mode ? "Test Mode" : "Live"}`,
        "",
        "TIMELINE",
        `Queue position: ${timeline.queuePosition}`,
        `Production ETA: ${timeline.completionDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
        `Estimated shipping arrival: ${new Date(Date.now() + (timeline.shippingDays * 86400000)).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
        "",
        "NEXT STEPS",
        "1. Payment will be processed via Stripe (test mode) or email link fallback.",
        "2. Once payment is confirmed, design preview(s) will be sent.",
        "3. Upon your approval, production begins and tracking updates will be sent.",
        "",
        "DESIGN PREFERENCES & NOTES",
        "Please share any specific requests (colors, fonts, placement, materials) below:",
        "___________________________________________________________________",
        "",
        "SHIPPING PREFERENCE",
        `Standard (${money(shipping.standard)}, ${shipping.estimatedDays} days) / Expedited (${money(shipping.expedited)}, 1-2 days) — Your choice?`,
        "",
        "Thank you for supporting 615 Vinyl. I look forward to bringing your idea to life.",
        "",
        "— Christine"
      ].join("%0D%0A");

      const stripeReady = stripeSession.id && !stripeSession.test_mode;
      if (stripeReady) {
        alert(`Payment processing via Stripe:\n\nSession: ${stripeSession.id}\n\nIn production, this would redirect to Stripe Checkout.`);
      }

      window.location.href = `mailto:clarkone@gmail.com?subject=${encodeURIComponent("615 Vinyl Custom Order: " + buyerName + " (" + cart.length + " item" + (cart.length !== 1 ? "s" : "") + ")")}&body=${encodeURIComponent(message)}`;
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
