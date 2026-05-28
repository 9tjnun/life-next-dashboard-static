function etsyPage(){
  view.innerHTML = shell('Etsy', 'Etsy = ร้านขายไฟล์', 'ByeTension ลงวอลอาร์ทวันละ 5 listings เวลา 21:30 ไม่ต้องกรอกราย listing ในเว็บ ใช้หน้า Calendar ติ๊กงานพอ', `
    <a class="card link-card border-etsy" href="${channelLinks.etsy}" target="_blank"><h3>เปิด Etsy ByeTension</h3><p class="muted">ร้านจริง</p></a>
    <div class="grid grid-3" style="margin-top:14px">${mini('เป้าหมาย','5','listings/วัน','border-etsy')}${mini('เวลา','21:30','อัปโหลดทุกวัน','border-etsy')}${mini('Record','Calendar','ติ๊กในหน้าปฏิทิน')}</div>
    ${card('Project Context', `<p class="muted"><b style="color:var(--ink)">ByeTension</b> = ร้านวอลอาร์ท / printable wall art / ใช้ Etsy ขายหลัก และ Pinterest ดันทราฟฟิก ส่วน Life Next Printable Shop ค่อยเปิดเมื่อมีสินค้า 5–10 ชิ้น</p>`, 'style="margin-top:14px"')}
  `);
}
function pinterestPage(){
  view.innerHTML = shell('Pinterest', 'Pinterest = ป้ายบอกทาง', 'ลง 3–5 pins ต่อวันเพื่อดัน traffic ไป Etsy/KDP ไม่ต้องกรอกราย pin ตอนนี้', `
    <a class="card link-card border-pin" href="${channelLinks.pinterest}" target="_blank"><h3>เปิด Pinterest ByeTension</h3><p class="muted">ช่องจริง</p></a>
    <div class="grid grid-3" style="margin-top:14px">${mini('เป้าหมาย','3–5','pins/วัน','border-pin')}${mini('ใช้ภาพ','Reuse','wall art / mockup / preview','border-pin')}${mini('Record','Calendar','ติ๊กในหน้าปฏิทิน')}</div>
    ${card('Project Context', `<p class="muted">Pinterest ใช้กับ ByeTension และ Life Next เป็นสาย search ต้องใช้ภาพอ่านง่ายและ keyword ชัด</p>`, 'style="margin-top:14px"')}
  `);
}
function kdpPage(){
  view.innerHTML = shell('KDP', 'KDP = สำนักพิมพ์', 'สมุดเกม planner journal coloring book และ mini guide ระยะยาว ใช้ Product Planner เป็นตัวคุมสถานะ', `
    <div class="grid grid-3">${mini('KDP Slot 1','วันที่ 14','2 slots/month','border-kdp')}${mini('Ebook Slot','วันที่ 21','1 slot/month','border-seasonal')}${mini('KDP Slot 2','วันที่ 28','2 slots/month','border-kdp')}</div>
    <div style="margin-top:14px">${productRecordsBlock('kdp')}</div>
  `);
  bindProduct('kdp');
}
function productsPage(){
  view.innerHTML = shell('Product Planner', 'KDP / Planner / Checklist / Ebook', 'คุมโปรเจกต์ใหญ่ เช่น Cozy Brain Games, Life Next Planner, Life Next Guides และสินค้า Etsy PDF ในอนาคต', `
    ${card('โฟกัสแรก', `<div class="grid grid-4"><div class="mini border-kdp">Cozy Brain Games</div><div class="mini border-kdp">Flower Garden Edition</div><div class="mini border-kdp">48–60 หน้า</div><div class="mini border-kdp">8.5 x 11 / large print</div></div>`)}
    <div style="margin-top:14px">${productRecordsBlock('product')}</div>
  `);
  bindProduct('product');
}
function productRecordsBlock(pageType){
  const records = recordsOf('product').sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const active = records.filter(r=>['Idea','Creating','QA','Ready'].includes(r.status)).length;
  const published = records.filter(r=>r.status==='Published').length;
  const ready = records.filter(r=>r.status==='Ready').length;
  return `<div class="grid grid-3">${mini('Active',active,'','border-product')}${mini('Ready',ready,'','border-seasonal')}${mini('Published',published,'','border-kdp')}</div>
    ${productForm()}
    ${productTable(records)}`;
}
function productForm(){ return card('เพิ่มโปรเจกต์', `<form id="productForm"><div class="form-grid-4"><input class="input" type="date" name="date" value="${todayKey()}"><select class="select" name="project"><option>Cozy Brain Games</option><option>Life Next Planner</option><option>Life Next Guides</option><option>ByeTension</option></select><select class="select" name="platform"><option>KDP</option><option>Etsy PDF</option><option>Etsy ByeTension</option><option>Both KDP + Etsy</option></select><select class="select" name="status"><option>Idea</option><option>Creating</option><option>QA</option><option>Ready</option><option>Published</option><option>Promoted</option></select></div><div class="form-grid-3" style="margin-top:10px"><input class="input" name="productName" placeholder="ชื่อสินค้า / โปรเจกต์" required><input class="input" name="theme" placeholder="Theme"><input class="input" name="link" placeholder="Link"></div><div style="margin-top:10px"><textarea class="textarea" name="notes" placeholder="Notes / จำนวนหน้า / สิ่งที่ต้องทำต่อ"></textarea></div><div style="margin-top:10px"><button class="btn" type="submit">บันทึก</button></div></form>`, 'style="margin-top:14px"'); }
function productTable(records){ return card('Product Pipeline', `<div class="table-wrap"><table class="table"><thead><tr><th>โปรเจกต์</th><th>สินค้า</th><th>Theme/Notes</th><th>สถานะ</th><th>จัดการ</th></tr></thead><tbody>${records.length?records.map(r=>`<tr><td><b>${h(r.project)}</b><div class="muted" style="font-size:11px">${h(r.platform)}</div></td><td><b>${h(r.productName)}</b><div class="muted" style="font-size:11px">${h(r.link||'')}</div></td><td class="notes">${h(r.theme||'')}<div class="muted">${h(r.notes||'')}</div></td><td>${pill(r.status, r.status==='Published'?'kdp':r.status==='Ready'?'seasonal':r.status==='Creating'?'product':'')}</td><td><div class="btn-row">${['Idea','Creating','QA','Ready','Published'].map(s=>`<button class="btn light" data-patch="product:${r.id}:${s}">${s}</button>`).join('')}<button class="btn danger" data-del="product:${r.id}">ลบ</button></div></td></tr>`).join(''):`<tr><td colspan="5" class="muted">ยังไม่มี project record</td></tr>`}</tbody></table></div>`, 'style="margin-top:14px"'); }
function bindProduct(pageType){
  document.getElementById('productForm').onsubmit = e => { e.preventDefault(); const f=new FormData(e.target); const all=allRecords(); all.unshift({id:uid(), type:'product', date:f.get('date'), project:f.get('project'), platform:f.get('platform'), status:f.get('status'), productName:f.get('productName'), theme:f.get('theme'), notes:f.get('notes'), link:f.get('link')}); setRecords(all); pageType==='kdp'?kdpPage():productsPage(); };
  bindRecordActions(()=> pageType==='kdp'?kdpPage():productsPage());
}

function seasonalPage(){
  const m = bangkokNow().getMonth()+1;
  view.innerHTML = shell('Seasonal Guide', 'ไกด์เทศกาล / ธีมรายเดือน', 'ใช้หาไอเดียให้ถูกฤดูกาล ว่าเดือนไหนควรลงธีมอะไร', `${card('Seasonal Calendar', `<div class="grid grid-3">${seasonalGuide.map(s=>`<div class="mini season-card ${s.month===m?'current':''}"><div style="display:flex;justify-content:space-between;gap:8px"><b style="font-size:18px">${s.monthName}</b>${s.month===m?pill('เดือนนี้','ok'):''}</div><div style="margin-top:6px;font-weight:900;color:var(--seasonal)">${s.theme}</div><div class="note">${s.ideas}</div></div>`).join('')}</div>`)}`);
}
function guidePage(){
  view.innerHTML = shell('Project Guide', 'รายละเอียดโครงการทั้งหมด', 'ดูให้ชัดว่างานแต่ละอย่างเป็นของโปรเจกต์ไหน ลงช่องทางไหน ร้านไหน และทำไปเพื่ออะไร', `
    ${card('Project Map', `<div class="grid grid-3">${projectMap.map(p=>{ const meta = platformMeta[p.platform] || platformMeta.neutral; return `<div class="mini border-${p.platform==='facebook'?'fb':p.platform}"><b style="font-size:18px">${p.project}</b><div style="margin-top:5px">${pill(p.channels, meta.cls)}</div><p><b>${p.role}</b></p><p class="muted">${p.whatToDo}</p></div>`}).join('')}</div>`)}
    ${card('Long-Term Content System', `<div class="grid grid-4"><div class="mini">1 KDP book</div><div class="mini">1 Etsy printable listing</div><div class="mini">20 Pinterest pins</div><div class="mini">5 YouTube Shorts + 5 Facebook posts</div></div>`, 'style="margin-top:14px"')}
  `);
}
function settingsPage(){
  view.innerHTML = shell('Settings', 'ตั้งค่าเว็บ / Backup', 'เวอร์ชันนี้ไม่มี AI ใช้ localStorage บันทึก record ใน browser เครื่องนี้', `
    <div class="grid grid-2">
      ${card('สถานะระบบ', `<p>✅ ไม่มี OpenAI API ในเว็บนี้</p><p>✅ ไม่ต้องตั้งค่า API key</p><p>✅ Facebook / YouTube / Product records บันทึกในเครื่องนี้</p><p>✅ Calendar task done บันทึกในเครื่องนี้</p><p>⚠️ ถ้าล้าง browser data ข้อมูล localStorage จะหาย</p><p>ต่อไปถ้าต้องใช้หลายเครื่อง ค่อยต่อ Supabase</p>`)}
      ${card('Deploy Note', `<p class="muted">Static Vercel Safe: ไม่มี package.json / ไม่มี npm install / ไม่มี Next.js dependency เพื่อให้เว็บเปิดได้ก่อนแบบไม่ทะเลาะกับ Vercel</p>`)}
      ${card('Export Backup', `<p class="muted">ดาวน์โหลดข้อมูลทั้งหมดเป็น JSON</p><button class="btn" id="exportBtn">Export JSON</button>`)}
      ${card('Import Backup', `<input class="input" id="importFile" type="file" accept="application/json"><p class="footer-note">เลือกไฟล์ backup เดิมเพื่อ restore</p>`)}
      ${card('Reset', `<p class="muted">ล้างข้อมูลใน browser นี้เท่านั้น</p><button class="btn danger" id="resetBtn">Reset Local Data</button>`)}
    </div>
  `);
  document.getElementById('exportBtn').onclick=()=>{ const data={calendarDone:doneMap(),records:allRecords(),version:VERSION,exportedAt:new Date().toISOString()}; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`life-next-backup-${todayKey()}.json`; a.click(); };
  document.getElementById('importFile').onchange=e=>{ const file=e.target.files[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{try{const data=JSON.parse(reader.result); if(data.calendarDone)setDoneMap(data.calendarDone); if(data.records)setRecords(data.records); alert('Import สำเร็จ'); route();}catch{alert('ไฟล์ backup อ่านไม่ได้')}}; reader.readAsText(file); };
  document.getElementById('resetBtn').onclick=()=>{ if(confirm('ล้างข้อมูล localStorage ของ dashboard นี้?')){localStorage.removeItem(`${STORE_PREFIX}:calendarDone`);localStorage.removeItem(`${STORE_PREFIX}:records`);route();} };
}
