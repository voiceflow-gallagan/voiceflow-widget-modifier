// === Voiceflow Chat Widget - Hide Close (X) Button ===
// Hides the close button from the widget header
// Note: On /share/ pages, the widget renders directly in DOM (not Shadow DOM)

(function() {
  const injectHideCloseButton = () => {
    // Try Shadow DOM first (standard widget embedding)
    const shadowHost = document.getElementById('voiceflow-chat');
    let targetRoot = document;

    if (shadowHost && shadowHost.shadowRoot) {
      targetRoot = shadowHost.shadowRoot;
    }

    // Check if header exists
    const header = targetRoot.querySelector('.vfrc-header');
    if (!header) {
      // Widget not ready yet, retry
      setTimeout(injectHideCloseButton, 100);
      return;
    }

    // Remove existing style if already injected
    const existingStyle = targetRoot.getElementById('vf-hide-close-btn');
    if (existingStyle) existingStyle.remove();

    // Create and inject the style
    const style = document.createElement('style');
    style.id = 'vf-hide-close-btn';
    style.textContent = `
      /* Hide the close (X) button in the header - 3rd button */
      .vfrc-header--actions .vfrc-header--button:nth-child(3) {
        display: none !important;
      }
    `;

    if (shadowHost && shadowHost.shadowRoot) {
      shadowHost.shadowRoot.appendChild(style);
    } else {
      document.head.appendChild(style);
    }

    console.log('✅ Voiceflow close button hidden');
  };

  if (document.readyState === 'complete') {
    injectHideCloseButton();
  } else {
    window.addEventListener('load', injectHideCloseButton);
  }
})();
