# Force Scrollbar Visibility

Forces the scrollbar to always be visible in the Voiceflow chat widget message area.

## CSS

```css
.vfrc-chat-dialog__container {
  overflow-y: scroll !important;
  scrollbar-width: auto !important;
  scrollbar-gutter: stable !important;
}

/* Webkit browsers (Chrome, Safari, Edge) */
.vfrc-chat-dialog__container::-webkit-scrollbar {
  -webkit-appearance: none !important;
  width: 8px !important;
}

.vfrc-chat-dialog__container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1) !important;
  border-radius: 4px !important;
}

.vfrc-chat-dialog__container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3) !important;
  border-radius: 4px !important;
}

.vfrc-chat-dialog__container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5) !important;
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
  style.id = 'vf-scrollbar-fix';
  style.textContent = `
    .vfrc-chat-dialog__container {
      overflow-y: scroll !important;
      scrollbar-width: auto !important;
      scrollbar-gutter: stable !important;
    }
    .vfrc-chat-dialog__container::-webkit-scrollbar {
      -webkit-appearance: none !important;
      width: 8px !important;
    }
    .vfrc-chat-dialog__container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1) !important;
      border-radius: 4px !important;
    }
    .vfrc-chat-dialog__container::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3) !important;
      border-radius: 4px !important;
    }
    .vfrc-chat-dialog__container::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.5) !important;
    }
  `;
  if (shadowHost && shadowHost.shadowRoot) {
    shadowHost.shadowRoot.appendChild(style);
  } else {
    document.head.appendChild(style);
  }
  console.log('✅ Scrollbar fix injected');
})();
```

---

## Production Integration

### Option 1: BASE64 Encoded CSS (inline)

**BASE64:**
```
LnZmcmMtY2hhdC1kaWFsb2dfX2NvbnRhaW5lciB7CiAgb3ZlcmZsb3cteTogc2Nyb2xsICFpbXBvcnRhbnQ7CiAgc2Nyb2xsYmFyLXdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7CiAgc2Nyb2xsYmFyLWd1dHRlcjogc3RhYmxlICFpbXBvcnRhbnQ7Cn0KLnZmcmMtY2hhdC1kaWFsb2dfX2NvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIgewogIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZSAhaW1wb3J0YW50OwogIHdpZHRoOiA4cHggIWltcG9ydGFudDsKfQoudmZyYy1jaGF0LWRpYWxvZ19fY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7CiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjEpICFpbXBvcnRhbnQ7CiAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7Cn0KLnZmcmMtY2hhdC1kaWFsb2dfX2NvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgewogIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50OwogIGJvcmRlci1yYWRpdXM6IDRweCAhaW1wb3J0YW50Owp9Ci52ZnJjLWNoYXQtZGlhbG9nX19jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSkgIWltcG9ydGFudDsKfQ==
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
          stylesheet: 'data:text/css;base64,LnZmcmMtY2hhdC1kaWFsb2dfX2NvbnRhaW5lciB7CiAgb3ZlcmZsb3cteTogc2Nyb2xsICFpbXBvcnRhbnQ7CiAgc2Nyb2xsYmFyLXdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7CiAgc2Nyb2xsYmFyLWd1dHRlcjogc3RhYmxlICFpbXBvcnRhbnQ7Cn0KLnZmcmMtY2hhdC1kaWFsb2dfX2NvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIgewogIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZSAhaW1wb3J0YW50OwogIHdpZHRoOiA4cHggIWltcG9ydGFudDsKfQoudmZyYy1jaGF0LWRpYWxvZ19fY29udGFpbmVyOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7CiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjEpICFpbXBvcnRhbnQ7CiAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7Cn0KLnZmcmMtY2hhdC1kaWFsb2dfX2NvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgewogIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50OwogIGJvcmRlci1yYWRpdXM6IDRweCAhaW1wb3J0YW50Owp9Ci52ZnJjLWNoYXQtZGlhbG9nX19jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsKICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSkgIWltcG9ydGFudDsKfQ=='
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

1. Create a `voiceflow-custom.css` file with the CSS above
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

## Why This Is Needed

By default, Voiceflow hides the scrollbar using:
```css
scrollbar-width: none;
```

This CSS override forces the scrollbar to be visible for better UX, especially on desktop where users expect to see scrollbars.
