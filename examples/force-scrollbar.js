// === Voiceflow Chat Widget - Force Scrollbar Display ===
// Inject this script after the widget is loaded

(function() {
  const injectScrollbarStyles = () => {
    const shadowHost = document.getElementById('voiceflow-chat');

    if (!shadowHost || !shadowHost.shadowRoot) {
      setTimeout(injectScrollbarStyles, 100);
      return;
    }

    const shadowRoot = shadowHost.shadowRoot;

    // Remove existing style if already injected
    const existingStyle = shadowRoot.getElementById('vf-scrollbar-fix');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'vf-scrollbar-fix';
    style.textContent = `
      /* Force permanent scrollbar visibility */
      .vfrc-chat-dialog__container {
        overflow-y: scroll !important;
        scrollbar-width: auto !important;
        scrollbar-gutter: stable !important;
      }

      /* Webkit browsers (Chrome, Safari, Edge) */
      .vfrc-chat-dialog__container::-webkit-scrollbar {
        -webkit-appearance: none !important;
        width: 8px !important;
        display: block !important;
        background-color: #f5f5f5 !important;
      }

      .vfrc-chat-dialog__container::-webkit-scrollbar-track {
        background: #f5f5f5 !important;
        border-radius: 4px !important;
      }

      .vfrc-chat-dialog__container::-webkit-scrollbar-thumb {
        background-color: #c0c0c0 !important;
        border-radius: 4px !important;
        border: 2px solid #f5f5f5 !important;
      }

      .vfrc-chat-dialog__container::-webkit-scrollbar-thumb:hover {
        background-color: #a0a0a0 !important;
      }
    `;

    shadowRoot.appendChild(style);
    console.log('✅ Voiceflow scrollbar fix injected');
  };

  if (document.readyState === 'complete') {
    injectScrollbarStyles();
  } else {
    window.addEventListener('load', injectScrollbarStyles);
  }
})();
