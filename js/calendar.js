window.LN = window.LN || {};
LN.renderToday = () => {
  const fb = LN.loadArray(LN.keys.facebook), yt = LN.loadArray(LN.keys.youtube), prod = LN.loadArray(LN.keys.products), doneMap = LN.loadObject(LN.keys.calendarDone, {});
  const template = LN.weekTemplateFor(new Date()), season = LN.currentSeason(), today = LN.todayISO();
  const doneCount = template.tasks.filter(t=>doneMap[today]?.[t.id]).length;
  const progress = Math.round(doneCount / template.tasks.length * 100);
  const fbReady = fb.filter(r=>r.status==="Ready").length;
  const ytReady = yt.filter(r=>r.status==="Ready").length;
  const activeProducts = prod.filter(p=>["Idea","Creating","QA","Ready"].includes(p.status)).length;
  const taskCards = template.tasks.map(t=>{ const m=LN.platformMeta[t.platform]; const done=!!doneMap[today]?.[t.id]; return `<div class="task-card ${done?'done':''}"><div class="external-row"><span class="small ${m.color}">${m.label}</span>${LN.pill(done?'เสร็จแล้ว':'รอทำ', done?'soft-kdp c-kdp':'soft text-muted')}</div><div class="task-title">${t.title}</div><div class="task-detail">${t.detail}</div></div>`; }).join("");
  const body = `<div class="grid grid-main"><section class="card"><h2>รายงานวันนี้ตามปฏิทิน</h2><div class="grid" style="grid-template-columns:minmax(0,1fr) minmax(280px,360px)"><div><div class="small text-muted" style="text-transform:uppercase;letter-spacing:.16em">Today</div><h2 style="font-size:28px;margin:4px 0 0">${LN.thaiDate(new Date())}</h2><p class="small text-muted">${template.day} · ${template.focus}</p></div><div class="soft"><div class="small text-muted">ธีมเดือนนี้</div><div class="strong">${season.theme}</div><div class="tiny text-muted">${season.ideas}</div></div></div><div style="margin-top:16px"><div class="external-row small text-muted"><span>Progress จากปฏิทิน</span><span>${doneCount}/${template.tasks.length} done · ${progress}%</span></div><div class="progress"><div style="width:${progress}%"></div></div></div><div class="grid grid-3" style="margin-top:16px">${taskCards}</div></section><section class="card"><h2>ตารางชีวิตวันนี้</h2><div class="grid"><div class="task-card soft-kdp"><div class="task-title">09:00–14:30 · งานผลิต</div><div class="task-detail">${template.morning}</div></div><div class="task-card soft-product"><div class="task-title">21:00–00:00 · ลงงาน + บันทึก</div><div class="task-detail">${template.night}</div></div><div class="grid grid-2">${LN.mini('Facebook stock', fbReady, `${fbReady} วัน`)}${LN.mini('YouTube stock', ytReady, `≈ ${Math.floor(ytReady/LN.defaultStockTargets.youtubeWeeklyNeed)} สัปดาห์`)}</div></div></section></div><div class="grid grid-4">${LN.mini('FB Ready', fbReady, 'แคปชั่นพร้อมลง','left-fb')}${LN.mini('YT Ready', ytReady, 'Shorts พร้อมลง','left-yt')}${LN.mini('Active Product', activeProducts, 'โปรเจกต์กำลังทำ','left-kdp')}${LN.mini('Today Done', `${doneCount}/${template.tasks.length}`, 'ติ๊กในหน้าปฏิทิน','left-etsy')}</div>`;
  return `<div class="space-y">${LN.header('Dashboard v11.11 — Calendar Notes','วันนี้ต้องทำอะไร','หน้าแรกเป็นรายงานตามปฏิทินเท่านั้น ถ้าจะติ๊กงานให้ไปที่หน้าปฏิทิน')}${body}${LN.card('ลิงก์ช่องทางจริง', `<div class="logo-grid">${LN.logoLinkCard(LN.channelLinks.facebook,'Facebook','ห้องนั่งเล่น / คนแก่พักใจ','f','logo-facebook')}${LN.logoLinkCard(LN.channelLinks.youtube,'YouTube','Shorts / mood video','▶','logo-youtube')}${LN.logoLinkCard(LN.channelLinks.etsy,'Etsy ByeTension','วอลอาร์ท / 5 listings ต่อวัน','E','logo-etsy')}${LN.logoLinkCard(LN.channelLinks.pinterest,'Pinterest','3–5 pins ต่อวัน','P','logo-pinterest')}</div>`)}</div>`;
};
LN.calendarState = { viewDate: new Date(), selected: new Date() };
LN.renderCalendar = () => {
  const s=LN.calendarState, y=s.viewDate.getFullYear(), m=s.viewDate.getMonth(), doneMap=LN.loadObject(LN.keys.calendarDone, {}), notesMap=LN.loadObject(LN.keys.calendarNotes, {}), season=LN.currentSeason(s.viewDate);
  const first=new Date(y,m,1), count=new Date(y,m+1,0).getDate(), days=[]; for(let i=0;i<first.getDay();i++)days.push(null); for(let d=1;d<=count;d++)days.push(new Date(y,m,d)); while(days.length%7!==0)days.push(null);
  const cells = days.map((day,i)=>{
    if(!day)return `<div class="day-cell blank"></div>`;
    const t=LN.weekTemplateFor(day), key=LN.isoLocal(day), selected=key===LN.isoLocal(s.selected), today=key===LN.todayISO(), doneCount=t.tasks.filter(task=>doneMap[key]?.[task.id]).length, all=doneCount===t.tasks.length;
    const noteText = String(notesMap[key]?.note || "").trim();
    const noteIcon = noteText ? `<span class="note-pin" title="มีโน้ตที่ปักไว้">📝</span>` : "";
    const notePreview = noteText ? `<div class="note-preview" title="${LN.escape(noteText)}">${LN.escape(noteText)}</div>` : "";
    return `<button class="day-cell ${selected?'selected':''} ${today?'today':''} ${all?'all-done':''} ${noteText?'has-note':''}" data-date="${key}"><div class="day-head"><span class="day-num">${day.getDate()}</span><span class="day-icons">${noteIcon}<span class="check-dot">${all?'✓':''}</span></span></div><div class="tags">${t.tasks.map(task=>LN.platformPill(task.platform,!!doneMap[key]?.[task.id])).join('')}</div>${notePreview}<div class="tiny text-muted" style="margin-top:7px">${doneCount}/${t.tasks.length} tasks</div></button>`;
  }).join("");
  const st=LN.weekTemplateFor(s.selected), sk=LN.isoLocal(s.selected);
  const selectedNote = String(notesMap[sk]?.note || "");
  const detailTasks = st.tasks.map(task=>{ const meta=LN.platformMeta[task.platform]; const done=!!doneMap[sk]?.[task.id]; return `<button class="task-button ${done?'done':''}" data-task="${task.id}"><div class="row"><div class="left"><span class="tag tag-${task.platform} ${done?'done':''}">${meta.short}</span><div><div class="task-title">${task.title}</div><div class="task-detail">${task.detail}</div></div></div><span class="check-round">${done?'✓':''}</span></div></button>`; }).join("");
  return `<div class="space-y">${LN.header('Calendar','ปฏิทินรายเดือน','ติ๊กงานประจำวันในปฏิทิน ใช้เป็น daily execution tracker ของ Life Next Chapter')}
  <div class="grid grid-calendar"><section class="card"><h2>ปฏิทินรายเดือน</h2><div class="calendar-top"><button class="btn light" id="prevMonth">‹</button><div class="calendar-title"><h2>${LN.thaiMonth(s.viewDate)}</h2><p>${season.theme}</p></div><button class="btn light" id="nextMonth">›</button></div><div class="calendar-grid">${['อา','จ','อ','พ','พฤ','ศ','ส'].map(d=>`<div class="day-name">${d}</div>`).join('')}${cells}</div></section><section class="card"><div class="detail-head"><div><h2>รายละเอียดวันที่เลือก</h2><div class="small text-muted">วันที่เลือก</div></div><div class="detail-actions"><button class="btn light" id="clearDayBtn" title="ล้างเครื่องหมายติ๊กของวันเลือก">เคลียร์ออล</button></div></div><h2 style="font-size:28px;margin:4px 0 12px">${LN.thaiDate(s.selected)}</h2><div class="soft"><div class="strong">${st.day} · ${st.focus}</div><div class="small text-muted"><b>เช้า:</b> ${st.morning}</div><div class="small text-muted"><b>กลางคืน:</b> ${st.night}</div></div><div class="calendar-note-box"><div class="external-row"><div><div class="strong">หมายเหตุ / ปักหมุดโน้ต</div><div class="tiny text-muted">กรอกเรื่องที่อยากจำไว้ในวันนี้ ถ้ามีโน้ตจะขึ้นไอคอน 📝 ในตารางปฏิทิน</div></div><span class="note-pin big">📝</span></div><textarea id="calendarNoteInput" class="textarea note-textarea" placeholder="เช่น เตรียมไฟล์ KDP, เช็กงาน Etsy ร้านใหม่, ไอเดียคอนเทนต์วันนี้...">${LN.escape(selectedNote)}</textarea><div class="note-actions"><button class="btn" id="saveNoteBtn">บันทึกโน้ต</button><button class="btn light" id="clearNoteBtn">ล้างโน้ต</button></div></div><div style="margin-top:16px">${detailTasks}</div><div class="soft-seasonal" style="padding:12px;border-radius:18px;margin-top:16px"><div class="strong">Seasonal Guide</div><div class="tiny text-muted">${season.ideas}</div></div><div class="tags" style="margin-top:12px">${['facebook','youtube','etsy','pinterest','kdp','ebook'].map(k=>{const mm=LN.platformMeta[k];return `<span class="pill ${mm.soft} ${mm.color}"><span class="dot" style="background:${mm.dot}"></span>${mm.short}</span>`}).join('')}</div></section></div></div>`;
};
LN.bindCalendar = () => {
  const app=document.getElementById('app');
  const rerender=()=>LN.navigate('/calendar', false);
  app.querySelector('#prevMonth')?.addEventListener('click',()=>{const d=LN.calendarState.viewDate;LN.calendarState.viewDate=new Date(d.getFullYear(),d.getMonth()-1,1);rerender();});
  app.querySelector('#nextMonth')?.addEventListener('click',()=>{const d=LN.calendarState.viewDate;LN.calendarState.viewDate=new Date(d.getFullYear(),d.getMonth()+1,1);rerender();});
  app.querySelectorAll('.day-cell[data-date]').forEach(btn=>btn.addEventListener('click',()=>{LN.calendarState.selected=new Date(btn.dataset.date+'T00:00:00');LN.calendarState.viewDate=new Date(LN.calendarState.selected.getFullYear(),LN.calendarState.selected.getMonth(),1);rerender();}));
  app.querySelectorAll('.task-button[data-task]').forEach(btn=>btn.addEventListener('click',()=>{const key=LN.isoLocal(LN.calendarState.selected), id=btn.dataset.task, map=LN.loadObject(LN.keys.calendarDone,{}); map[key]={...(map[key]||{}),[id]:!(map[key]?.[id])}; LN.saveObject(LN.keys.calendarDone,map); rerender();}));
  app.querySelector('#saveNoteBtn')?.addEventListener('click',()=>{
    const key=LN.isoLocal(LN.calendarState.selected), input=app.querySelector('#calendarNoteInput'), notes=LN.loadObject(LN.keys.calendarNotes,{}), value=(input?.value||'').trim();
    if(value){ notes[key]={ note:value, updatedAt:new Date().toISOString() }; } else { delete notes[key]; }
    LN.saveObject(LN.keys.calendarNotes,notes);
    rerender();
  });
  app.querySelector('#calendarNoteInput')?.addEventListener('keydown',(e)=>{
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') app.querySelector('#saveNoteBtn')?.click();
  });
  app.querySelector('#clearNoteBtn')?.addEventListener('click',()=>{
    const key=LN.isoLocal(LN.calendarState.selected), notes=LN.loadObject(LN.keys.calendarNotes,{});
    if(notes[key]){ delete notes[key]; LN.saveObject(LN.keys.calendarNotes,notes); }
    rerender();
  });
  app.querySelector('#clearDayBtn')?.addEventListener('click',()=>{const key=LN.isoLocal(LN.calendarState.selected), map=LN.loadObject(LN.keys.calendarDone,{}); if(map[key]){ delete map[key]; LN.saveObject(LN.keys.calendarDone,map); } rerender();});
};
