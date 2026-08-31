# Laymans Terms Framework: Reusable 7-Primes Model

**Purpose:** A plain-language guide to explaining ANY business process, technology, or system using the 7-Primes epistemology schema (I/O/K/F/M/R/T).

**Best For:** 
- Documentation that non-technical stakeholders can understand
- System design that connects operational steps to larger business goals
- Teaching or training without jargon
- Creating audit trails that track "why" decisions were made

---

## The 7 Primes in Plain English

### **I – Identity (What is it?)**
*The essence, name, and core nature of the thing.*

**In Plain Terms:**
- What would you call this in a sentence?
- What does it do right now?
- What makes it different from similar things?

**615 Vinyl Example:**
"615 Vinyl is a small-batch, custom vinyl decal business that produces handmade orders and manages its own inventory and queue."

---

### **O – Origin (Where did it come from?)**
*The history, founding reason, and initial conditions.*

**In Plain Terms:**
- Why was this created?
- What problem was it solving?
- Who started it and when?

**615 Vinyl Example:**
"Christine started 615 Vinyl to sell handmade vinyl decals at Nashville markets. She wanted to keep production small-batch, personal, and high-quality."

---

### **K – Komposition (What is it made of?)**
*The physical or logical components and how they fit together.*

**In Plain Terms:**
- What are the main parts?
- How do the parts connect?
- What materials or tools are involved?

**615 Vinyl Example:**
"615 Vinyl has three main parts: (1) the storefront (where customers see and order decals), (2) the operations dashboard (where Christine tracks inventory and queue), and (3) the payment & shipping layer (Stripe, Shippo). All parts talk to each other via shared data in localStorage and APIs."

---

### **F – Function (What does it do?)**
*The actions, processes, and outcomes.*

**In Plain Terms:**
- What are the main steps?
- What does it produce?
- What problems does it solve?

**615 Vinyl Example:**
"615 Vinyl takes a customer order → queues it → shows Christine when to produce it → emails the customer their ETA → processes payment → ships the decal. It also helps Christine reorder supplies by showing her which items are running low."

---

### **M – Mind (How is it aware/conscious?)**
*The observer perspective, decision-making, and emergent awareness.*

**In Plain Terms:**
- Who or what "makes decisions" inside this system?
- What does it "know" about itself?
- Who is watching or evaluating it?

**615 Vinyl Example:**
"Christine 'watches' her queue and inventory dashboard. The system 'knows' how many days until she needs to reorder (by calculating stock vs. order velocity). Customers 'watch' their order status in real-time. The analytics panel 'tracks' revenue and order trends, alerting Christine when patterns change."

---

### **R – Relation (How does it connect to other things?)**
*Dependencies, partnerships, and how it fits into larger ecosystems.*

**In Plain Terms:**
- Who does this work with?
- What does it depend on?
- What systems feed into or out of it?
- How does it serve or support something larger?

**615 Vinyl Example:**
"615 Vinyl depends on Etsy/Shopify competitors, but differs by offering custom orders. It connects to Stripe (payment), Shippo (shipping), supplier catalogs (for reordering), and could integrate into the TGGM cooperative (for member finance & growth)."

---

### **T – Trajectory (Where is it heading?)**
*Growth, evolution, potential futures, and long-term vision.*

**In Plain Terms:**
- How might this grow?
- What capabilities could it add?
- What are the natural next steps?
- What is the "end state" or long-term vision?

**615 Vinyl Example:**
"615 Vinyl can scale by: (1) hiring a second maker, (2) automating design approvals with AI, (3) opening a storefront location, (4) adding other product lines (tumblers, shirts), (5) franchising the model to other makers under the TGGM umbrella. Long-term vision: a cooperative network of 10–20 micro-producers using shared infrastructure."

---

## How to Use This Framework for Any System

### Step 1: Write a Rough "I" (One sentence)
```
[Thing] is a [type] that [does what].
```

### Step 2: Fill in O, K, F, M, R, T (One paragraph each)
- O: "Founded in [when/why]..."
- K: "Made of [parts/components]..."
- F: "Does these main actions: [action 1], [action 2]..."
- M: "[Actor/system] decides/tracks [what]..."
- R: "Works with [partners/systems]..."
- T: "Next steps are [capability 1], [capability 2]..."

### Step 3: Check Consistency
- Does K (components) support F (function)? ✓
- Does O (origin) explain I (identity)? ✓
- Does M (mind) make sense with R (relations)? ✓
- Does T (trajectory) flow from O + F? ✓

### Step 4: Simplify Further
- Remove jargon
- Replace technical terms with everyday language
- Use examples
- Add a metaphor or comparison

---

## Applied Example: 615 Vinyl Order Flow

**Using the Framework to explain "What happens when a customer orders a decal?"**

| Prime | Simple Explanation |
|-------|---|
| **I** | An order is a customer request for a custom vinyl decal, tracked from inquiry to delivery. |
| **O** | Orders originated from Christine's first market booth sales; now they come online via the storefront. |
| **K** | An order has: customer details (name/email/address), design specs (text/size/color), price data (quantity/bundle discount), and status (pending/production/shipped). |
| **F** | The order: (1) arrives via email, (2) gets added to Christine's queue, (3) displays an ETA to the customer, (4) triggers payment, (5) gets produced, (6) ships with tracking. |
| **M** | Christine watches the queue dashboard and decides production priority. The system calculates ETAs. The customer sees their order status in real-time. |
| **R** | The order connects the customer → Christine → Stripe (payment) → Shippo (tracking) → USPS/UPS (delivery). |
| **T** | Future: orders could auto-approve designs with AI, auto-route to sub-contractors, batch-ship with other makers under TGGM. |

---

## When to Apply This Framework

✅ **Refining documentation** – explains a feature to stakeholders  
✅ **Training new team members** – shows "why" the system works this way  
✅ **Strategic planning** – reveals missing pieces (M, R, T)  
✅ **Debugging problems** – if F (function) breaks, check K (composition)  
✅ **Building business cases** – shows how O (origin) connects to T (trajectory)  
✅ **Creating audit trails** – documents decisions at each prime  

---

## Quick Template (Copy & Use)

```
## [System Name] – 7-Primes Summary

**I (Identity):**  
[One sentence: what is it?]

**O (Origin):**  
[Why was it made? Who started it?]

**K (Komposition):**  
[What are the main parts?]

**F (Function):**  
[What does it do step-by-step?]

**M (Mind):**  
[Who/what decides or tracks?]

**R (Relation):**  
[What does it connect to?]

**T (Trajectory):**  
[Where is it heading?]
```

---

## Key Principle

> **The 7-Primes framework works because it asks the same question a curious 8-year-old asks: "What is it? Where did it come from? What's it made of? What does it do? How does it know to do that? How does it fit in with other things? Where is it going?"**

Use plain language. Avoid jargon. Connect each prime to the others. You'll end up with documentation that lasts.
