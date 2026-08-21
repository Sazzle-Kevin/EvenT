# Liquid Glass Header/Footer Pattern

## Overview
Apply the liquid-glass (kokonutui) visual effect to transparent header and footer components so video backgrounds show through.

## Core Pattern
```jsx
<header className="relative">
  {/* SVG Filter for liquid glass effect */}
  <svg aria-hidden="true" className="absolute inset-0 h-0 w-0">
    <filter id="liquid-glass-filter-header" ...>
      ...feTurbulence, feGaussianBlur, feDisplacementMap...
    </filter>
  </svg>

  {/* Content with backdrop-filter */}
  <div
    className="relative z-10 ..."
    style={{ backdropFilter: "url(#liquid-glass-filter-header)" }}
  >
    {/* Content goes here - NO background color! */}
  </div>
</header>
```

## Key Rules
1. **No background colors** on the container div (no bg-white, no bg-white/XX)
2. Use `relative` positioning with `z-10` for content layering
3. Apply `backdropFilter` referencing the SVG filter
4. Use GLASS_EFFECT (shadow-based) for depth, not colors

## Pitfalls
- Setting bg-white anywhere in the component hierarchy will block the video background
  → User feedback: "header und footer sind immer noch ivory, sie sollten transparent sein"
- Carousel nav buttons often have bg-white - remove those too