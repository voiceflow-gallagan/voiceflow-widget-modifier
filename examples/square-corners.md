# Square Corners

Removes rounded corners from the Voiceflow chat widget, giving it a square/rectangular appearance.

## CSS

```css
.vfrc-chat {
  border-radius: 0 !important;
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
  style.id = 'vf-square-corners';
  style.textContent = '.vfrc-chat { border-radius: 0 !important; }';
  if (shadowHost && shadowHost.shadowRoot) {
    shadowHost.shadowRoot.appendChild(style);
  } else {
    document.head.appendChild(style);
  }
  console.log('✅ Square corners applied');
})();
```

---

## Production Integration

### Option 1: BASE64 Encoded CSS (inline)

**CSS to encode:**
```css
.vfrc-chat { border-radius: 0 !important; }
```

**BASE64:**
```
LnZmcmMtY2hhdCB7IGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDsgfQ==
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
          stylesheet: 'data:text/css;base64,LnZmcmMtY2hhdCB7IGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDsgfQ=='
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
/* Square corners */
.vfrc-chat {
  border-radius: 0 !important;
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
echo -n '.vfrc-chat { border-radius: 0 !important; }' | base64
```

### JavaScript (browser):
```javascript
btoa('.vfrc-chat { border-radius: 0 !important; }')
```

---

## Notes

- Default border-radius is `16px`
- This affects all corners of the chat widget
- To customize specific corners, use `border-top-left-radius`, `border-top-right-radius`, etc.
