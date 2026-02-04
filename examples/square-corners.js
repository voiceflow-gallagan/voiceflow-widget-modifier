// === Voiceflow Chat Widget - Square Corners ===
// Removes rounded corners from the chat widget

(function() {
  const injectSquareCorners = () => {
    // Try Shadow DOM first (standard widget embedding)
    const shadowHost = document.getElementById('voiceflow-chat');
    let targetRoot = document;

    if (shadowHost && shadowHost.shadowRoot) {
      targetRoot = shadowHost.shadowRoot;
    }

    // Check if widget exists
    const widget = targetRoot.querySelector('.vfrc-chat');
    if (!widget) {
      // Widget not ready yet, retry
      setTimeout(injectSquareCorners, 100);
      return;
    }

    // Remove existing style if already injected
    const existingStyle = targetRoot.getElementById('vf-square-corners');
    if (existingStyle) existingStyle.remove();

    // Create and inject the style
    const style = document.createElement('style');
    style.id = 'vf-square-corners';
    style.textContent = `
      /* Remove rounded corners from chat widget */
      .vfrc-chat {
        border-radius: 0 !important;
      }
    `;

    if (shadowHost && shadowHost.shadowRoot) {
      shadowHost.shadowRoot.appendChild(style);
    } else {
      document.head.appendChild(style);
    }

    console.log('✅ Voiceflow square corners applied');
  };

  if (document.readyState === 'complete') {
    injectSquareCorners();
  } else {
    window.addEventListener('load', injectSquareCorners);
  }
})();
