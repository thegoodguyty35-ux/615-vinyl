# 615 Vinyl: Top-20 API Integration Architecture
## Tree-Structured Reference with Toggle System

**Generated:** 2026-08-30  
**Purpose:** Strategic map of which top APIs fit which 615 Vinyl systems  
**Implementation:** Phases 2–5 (Phase 1 needs none)  

---

## 🌳 API Integration Tree (Hierarchical)

```
615 VINYL API ECOSYSTEM
│
├─ 🔐 AUTHENTICATION & SECURITY
│  ├─ Auth0 (OAuth2 + JWT management)
│  ├─ Okta (Enterprise identity + SAML)
│  ├─ Supabase (Auth + PostgreSQL bundled)
│  └─ Firebase Authentication (Easy setup, free tier)
│
├─ 💳 PAYMENTS & FINANCIAL
│  ├─ Stripe (Payments + Connect for multi-party)
│  ├─ Square (POS + online payments)
│  ├─ Stripe (Embedded Checkout + Billing)
│  └─ Circle API (USDC crypto payments, future)
│
├─ 📦 SHIPPING & LOGISTICS
│  ├─ Shippo (Multi-carrier label printing)
│  ├─ EasyPost (Shipping rate comparison)
│  ├─ USPS/UPS/FedEx direct APIs (Carrier-specific)
│  └─ Track.trace.api (Real-time package tracking)
│
├─ 🏷️ PRODUCT & INVENTORY DATA
│  ├─ Barcodable.com API (UPC/EAN lookup)
│  ├─ Ean-search.org (Free UPC lookup)
│  ├─ Amazon Product API (Retail pricing, supplier data)
│  ├─ Shopify API (Product data if integration)
│  └─ Printful API (Print-on-demand integration, future)
│
├─ 🎨 DESIGN & PRODUCTION
│  ├─ Cricut API (Design space, machine control, future)
│  ├─ Canvas.com API (Design canvas, if embedded)
│  ├─ Printful API (Production workflow)
│  ├─ Shopify Design API (Template system)
│  └─ OpenAI API (AI design suggestions, future)
│
├─ 📧 COMMUNICATION & EMAIL
│  ├─ SendGrid (Email delivery at scale)
│  ├─ Mailgun (Email + SMS)
│  ├─ Twilio (SMS + phone notifications)
│  └─ PostMark (Transactional email reliability)
│
├─ 💹 BUSINESS INTELLIGENCE & DATA
│  ├─ Stripe Reporting (Financial dashboards)
│  ├─ Segment (Event tracking, analytics)
│  ├─ Mixpanel (User behavior analytics)
│  ├─ Tableau/Metabase (Data visualization)
│  └─ Google Analytics (Web traffic tracking)
│
└─ 🤝 INTEGRATION & AUTOMATION
   ├─ Zapier (Low-code workflow automation)
   ├─ Make (Advanced automation, formerly Integromat)
   ├─ n8n (Self-hosted automation)
   └─ Airtable API (Flexible database + automation)
```

---

## 📋 Phase-by-Phase API Needs

### PHASE 1 (Week 1 – Current)
**Status:** ✅ Complete (no APIs needed)
- localStorage only
- mailto for orders
- GitHub Pages for hosting
- Free QR code server (qrserver.com)

**Cost:** $0/month

---

### PHASE 2 (Weeks 2–3): Production Planning
**New APIs Needed:** None (can stay localStorage)
**Optional APIs for Enhancement:**
- **SendGrid** (~$20/month): Auto-send customer ETA emails after order
- **Segment** (free tier): Track customer behavior for insights

**Cost:** $0–20/month

---

### PHASE 3 (Weeks 4–5): Supplier Optimization
**Required APIs:**
- **Barcodable.com or Ean-search.org** (FREE tier): UPC/EAN lookup
- **Amazon Product API** (Free tier, but requires approval): Get current prices
- **Airtable API** (FREE tier if <1000 records): Store supplier data

**Optional APIs:**
- **Segment** (track supplier queries)
- **Zapier** (auto-email suppliers for price checks)

**Cost:** $0–50/month (Airtable if upgrading)

---

### PHASE 4 (Weeks 6–7): Shipping Integration
**Required APIs:**
- **Shippo** (~$50–100/month): Multi-carrier label printing + tracking
- **SendGrid or Mailgun** (~$20–30/month): Shipping notification emails

**Optional APIs:**
- **Track.trace.api** (Free tier): Real-time tracking enrichment
- **Stripe** (if adding rush fee payments)

**Cost:** $70–130/month

---

### PHASE 5 (Weeks 8+): Scale Features
**Required APIs:**
- **Auth0 or Firebase** (~$30–100/month): Customer + owner authentication
- **Supabase** (~$50–200/month): PostgreSQL backend + real-time features
- **Stripe Connect** (~$30/month): Multi-party payments
- **SendGrid** (upgraded ~$50+/month): High-volume email

**Optional (Depending on Features):**
- **OpenAI API** (~$10–50/month): AI design suggestions
- **Cricut API** (if real integration): Direct machine control
- **Printful API** (if print-on-demand): Production outsourcing
- **Segment/Mixpanel** (~$20–100/month): Analytics

**Cost:** $200–500+/month

---

## 📊 API Reference Table

| API | Provider | Cost | Phase | Use Case | Priority |
|-----|----------|------|-------|----------|----------|
| **Auth0** | Auth0 | $30–100/mo | 5 | OAuth2, multi-factor auth | High |
| **Firebase Auth** | Google | Free–$0.06/auth | 5 | Simple auth + real-time | High |
| **Supabase** | Supabase | $50–200/mo | 5 | PostgreSQL + auth bundled | High |
| **Stripe** | Stripe | 2.9% + $0.30 | 4–5 | Payment processing | Critical |
| **Shippo** | Shippo | $50–100/mo | 4 | Multi-carrier shipping | High |
| **SendGrid** | Twilio | $20–100/mo | 2–4 | Email at scale | High |
| **Barcodable** | Barcodable | Free | 3 | UPC lookup | Medium |
| **Amazon API** | AWS | Free tier | 3 | Product data + pricing | Medium |
| **Airtable API** | Airtable | Free–$20/mo | 3 | Database + automation | Medium |
| **Zapier** | Zapier | $20+/mo | 3–5 | Workflow automation | Medium |
| **Make** | Make | $10+/mo | 3–5 | Advanced automation | Medium |
| **Segment** | Segment | Free–$100/mo | 2–5 | Analytics + tracking | Low |
| **Mixpanel** | Mixpanel | Free–$100/mo | 5 | User behavior analytics | Low |
| **Twilio** | Twilio | Pay-as-you-go | 4–5 | SMS notifications | Low |
| **OpenAI** | OpenAI | $0.002–0.006/token | 5 | AI design suggestions | Low (nice-to-have) |
| **Cricut API** | Cricut | TBD | 5 | Machine control | Low (nice-to-have) |
| **Printful API** | Printful | Free | 5 | Print-on-demand | Low (alternative model) |

---

## 🎛️ API Toggle System (Implementation)

### How It Works

Create a `.api-config.js` file that acts as a master registry:

```javascript
// .api-config.js
export const API_REGISTRY = {
  enabled: {
    sendgrid: true,
    shippo: false,  // Set to true when Phase 4 ready
    stripe: false,
    supabase: false,
  },
  
  keys: {
    sendgrid: process.env.SENDGRID_API_KEY,
    shippo: process.env.SHIPPO_API_KEY,
    stripe: process.env.STRIPE_API_KEY,
  },
  
  endpoints: {
    sendgrid: "https://api.sendgrid.com/v3/mail/send",
    shippo: "https://api.goshippo.com",
    stripe: "https://api.stripe.com/v1",
  },

  modules: {
    // Phase 2
    emailNotifications: {
      provider: "sendgrid",
      status: "enabled",
      description: "Auto-send customer ETA emails"
    },
    
    // Phase 3
    upcLookup: {
      provider: "barcodable",
      status: "enabled",
      description: "Lookup UPC codes for supplier products"
    },
    
    // Phase 4
    shippingIntegration: {
      provider: "shippo",
      status: "disabled",  // Enable when ready
      description: "Print labels + track shipments"
    },
    
    // Phase 5
    authentication: {
      provider: "firebase",
      status: "disabled",
      description: "OAuth2 + multi-factor auth"
    },
  }
};

// Usage in code:
import { API_REGISTRY } from "./api-config.js";

if (API_REGISTRY.enabled.sendgrid) {
  // Call SendGrid
} else {
  // Fallback (mailto)
}
```

### Dashboard Example

**Owner can see:**
```
API Integration Dashboard
═══════════════════════════════════════

PHASE 2 (Current)
✅ Email Notifications (SendGrid) – ACTIVE
   └─ Status: Sending customer ETAs
   └─ Monthly: $20/mo

PHASE 3 (Next)
⏳ UPC Lookup (Barcodable) – READY
   └─ Status: Free tier, no setup needed
   └─ Estimated cost: $0/mo

🚫 Price Comparison (Amazon API) – NOT YET
   └─ Status: Awaiting AWS setup
   └─ Estimated cost: Free tier

PHASE 4 (Future)
🚫 Shipping Integration (Shippo) – DISABLED
   └─ Status: Can enable when Phase 4 starts
   └─ Estimated cost: $50–100/mo

PHASE 5 (Strategic)
🚫 Authentication (Firebase) – DISABLED
   └─ Status: Can enable when scaling
   └─ Estimated cost: Free–$0.06 per auth
```

---

## 🗺️ Code Architecture: Where Each API Lives

```
615-vinyl/
│
├─ api/
│  ├─ api-config.js (Master API registry + toggle system)
│  ├─ auth/
│  │  └─ auth-service.js (Auth0 or Firebase)
│  ├─ payments/
│  │  └─ stripe-service.js (Stripe integration)
│  ├─ shipping/
│  │  └─ shippo-service.js (Label printing + tracking)
│  ├─ email/
│  │  └─ sendgrid-service.js (Customer notifications)
│  ├─ inventory/
│  │  └─ upc-lookup-service.js (Barcodable API)
│  ├─ analytics/
│  │  └─ segment-service.js (Event tracking)
│  └─ automation/
│     └─ zapier-webhooks.js (Workflow triggers)
│
├─ backend/ (Phase 5+)
│  ├─ server.js (Node.js + Express)
│  ├─ database/
│  │  └─ migrations.sql (PostgreSQL via Supabase)
│  ├─ routes/
│  │  ├─ orders.js
│  │  ├─ inventory.js
│  │  ├─ shipping.js
│  │  └─ customers.js
│  └─ middleware/
│     ├─ auth.js (Auth0/Firebase verification)
│     └─ api-toggle.js (Toggle system enforcement)
│
└─ public/
   ├─ vinyl.js (Main app, calls API services)
   └─ vinyl.css
```

---

## 🔌 Integration Patterns

### Pattern 1: Fallback-Safe (No Backend Crash if API Fails)

```javascript
async function sendCustomerEmail(order) {
  if (API_REGISTRY.enabled.sendgrid) {
    try {
      await sendgridService.send(order);
    } catch (error) {
      console.log("SendGrid failed, fallback to mailto");
      fallbackMailto(order);
    }
  } else {
    fallbackMailto(order);
  }
}
```

### Pattern 2: Progressive Enhancement (Start Simple, Add APIs as Needed)

```javascript
// Phase 2: localStorage only
function saveOrder(order) {
  localStorage.setItem("orders", JSON.stringify(order));
}

// Phase 3: add UPC lookup
if (API_REGISTRY.enabled.upcLookup) {
  upcData = await upcLookupService.search(code);
}

// Phase 4: add shipping
if (API_REGISTRY.enabled.shipping) {
  rates = await shippoService.getRates(address);
}

// Phase 5: add auth + backend
if (API_REGISTRY.enabled.authentication) {
  user = await firebaseAuth.verifyIdToken(token);
}
```

### Pattern 3: Environment Variables (Secrets Stay Safe)

```bash
# .env (never commit)
SENDGRID_API_KEY=sg_...
SHIPPO_API_KEY=shippo_...
STRIPE_API_KEY=sk_...
FIREBASE_PROJECT_ID=...
```

```javascript
// .env.example (commit, show structure)
SENDGRID_API_KEY=your_key_here
SHIPPO_API_KEY=your_key_here
# ... etc
```

---

## 💰 Estimated Total API Costs

| Phase | APIs | Monthly Cost | Reason |
|-------|------|--------------|--------|
| 1 | None | $0 | localStorage + free services |
| 2 | SendGrid (optional) | $0–20 | Email notifications |
| 3 | UPC lookup + Airtable | $0–20 | Supplier data |
| 4 | Shippo + Email | $70–130 | Production scale |
| 5 | Auth + Backend + Analytics | $200–500+ | Full platform |

**Total Year 1:** $0–50 (Phases 1–3)  
**Total Year 2:** $100–200 (Phase 4)  
**Total Year 3+:** $200–500+ (Phase 5)

---

## 🚀 When to Add Each API

### Green Light (Add Now):
- ✅ SendGrid (Phase 2): Low cost, high value for customer experience
- ✅ Barcodable (Phase 3): Free tier, helps with supplier optimization

### Yellow Light (Add When Needed):
- 🟡 Shippo (Phase 4): Critical for scaling, wait until orders spike
- 🟡 Firebase/Auth0 (Phase 5): Only if multi-user access needed

### Red Light (Add Late or Optional):
- 🔴 OpenAI (AI suggestions): Nice-to-have, not essential
- 🔴 Cricut API (Machine control): Future integration, not urgent
- 🔴 Printful (Print-on-demand): Alternative model, not core path

---

## Quick Reference: API Decision Matrix

| Question | Answer | Implication |
|----------|--------|-------------|
| Do we need this NOW? | No | Phase 2–5 it (don't add today) |
| Is there a free tier? | Yes | Prioritize for testing |
| Is API critical for MVP? | No | Save for Phase 4–5 |
| Does it replace manual work? | Yes | Add sooner rather than later |
| Cost > 5% of revenue? | Yes | Question ROI |
| Complexity > 1 day setup? | Yes | Phase it in gradually |

---

## Export for Future Reference

This document can be:
1. **Bookmarked** — return to when planning Phase 2+
2. **Shared** — with contractors building backend
3. **Updated** — as new APIs are tested + added
4. **Automated** — turn into actual api-config.js

---

**Document Version:** 1.0  
**Status:** Architectural blueprint, ready for Phase 2+  
**Review When:** Starting Phase 3 (UPC lookup) or Phase 4 (Shipping)
