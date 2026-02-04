# Red Focus Border on Input

Changes the message input focus ring from blue to red when the input field is focused.

## Key Discovery

The focus ring is NOT on the `.vfrc-input-container` itself! It's rendered by a **separate overlay element** called `.vfrc-chat-focus-ring` that's absolutely positioned inside the container. This element uses an inset box-shadow to create the focus ring effect.

## CSS

```css
/* Target the focus ring overlay element */
.vfrc-chat-focus-ring {
  box-shadow: #e53935 0px 0px 0px 2px inset !important;
}
```

## Testing in Dev Console

1. Open the page with the Voiceflow widget
2. Open DevTools (F12)
3. Paste this code in the Console:

```javascript
(function() {
  const shadowHost = document.getElementById('voiceflow-chat');
  let targetRoot = document;
  if (shadowHost && shadowHost.shadowRoot) {
    targetRoot = shadowHost.shadowRoot;
  }
  const style = document.createElement('style');
  style.id = 'vf-input-red-focus';
  style.textContent = `
    .vfrc-chat-focus-ring {
      box-shadow: #e53935 0px 0px 0px 2px inset !important;
    }
  `;
  if (shadowHost && shadowHost.shadowRoot) {
    shadowHost.shadowRoot.appendChild(style);
  } else {
    document.head.appendChild(style);
  }
  console.log('✅ Input focus ring changed to red');
})();
```

4. Click on the message input field to see the red focus ring

---

## Production Integration

### Option 1: BASE64 Encoded CSS (inline)

**BASE64:**
```
LnZmcmMtY2hhdC1mb2N1cy1yaW5nIHsKICBib3gtc2hhZG93OiAjZTUzOTM1IDBweCAwcHggMHB4IDJweCBpbnNldCAhaW1wb3J0YW50Owp9
```

**Full embed script:**
```html
<script type="text/javascript">
  (function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: 'YOUR_PROJECT_ID' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        assistant: {
          stylesheet: 'data:text/css;base64,LnZmcmMtY2hhdC1mb2N1cy1yaW5nIHsKICBib3gtc2hhZG93OiAjZTUzOTM1IDBweCAwcHggMHB4IDJweCBpbnNldCAhaW1wb3J0YW50Owp9'
        }
      });
    };
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
```

### Option 2: External CSS File (hosted)

1. Create a `voiceflow-red-focus.css` file with the CSS above
2. Host the file (e.g., on your server, CDN, or GitHub Pages)
3. Use the URL in the embed script:

```html
<script type="text/javascript">
  (function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: 'YOUR_PROJECT_ID' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        assistant: {
          stylesheet: 'https://your-domain.com/css/voiceflow-red-focus.css'
        }
      });
    };
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>
```

---

## Customization

To use a different color, replace `#e53935` with your preferred color:

| Color | Hex Code | Description |
|-------|----------|-------------|
| Material Red 600 | `#e53935` | Default (vibrant red) |
| Material Red 500 | `#f44336` | Lighter red |
| Material Red 700 | `#d32f2f` | Darker red |
| Green | `#4caf50` | Success/positive |
| Orange | `#ff9800` | Warning |
| Purple | `#9c27b0` | Custom brand |

---

## Technical Details

### Element Structure

```
.vfrc-input-container
├── .vfrc-chat-focus-ring  ← Absolutely positioned, creates the focus ring
├── .vfrc-chat-input__container-inner
│   └── textarea.vfrc-chat-input
└── (buttons: mic, send)
```

### Why `.vfrc-chat-focus-ring`?

The Voiceflow widget uses a separate overlay element for the focus ring instead of applying it directly to the container. This allows for:
- Smoother animations
- Consistent appearance across browsers
- Independence from the container's border styling

The default blue color (`rgb(57, 125, 255)`) is applied via an inset box-shadow on this overlay element.
