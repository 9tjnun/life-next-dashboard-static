function taskList(date, mode='interactive'){
  const key = isoDate(date);
  const map = doneMap();
  const t = getWeekTemplate(date);
  let tasks = [...t.tasks];
  const day = date.getDate();
  if(day === 14) tasks.push({ id:'kdp-slot-1', platform:'kdp', title:'KDP Slot 1', detail:'Publishing slot วันที่ 14 / ทำหรือเตรียม KDP book' });
  if(day === 28) tasks.push({ id:'kdp-slot-2', platform:'kdp', title:'KDP Slot 2', detail:'Publishing slot วันที่ 28 / ทำหรือเตรียม KDP book' });
  if(day === 21) tasks.push({ id:'ebook-slot', platform:'ebook', title:'Ebook Slot', detail:'Ebook 1 slot / เดือน' });
  return `<div class="tasks">${tasks.map(task=>{
    const meta = platformMeta[task.platform] || platformMeta.neutral;
    const isDone = !!map[key]?.[task.id];
    return `<label class="task ${isDone?'done':''}"><input type="checkbox" data-date="${key}" data-task="${task.id}" ${isDone?'checked':''} ${mode==='readonly'?'disabled':''}/><div><div class="task-title">${h(task.title)} ${pill(meta.label, meta.cls)}</div><div class="task-meta">${h(task.detail)}</div></div></label>`;
  }).join('')}</div>`;
}
function bindCheckboxes(after=route){
  document.querySelectorAll('input[data-task]').forEach(cb => cb.onchange = () => {
    const map = doneMap();
    const d = cb.dataset.date;
    const id = cb.dataset.task;
    map[d] = {...(map[d] || {}), [id]: cb.checked};
    setDoneMap(map);
    after();
  });
}

function tasksForDate(date){
  const t = getWeekTemplate(date);
  const tasks = [...t.tasks];
  const day = date.getDate();
  if(day === 14) tasks.push({ id:'kdp-slot-1', platform:'kdp', title:'KDP Slot 1', detail:'Publishing slot วันที่ 14' });
  if(day === 28) tasks.push({ id:'kdp-slot-2', platform:'kdp', title:'KDP Slot 2', detail:'Publishing slot วันที่ 28' });
  if(day === 21) tasks.push({ id:'ebook-slot', platform:'ebook', title:'Ebook Slot', detail:'Ebook 1 slot / เดือน' });
  return tasks;
}

function renderToday(){
  const now = bangkokNow();
  const template = getWeekTemplate(now);
  const currentSeason = seasonalGuide.find(m => m.month === now.getMonth()+1) || seasonalGuide[0];
  const map = doneMap();
  const tasks = tasksForDate(now);
  const doneCount = tasks.filter(t => map[todayKey()]?.[t.id]).length;
  const progress = Math.round((doneCount / Math.max(tasks.length,1)) * 100);
  const fbReady = recordsOf('facebook').filter(r => r.status === 'Ready').length;
  const ytReady = recordsOf('youtube').filter(r => r.status === 'Ready').length;
  const activeProducts = recordsOf('product').filter(r => ['Idea','Creating','QA','Ready'].includes(r.status)).length;

  view.innerHTML = shell('Dashboard v11.1 — Static Full Detail', 'วันนี้ต้องทำอะไร', 'หน้าแรกเป็นรายงานตามปฏิทินเท่านั้น ถ้าจะติ๊กงานให้ไปที่หน้าปฏิทิน', `
    <div class="grid dash-grid">
      ${card('รายงานวันนี้ตามปฏิทิน', `
        <div class="grid grid-2">
          <div><div class="eyebrow muted">Today</div><h3 style="font-size:28px;margin:4px 0">${getThaiDate(now)}</h3><p class="muted"><b>${template.day}</b> · ${template.focus}</p></div>
          <div class="mini border-seasonal"><div class="label">ธีมเดือนนี้</div><div style="font-size:17px;font-weight:900;margin-top:5px">${currentSeason.theme}</div><div class="note">${currentSeason.ideas}</div></div>
        </div>
        <div style="margin-top:16px"><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:800;color:var(--muted);margin-bottom:7px"><span>Progress จากปฏิทิน</span><span>${doneCount}/${tasks.length} done · ${progress}%</span></div><div class="progress"><span style="width:${progress}%"></span></div></div>
        <div class="grid grid-3" style="margin-top:16px">${tasks.map(t => {
          const meta = platformMeta[t.platform] || platformMeta.neutral;
          const done = !!map[todayKey()]?.[t.id];
          return `<div class="mini ${done?'border-seasonal':''}"><div>${pill(meta.label, meta.cls)} ${pill(done?'เสร็จแล้ว':'รอทำ', done?'ok':'')}</div><div style="font-weight:900;margin-top:8px">${h(t.title)}</div><div class="note">${h(t.detail)}</div></div>`;
        }).join('')}</div>
      `)}
      ${card('ตารางชีวิตวันนี้', `
        <div class="mini border-kdp"><div style="font-weight:900">09:00–14:30 · งานผลิต</div><div class="note">${template.morning}</div></div>
        <div class="mini border-product" style="margin-top:10px"><div style="font-weight:900">21:00–00:00 · ลงงาน + บันทึก</div><div class="note">${template.night}</div></div>
        <div class="grid grid-2" style="margin-top:12px">${mini('Facebook stock',fbReady,`${fbReady} วัน`)}${mini('YouTube stock',ytReady,`≈ ${Math.floor(ytReady/defaultStockTargets.youtubeWeeklyNeed)} สัปดาห์`)}</div>
      `)}
    </div>
    <div class="grid grid-4" style="margin-top:14px">${mini('FB Ready',fbReady,'แคปชั่นพร้อมลง','border-fb')}${mini('YT Ready',ytReady,'Shorts พร้อมลง','border-yt')}${mini('Active Product',activeProducts,'โปรเจกต์กำลังทำ','border-kdp')}${mini('Today Done',`${doneCount}/${tasks.length}`,'ติ๊กในหน้าปฏิทิน','border-etsy')}</div>
    ${card('ลิงก์ช่องทางจริง', `<div class="grid grid-4"><a class="mini link-card border-fb" target="_blank" href="${channelLinks.facebook}"><b>Facebook</b><div class="note">ห้องนั่งเล่น / คนแก่พักใจ</div></a><a class="mini link-card border-yt" target="_blank" href="${channelLinks.youtube}"><b>YouTube</b><div class="note">Shorts / mood video</div></a><a class="mini link-card border-etsy" target="_blank" href="${channelLinks.etsy}"><b>Etsy ByeTension</b><div class="note">วอลอาร์ท / 5 listings ต่อวัน</div></a><a class="mini link-card border-pin" target="_blank" href="${channelLinks.pinterest}"><b>Pinterest</b><div class="note">3–5 pins ต่อวัน</div></a></div>`, 'style="margin-top:14px"')}
  `);
}

function renderCalendar(){
  const year = calCursor.getFullYear();
  const month = calCursor.getMonth();
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const days = [];
  for(let i=0;i<startDay;i++) days.push(null);
  for(let d=1;d<=count;d++) days.push(new Date(year, month, d));
  while(days.length % 7 !== 0) days.push(null);
  const currentSeason = seasonalGuide.find(m => m.month === month + 1) || seasonalGuide[0];
  const map = doneMap();
  const todayIso = todayKey();
  const selectedKey = isoDate(selectedDate);
  const selectedTemplate = getWeekTemplate(selectedDate);
  const cells = days.map((day,i)=>{
    if(!day) return `<div class="day" style="opacity:.45;cursor:default"></div>`;
    const key = isoDate(day);
    const tasks = tasksForDate(day);
    const doneCount = tasks.filter(t => map[key]?.[t.id]).length;
    const allDone = doneCount === tasks.length;
    return `<div class="day ${key===todayIso?'today':''} ${key===selectedKey?'selected':''} ${allDone?'allDone':''}" data-select-date="${key}"><div class="day-num">${day.getDate()} ${allDone?'✓':''}</div>${tasks.slice(0,5).map(t=>`<span class="tag ${(platformMeta[t.platform]||platformMeta.neutral).cls}">${(platformMeta[t.platform]||platformMeta.neutral).short}</span>`).join('')}</div>`;
  }).join('');
  view.innerHTML = shell('Calendar', 'ปฏิทินกดดูงานรายวัน', 'แต่ละวันใช้แท็กสีเล็ก ๆ บอกงาน ไม่รกตา กดวันที่เพื่อดูรายละเอียดและติ๊กงานที่เสร็จได้ ถ้าเสร็จครบทั้งวัน ช่องวันนั้นจะเป็นสีเขียว', `
    <div class="grid dash-grid">
      ${card('ปฏิทินรายเดือน', `<div class="calendar-head"><button class="btn light" id="prevM">← เดือนก่อน</button><div style="text-align:center"><h3 style="margin:0;font-size:26px">${calCursor.toLocaleString('th-TH',{month:'long',year:'numeric'})}</h3><p class="muted" style="margin:0">${currentSeason.theme}</p></div><button class="btn light" id="nextM">เดือนถัดไป →</button></div><div class="calendar">${['อา','จ','อ','พ','พฤ','ศ','ส'].map(d=>`<div class="dow">${d}</div>`).join('')}${cells}</div>`)}
      ${card('รายละเอียดวันที่เลือก', `<div class="mini border-seasonal"><div class="label">Selected</div><div style="font-size:20px;font-weight:900;margin-top:5px">${getThaiDate(selectedDate)}</div><div class="note">${selectedTemplate.day} · ${selectedTemplate.focus}</div></div><div style="margin-top:12px">${taskList(selectedDate)}</div>`)}
    </div>
  `);
  document.getElementById('prevM').onclick = () => { calCursor = new Date(year, month-1, 1); renderCalendar(); };
  document.getElementById('nextM').onclick = () => { calCursor = new Date(year, month+1, 1); renderCalendar(); };
  document.querySelectorAll('[data-select-date]').forEach(el => el.onclick = () => { const [y,m,d]=el.dataset.selectDate.split('-').map(Number); selectedDate = new Date(y,m-1,d); renderCalendar(); });
  bindCheckboxes(renderCalendar);
}
