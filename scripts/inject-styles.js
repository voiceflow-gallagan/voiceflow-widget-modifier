// === Voiceflow Chat Widget - Base CSS Injection Template ===
// Copy and customize this template for your specific modifications

(function() {
  const injectStyles = () => {
    const shadowHost = document.getElementById('voiceflow-chat');

    if (!shadowHost || !shadowHost.shadowRoot) {
      // Widget not ready yet, retry
      setTimeout(injectStyles, 100);
      return;
    }

    const shadowRoot = shadowHost.shadowRoot;

    // Remove existing style if already injected (avoid duplicates)
    const existing = shadowRoot.getElementById('vf-custom-styles');
    if (existing) existing.remove();

    // Create and inject the style
    const style = document.createElement('style');
    style.id = 'vf-custom-styles';
    style.textContent = `
      /* ========================================
         CUSTOMIZE YOUR CSS BELOW
         Use only .vfrc-* stable selectors!
         ======================================== */

      /* Example: Change widget background color */
      /*
      .vfrc-widget {
        background-color: #f0f0f0 !important;
      }
      */

      /* Example: Style user messages */
      /*
      .vfrc-message--user {
        background-color: #007bff !important;
        color: white !important;
      }
      */

      /* Example: Style bot messages */
      /*
      .vfrc-message--assistant {
        background-color: #e9ecef !important;
      }
      */

      /* Example: Change header style */
      /*
      .vfrc-header {
        background-color: #333 !important;
        color: white !important;
      }
      */

      /* Example: Style the input area */
      /*
      .vfrc-input {
        border-color: #007bff !important;
      }
      */

      /* Add your custom CSS here */

    `;

    shadowRoot.appendChild(style);
    console.log('✅ Voiceflow custom styles injected');
  };

  // Start injection when ready
  if (document.readyState === 'complete') {
    injectStyles();
  } else {
    window.addEventListener('load', injectStyles);
  }
})();
