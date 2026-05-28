# Life Next Dashboard v11.3 Static Faithful v10.8 Thai

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
