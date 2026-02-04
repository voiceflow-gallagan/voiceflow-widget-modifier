// === Voiceflow Chat Widget - Red Focus Border on Input ===
// Changes the message input focus ring from blue to red
// The focus ring is rendered by a separate overlay element (.vfrc-chat-focus-ring)

(function() {
  const injectRedFocusBorder = () => {
    // Try Shadow DOM first (standard widget embedding)
    const shadowHost = document.getElementById('voiceflow-chat');
    let targetRoot = document;

    if (shadowHost && shadowHost.shadowRoot) {
      targetRoot = shadowHost.shadowRoot;
    }

    // Check if focus ring element exists (it's inside .vfrc-input-container)
    const focusRing = targetRoot.querySelector('.vfrc-chat-focus-ring');
    const inputContainer = targetRoot.querySelector('.vfrc-input-container');

    if (!focusRing && !inputContainer) {
      // Widget not ready yet, retry
      setTimeout(injectRedFocusBorder, 100);
      return;
    }

    // Remove existing style if already injected
    const existingStyle = targetRoot.getElementById('vf-input-red-focus');
    if (existingStyle) existingStyle.remove();

    // Create and inject the style
    const style = document.createElement('style');
    style.id = 'vf-input-red-focus';
    style.textContent = `
      /* Target the focus ring overlay element */
      .vfrc-chat-focus-ring {
        box-shadow: #e53935 0px 0px 0px 2px inset !important;
      }
    `;

    if (shadowHost && shadowHost.shadowRoot) {
      shadowHost.shadowRoot.appendChild(style);
    } else {
      document.head.appendChild(style);
    }

    console.log('✅ Voiceflow input focus ring changed to red');
  };

  if (document.readyState === 'complete') {
    injectRedFocusBorder();
  } else {
    window.addEventListener('load', injectRedFocusBorder);
  }
})();
