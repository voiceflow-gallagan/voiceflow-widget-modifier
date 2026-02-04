# Voiceflow Widget Modifier

A Claude Code skill for customizing the Voiceflow chat widget CSS and behavior.

## Features

- **Shadow DOM aware**: Properly injects styles into the widget's shadow root
- **Stable selectors**: Uses `vfrc-*` class names that persist across widget updates
- **Ready-to-use examples**: Force scrollbar, hide buttons, square corners, and more
- **Production-ready**: Includes BASE64 and external CSS integration examples

## Requirements

- **Claude browser extension**: Must be installed in Chrome for this skill to work. The extension allows Claude to interact with web pages, inspect elements, and test CSS modifications in real-time.
  - [More info](https://claude.com/chrome)
  - [Install Claude browser extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)

## Installation

### Claude Code CLI

```bash
# Clone to your global skills folder
git clone https://github.com/voiceflow-gallagan/voiceflow-widget-modifier.git ~/.claude/skills/voiceflow-widget-modifier

# OR clone to a specific project
git clone https://github.com/voiceflow-gallagan/voiceflow-widget-modifier.git your-project/.claude/skills/voiceflow-widget-modifier
```

### Claude Desktop (Cowork)

Copy the folder to your Cowork workspace skills directory.

## Usage

Once installed, Claude will automatically use this skill when you ask to modify the Voiceflow chat widget.

**Example prompts:**
- "Hide the close button on the Voiceflow widget"
- "Force the scrollbar to always show in the chat"
- "Make the widget corners square"
- "Change the header color of the widget"

## Structure

```
voiceflow-widget-modifier/
├── SKILL.md              # Main skill documentation
├── examples/             # Validated modifications
│   ├── force-scrollbar.js/.md
│   ├── hide-close-button.js/.md
│   └── square-corners.js/.md
└── scripts/              # Tools & templates
    ├── _TEMPLATE.md
    ├── discover-selectors.js
    └── inject-styles.js
```

## Examples

### Hide Close Button

```css
.vfrc-header--actions .vfrc-header--button:nth-child(3) {
  display: none !important;
}
```

### Force Scrollbar

```css
.vfrc-chat-dialog__container {
  overflow-y: scroll !important;
  scrollbar-width: auto !important;
}
```

### Square Corners

```css
.vfrc-chat {
  border-radius: 0 !important;
}
```

See the `examples/` folder for complete integration code with BASE64 and external CSS options.

## Key Concepts

### Shadow DOM

The Voiceflow widget uses Shadow DOM. Styles must be injected into `shadowRoot`, not `document.head`:

```javascript
const shadowHost = document.getElementById('voiceflow-chat');
const shadowRoot = shadowHost.shadowRoot;
// Inject styles into shadowRoot
```

### Stable Selectors

Always use `vfrc-*` prefixed classes (stable) instead of short alphanumeric classes like `.s9t60i1` (generated, change per build).

## Header Buttons

| Position | Selector | Function |
|----------|----------|----------|
| 1st | `:nth-child(1)` | Mute/Audio toggle |
| 2nd | `:nth-child(2)` | Refresh/Reset |
| 3rd | `:nth-child(3)` | Close widget |

## Contributing

1. Test your modification in the browser console
2. Take a screenshot to verify it works
3. Create `.js` and `.md` files in `examples/`
4. Submit a PR

## License

MIT
