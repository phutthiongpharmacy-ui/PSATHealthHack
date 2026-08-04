---
name: Cyber-Minimalist Monochrome
colors:
  surface: '#071617'
  surface-dim: '#071617'
  surface-bright: '#2d3c3d'
  surface-container-lowest: '#031011'
  surface-container-low: '#0f1e1f'
  surface-container: '#1a2025'
  surface-container-high: '#1e2c2e'
  surface-container-highest: '#283738'
  on-surface: '#d5e6e7'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#d5e6e7'
  inverse-on-surface: '#243334'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c1c7ce'
  on-secondary: '#2b3137'
  secondary-container: '#41474d'
  on-secondary-container: '#b0b6bd'
  tertiary: '#ffffff'
  on-tertiary: '#2b3136'
  tertiary-container: '#dde3ea'
  on-tertiary-container: '#5f656b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#dde3ea'
  secondary-fixed-dim: '#c1c7ce'
  on-secondary-fixed: '#161c21'
  on-secondary-fixed-variant: '#41474d'
  tertiary-fixed: '#dde3ea'
  tertiary-fixed-dim: '#c1c7ce'
  on-tertiary-fixed: '#161c21'
  on-tertiary-fixed-variant: '#41474d'
  background: '#071617'
  on-background: '#d5e6e7'
  surface-variant: '#283738'
  surface-low: '#161c21'
  outline-white: rgba(255, 255, 255, 0.1)
  grid-line: rgba(255, 255, 255, 0.03)
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The brand identity is rooted in a high-tech, futuristic aesthetic that blends **Minimalism** with subtle **Glassmorphism** and **Cyberpunk** undertones. It evokes a sense of security, precision, and clinical cleanliness, making it ideal for health-tech or security-focused applications.

The visual style is characterized by a strict monochromatic palette, punctuated by sharp typography and light-based depth. It avoids heavy traditional shadows in favor of ambient glows and "glass" surfaces. The interface feels like a sophisticated digital HUD (Heads-Up Display), prioritizing clarity and focus during critical user flows like authentication.

## Colors

The system employs a **Monochromatic Dark** palette. 

- **Primary:** Pure White (#FFFFFF) is reserved for high-emphasis actions, primary text, and active states.
- **Surface & Background:** Deep charcoals and near-blacks (#0E1419) provide the base, while tiered surfaces (low and container levels) create subtle structural separation.
- **Supporting:** Soft greys and "variant" teals (#B9CACB) are used for secondary information to maintain a low-noise environment.
- **Functional:** Overlays use low-opacity whites (10-20%) to create glass effects without introducing new hues.

## Typography

Typography is a three-way dialogue between **Sora** (Bold, geometric display), **Hanken Grotesk** (Clean, modern body), and **Space Mono** (Technical, data-driven labels).

- **Headlines:** Use Sora for a futuristic, confident look. Large displays benefit from tighter letter spacing.
- **Body:** Hanken Grotesk ensures high readability for instructional text.
- **Technical/Utility:** Space Mono is used for labels, timers, and "back" actions to reinforce the high-tech, developer-centric aesthetic. Always use all-caps for `label-caps` to emphasize the UI's systematic nature.

## Layout & Spacing

The layout follows a **Fixed Center-Grid** philosophy for focused tasks (like OTP entry) and a fluid 12-column grid for dashboard views. 

- **Grid:** A background 40px square grid provides a technical structural reference but does not strictly constrain element placement.
- **Rhythm:** An 8px base unit drives all spacing. 
- **Containment:** Content is typically housed in a max-width container (e.g., 512px for modals) to maintain focus. 
- **Margins:** 20px on mobile, scaling up to 64px on larger screens to provide breathing room and emphasize the minimalist aesthetic.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional drop shadows.

- **The Layering Logic:** 
  1. **Background:** Pure black or very dark grey with a 3% opacity white grid.
  2. **Surfaces:** Use `surface-low` with a 80% opacity and a high `backdrop-blur` (24px+).
  3. **Edge Highlights:** Instead of shadows, use 1px solid borders (`rgba(255, 255, 255, 0.1)`) or vertical linear gradients on the left edge of containers to simulate light catching a glass edge.
- **Interactive Elements:** Active inputs or primary buttons should feel "illuminated" rather than "raised."

## Shapes

The shape language is **Refined & Geometric**.

- **Default:** Most components use a base radius of 8px (`rounded-xl` in this specific scale).
- **Inputs/Buttons:** Slightly tighter rounding (4px) can be used for smaller interactive elements to keep them feeling precise.
- **Feature Elements:** Icons or status indicators may use full `rounded-full` (circle) shapes, but must be enclosed within a bordered surface to maintain the clinical aesthetic.

## Components

### Buttons
- **Primary:** Solid White background with Black text. All-caps typography with increased letter spacing. On hover, shift to a light grey (#E2E8F0); on active, scale slightly down (98%).
- **Ghost/Back:** No background, `Space Mono` text, with a directional icon that moves on hover.

### Input Fields (OTP/Standard)
- **Base:** Dark surface container with a 10% white border.
- **Focus:** 100% White border with a subtle 1px inner ring. 
- **Typography:** Centered, high-contrast `Sora` or `Space Mono` for data entry.

### Cards
- Always use `backdrop-blur-2xl`. 
- Borders should be thin and semi-transparent. 
- Internal padding is generous (minimum 32px) to support the minimalist feel.

### Progress Indicators (Step Indicators)
- Minimalist horizontal lines. Active steps are solid white; inactive steps are 20% white. Labels are small caps `Space Mono`.

### Icons
- Use Material Symbols (Outlined) with a consistent weight. Icons are almost always white or high-contrast grey.