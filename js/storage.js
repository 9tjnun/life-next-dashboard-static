window.LN = window.LN || {};
LN.keys = {
  facebook: "life-next-facebook-records-v10",
  youtube: "life-next-youtube-records-v10",
  products: "life-next-product-records-v10",
  calendarDone: "life-next-calendar-done-v10"
};
LN.uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
LN.loadArray = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
LN.saveArray = (key, value) => localStorage.setItem(key, JSON.stringify(value));
LN.loadObject = (key, fallback={}) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } };
LN.saveObject = (key, value) => localStorage.setItem(key, JSON.stringify(value));
LN.exportBackup = () => JSON.stringify({
  version: "v11.3-static-faithful-v10.8",
  exportedAt: new Date().toISOString(),
  facebook: LN.loadArray(LN.keys.facebook),
  youtube: LN.loadArray(LN.keys.youtube),
  products: LN.loadArray(LN.keys.products),
  calendarDone: LN.loadObject(LN.keys.calendarDone, {})
}, null, 2);
LN.importBackup = text => {
  const data = JSON.parse(text);
  if (Array.isArray(data.facebook)) LN.saveArray(LN.keys.facebook, data.facebook);
  if (Array.isArray(data.youtube)) LN.saveArray(LN.keys.youtube, data.youtube);
  if (Array.isArray(data.products)) LN.saveArray(LN.keys.products, data.products);
  if (data.calendarDone && typeof data.calendarDone === "object") LN.saveObject(LN.keys.calendarDone, data.calendarDone);
};
