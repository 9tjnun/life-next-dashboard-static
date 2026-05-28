const TZ = "Asia/Bangkok";
const STORE_PREFIX = "life-next-v11";

const navItems = [
  ["today", "วันนี้"], ["calendar", "ปฏิทิน"], ["facebook", "Facebook"], ["youtube", "YouTube"],
  ["etsy", "Etsy"], ["pinterest", "Pinterest"], ["kdp", "KDP / Ebook"], ["products", "Product Records"],
  ["seasonal", "Seasonal Guide"], ["guide", "Guide"], ["settings", "Settings / Backup"]
];

const channelLinks = {
  facebook: "https://www.facebook.com/LifeNextChapter/",
  youtube: "https://www.youtube.com/@LifeNextChapterCozy",
  etsy: "https://www.etsy.com/shop/ByeTension",
  pinterest: "https://www.pinterest.com/byetension/"
};

const platformRules = [
  { key: "etsy", title: "ByeTension Etsy", cadence: "ทุกวัน 21:30", note: "5 listings / วัน เป็น core income workflow", tag: "Etsy 5" },
  { key: "pin", title: "Pinterest", cadence: "ทุกวัน", note: "3–5 pins / วัน เป็น traffic engine", tag: "Pin 3–5" },
  { key: "fb", title: "Facebook", cadence: "ทุกวัน", note: "1 cozy post / วัน", tag: "FB" },
  { key: "yt", title: "Shorts/Reels", cadence: "พุธ ศุกร์ อาทิตย์", note: "Short mood video / Reels reuse", tag: "Shorts" },
  { key: "kdp", title: "KDP Slot 1", cadence: "วันที่ 14", note: "KDP / planner / activity book slot", tag: "KDP 1" },
  { key: "kdp", title: "KDP Slot 2", cadence: "วันที่ 28", note: "KDP / planner / activity book slot", tag: "KDP 2" },
  { key: "ebook", title: "Ebook Slot", cadence: "วันที่ 21", note: "Ebook 1 slot / เดือน", tag: "Ebook" }
];

const seasonalGuide = [
  { m:1, theme:"New Year Reset", ideas:"planner, reset checklist, calm winter wall art" },
  { m:2, theme:"Cozy Home / Soft Valentine", ideas:"warm home decor, gentle giftable prints" },
  { m:3, theme:"Spring Prep", ideas:"garden journal, floral wall art, fresh routine" },
  { m:4, theme:"Cottage Garden", ideas:"flower garden activity book, botanical printables" },
  { m:5, theme:"Summer Warm-up", ideas:"travel window views, lake, soft coastal, retirement hobbies" },
  { m:6, theme:"Summer Seasonal Launch", ideas:"summer wall art, travel, cottage garden, slow mornings" },
  { m:7, theme:"Travel Memories", ideas:"travel journal, window view wall art, road trip checklist" },
  { m:8, theme:"Slow Home Reset", ideas:"home organization, routine trackers, cozy planner" },
  { m:9, theme:"Autumn Prep", ideas:"fall botanical, warm still life, reading nook" },
  { m:10, theme:"Cozy Autumn", ideas:"tea time, puzzles, cottage prints, fall checklist" },
  { m:11, theme:"Gift / Holiday Prep", ideas:"printable gifts, activity books, calm holiday decor" },
  { m:12, theme:"Winter Reflection", ideas:"year-end journal, winter wall art, cozy brain games" }
];

function bangkokNow(){
  return new Date(new Date().toLocaleString("en-US", {timeZone: TZ}));
}
function pad(n){ return String(n).padStart(2,"0"); }
function isoDate(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function dayName(d){ return ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"][d.getDay()]; }
function getStore(key, fallback){ try{return JSON.parse(localStorage.getItem(`${STORE_PREFIX}:${key}`)) ?? fallback}catch{return fallback} }
function setStore(key, value){ localStorage.setItem(`${STORE_PREFIX}:${key}`, JSON.stringify(value)); }
function doneKey(date, task){ return `${date}:${task}`; }
function isShortsDay(d){ return [0,3,5].includes(d.getDay()); }
function tasksForDate(d){
  const day = d.getDate();
  const tasks = [
    { id:"etsy", title:"ByeTension Etsy", meta:"ลง/เตรียม 5 listings เวลา 21:30", type:"etsy" },
    { id:"pin", title:"Pinterest", meta:"ทำ 3–5 pins / batch หรือ schedule", type:"pin" },
    { id:"fb", title:"Facebook", meta:"1 cozy post / living room mood", type:"fb" }
  ];
  if(isShortsDay(d)) tasks.push({ id:"shorts", title:"Shorts/Reels", meta:"พุธ/ศุกร์/อาทิตย์ — 1 mood video แล้ว reuse", type:"yt" });
  if(day===14) tasks.push({ id:"kdp1", title:"KDP Slot 1", meta:"รอบ 1 ของเดือน — activity book / planner", type:"kdp" });
  if(day===28) tasks.push({ id:"kdp2", title:"KDP Slot 2", meta:"รอบ 2 ของเดือน — activity book / planner", type:"kdp" });
  if(day===21) tasks.push({ id:"ebook", title:"Ebook Slot", meta:"เดือนละ 1 ebook / mini guide", type:"ebook" });
  return tasks;
}
function nextDateFor(predicate, from = bangkokNow()){
  for(let i=0;i<40;i++){
    const d = new Date(from); d.setDate(from.getDate()+i);
    if(predicate(d)) return d;
  }
  return from;
}

function renderNav(active){
  const nav = document.getElementById("nav");
  nav.innerHTML = navItems.map(([id,label]) => `<button class="${active===id?'active':''}" data-route="${id}">${label}</button>`).join("");
  nav.querySelectorAll("button").forEach(btn => btn.onclick = () => { location.hash = btn.dataset.route; });
}
function shell(eyebrow,title,desc,content){
  return `<div class="hero"><div class="eyebrow">${eyebrow}</div><h2>${title}</h2><p>${desc}</p></div>${content}`;
}
function statsCards(){
  const now = bangkokNow(); const today = isoDate(now); const dones = getStore("done", {}); const todays = tasksForDate(now);
  const doneCount = todays.filter(t=>dones[doneKey(today,t.id)]).length;
  const nextKdp1 = nextDateFor(d=>d.getDate()===14 && isoDate(d)>=today);
  const nextKdp2 = nextDateFor(d=>d.getDate()===28 && isoDate(d)>=today);
  const nextEbook = nextDateFor(d=>d.getDate()===21 && isoDate(d)>=today);
  return `<div class="grid grid-4">
    <div class="mini"><div class="label">วันนี้</div><div class="value">${dayName(now)}</div><div class="muted">${today}</div></div>
    <div class="mini"><div class="label">งานวันนี้</div><div class="value">${doneCount}/${todays.length}</div><div class="muted">ติ๊กได้ในหน้านี้หรือปฏิทิน</div></div>
    <div class="mini"><div class="label">KDP ถัดไป</div><div class="value">${pad(Math.min(nextKdp1.getDate(), nextKdp2.getDate()))}</div><div class="muted">วันที่ 14 / 28 ของเดือน</div></div>
    <div class="mini"><div class="label">Ebook</div><div class="value">${pad(nextEbook.getDate())}</div><div class="muted">เดือนละ 1 slot</div></div>
  </div>`;
}
function taskList(dateObj){
  const date = isoDate(dateObj); const dones = getStore("done", {}); const tasks = tasksForDate(dateObj);
  return `<div class="card"><h3>Checklist — ${date}</h3>${tasks.map(t=>`
    <label class="task ${dones[doneKey(date,t.id)]?'done':''}">
      <input type="checkbox" data-date="${date}" data-task="${t.id}" ${dones[doneKey(date,t.id)]?'checked':''}/>
      <div><div class="task-title">${t.title}</div><div class="task-meta">${t.meta}</div></div>
    </label>`).join("")}</div>`;
}
function bindCheckboxes(){
  document.querySelectorAll('input[type="checkbox"][data-task]').forEach(ch => ch.onchange = e => {
    const dones = getStore("done", {}); const k = doneKey(ch.dataset.date, ch.dataset.task);
    if(ch.checked) dones[k]=true; else delete dones[k]; setStore("done", dones); route();
  });
}
function renderToday(){
  const now = bangkokNow();
  view.innerHTML = shell("Central Brain", "วันนี้ต้องทำอะไร", "รวมงานหลักทุกโปรเจกต์แบบ daily / weekly / monthly โดยใช้เวลาไทยเป็นหลัก", `${statsCards()}<div class="grid grid-2" style="margin-top:14px">${taskList(now)}<div class="card"><h3>Next Action Focus</h3><p class="muted">โฟกัสระบบตอนนี้: ทำ dashboard ให้ stable ก่อน แล้วค่อยต่อ GPT / Supabase ทีหลัง ไม่เอาบั๊กมาทำหม้อไฟอีก 😭</p><div class="btn-row"><button class="btn" onclick="location.hash='products'">เพิ่ม Product Record</button><button class="btn light" onclick="location.hash='settings'">Backup ข้อมูล</button></div></div></div>`);
  bindCheckboxes();
}
let calCursor = bangkokNow();
function renderCalendar(){
  const y = calCursor.getFullYear(), m = calCursor.getMonth();
  const first = new Date(y,m,1); const start = first.getDay(); const last = new Date(y,m+1,0).getDate();
  let cells = [];
  for(let i=0;i<start;i++) cells.push(`<div class="day" style="opacity:.35"></div>`);
  const todayIso = isoDate(bangkokNow());
  for(let day=1; day<=last; day++){
    const d = new Date(y,m,day); const iso = isoDate(d); const tags = tasksForDate(d).map(t=>`<span class="tag ${t.type}">${t.title}</span>`).join("");
    cells.push(`<div class="day ${iso===todayIso?'today':''}"><div class="day-num">${day}</div>${tags}</div>`);
  }
  view.innerHTML = shell("Calendar", "ปฏิทินงานรายเดือน", "Etsy/Pinterest/FB ทุกวัน, Shorts/Reels พุธ ศุกร์ อาทิตย์, KDP วันที่ 14/28, Ebook วันที่ 21", `<div class="card"><div class="calendar-head"><button class="btn light" id="prevM">← เดือนก่อน</button><h3>${calCursor.toLocaleString('th-TH',{month:'long',year:'numeric'})}</h3><button class="btn light" id="nextM">เดือนถัดไป →</button></div><div class="calendar">${["อา","จ","อ","พ","พฤ","ศ","ส"].map(d=>`<div class="dow">${d}</div>`).join("")}${cells.join("")}</div></div><div style="margin-top:14px">${taskList(bangkokNow())}</div>`);
  document.getElementById('prevM').onclick=()=>{calCursor.setMonth(calCursor.getMonth()-1); renderCalendar()};
  document.getElementById('nextM').onclick=()=>{calCursor.setMonth(calCursor.getMonth()+1); renderCalendar()};
  bindCheckboxes();
}
function recordForm(type){
  return `<form id="recordForm" class="card"><h3>เพิ่ม Record</h3><div class="form-grid"><input class="input" name="title" placeholder="ชื่อ / หัวข้อ" required><select class="select" name="status"><option>Idea</option><option>Creating</option><option>SEO</option><option>Mockup</option><option>Scheduled</option><option>Published</option></select><input class="input" name="due" type="date"><select class="select" name="priority"><option>Normal</option><option>High</option><option>Low</option></select><textarea class="textarea full" name="notes" placeholder="Notes / Next action"></textarea><div class="full btn-row"><button class="btn" type="submit">บันทึก</button></div></div></form>`;
}
function renderRecords(type="product", label="Product Records"){
  const records = getStore("records", []).filter(r=>r.type===type).sort((a,b)=>(b.created||"").localeCompare(a.created||""));
  view.innerHTML = shell(label, label, "บันทึกงาน คอนเทนต์ สินค้า และ next action แบบ localStorage พร้อม export backup", `${recordForm(type)}<div class="card" style="margin-top:14px"><h3>Records</h3><div class="records">${records.length?records.map(r=>`<div class="record"><h4>${escapeHtml(r.title)}</h4><small>${r.status} • ${r.priority} • Due: ${r.due||'-'} • ${r.created}</small><p>${escapeHtml(r.notes||'')}</p><button class="btn danger" data-del="${r.id}">ลบ</button></div>`).join(""):'<p class="muted">ยังไม่มี record</p>'}</div></div>`);
  document.getElementById('recordForm').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const all = getStore("records", []); all.push({id:crypto.randomUUID(), type, title:f.get('title'), status:f.get('status'), due:f.get('due'), priority:f.get('priority'), notes:f.get('notes'), created:isoDate(bangkokNow())}); setStore("records", all); renderRecords(type,label); };
  document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{setStore("records", getStore("records", []).filter(r=>r.id!==b.dataset.del)); renderRecords(type,label);});
}
function escapeHtml(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function renderPlatform(key,title,desc){
  const links = {facebook:channelLinks.facebook,youtube:channelLinks.youtube,etsy:channelLinks.etsy,pinterest:channelLinks.pinterest};
  view.innerHTML = shell(title,title,desc,`<div class="grid grid-2"><a class="card link-card" href="${links[key]}" target="_blank"><h3>Open ${title}</h3><p class="muted">เปิดช่องทางจริง</p></a><div class="card"><h3>Workflow</h3>${platformRules.filter(r=> key==='youtube'?r.key==='yt':r.key===key || (key==='pinterest'&&r.key==='pin')).map(r=>`<p><span class="pill">${r.cadence}</span> <b>${r.title}</b><br><span class="muted">${r.note}</span></p>`).join("")}</div></div><div style="margin-top:14px" id="recordMount"></div>`);
  const mount = document.getElementById('recordMount');
  mount.innerHTML = recordForm(key);
  document.getElementById('recordForm').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const all=getStore("records",[]); all.push({id:crypto.randomUUID(), type:key, title:f.get('title'), status:f.get('status'), due:f.get('due'), priority:f.get('priority'), notes:f.get('notes'), created:isoDate(bangkokNow())}); setStore("records",all); renderPlatform(key,title,desc); };
}
function renderKdp(){
  view.innerHTML = shell("Publishing House", "KDP / Ebook", "KDP มี 2 slots ต่อเดือน วันที่ 14 และ 28 ส่วน Ebook มี 1 slot ต่อเดือน วันที่ 21", `<div class="grid grid-3">${platformRules.filter(r=>['kdp','ebook'].includes(r.key)).map(r=>`<div class="card"><h3>${r.title}</h3><p><span class="pill">${r.cadence}</span></p><p class="muted">${r.note}</p></div>`).join("")}</div><div style="margin-top:14px"></div>`);
}
function renderSeasonal(){
  const m = bangkokNow().getMonth()+1;
  view.innerHTML = shell("Seasonal Guide", "ไกด์เทศกาล / Monthly Focus", "ใช้เป็นเข็มทิศเลือกสินค้า คอนเทนต์ และ launch theme รายเดือน", `<div class="grid grid-3">${seasonalGuide.map(s=>`<div class="card" style="${s.m===m?'outline:3px solid rgba(47,143,100,.25)':''}"><h3>${s.m}. ${s.theme}</h3><p class="muted">${s.ideas}</p>${s.m===m?'<span class="pill">เดือนนี้</span>':''}</div>`).join("")}</div>`);
}
function renderGuide(){
  view.innerHTML = shell("Guide", "Life Next Operating System", "โครงนี้เป็น central brain สำหรับ planner + record + seasonal guide + future GPT integration", `<div class="grid grid-2"><div class="card"><h3>Daily</h3><p class="muted">Etsy 5 listings, Pinterest 3–5 pins, Facebook 1 post</p></div><div class="card"><h3>Weekly</h3><p class="muted">Shorts/Reels พุธ ศุกร์ อาทิตย์ และสร้าง Life Next product อย่างน้อย 1 ชิ้นต่อสัปดาห์</p></div><div class="card"><h3>Monthly</h3><p class="muted">KDP 2 slots/month, Ebook 1 slot/month, seasonal focus 1 theme</p></div><div class="card"><h3>Future</h3><p class="muted">ต่อ GPT / Supabase ได้ภายหลัง เมื่อ dashboard static เสถียรแล้ว</p></div></div>`);
}
function renderSettings(){
  view.innerHTML = shell("Settings", "Backup / Restore", "ข้อมูลติ๊กงานและ record เก็บใน browser localStorage ควร export backup เป็นระยะ", `<div class="grid grid-2"><div class="card"><h3>Export Backup</h3><p class="muted">ดาวน์โหลดข้อมูลเป็น JSON</p><button class="btn" id="exportBtn">Export JSON</button></div><div class="card"><h3>Import Backup</h3><input class="input" id="importFile" type="file" accept="application/json"><p class="footer-note">เลือกไฟล์ backup เดิมเพื่อ restore</p></div><div class="card"><h3>Reset</h3><p class="muted">ล้างข้อมูลใน browser นี้เท่านั้น</p><button class="btn danger" id="resetBtn">Reset Local Data</button></div><div class="card"><h3>Deploy Note</h3><p class="muted">เวอร์ชันนี้ไม่มี package.json เพื่อไม่ให้ Vercel เรียก npm install — จบศึก npm ไปก่อน 😭</p></div></div>`);
  document.getElementById('exportBtn').onclick=()=>{ const data={done:getStore('done',{}),records:getStore('records',[]),version:'v11-static',exportedAt:new Date().toISOString()}; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`life-next-backup-${isoDate(bangkokNow())}.json`; a.click(); };
  document.getElementById('importFile').onchange=e=>{ const file=e.target.files[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{try{const data=JSON.parse(reader.result); if(data.done)setStore('done',data.done); if(data.records)setStore('records',data.records); alert('Import สำเร็จ'); route();}catch{alert('ไฟล์ backup อ่านไม่ได้')}}; reader.readAsText(file); };
  document.getElementById('resetBtn').onclick=()=>{ if(confirm('ล้างข้อมูล localStorage ของ dashboard นี้?')){localStorage.removeItem(`${STORE_PREFIX}:done`);localStorage.removeItem(`${STORE_PREFIX}:records`);route();} };
}
function route(){
  const active = (location.hash || '#today').slice(1);
  renderNav(active);
  if(active==='today') return renderToday();
  if(active==='calendar') return renderCalendar();
  if(active==='facebook') return renderPlatform('facebook','Facebook','ห้องนั่งเล่นของแบรนด์: cozy post, calm mood, emotional connection');
  if(active==='youtube') return renderPlatform('youtube','YouTube Shorts','Mood engine: 10–20s calm visual storytelling และ reuse ไป Reels');
  if(active==='etsy') return renderPlatform('etsy','Etsy ByeTension','ร้านวอลอาร์ทหลัก 5 listings/day เวลา 21:30');
  if(active==='pinterest') return renderPlatform('pinterest','Pinterest','Traffic engine: 3–5 pins/day และ long-term search discovery');
  if(active==='kdp') return renderKdp();
  if(active==='products') return renderRecords('product','Product Records');
  if(active==='seasonal') return renderSeasonal();
  if(active==='guide') return renderGuide();
  if(active==='settings') return renderSettings();
  renderToday();
}
window.addEventListener('hashchange', route);
route();
