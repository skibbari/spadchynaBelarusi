/* Safe browser storage. Uses localStorage when allowed and a session-memory fallback otherwise. */
(() => {
  const memory = window.__spadchynaMemoryStorage || (window.__spadchynaMemoryStorage = new Map());
  const api = {
    get(key, fallback = null) {
      try {
        const value = window.localStorage.getItem(key);
        return value === null ? (memory.has(key) ? memory.get(key) : fallback) : value;
      } catch (_) {
        return memory.has(key) ? memory.get(key) : fallback;
      }
    },
    set(key, value) {
      const text = String(value);
      try {
        window.localStorage.setItem(key, text);
        memory.delete(key);
        return true;
      } catch (_) {
        memory.set(key, text);
        return false;
      }
    },
    remove(key) {
      try { window.localStorage.removeItem(key); } catch (_) {}
      memory.delete(key);
    },
    clearMemory() { memory.clear(); }
  };
  window.SPStorage = api;
})();
