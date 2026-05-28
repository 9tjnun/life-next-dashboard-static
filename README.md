# Life Next Dashboard v11 — Static Vercel Safe Thai

เวอร์ชันนี้สร้างมาเพื่อแก้ปัญหา Vercel ค้างที่ `npm install` แบบจบทางเทคนิค

## สำคัญ
- ไม่มี `package.json`
- ไม่มี `package-lock.json`
- ไม่มี Next.js dependency
- ไม่มี npm install
- เป็น static HTML/CSS/JS ล้วน
- ใช้ localStorage สำหรับ checklist และ records
- ใช้เวลาไทย / Asia Bangkok logic

## Features
- Today dashboard
- Monthly calendar
- Recurring schedule
- Etsy daily 5 listings
- Pinterest daily 3–5 pins
- Facebook daily post
- Shorts/Reels Wed/Fri/Sun
- KDP 2 slots/month: วันที่ 14 และ 28
- Ebook 1 slot/month: วันที่ 21
- Product records
- Seasonal guide
- Export / import JSON backup

## Upload to GitHub
อัปไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น root repo:

- index.html
- styles.css
- app.js
- vercel.json
- README.md

ห้ามอัป package.json / package-lock.json จากเวอร์ชันเก่า

## Vercel Settings
Framework Preset: Other
Build Command: ว่าง
Install Command: ว่าง
Output Directory: ว่าง หรือ ./
