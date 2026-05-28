# Life Next Dashboard v11.5 Wide All Pages v10.8 Thai

เวอร์ชั่นนี้ทำเพื่อให้หน้าตาและรายละเอียดใกล้ v10.8 มากที่สุด แต่ไม่ใช้ Next.js / npm / package.json เพื่อให้ Vercel deploy แบบ Static ได้ทันที

## ไฟล์ที่ต้องอัปขึ้น GitHub
- index.html
- css/
- js/
- vercel.json
- README.md

ห้ามอัป package.json, package-lock.json, node_modules, app/, components/, lib/ กลับเข้ามาใน repo static นี้

## โครงสร้าง
- js/data.js = ข้อมูล schedule, seasonal guide, project map, links
- js/storage.js = localStorage + backup/restore
- js/ui.js = sidebar, card, button, table helper
- js/calendar.js = Today dashboard + Calendar + recurring schedule
- js/records.js = Facebook / YouTube / Product records
- js/pages.js = Etsy / Pinterest / Seasonal / Guide / Settings
- js/router.js = จัดการหน้าและเมนู


## v11.5 Update
- Widened the main content area so dashboard/calendar pages feel less squeezed.
- Added colored logo-style channel link cards on the Today page.
- Kept static deployment: no npm install, no package.json, no Next.js build.


## v11.5 Update
- Expanded the main content area globally across all pages.
- Calendar now uses a wider left panel and taller day cells for easier viewing.
- Sidebar is slightly narrower and page max-width is removed for full desktop width.
- Homepage logo link cards remain platform-colored.
