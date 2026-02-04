# [Modification Name]

[Brief description of what this modification does]

## CSS

```css
/* Your CSS here */
.vfrc-selector {
  property: value !important;
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
  style.id = 'vf-[modification-id]';
  style.textContent = `/* Your CSS here */`;
  if (shadowHost && shadowHost.shadowRoot) {
    shadowHost.shadowRoot.appendChild(style);
  } else {
    document.head.appendChild(style);
  }
  console.log('✅ [Modification name] applied');
})();
```

---

## Production Integration

### Option 1: BASE64 Encoded CSS (inline)

**CSS to encode:**
```css
/* Your CSS here */
```

**BASE64:**
```
[Generate with: echo -n 'YOUR_CSS' | base64]
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
          stylesheet: 'data:text/css;base64,[YOUR_BASE64_HERE]'
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

1. Create a `voiceflow-custom.css` file with your CSS
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
echo -n 'YOUR_CSS_HERE' | base64
```

### JavaScript (browser):
```javascript
btoa('YOUR_CSS_HERE')
```

### Online:
Use https://www.base64encode.org/

---

## Notes

[Any additional notes about this modification, edge cases, or compatibility issues]
