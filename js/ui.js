window.LN = window.LN || {};
LN.escape = (v="") => String(v).replace(/[&<>"]/g, s => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[s]));
LN.todayISO = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
LN.isoLocal = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
LN.thaiDate = d => new Intl.DateTimeFormat("th-TH",{dateStyle:"full"}).format(d);
LN.thaiMonth = d => new Intl.DateTimeFormat("th-TH",{month:"long",year:"numeric"}).format(d);
LN.sundayOfMonth = d => d.getDay() === 0 ? Math.ceil(d.getDate() / 7) : 0;
LN.weekTemplateFor = d => {
  const base = LN.weeklyTemplate.find(x=>x.dayIndex===d.getDay()) || LN.weeklyTemplate[0];
  const template = { ...base, tasks: [...base.tasks] };
  const sunday = LN.sundayOfMonth(d);
  if (sunday === 2 || sunday === 4) {
    template.focus = sunday === 2 ? "KDP + Life Next Etsy Publish Slot 1" : "KDP + Life Next Etsy Publish Slot 2";
    template.tasks.push(
      { id: `kdp-publish-s${sunday}`, platform: "kdp", title: `KDP publish slot ${sunday === 2 ? "1" : "2"}`, detail: `ลง/เตรียมปล่อย KDP รอบวันอาทิตย์ที่ ${sunday} ของเดือน` },
      { id: `life-next-etsy-publish-s${sunday}`, platform: "etsy", title: `Life Next Etsy shop slot ${sunday === 2 ? "1" : "2"}`, detail: `ลงสินค้า Etsy ร้านใหม่ / printable shop รอบวันอาทิตย์ที่ ${sunday} ของเดือน` }
    );
  }
  if (sunday === 3) {
    template.focus = "Ebook Publish Slot";
    template.tasks.push({ id: "ebook-publish-s3", platform: "ebook", title: "Ebook publish slot", detail: "ลง ebook / mini guide 1 เล่ม รอบวันอาทิตย์ที่ 3 ของเดือน" });
  }
  return template;
};
LN.currentSeason = (d=new Date()) => LN.seasonalGuide.find(m=>m.month===d.getMonth()+1) || LN.seasonalGuide[0];
LN.header = (eyebrow,title,desc) => `<header class="page-header"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></header>`;
LN.card = (title, body, cls="") => `<section class="card ${cls}"><h2>${title}</h2>${body}</section>`;
LN.mini = (label,value,note="",cls="") => `<div class="mini ${cls}"><div class="label">${label}</div><div class="value">${value}</div>${note?`<div class="note">${note}</div>`:""}</div>`;
LN.pill = (text, cls="soft text-muted") => `<span class="pill ${cls}">${text}</span>`;
LN.platformPill = (platform, done=false) => { const m=LN.platformMeta[platform]||LN.platformMeta.neutral; return `<span class="tag tag-${platform} ${done?'done':''}">${m.short}</span>`; };
LN.externalCard = (href,title,desc,cls="") => `<a class="external-card ${cls}" href="${href}" target="_blank" rel="noreferrer"><div class="external-row"><div><h3>${title}</h3><p>${desc}</p></div><span class="text-muted">↗</span></div></a>`;
LN.logoLinkCard = (href,title,desc,mark,cls="logo-facebook") => `<a class="logo-card ${cls}" href="${href}" target="_blank" rel="noreferrer"><div class="logo-content"><div class="logo-badge"><div class="logo-mark">${mark}</div></div><div class="logo-text"><h3>${title}</h3><p>${desc}</p></div><span class="logo-open">↗</span></div></a>`;
LN.input = (name,value="",placeholder="",type="text",extra="") => `<input class="input" name="${name}" type="${type}" value="${LN.escape(value)}" placeholder="${placeholder}" ${extra}/>`;
LN.textarea = (name,value="",placeholder="") => `<textarea class="textarea" name="${name}" placeholder="${placeholder}">${LN.escape(value)}</textarea>`;
LN.select = (name, options, selected="") => `<select class="select" name="${name}">${options.map(o=>`<option ${o===selected?'selected':''}>${o}</option>`).join("")}</select>`;
LN.renderSidebar = () => {
  const links = LN.menu.map(i=>`<a class="${i.cls}" href="${i.href}" data-route="${i.href.slice(1)}"><span>${i.icon}</span><span>${i.label}</span></a>`).join("");
  document.getElementById("sidebar").innerHTML = `<div class="brand-card"><div class="eyebrow">Life Next</div><h1>Planner v11.11</h1><p>Calendar notes</p></div><nav class="nav">${links}</nav><div class="sidebar-links logo-sidebar-links"><b>ลิงก์ช่องทาง</b><div class="side-logo-grid"><a class="side-logo side-etsy" href="${LN.channelLinks.etsy}" target="_blank"><span class="side-logo-mark">E</span><span><strong>Etsy</strong><em>ByeTension</em></span></a><a class="side-logo side-pin" href="${LN.channelLinks.pinterest}" target="_blank"><span class="side-logo-mark">P</span><span><strong>Pinterest</strong><em>Traffic pins</em></span></a><a class="side-logo side-yt" href="${LN.channelLinks.youtube}" target="_blank"><span class="side-logo-mark">▶</span><span><strong>YouTube</strong><em>Shorts</em></span></a><a class="side-logo side-fb" href="${LN.channelLinks.facebook}" target="_blank"><span class="side-logo-mark">f</span><span><strong>Facebook</strong><em>Living room</em></span></a></div></div>`;
};
LN.setActiveNav = route => document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("active", a.dataset.route===route));
LN.platformColorClass = status => status==="Published"||status==="Posted"?"soft-kdp c-kdp":status==="Ready"?"soft-seasonal c-seasonal":status==="Creating"?"soft-product c-product":"soft text-muted";
