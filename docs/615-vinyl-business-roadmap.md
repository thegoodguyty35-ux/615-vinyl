# 615 Vinyl Business Roadmap

## Current state
The site is functioning as a boutique storefront with:
- product gallery and collection filtering
- custom design request form
- cart and checkout email flow
- event listing and trivia interaction
- QR code and brand presence

## What is already implemented
- storefront design and branding
- product browsing and cart checkout UX
- custom quote email generation
- event listing and promotional elements
- wheel interaction and small brand engagement feature
- brand click behavior that keeps the user in place without a harsh refresh

## What must be built next as a true business system
### 1. Authentication and user account system
- customer signup
- login flow
- 2-step verification
- saved profile data
- access control for owner/admin features

### 2. Inventory and supply database
- items in inventory
- UPC / ASIN tracking
- supplier source and cheapest-buy comparison
- reorder thresholds
- material usage logging

### 3. Production and queue management
- custom work item queue
- design review status
- production time estimates
- rush processing and queue limits
- redesign fee logic
- labor-rate tracking per item type

### 4. Pricing and estimate engine
- base charge per item type
- hourly labor rate
- redesign fee
- rush fee
- bulk discount tiers
- estimate generation for customer and owner

### 5. Timeline and ETA logic
- expected completion date
- shipping ETA by state
- forecasted restock date based on usage and lead time
- warning thresholds before stock runs low

### 6. Fulfillment and shipping updates
- USPS / UPS / FedEx tracking IDs
- update emails to customers
- shipping confirmation message
- final delivery note

### 7. Legal and operational structure
- EIN planning
- LLC / sole prop / corporation comparison
- trust alignment for IUL and long-term strategy
- tax, compliance, and record-retention approach

## Recommended architecture
- frontend: current HTML/CSS/JS site
- backend: auth, orders, inventory, queue, pricing, tracking
- database: structured storage for customers, inventory, orders, and supplier data
- automation: email notifications, reordering alerts, shipment status updates
- APIs: shipping, supplier search, UPC / ASIN lookup, tax or accounting tools

## Implementation order
1. customer account + login
2. order database + order statuses
3. production queue and pricing engine
4. inventory forecasting and reorder alerting
5. shipping updates and notifications
6. business/legal and tax structuring

## Summary
The current site is the right storefront layer, but the next stage is the operational system beneath it. That operational layer is what turns the business into a scalable, trackable custom production workflow rather than a one-page sales page.
