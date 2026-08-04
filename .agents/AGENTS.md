# Project Design Standards & Principles (AGENTS.md)

This codebase follows high-taste, anti-slop, impeccable design standards synthesized from:
- **Anthropic Frontend Design Skill** (Topic 32)
- **Taste Skill - Anti-Slop Framework** (Topic 18)
- **Impeccable Design Quality & Craftsmanship** (Topic 4)
- **shadcn/ui Composable Primitives & Design System** (Topic 6)

---

## 🎨 Core Design Rules & Principles

### 1. Distinctive Art Direction (Anti-Slop Discipline)
- **Never rely on generic AI defaults**: Avoid plain white/black cards, centered generic SaaS layouts, or uninspired stock gradients.
- **Brand Grounding**: HealthHack 2026 PRIS Cyber-Healthcare aesthetic.
  - Primary Background: Dark Teal Ink (`#041A1D`)
  - Primary Accent & HUD: Neon Cyan (`#63D2E5`) & Mint (`#30D6BC`)
  - Primary Conversion & Action CTA: PRIS Orange (`#FF6A00`)
  - Single Source of Truth Registration Dates: **15 สิงหาคม – 20 กันยายน 2569**

### 2. Typography Standard
- **Uniform Thai Typography**: Use **Noto Sans Thai** (`"Noto Sans Thai", sans-serif`) across ALL text elements (Headlines `h1-h6`, subheadings, paragraphs, buttons, input fields, labels, modals, and cards).
- **Code & Numeric Data**: Use **Space Mono** (`"Space Mono", monospace`) strictly for IDs, timestamps, and data values.

### 3. UX Workflow & Single Purpose
- **Registration Flow**: When clicking "สมัครแข่งขัน" or "สมัครแข่งขันตอนนี้", pop up the **คุณสมบัติของผู้เข้าแข่งขัน (Eligibility Criteria Modal)** exactly **1 time**.
- **Composability**: Follow `shadcn/ui` composable primitive design patterns with clean Tailwind CSS utility classes and CSS variables.

### 4. Impeccable Craftsmanship & Accessibility
- **Zero Design Drift**: Maintain consistent padding, border radius, colors, and font scales.
- **Accessibility**: Include ARIA roles (`role="dialog"`, `aria-expanded`), keyboard focus rings (`outline-2 outline-[#63d2e5]`), and `prefers-reduced-motion` for all background video and particle animations.
