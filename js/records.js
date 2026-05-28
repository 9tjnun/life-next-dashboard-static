function facebookPage(){
  const records = recordsOf('facebook').sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const ready = records.filter(r => r.status === 'Ready').length;
  const posted = records.filter(r => r.status === 'Posted').length;
  const reuse = records.filter(r => r.status === 'Reuse Later').length;
  view.innerHTML = shell('Facebook', 'Facebook = ห้องนั่งเล่น', 'Project: Life Next Chapter / ลงแคปชั่นพักใจ คนแก่พักใจ slow life และเก็บ record ย้อนหลัง', `
    ${card('วิธีใช้สั้น ๆ', `<div class="grid grid-3"><div class="mini border-fb">1. ก๊อปแคปชั่นจากที่อื่นมาวาง</div><div class="mini border-fb">2. ตั้งสถานะ Ready / Posted</div><div class="mini border-fb">3. ถ้า stock ต่ำกว่า 3 วัน ให้สร้างเพิ่ม</div></div>`)}
    <div class="grid grid-3" style="margin-top:14px">${mini('พร้อมลง',ready,`${ready} วัน`,'border-fb')}${mini('ลงแล้ว',posted,'','border-kdp')}${mini('เก็บใช้ซ้ำ',reuse,'','border-seasonal')}</div>
    ${facebookForm()}
    ${facebookTable(records)}
  `);
  bindFacebook();
}
function facebookForm(){ return card('เพิ่มแคปชั่น', `<form id="facebookForm"><div class="form-grid-3"><input class="input" type="date" name="date" value="${todayKey()}"><input class="input" name="theme" placeholder="ธีม เช่น คนแก่พักใจ / cozy home"><select class="select" name="status"><option>Ready</option><option>Posted</option><option>Reuse Later</option></select></div><div style="margin-top:10px"><textarea class="textarea" name="caption" placeholder="วางแคปชั่นตรงนี้" required></textarea></div><div class="form-grid-3" style="margin-top:10px"><input class="input" name="imageNote" placeholder="รูปที่ใช้ / note"><input class="input" name="link" placeholder="ลิงก์โพสต์"><button class="btn" type="submit">บันทึก</button></div></form>`, 'style="margin-top:14px"'); }
function facebookTable(records){ return card('ประวัติแคปชั่น', `<div class="table-wrap"><table class="table"><thead><tr><th>วันที่</th><th>ธีม</th><th>แคปชั่น</th><th>สถานะ</th><th>จัดการ</th></tr></thead><tbody>${records.length?records.map(r=>`<tr><td>${h(r.date)}</td><td>${h(r.theme||'-')}</td><td class="notes">${h(r.caption)}<div class="muted" style="font-size:11px;margin-top:5px">${h(r.imageNote||'')} ${h(r.link||'')}</div></td><td>${pill(r.status, r.status==='Ready'?'fb':r.status==='Posted'?'kdp':'seasonal')}</td><td><div class="btn-row"><button class="btn light" data-patch="facebook:${r.id}:Ready">Ready</button><button class="btn light" data-patch="facebook:${r.id}:Posted">Posted</button><button class="btn danger" data-del="facebook:${r.id}">ลบ</button></div></td></tr>`).join(''):`<tr><td colspan="5" class="muted">ยังไม่มี record</td></tr>`}</tbody></table></div>`, 'style="margin-top:14px"'); }
function bindFacebook(){
  document.getElementById('facebookForm').onsubmit = e => { e.preventDefault(); const f=new FormData(e.target); const all=allRecords(); all.unshift({id:uid(), type:'facebook', date:f.get('date'), theme:f.get('theme'), status:f.get('status'), caption:f.get('caption'), imageNote:f.get('imageNote'), link:f.get('link')}); setRecords(all); facebookPage(); };
  bindRecordActions(facebookPage);
}

function youtubePage(){
  const records = recordsOf('youtube').sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const ready = records.filter(r => r.status === 'Ready').length;
  const posted = records.filter(r => r.status === 'Posted').length;
  const reelsPending = records.filter(r => r.status === 'Posted' && !r.reelsDone).length;
  view.innerHTML = shell('YouTube', 'YouTube Shorts = เครื่องสร้างอารมณ์', 'Project: Life Next Chapter / บันทึกคลิป hook รายละเอียด ลิงก์ และติ๊กว่าเอาไปลง Reels แล้วหรือยัง', `
    ${card('วิธีใช้สั้น ๆ', `<div class="grid grid-3"><div class="mini border-yt">1. บันทึกไอเดียคลิปหรือคลิปพร้อมลง</div><div class="mini border-yt">2. ตั้งสถานะ Idea / Ready / Posted</div><div class="mini border-yt">3. คลิปที่ Posted แล้วให้ติ๊ก Reels ด้วย</div></div>`)}
    <div class="grid grid-3" style="margin-top:14px">${mini('พร้อมลง',ready,`≈ ${Math.floor(ready/3)} สัปดาห์`,'border-yt')}${mini('ลงแล้ว',posted,'','border-kdp')}${mini('รอ Reels',reelsPending,'','border-seasonal')}</div>
    ${youtubeForm()}
    ${youtubeTable(records)}
  `);
  bindYoutube();
}
function youtubeForm(){ return card('เพิ่มคลิป', `<form id="youtubeForm"><div class="form-grid-4"><input class="input" type="date" name="date" value="${todayKey()}"><input class="input" name="title" placeholder="ชื่อคลิป" required><input class="input" name="hook" placeholder="Hook"><select class="select" name="status"><option>Idea</option><option>Ready</option><option>Posted</option></select></div><div style="margin-top:10px"><textarea class="textarea" name="details" placeholder="รายละเอียดคลิป / visual sequence / ไฟล์ที่ใช้"></textarea></div><div class="form-grid" style="margin-top:10px"><input class="input" name="youtubeLink" placeholder="ลิงก์ YouTube"><button class="btn" type="submit">บันทึก</button></div></form>`, 'style="margin-top:14px"'); }
function youtubeTable(records){ return card('ประวัติ YouTube', `<div class="table-wrap"><table class="table"><thead><tr><th>วันที่</th><th>ชื่อคลิป</th><th>Hook / Details</th><th>สถานะ</th><th>จัดการ</th></tr></thead><tbody>${records.length?records.map(r=>`<tr><td>${h(r.date)}</td><td><b>${h(r.title)}</b><div class="muted" style="font-size:11px">${h(r.youtubeLink||'')}</div></td><td class="notes"><b>${h(r.hook||'')}</b><div class="muted">${h(r.details||'')}</div></td><td>${pill(r.status, r.status==='Ready'?'yt':r.status==='Posted'?'kdp':'')}<br>${pill(r.reelsDone?'Reels แล้ว':'ยังไม่ Reels', r.reelsDone?'ok':'seasonal')}</td><td><div class="btn-row"><button class="btn light" data-patch="youtube:${r.id}:Ready">Ready</button><button class="btn light" data-patch="youtube:${r.id}:Posted">Posted</button><button class="btn light" data-reels="${r.id}">Reels</button><button class="btn danger" data-del="youtube:${r.id}">ลบ</button></div></td></tr>`).join(''):`<tr><td colspan="5" class="muted">ยังไม่มี record</td></tr>`}</tbody></table></div>`, 'style="margin-top:14px"'); }
function bindYoutube(){
  document.getElementById('youtubeForm').onsubmit = e => { e.preventDefault(); const f=new FormData(e.target); const all=allRecords(); all.unshift({id:uid(), type:'youtube', date:f.get('date'), title:f.get('title'), hook:f.get('hook'), details:f.get('details'), youtubeLink:f.get('youtubeLink'), reelsDone:false, status:f.get('status')}); setRecords(all); youtubePage(); };
  document.querySelectorAll('[data-reels]').forEach(b=>b.onclick=()=>{ const all=allRecords().map(r=>r.id===b.dataset.reels?{...r,reelsDone:!r.reelsDone}:r); setRecords(all); youtubePage(); });
  bindRecordActions(youtubePage);
}

function bindRecordActions(reRender){
  document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ const [,id] = b.dataset.del.split(':'); setRecords(allRecords().filter(r=>r.id!==id)); reRender(); });
  document.querySelectorAll('[data-patch]').forEach(b=>b.onclick=()=>{ const [type,id,status] = b.dataset.patch.split(':'); setRecords(allRecords().map(r=>r.id===id?{...r,status}:r)); reRender(); });
}
