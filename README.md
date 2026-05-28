# Life Next Dashboard v11.2 — Static Organized Thai

เวอร์ชั่นนี้เป็น static website เหมือน v11.1 แต่แยกไฟล์ให้แก้ง่ายกว่าเดิม โดยยังไม่ใช้ npm / Next.js / package.json เพื่อให้ Vercel deploy ได้ง่ายและไม่ติด npm install

## โครงไฟล์

- `index.html` — โครงหน้าเว็บและ script order
- `css/styles.css` — ดีไซน์ สี layout responsive
- `js/data.js` — ข้อมูลหลัก เช่น ตาราง weekly, seasonal guide, project map, channel links
- `js/utils.js` — helper functions, storage, card/pill rendering, nav
- `js/calendar.js` — Today dashboard, calendar, recurring schedule, checkbox tasks
- `js/records.js` — Facebook records, YouTube records, record actions
- `js/pages.js` — Etsy, Pinterest, KDP, Products, Seasonal, Guide, Settings, Backup/Restore
- `js/router.js` — hash routing และเริ่มเว็บ
- `vercel.json` — static deploy config

## วิธีอัป GitHub

อัปทั้งโฟลเดอร์/ไฟล์เหล่านี้เข้า root repo:

- `index.html`
- `css/`
- `js/`
- `vercel.json`
- `README.md`

ห้ามอัป `package.json`, `package-lock.json`, `node_modules`, `.next` กลับเข้าไป เพราะเวอร์ชั่นนี้ตั้งใจไม่ใช้ npm install

## Vercel Settings

- Framework Preset: Other
- Install Command: เว้นว่าง
- Build Command: เว้นว่าง
- Output Directory: เว้นว่าง หรือ `./`

## Notes

- ข้อมูลบันทึกอยู่ใน localStorage ของ browser
- Export/Import JSON ได้ในหน้า Settings
- STORE_PREFIX ยังใช้ `life-next-v11-full` เพื่อให้ข้อมูลจาก v11.1 ยังต่อเนื่องได้
