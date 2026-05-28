const view = document.getElementById("view");
let calCursor = bangkokNow();
let selectedDate = bangkokNow();

function bangkokNow(){ return new Date(new Date().toLocaleString("en-US", {timeZone: TZ})); }
function pad(n){ return String(n).padStart(2,"0"); }
function isoDate(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function todayKey(){ return isoDate(bangkokNow()); }
function getStore(key, fallback){ try{return JSON.parse(localStorage.getItem(`${STORE_PREFIX}:${key}`)) ?? fallback}catch{return fallback} }
function setStore(key, val){ localStorage.setItem(`${STORE_PREFIX}:${key}`, JSON.stringify(val)); }
function getThaiDate(date=bangkokNow()){ return new Intl.DateTimeFormat("th-TH", { dateStyle: "full" }).format(date); }
function getWeekTemplate(date=bangkokNow()){ return weeklyTemplate.find(d => d.dayIndex === date.getDay()) || weeklyTemplate[0]; }
function h(s){ return String(s ?? "").replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function shell(eyebrow, title, desc, body){
  return `<header class="hero"><div class="eyebrow">${h(eyebrow)}</div><h2>${h(title)}</h2><p>${h(desc)}</p></header>${body}`;
}
function mini(label,value,note='',cls=''){
  return `<div class="mini ${cls}"><div class="label">${h(label)}</div><div class="value">${h(value)}</div>${note?`<div class="note">${h(note)}</div>`:''}</div>`;
}
function card(title, body, extra=''){
  return `<section class="card ${extra}"><h3>${h(title)}</h3>${body}</section>`;
}
function pill(text, cls=''){
  return `<span class="pill ${cls}">${h(text)}</span>`;
}
function renderNav(active){
  const nav = document.getElementById("nav");
  nav.innerHTML = navItems.map(([key,label,cls]) => `<button class="${cls} ${key===active?'active':''}" data-nav="${key}">${label}</button>`).join("");
  nav.querySelectorAll("button").forEach(b => b.onclick = () => { location.hash = b.dataset.nav; });
}
function allRecords(){ return getStore('records', []); }
function recordsOf(type){ return allRecords().filter(r => r.type === type); }
function setRecords(records){ setStore('records', records); }
function doneMap(){ return getStore('calendarDone', {}); }
function setDoneMap(map){ setStore('calendarDone', map); }
