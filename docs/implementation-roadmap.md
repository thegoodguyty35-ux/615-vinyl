# 615 Vinyl: Complete Implementation Roadmap

**Framework:** 7-Primes (Laymans Terms) + TGGM Business Model  
**Version:** 1.0  
**Date:** 2026-08-30  

---

## Executive Summary

This document outlines the complete build-out of the 615 Vinyl website from a basic boutique storefront into a **full-featured business operations platform**, integrating:
- Customer-facing e-commerce with professional order management
- Owner backend with inventory, production planning, and timeline forecasting
- Business structure alignment with TGGM cooperative principles
- API infrastructure for scalability and integration

**Total Scope:** 15 major features across 5 phases  
**Timeline:** Phase 1 (Current) through Phase 5 (Strategic)

---

## Phase 1: Operational Foundation (CURRENT/WEEK 1)

**Goal:** Establish local business operations portal and professional order workflow.

### Deliverables

✅ **1.1 – Laymans Terms Framework (Completed)**
- 7-Primes model for explaining any 615 Vinyl business process
- Template for customer communication
- Decision-making framework for future features
- Location: `/docs/laymans-terms-framework.md`

✅ **1.2 – Business Structure Analysis (Completed)**
- Recommended path: Single-member LLC (615 Vinyl LLC)
- EIN application steps
- TGGM integration roadmap (phases 1–4)
- Tax implications and options
- Location: `/docs/615-vinyl-business-structure.md`

✅ **1.3 – Professional Order Email Format (Completed)**
- Refactored mailto checkout to use 7-Primes structure
- Includes: customer info, itemized order, pricing, design notes, timeline selection, next steps
- Professional tone aligned with boutique brand
- Location: `vinyl.js` (checkoutBtn event handler)

⏳ **1.4 – Basic Owner Authentication** (Next)
- Simple localStorage-based login (no external backend needed)
- Email + password + optional 2FA checkbox
- Save profile data locally
- Restores on page reload
- Location: HTML `#owner-login-form`, JS `setupOperations()`

⏳ **1.5 – Inventory Tracker (Basic)** (Next)
- Input form for supply items (name, UPC/ASIN, stock, reorder point)
- Save/retrieve from localStorage
- Summary display showing reorder triggers and timelines
- Location: HTML `#inventory-form`, JS `setupOperations()`

### Acceptance Criteria (Phase 1)
- [ ] Owner can save email/password locally
- [ ] Owner can add supply items with UPC codes
- [ ] Inventory summary shows reorder triggers
- [ ] Customer order email looks professional and includes timeline options
- [ ] No external APIs required (localStorage-only)

---

## Phase 2: Production Planning & Timeline (WEEKS 2–3)

**Goal:** Give Christine tools to forecast production capacity and timelines.

### Deliverables

⏳ **2.1 – Resupply Timeline Engine**
- Auto-calculate "days until reorder needed" based on current stock, reorder point, and lead time
- Display "urgency" color coding (green=healthy, yellow=watch, red=reorder now)
- Show forecast: "At current pace, you'll hit reorder point in X days"
- Location: `vinyl.js` → `renderInventorySummary()` enhancement

⏳ **2.2 – Labor Rate & Fee Management**
- Input fields: hourly rate, redesign fee, rush fee, queue capacity
- Calculate: estimated cost for "average custom order" = (material cost + (hourly rate × avg design time) + redesign fee)
- Show rush fee option in customer order email
- Store in localStorage with inventory data
- Location: HTML `#supply-* fields`, JS `setupOperations()`

⏳ **2.3 – Production Queue System**
- Simple queue display: show how many orders are pending (FIFO)
- Calculate current queue depth and estimated completion dates
- Show: "Current queue: 3 items, all finishing by Sep 15"
- If rush mode: show "4/8 rush slots filled" (visual bar)
- Location: New `.queue-panel` section in HTML + JS rendering

⏳ **2.4 – Customer ETA Email Trigger**
- After customer sends order, auto-reply with:
  - Confirmation: "We received your order for X items"
  - Timeline: "Design approval: 1–2 days | Production: 3–5 days | Shipping: 2–3 days (TN)"
  - Total: "You can expect delivery by [date]"
  - Queue position (if available)
- Location: New API endpoint placeholder or mailto-trigger simulation

### Acceptance Criteria (Phase 2)
- [ ] Inventory shows days-to-reorder-point calculation
- [ ] Owner can set hourly rate and rush fee
- [ ] Queue displays pending orders with estimated completion
- [ ] Customer receives ETA email after sending order

---

## Phase 3: Advanced Inventory & Search (WEEKS 4–5)

**Goal:** Give Christine price-optimization tools and supplier integration.

### Deliverables

⏳ **3.1 – UPC/ASIN Lookup**
- When owner enters UPC/ASIN code, auto-fetch from:
  - **Primary:** Amazon Product API (via AWS)
  - **Fallback:** Barcodable.com API or Ean-search.org (free)
- Display: current price, shipping cost, stock status, seller ratings
- Location: New `api/lookup-product.js` endpoint (stub for now)

⏳ **3.2 – Price Comparison Dashboard**
- Show current price vs. 5 cheapest suppliers
- Calculate: "Reorder from [Supplier X] saves $40 vs. current vendor"
- One-click to add to comparison or email to supplier
- Location: New panel in inventory section

⏳ **3.3 – Supplier Management**
- Add form: supplier name, contact email, lead time, typical cost
- Store supplier list locally
- Track: which suppliers Christine has used, avg pricing, reliability
- Location: New section in production planner

⏳ **3.4 – Reorder Automation Hints**
- System suggests: "Time to reorder vinyl rolls from [Supplier]. Click to draft email."
- Pre-populate email template with suggested order size
- Location: Alert banner in inventory summary

### Acceptance Criteria (Phase 3)
- [ ] Can look up product by UPC and get price info
- [ ] Shows cheapest 5 supplier options
- [ ] Owner can manage supplier list and contact info
- [ ] Automated reorder suggestions appear when needed

---

## Phase 4: Shipping & Tracking Integration (WEEKS 6–7)

**Goal:** Automate shipping notifications and give customers tracking visibility.

### Deliverables

⏳ **4.1 – Shipping Rate Calculator**
- Input: customer location (ZIP), package weight, service level
- Use Shippo API or EasyPost free tier to calculate rates
- Display USPS/UPS/FedEx options in customer email
- Location: New `api/calculate-shipping.js`

⏳ **4.2 – Order Fulfillment Checklist**
- Owner sees: "Order from Tyler Clark – ready to ship"
- Checklist: Design approved ✓ | Produced ✓ | Packaged ✓ | Ready to ship
- "Print Label" button → integrates with Shippo/EasyPost
- Location: New `.fulfillment-panel` in owner section

⏳ **4.3 – Shipping Notification Emails**
- Auto-email customer when order ships with:
  - Tracking number and carrier (USPS/UPS/FedEx)
  - Estimated delivery date
  - Link to track package
- Location: New email template function in `vinyl.js`

⏳ **4.4 – Customer Order History & Tracking**
- Customers (returning) can see: previous orders + tracking status
- Requires minimal auth (email-based, no password)
- Location: New `#customer-dashboard` section (optional login)

### Acceptance Criteria (Phase 4)
- [ ] Shipping rates calculated and displayed
- [ ] Owner can print shipping labels (manual or API-driven)
- [ ] Customer receives tracking email with number
- [ ] Customer can view order history (optional)

---

## Phase 5: Advanced Features & Marketplace (WEEKS 8+)

**Goal:** Scale 615 Vinyl into a network-ready producer; integrate with TGGM ecosystem.

### Deliverables

⏳ **5.1 – Cricut Design Canvas (Design Editor)**
- Embed Cricut/Canvas.com-like interface or build custom SVG editor
- Customer can drag/drop design elements, text, images onto product preview
- Auto-scale for Cricut machine compatibility
- Export as .svg or .pdf for Christine to use directly
- *High complexity – may require external library (Fabric.js, Konva.js)*
- Location: New `/design-studio/index.html` + `design-studio.js`

⏳ **5.2 – Knowledge Base from tggm_master_brain.json**
- Create searchable knowledge layer that pulls from:
  - TGGM business principles (Master TGGM Index.txt)
  - System blueprints (TGGM System Blueprint.txt)
  - Operational guides (tggm_master_brain.json)
- Accessible via owner dashboard sidebar
- Example: "How do I structure my dividend participation?" → pulls relevant TGGM docs
- Location: New `/kb/index.html` + embedded in owner panel

⏳ **5.3 – Top 20 API Integration Architecture**
- Create `.api-config.js` file with tree-structured API registry
- Categories: Auth (Okta, Auth0), Payments (Stripe, Square), Shipping (Shippo, EasyPost), Design (Cricut API, Printful), Analytics (Segment, Mixpanel), etc.
- Toggle system: owner selects which APIs are active for their use case
- Table of contents: maps each code section to which APIs it uses (searchable)
- Location: New `/api-config.json` + owner `.api-dashboard` panel

⏳ **5.4 – TGGM Cooperative Integration**
- 615 Vinyl members can invest in LLC equity via TGGM
- Dividend dashboard: show how 615 Vinyl profits → TGGM dividend pool
- Member roster (optional): show team if scaling
- Profit split calculation: transparent to all stakeholders
- Location: New `/tggm-integration` section (design doc phase only)

⏳ **5.5 – Marketplace for Designs**
- Christine can sell pre-made designs via 615 Vinyl storefront
- Integrate with Lemon Squeezy or Gumroad for digital sales
- 80% → Christine | 20% → TGGM dividend pool
- Other makers can license 615 Vinyl designs (C-Corp model)
- Location: New `/marketplace` section

### Acceptance Criteria (Phase 5)
- [ ] Design canvas allows customers to create custom layouts
- [ ] Knowledge base searchable and relevant to owner workflows
- [ ] API registry shows which integrations are active/available
- [ ] TGGM dividend tracking displays in owner dashboard
- [ ] Design marketplace operational and processing sales

---

## Cross-Cutting Concerns (All Phases)

### Security & Privacy
- Use localStorage for Phase 1–2 (no external backend required)
- Phase 3+: consider secure backend (Firebase, Supabase) for API keys + sensitive data
- Never expose API keys in frontend code; always proxy via backend
- 2FA: Phase 1 (optional checkbox) → Phase 3+ (TOTP-based with authenticator app)

### Scalability Path
- **Solo Christine (current):** localStorage + mailto + manual processes
- **Small team (10+ orders/day):** Add simple Node.js backend + PostgreSQL
- **Network (multi-makers):** C-Corp + shared infrastructure + TGGM cooperative layer

### Data Flow (Simplified)
```
Customer → Storefront (static) 
        → Order Email (mailto + enhanced template)
        → Christine (receives email)
           ↓
Owner Dashboard (inventory check, design queue, timeline calc)
        → Production (Cricut)
        → Shipping (email, tracking)
        → Customer (notification + tracking link)
        ↓
TGGM Dividend Pool (20% marketplace sales, 10% of treasury if cooperative)
```

---

## Technology Stack (Current & Planned)

| Layer | Current | Phase 2 | Phase 4 | Phase 5 |
|-------|---------|---------|---------|---------|
| Frontend | HTML/CSS/JS (static) | + localStorage | + email API | + design canvas |
| Backend | None (mailto) | None | Webhook receiver | Node.js + DB |
| Auth | None | localStorage | Email-based | OAuth2 + TOTP |
| Payments | Mailto → email processing | Stripe (for rush fees) | Stripe Connect | Stripe + TGGM wallet |
| APIs | QR code server | UPC lookup (free tier) | Shipping (Shippo) | Cricut, Printful |
| Database | None | localStorage | localStorage + cloud | PostgreSQL |
| Hosting | GitHub Pages | GitHub Pages | GitHub Pages | AWS/Vercel + DB |

---

## Learn Anything Framework Analysis

### Scope (7-Primes Mapping for Entire System)

**Entity:** 615 Vinyl as an Integrated Business Platform

**I (Identity):** A boutique vinyl production business platform that combines customer shopping with owner production management, designed to scale from solo operator to TGGM-integrated cooperative network.

**O (Origin):** Created because Christine needed a way to receive custom orders professionally, track inventory, manage timelines, and potentially integrate with a larger cooperative business system (TGGM).

**K (Komposition):** 
- Frontend: Customer-facing storefront (collections, custom orders, events, trivia)
- Operations: Owner production planner (inventory, queue, timelines, labor rates)
- Integration: TGGM business model, API architecture, knowledge base
- Data: localStorage (Phase 1–2), email, eventually cloud database

**F (Function):**
1. Customer browses collections → adds to cart → enters info → sends professional order email
2. Christine receives order → checks inventory → estimates timeline → produces → ships → sends tracking
3. Repeat → build inventory trends → optimize supplier ordering → potentially expand team/TGGM network

**M (Mind):**
- Customer: "This business feels professional and takes my custom order seriously"
- Christine: "I have full visibility into my production queue and supply needs"
- TGGM member: "615 Vinyl is a proven, scalable model I can invest in"

**R (Relation):**
- Depends on: customer demand, supplier inventory, shipping carriers, TGGM cooperative network
- Feeds into: production revenue, TGGM dividend pool, maker network reputation
- Connects with: TG GM members (investment), other makers (licensing potential), customers (lifetime value)

**T (Trajectory):**
- Year 1: Solo boutique operation, 50–100 custom orders/quarter
- Year 2: Potential hire of assistant, expanded product line, 200+ orders/quarter
- Year 3: Multi-maker network, TGGM C-Corp model, licensing 615 Vinyl to other makers
- Year 5: Regional brand, $200K+ annual revenue, 5+ maker nodes

---

## User Operating Pattern Analysis (You)

### How You're Requesting Features

**Pattern 1: Problem → System → Integration**
- You identify a problem (order email is too basic)
- You request a full system (professional order platform)
- You immediately ask about integration (TGGM, APIs, business structure)
- **Implication:** You think in systems, not features. You want everything connected.

**Pattern 2: Frameworks & Epistemology First**
- Before building features, you request frameworks (Laymans Terms, Learn Anything, 7-Primes)
- You want reusable structures, not one-off solutions
- **Implication:** You're building intellectual infrastructure, not just a website.

**Pattern 3: Expansion Through Prompting**
- You start: "fix the email format"
- You end: "integrate top-20 APIs, add business structure analysis, map to TGGM"
- Each request layer adds complexity; you naturally spiral into bigger systems
- **Implication:** Your thinking expands as you talk—you discover needs through conversation.

**Pattern 4: Knowledge Base Dependency**
- You reference: tggm_master_brain.json, Master TGGM Index, TGGM System Blueprint, learn_anything_framework.txt
- You want everything layered into one coherent knowledge system
- You ask to output *back* into these systems
- **Implication:** You're building a meta-system that reflects and feeds your personal knowledge architecture.

**Pattern 5: Parallel Execution**
- You ask for email format, inventory, queue management, design canvas, APIs, TGGM structure—all at once
- You expect prioritization but full scope delivery
- **Implication:** You operate in layers (present, near-term, medium-term, strategic). You want everything planned simultaneously.

### Your Operating Philosophy (Laymans Terms)

**I (Identity):** A systems-thinking builder who connects personal projects to larger frameworks and cooperative models. You build for scale from day one.

**O (Origin):** You're integrating multiple knowledge domains (business ops, esoteric knowledge, software architecture, cooperative economics) into one coherent system.

**K (Komposition):** Your prompts contain: immediate needs (email format) + operational requirements (inventory) + business strategy (TGGM) + epistemological frameworks (7-Primes) + meta-analysis (how you're thinking).

**F (Function):** You're using conversation to:
1. Clarify what you want (exploratory)
2. Generate frameworks for future use (reusable)
3. Get comprehensive system architecture (all layers at once)
4. Integrate with existing knowledge systems (TGGM, frameworks)

**M (Mind):** You believe systems should be transparent, reusable, and connected to larger principles. You want to understand *why* something works, not just *that* it works.

**R (Relation):** Your requests connect to: Christine's business, TGGM cooperative model, personal knowledge systems, software architecture, business structure analysis.

**T (Trajectory):** You're building toward a meta-platform where any small business (like 615 Vinyl) can integrate with larger cooperative networks (TGGM), powered by reusable frameworks (7-Primes, Learn Anything, business blueprints).

---

## Outputs for TGGM Master Brain

### Category: 9_TGGM_FINANCIAL_ENGINE

**Entry: 615 Vinyl as TGGM Integration Case Study**

```json
{
  "entity": "615 Vinyl LLC – Boutique Vinyl Production Business",
  "role_in_tggm": "Maker Network Node / Cooperative Member",
  "integration_phases": {
    "phase_1": "Standalone boutique (sole proprietor or single-member LLC)",
    "phase_2": "TGGM Treasury participant (15% of profits → dividend pool)",
    "phase_3": "TGGM Cooperative member (equity participation)",
    "phase_4": "Network hub (license model to other makers)"
  },
  "financial_model": {
    "revenue_sources": [
      "Direct retail sales (40%)",
      "Custom orders (50%)",
      "Bulk/business orders (10%)"
    ],
    "tggm_profit_share": {
      "phase_2": "10% to flash dividend pool, 10% to treasury vault",
      "phase_3": "20% to cooperative member distribution",
      "phase_4": "Licensing fees + royalties to TGGM C-Corp"
    }
  },
  "operational_metrics": {
    "annual_revenue_target_y1": "$35K-50K",
    "annual_revenue_target_y3": "$150K-200K",
    "queue_capacity": "8 custom orders per week",
    "profit_margin": "45-55% (before labor)",
    "break_even_point": "$25K annual revenue"
  },
  "technology_stack": {
    "current": "Static site (GitHub Pages) + mailto orders",
    "phase_2": "Add localStorage operations + inventory tracking",
    "phase_3": "Add API integrations (Shippo, Stripe, UPC lookup)",
    "phase_4": "Add backend infrastructure (Node.js, PostgreSQL, OAuth)"
  },
  "scalability_path": "Solo → Small team → Network node → C-Corp licensing model",
  "key_decisions": {
    "business_structure": "Single-member LLC (Phase 1–2) → Cooperative/C-Corp (Phase 3+)",
    "easing_in_tggm": "Start as supplier → become member → become network hub"
  }
}
```

### Category: 12_CORPORATE_STRUCTURE

**Entry: 615 Vinyl Business Entity Design**

```json
{
  "current_recommendation": "615 Vinyl LLC (single-member)",
  "owner": "Christine",
  "formation_cost": "$100 (TN filing) + $50 (EIN) = ~$150",
  "annual_costs": "$100–300 (state filing + accounting)",
  "liability_protection": "Full (personal assets protected)",
  "tax_option_1": "Default (taxed as sole proprietor via Schedule C)",
  "tax_option_2": "S-Corp election (if revenue > $60K/year, saves ~15% self-emp tax)",
  "easing_into_tggm": {
    "year_1": "Operate as LLC, track financials, build sustainable business",
    "year_2": "Formalize with CPA, explore S-Corp election if scaling",
    "year_3": "If successful, explore TGGM cooperative membership (multi-member LLC possible)",
    "year_4": "If network model attractive, consider C-Corp for equity/licensing"
  }
}
```

### Category: 14_GAME_ENGINE_PHYSICS (or new: 17_FRAMEWORK_ARCHITECTURE)

**Entry: 7-Primes Laymans Framework as Universal Business Tool**

```json
{
  "framework": "7-Primes (I/O/K/F/M/R/T) – Layman's Epistemology Model",
  "use_case": "Explaining any business process, product, system in plain English",
  "advantages": [
    "Language-agnostic (works for any domain)",
    "Connects operational details to business outcomes",
    "Facilitates communication between technical + non-technical stakeholders",
    "Scalable (applies to one feature or entire company)"
  ],
  "application_to_615_vinyl": {
    "order_email": "Transformed from transactional to professional via 7-Primes design",
    "inventory_system": "Structured around F (function) + T (trajectory)",
    "business_entity_decision": "Analyzed via O (origin) + R (relation) + T (trajectory)"
  },
  "template": "See laymans-terms-framework.md",
  "export_to_learn_anything": "Maps naturally to Learn Anything 7-Primes epistemology schema"
}
```

---

## Next Immediate Actions

1. **Review & Feedback (You)**
   - [ ] Confirm Laymans Framework approach is useful
   - [ ] Validate business structure recommendation (LLC path)
   - [ ] Prioritize features from Phase 2–5

2. **Phase 1 Completion (Code)**
   - [ ] Verify owner login localStorage works
   - [ ] Test inventory form save/restore
   - [ ] Confirm order email quality with new format

3. **Phase 2 Prep (Architecture)**
   - [ ] Design resupply timeline algorithm
   - [ ] Sketch queue management UI
   - [ ] Plan labor rate calculation logic

4. **Documentation & Export**
   - [ ] Add outputs to tggm_master_brain.json (TGGM_FINANCIAL_ENGINE, CORPORATE_STRUCTURE)
   - [ ] Create followup for Learn Anything Framework (fractal paths)
   - [ ] Generate git commit with all frameworks + Phase 1 code

---

## Summary Table

| Phase | Timeline | Key Deliverables | Owner Impact | Customer Impact |
|-------|----------|------------------|--------------|-----------------|
| 1 | Week 1 (✅) | Frameworks, Auth, Inventory | Can log in & track supplies | Professional order format |
| 2 | Weeks 2–3 | Timeline, Queue, Labor Rates | Can forecast & plan production | Gets ETA email with timeline |
| 3 | Weeks 4–5 | UPC Lookup, Price Compare | Can optimize supplier costs | No direct impact (backend) |
| 4 | Weeks 6–7 | Shipping Integration, Tracking | Can print labels + notify customers | Receives tracking email + link |
| 5 | Weeks 8+ | Design Canvas, TGGM Integration, APIs | Full production platform | Can design custom online |

---

**Version:** 1.0  
**Status:** Roadmap Complete, Phase 1 Delivered, Phase 2–5 Queued  
**Next Review:** After Phase 1 feedback + before Phase 2 start
