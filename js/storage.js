window.LN = window.LN || {};
LN.keys = {
  facebook: "life-next-facebook-records-v10",
  youtube: "life-next-youtube-records-v10",
  products: "life-next-product-records-v10",
  calendarDone: "life-next-calendar-done-v10",
  calendarNotes: "life-next-calendar-notes-v11"
};
LN.uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
LN.loadArray = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
LN.saveArray = (key, value) => localStorage.setItem(key, JSON.stringify(value));
LN.loadObject = (key, fallback={}) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } };
LN.saveObject = (key, value) => localStorage.setItem(key, JSON.stringify(value));
LN.backupFilename = () => `life-next-dashboard-backup-${new Date().toISOString().slice(0,10)}.json`;
LN.exportBackupObject = () => {
  const lifeNextLocalStorage = {};
  Object.values(LN.keys).forEach(key => { lifeNextLocalStorage[key] = localStorage.getItem(key); });
  return {
    version: "v11.11-calendar-notes",
    exportedAt: new Date().toISOString(),
    note: "Life Next Dashboard data backup: Facebook, YouTube, Product records, Calendar done state, calendar notes, and raw Life Next localStorage keys.",
    facebook: LN.loadArray(LN.keys.facebook),
    youtube: LN.loadArray(LN.keys.youtube),
    products: LN.loadArray(LN.keys.products),
    calendarDone: LN.loadObject(LN.keys.calendarDone, {}),
    calendarNotes: LN.loadObject(LN.keys.calendarNotes, {}),
    lifeNextLocalStorage
  };
};
LN.exportBackup = () => JSON.stringify(LN.exportBackupObject(), null, 2);
LN.downloadBackup = () => {
  const blob = new Blob([LN.exportBackup()], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = LN.backupFilename();
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
LN.importBackup = text => {
  const data = JSON.parse(text);
  if (data.lifeNextLocalStorage && typeof data.lifeNextLocalStorage === "object") {
    Object.entries(data.lifeNextLocalStorage).forEach(([key, value]) => {
      if (Object.values(LN.keys).includes(key) && typeof value === "string") localStorage.setItem(key, value);
    });
  }
  if (Array.isArray(data.facebook)) LN.saveArray(LN.keys.facebook, data.facebook);
  if (Array.isArray(data.youtube)) LN.saveArray(LN.keys.youtube, data.youtube);
  if (Array.isArray(data.products)) LN.saveArray(LN.keys.products, data.products);
  if (data.calendarDone && typeof data.calendarDone === "object") LN.saveObject(LN.keys.calendarDone, data.calendarDone);
  if (data.calendarNotes && typeof data.calendarNotes === "object") LN.saveObject(LN.keys.calendarNotes, data.calendarNotes);
};
