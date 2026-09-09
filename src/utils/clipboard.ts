/**
 * Robust clipboard utility that handles iframe focus restrictions,
 * browser permission policies, and legacy execution fallbacks.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Try focusing window/document to satisfy iframe focus requirements
  try {
    if (typeof window !== 'undefined' && typeof window.focus === 'function') {
      window.focus();
    }
  } catch {
    // ignore focus errors
  }

  // 1. Attempt modern navigator.clipboard API first
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to textarea execCommand fallback
    }
  }

  // 2. Fallback: document.execCommand('copy') with temporary textarea
  // This works reliably inside sandboxed iframes even when document.hasFocus() is false
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      
      // Position off-screen and invisible to avoid UI jumps
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '2em';
      textarea.style.height = '2em';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      textarea.style.opacity = '0';
      textarea.setAttribute('readonly', '');

      document.body.appendChild(textarea);
      textarea.focus({ preventScroll: true });
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (successful) {
        return true;
      }
    } catch {
      // Fallback failed
    }
  }

  return false;
}
