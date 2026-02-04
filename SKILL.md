---
name: voiceflow-widget-modifier
description: "Modify and customize the Voiceflow chat widget CSS and behavior. Use this skill when the user wants to customize the Voiceflow widget appearance, fix scrollbar visibility, change colors, modify fonts, or any other visual/CSS modification to the embedded Voiceflow chat widget. CRITICAL - The widget uses Shadow DOM, so styles must be injected into the shadow root, not the main document."
---

# Voiceflow Chat Widget Modifier

## Requirements

**Claude Browser Extension Required**: This skill requires the Claude Browser extension (Claude in Chrome) to:
- Load the test URL and interact with the widget
- Execute JavaScript to discover selectors and inject CSS
- Take screenshots to verify modifications
- Test changes in real-time before updating skill files

Without the browser extension, you cannot properly test or develop widget modifications.

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
.vfrc-input-container           /* Input container wrapper */
.vfrc-chat-focus-ring           /* Focus ring overlay (for input focus styling) */
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
| Red focus border | `examples/input-focus-red-border` | `.vfrc-chat-focus-ring` |
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

## Key Architecture Findings

### Input Focus Ring

The input focus ring is **NOT** on `.vfrc-input-container` itself. It's rendered by a separate absolutely-positioned overlay element:

```
.vfrc-input-container
├── .vfrc-chat-focus-ring  ← Creates the focus ring via inset box-shadow
├── .vfrc-chat-input__container-inner
│   └── textarea.vfrc-chat-input
└── (buttons: mic, send)
```

The default blue focus ring (`rgb(57, 125, 255)`) is applied via:
```css
.vfrc-chat-focus-ring {
  box-shadow: rgb(57, 125, 255) 0px 0px 0px 2px inset;
}
```

To change the focus color, target `.vfrc-chat-focus-ring` with an inset box-shadow override.

### Test URL

Always use this URL for testing widget modifications:
```
https://creator.voiceflow.com/share/696e5862c51f60cfb9cdafca/development
```

## Workflow

**Use Claude Browser extension for all steps:**

1. **Navigate to test URL** using `mcp__Claude_in_Chrome__navigate`
   ```
   https://creator.voiceflow.com/share/696e5862c51f60cfb9cdafca/development
   ```
2. **Wait for widget to load** (2-3 seconds), take initial screenshot
3. **Discover selectors** using `mcp__Claude_in_Chrome__javascript_tool` to explore the DOM
4. **Inject test CSS** via JavaScript and verify with screenshot
5. **Iterate** until the modification works correctly
6. **Get user approval** by sharing the screenshot
7. **Update skill files** only after validation:
   - Add `.js` and `.md` files to `examples/`
   - Add HTML demo file to `assets/` (screenshots can't be saved directly from browser)
   - Update `SKILL.md` with key findings
   - Update `README.md` with new example

## Assets & Screenshots

The Claude Browser extension can capture screenshots for verification but **cannot save them directly to local files**. Instead:

1. **Create HTML demo files** in `assets/` that visually demonstrate the before/after effect
2. Use simple CSS to simulate the widget appearance
3. Name files descriptively: `{modification-name}-demo.html`

See `assets/input-focus-red-border-demo.html` for an example.
