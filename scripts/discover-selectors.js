// === Voiceflow Chat Widget - Selector Discovery Tool ===
// Run this in browser console to find stable selectors for elements

(function() {
  const shadowHost = document.getElementById('voiceflow-chat');

  if (!shadowHost || !shadowHost.shadowRoot) {
    console.error('❌ Voiceflow widget not found or Shadow DOM not accessible');
    return;
  }

  const shadowRoot = shadowHost.shadowRoot;

  // Find all elements with vfrc- classes
  const allElements = shadowRoot.querySelectorAll('*');
  const stableSelectors = new Set();

  allElements.forEach(el => {
    if (el.className && typeof el.className === 'string') {
      el.className.split(' ').forEach(cls => {
        if (cls.startsWith('vfrc-')) {
          stableSelectors.add(cls);
        }
      });
    }
  });

  console.log('=== Stable Selectors Found (vfrc-*) ===');
  console.log([...stableSelectors].sort().join('\n'));

  // Helper function to analyze a specific element
  window.vfAnalyze = (selector) => {
    const el = shadowRoot.querySelector(selector);
    if (!el) {
      console.log('Element not found');
      return;
    }

    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);

    console.log({
      selector,
      stableClasses: el.className.split(' ').filter(c => c.startsWith('vfrc-')),
      dynamicClasses: el.className.split(' ').filter(c => !c.startsWith('vfrc-') && c.length > 0),
      dimensions: { width: rect.width, height: rect.height },
      overflow: { x: style.overflowX, y: style.overflowY },
      scrollbar: {
        width: el.offsetWidth - el.clientWidth,
        scrollbarWidthCSS: style.scrollbarWidth
      }
    });
  };

  console.log('\n💡 Use vfAnalyze(".selector") to analyze a specific element');
  console.log('   Example: vfAnalyze(".vfrc-chat-dialog__container")');
})();
