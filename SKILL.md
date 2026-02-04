---
name: voiceflow-widget-modifier
description: "Modify and customize the Voiceflow chat widget CSS and behavior. Use this skill when the user wants to customize the Voiceflow widget appearance, fix scrollbar visibility, change colors, modify fonts, or any other visual/CSS modification to the embedded Voiceflow chat widget. CRITICAL - The widget uses Shadow DOM, so styles must be injected into the shadow root, not the main document."
---

# Voiceflow Chat Widget Modifier

## Critical Architecture Knowledge

### Shadow DOM Structure

The Voiceflow chat widget uses **Shadow DOM** for style encapsulation:

```
document
└── #voiceflow-chat (Shadow Host)
    └── shadowRoot (open)
        └── .vfrc-widget
            └── .vfrc-chat
                └── .vfrc-chat-dialog__container (scrollable message area)
                    └── messages...
```

**Key implication**: CSS injected into the main document (`document.head`) will NOT affect the widget. All styles MUST be injected into the shadow root.

### Class Naming Convention

| Pattern | Stable? | Example | Notes |
|---------|---------|---------|-------|
| `vfrc-*` | ✅ Yes | `.vfrc-chat-dialog__container` | Semantic BEM classes, safe to use |
| Short alphanumeric | ❌ No | `.s9t60i1`, `.ck2fbe0` | CSS-in-JS generated, changes per build |

**Always use `vfrc-*` selectors** for modifications that must persist across widget updates.

### Key Stable Selectors

```css
.vfrc-widget                    /* Widget root container */
.vfrc-chat                      /* Chat dialog wrapper */
.vfrc-chat-dialog__container    /* Scrollable message area */
.vfrc-message                   /* Individual message */
.vfrc-message--user             /* User messages */
.vfrc-message--assistant        /* Bot messages */
.vfrc-input                     /* Input field area */
.vfrc-button                    /* Buttons */
.vfrc-header                    /* Widget header */
.vfrc-header--actions           /* Header action buttons container */
.vfrc-header--button            /* Individual header button */
.vfrc-launcher                  /* Launcher button */
```

### Header Buttons Structure

The header contains 3 action buttons in `.vfrc-header--actions`:

| Position | nth-child | Icon | Function |
|----------|-----------|------|----------|
| 1 | `:nth-child(1)` | Speaker/Speaker-X | Audio mute toggle |
| 2 | `:nth-child(2)` | Circular arrow | Refresh/Reset chat |
| 3 | `:nth-child(3)` | X | Close widget |

**Note:** The mute button icon changes between speaker and speaker-with-X depending on mute state.

### Rendering Context

- **Standard embedding**: Widget uses Shadow DOM at `#voiceflow-chat`
- **Voiceflow /share/ pages**: Widget may render directly in main DOM (no Shadow DOM)

Scripts should check for both contexts:

```javascript
// Dual-context injection pattern
const shadowHost = document.getElementById('voiceflow-chat');
let targetRoot = document;

if (shadowHost && shadowHost.shadowRoot) {
  targetRoot = shadowHost.shadowRoot;
}

// Now use targetRoot for queries and style injection
```

## CSS Injection Pattern

Use `scripts/inject-styles.js` as base template for any modification:

```javascript
const shadowRoot = document.getElementById('voiceflow-chat').shadowRoot;
const style = document.createElement('style');
style.id = 'vf-custom-styles';
style.textContent = `/* YOUR CSS */`;
shadowRoot.appendChild(style);
```

## Common Modifications

| Modification | Example | CSS Selector |
|--------------|---------|--------------|
| Force scrollbar | `examples/force-scrollbar` | `.vfrc-chat-dialog__container` |
| Hide close button | `examples/hide-close-button` | `.vfrc-header--actions .vfrc-header--button:nth-child(3)` |
| Hide refresh button | *use template* | `.vfrc-header--actions .vfrc-header--button:nth-child(2)` |
| Hide mute button | *use template* | `.vfrc-header--actions .vfrc-header--button:nth-child(1)` |
| Custom colors/fonts | `scripts/inject-styles.js` | *customize as needed* |

Each example includes:
- `.js` - Injection script for testing
- `.md` - Full documentation with BASE64 and external CSS embed examples

## Discovering New Selectors

When targeting elements not listed above:

```javascript
const shadowRoot = document.getElementById('voiceflow-chat').shadowRoot;
const el = shadowRoot.querySelector('YOUR_SELECTOR');
console.log({
  stable: el.className.split(' ').filter(c => c.startsWith('vfrc-')),
  dynamic: el.className.split(' ').filter(c => !c.startsWith('vfrc-'))
});
```

## Workflow

**Before each new modification search:**

1. **Refresh the page** (fresh start - clears any previous injected styles)
2. Wait for chat widget to open (usually opens automatically on /share/ pages)
   - **Fallback:** If widget doesn't open, click "Test your agent" button
3. Access Shadow DOM: `document.getElementById('voiceflow-chat').shadowRoot`
4. Find target element using DevTools (Elements > #voiceflow-chat > #shadow-root)
5. Use only `vfrc-*` stable selectors
6. Test CSS injection in browser console
7. Take screenshot to verify the modification works
8. Add validated code to the skill scripts
