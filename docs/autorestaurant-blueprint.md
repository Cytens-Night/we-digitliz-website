# AutoRestaurant — Production blueprint
WeDigitlize | 8 October 2026

## Current status
The published /autorestaurant page is a responsive, interactive front-end showcase. Demo orders, chat, guest service requests, allergies, wayfinding, scheduled orders, prepayment, owner analytics and kitchen status are simulated in the current browser. They do not contact a real restaurant, model API, staff device or payment processor. Menu, floorplan, prices and Likya identity are illustrative and are not approved restaurant data.

## Customer journey
1. Before arrival: see menu, accessibility details, opening times; optionally reserve, preorder meals and drinks, order takeaway extras, select a collection/arrival slot, and prepay.
2. At table: signed table-specific QR code opens an instant mobile website. A personalised, warm digital host offers optional menu tips. Browsing and ordering always remain available without AI.
3. Food discovery: clear product photographs, categories, portion descriptions, verified cooking information, related dishes, upsells, combo value calculations, dietary and preference choices.
4. Food safety: select allergens and hide known-containing dishes, but NEVER guarantee the remainder are safe. Display approved allergens and cross-contact risk; escalate all allergy requests to trained staff before accepting or prepaying an order.
5. Service: kitchen display, live order stages, waiters and runners' queues, water/help requests, bill requests, complaints and staff handoff.
6. Venue navigation: optional guided map to toilets, verified accessible WC, entrance and facilities; do not invent routes or assume accessibility without on-site survey.
7. Payment: split bills, hosted card wallets and prepayment through approved merchant processor, refunds, receipt and POS reconciliation.
8. After visit: feedback, optional loyalty, digital gift cards, birthdays, optional consent-based preference memory, return offers.

## The digital host
Ground it strictly in a restaurant-approved, versioned knowledge base: menu, costs, dish modifiers, allergens, cross-contact procedures, verified provenance, cooking methods, hours, promotions and service policies. Short friendly conversation, cultural food storytelling, age-neutral accessible UX, genuinely helpful pairing suggestions, silly jokes and celebration features. Weather-related suggestions require an external feed and must state when unavailable. Never generate unverified allergy assurances, quality claims, ingredients, pricing or availability. Keep 'call staff' and 'browse menu' always visible.

## Accessibility and human choice
Plan for WCAG 2.2 AA testing: scalable text, high contrast, reduced motion, keyboard and screen-reader use, readable spacing, understandable ordering flow and multilingual support. Respect guest preferences rather than inferring age/disability. Guests without a smartphone or unable to use a QR must receive equivalent staff-led service. Ensure actual accessible routes are approved by the venue.

## Suggested architecture
- Showcase: existing Next.js + Netlify.
- Production: white-label Next.js guest portal and manager dashboard per restaurant.
- Backend: server-side order and payment validation and transaction-safe state transitions.
- Database: Supabase Postgres with tenant isolation and RLS.
- Realtime: durable restaurant order events, kitchen/tablet updates, staff acknowledgement, reconnect handling.
- AI: backend-only model gateway, restaurant-approved retrieval knowledge, escalation triggers, audit logs and spending caps.
- Payments: merchant-approved Stripe, Square, Dojo or another provider subject to current APIs, contracts, processing fees and onboarding.
- POS: per-vendor adapter and fallback, not automatic universal compatibility.
- Operations: staff authentication/MFA, reporting, versioned menus/allergens, backups, logging and alerts.
- Core data: restaurants, venues, tables, signed table sessions, categories, dishes, modifiers, ingredient and allergen versions, staff, roles, orders, order items, kitchen tickets, service calls, payments, refunds, bookings, loyalty, floorplans, consents and audit events.

## Safety and UK compliance
FSA 14 allergens and accurate information before ordering and when takeaway is delivered. Keep written evidence, approved recipes, supplier updates and cross-contact handling; never equate filtering with a safety guarantee. For a preordered restaurant meal, allergy information also needs discussion on the day. See https://www.gov.uk/government/publications/allergen-information-for-non-prepacked-foods-best-practice/allergen-information-for-non-prepacked-foods-best-practice
GDPR and PECR: minimal personal data, privacy notice, processors, retention, appropriate marketing consents, safe preference deletion and customer data rights. Use hosted/tokenised card payment rather than handling card numbers directly. Signed and expiring table sessions, server-calculated prices, webhook verification, rate limits, idempotent order creation and refunds, and audited roles.

## Illustrative WeDigitlize selling packages
- Essentials (menu, QR, basic CMS): £1,800–£3,000 setup; £59–£149/month.
- Connected (orders, staff/kitchen, insights): £4,000–£8,000 setup; £149–£399/month.
- Signature (grounded AI concierge, full journeys, integrations): from £10,000 setup; from £399/month plus metered AI.
Pricing is illustrative, not a validated industry benchmark. Custom POS integration, payment fees, AI model calls, photography, hardware, printed QR signs, VAT if applicable, training and support may be additional.

## Delivery phases
Phase 0: Restaurant interviews; menu, technology, allergens, accessibility, POS, payment provider, infrastructure and operations discovery.
Phase 1: Real QR session, accessible menu CMS, full backend, kitchen ticket system, waiter alerts, realtime updates, staff authentication and management dashboard.
Phase 2: Production merchant checkout, preorder calendar, collection takeaway extras, payment webhooks, bill splits, refunds and POS reconciliation.
Phase 3: Grounded AI host with verified menu knowledge, controlled allergy escalation, multilingual answers, preference consent and clear cost monitoring.
Phase 4: Verified indoor navigation, advanced personalisation, gift cards, rewards, bookings, multi-site deployment and weather-based recommendations.

## Critical launch checks
Ensure production ordering works on separate devices with refresh/reconnect, backend calculates all amounts, payments reconcile, ingredient matrices are current and signed off, allergy handoff works, staff know outage procedures, accessible ordering has been tested, QR codes resist tampering, menu unavailable items are handled, and guests can always request human help. Pilot a small number of tables with real staff before wider launch.

## Business case
Illustrative time redirected each month = orders/day × repetitive minutes/order × trading days ÷ 60. Do not claim guaranteed staffing reductions or exact return on investment; validate with actual pilot baselines.

## Live showcase
https://wedigitlize.com/autorestaurant
