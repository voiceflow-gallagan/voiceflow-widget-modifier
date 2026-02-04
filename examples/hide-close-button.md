# Hide Close Button

Hides the X (close) button in the Voiceflow chat widget header.

## CSS

```css
.vfrc-header--actions .vfrc-header--button:nth-child(3) {
  display: none !important;
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
  style.id = 'vf-hide-close-btn';
  style.textContent = '.vfrc-header--actions .vfrc-header--button:nth-child(3) { display: none !important; }';
  if (shadowHost && shadowHost.shadowRoot) {
    shadowHost.shadowRoot.appendChild(style);
  } else {
    document.head.appendChild(style);
  }
  console.log('✅ Close button hidden');
})();
```

---

## Production Integration

### Option 1: BASE64 Encoded CSS (inline)

Encode the CSS as BASE64 and include it directly in the embed script:

**CSS to encode:**
```css
.vfrc-header--actions .vfrc-header--button:nth-child(3) { display: none !important; }
```

**BASE64:**
```
LnZmcmMtaGVhZGVyLS1hY3Rpb25zIC52ZnJjLWhlYWRlci0tYnV0dG9uOm50aC1jaGlsZCgzKSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQ==
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
          stylesheet: 'data:text/css;base64,LnZmcmMtaGVhZGVyLS1hY3Rpb25zIC52ZnJjLWhlYWRlci0tYnV0dG9uOm50aC1jaGlsZCgzKSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQ=='
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

1. Create a `voiceflow-custom.css` file:
```css
/* Hide close button */
.vfrc-header--actions .vfrc-header--button:nth-child(3) {
  display: none !important;
}
```

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
          stylesheet: 'https://your-domain.com/css/voiceflow-custom.css'
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

## How to Generate BASE64

### Command line (Mac/Linux):
```bash
echo -n '.vfrc-header--actions .vfrc-header--button:nth-child(3) { display: none !important; }' | base64
```

### JavaScript (browser):
```javascript
btoa('.vfrc-header--actions .vfrc-header--button:nth-child(3) { display: none !important; }')
```

### Online:
Use https://www.base64encode.org/

---

## Pros/Cons

| Method | Pros | Cons |
|--------|------|------|
| BASE64 | No external file, all inline | Hard to modify, not readable |
| CSS File | Easy to modify, readable | Requires hosting, additional HTTP request |
