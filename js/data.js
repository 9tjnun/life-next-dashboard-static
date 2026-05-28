const TZ = "Asia/Bangkok";
const VERSION = "v11.2 Static Organized";
const STORE_PREFIX = "life-next-v11-full";

const channelLinks = {
  pinterest: "https://www.pinterest.com/byetension/",
  etsy: "https://www.etsy.com/shop/ByeTension",
  youtube: "https://www.youtube.com/@LifeNextChapterCozy",
  facebook: "https://www.facebook.com/LifeNextChapter/"
};

const navItems = [
  ["today", "วันนี้", ""],
  ["calendar", "ปฏิทิน", ""],
  ["facebook", "Facebook", "fb"],
  ["youtube", "YouTube", "yt"],
  ["etsy", "Etsy", "etsy"],
  ["pinterest", "Pinterest", "pin"],
  ["kdp", "KDP", "kdp"],
  ["products", "Product", ""],
  ["seasonal", "Seasonal", ""],
  ["guide", "Guide", ""],
  ["settings", "Settings", ""]
];

const platformMeta = {
  facebook: { label: "Facebook", short: "FB", cls: "fb", color: "var(--fb)" },
  youtube: { label: "YouTube", short: "YT", cls: "yt", color: "var(--yt)" },
  etsy: { label: "Etsy", short: "Etsy", cls: "etsy", color: "var(--etsy)" },
  pinterest: { label: "Pinterest", short: "Pin", cls: "pin", color: "var(--pin)" },
  kdp: { label: "KDP", short: "KDP", cls: "kdp", color: "var(--kdp)" },
  product: { label: "Product", short: "Prod", cls: "product", color: "var(--product)" },
  ebook: { label: "Ebook", short: "Ebook", cls: "ok", color: "var(--seasonal)" },
  neutral: { label: "General", short: "Gen", cls: "", color: "var(--muted)" }
};

const dailyCore = [
  { id: "facebook-post", platform: "facebook", title: "Facebook post", detail: "ลงแคปชั่นพักใจ 1 โพสต์" },
  { id: "etsy-5", platform: "etsy", title: "Etsy 5 listings", detail: "ลง ByeTension 5 listings เวลา 21:30" },
  { id: "pinterest-pins", platform: "pinterest", title: "Pinterest pins", detail: "ลง 3–5 pins" }
];

const weeklyTemplate = [
  { dayIndex: 1, day: "จันทร์", focus: "Wall Art + Full Platform Day", morning: "ทำ wall art / mockup / SEO / เตรียม listing", night: "ลง ByeTension 5 listings เวลา 21:30 + บันทึกงาน", tasks: [...dailyCore, { id: "kdp-work", platform: "kdp", title: "KDP / book work", detail: "ทำ activity book / planner 5–10 หน้า" }] },
  { dayIndex: 2, day: "อังคาร", focus: "Activity Book / Product", morning: "ทำหน้า activity book 5–10 หน้า หรือวางธีมเล่ม", night: "ลง Etsy 5 listings + จด record", tasks: [...dailyCore, { id: "kdp-work", platform: "kdp", title: "KDP / book work", detail: "ทำ Cozy Brain Games หรือ activity book" }] },
  { dayIndex: 3, day: "พุธ", focus: "Shorts + Reels", morning: "เตรียม short video / เลือกภาพ / ทำ caption", night: "ลง Shorts 1 คลิป + Reels + Etsy 5 listings", tasks: [...dailyCore, { id: "youtube-short", platform: "youtube", title: "YouTube Short", detail: "ลง Shorts 1 คลิป" }] },
  { dayIndex: 4, day: "พฤหัส", focus: "Planner / Checklist", morning: "ทำ checklist หรือ planner printable 1 ชิ้น", night: "ลง Etsy 5 listings + บันทึก record", tasks: [...dailyCore, { id: "product-printable", platform: "product", title: "Printable work", detail: "ทำ checklist หรือ planner printable 1 ชิ้น" }] },
  { dayIndex: 5, day: "ศุกร์", focus: "QA + Shorts", morning: "ตรวจไฟล์ SEO mockup listing package", night: "ลง Shorts 1 คลิป + Etsy 5 listings", tasks: [...dailyCore, { id: "youtube-short", platform: "youtube", title: "YouTube Short", detail: "ลง Shorts 1 คลิป" }, { id: "qa-files", platform: "product", title: "QA files", detail: "ตรวจไฟล์ / SEO / mockup" }] },
  { dayIndex: 6, day: "เสาร์", focus: "Batch + Distribute", morning: "งานเบา / จัด Pinterest batch ถ้ามีแรง", night: "ลง Etsy 5 listings + Facebook post", tasks: [...dailyCore, { id: "batch-content", platform: "product", title: "Batch content", detail: "เตรียม stock คอนเทนต์ล่วงหน้า" }] },
  { dayIndex: 0, day: "อาทิตย์", focus: "Review + Plan", morning: "รีวิวสัปดาห์ / เติม stock ที่ใกล้หมด", night: "เตรียมแผนสัปดาห์หน้า + Etsy 5 listings", tasks: [...dailyCore, { id: "youtube-short", platform: "youtube", title: "YouTube Short", detail: "ลง Shorts หรือเตรียมคลิปสัปดาห์หน้า" }, { id: "weekly-review", platform: "kdp", title: "Weekly review", detail: "เช็ก KDP/Product/Planner pipeline" }] }
];

const seasonalGuide = [
  { month: 1, monthName: "มกราคม", theme: "New Year Reset", ideas: "planner, habit tracker, fresh start, reset checklist" },
  { month: 2, monthName: "กุมภาพันธ์", theme: "Love & Home", ideas: "self-love, cozy home, couple gift, soft floral" },
  { month: 3, monthName: "มีนาคม", theme: "Spring Garden", ideas: "flowers, garden, renewal, spring activity pages" },
  { month: 4, monthName: "เมษายน", theme: "Easter / Cottage Bloom", ideas: "cottage bloom, floral, Easter calm, soft colors" },
  { month: 5, monthName: "พฤษภาคม", theme: "Mother’s Day / Garden Life", ideas: "gift, flowers, gratitude, mother’s day printable" },
  { month: 6, monthName: "มิถุนายน", theme: "Summer Seasonal Launch", ideas: "summer wall art, travel, cottage garden, slow mornings" },
  { month: 7, monthName: "กรกฎาคม", theme: "Travel Memories", ideas: "travel window view, seaside, vacation memory, slow travel" },
  { month: 8, monthName: "สิงหาคม", theme: "Cozy Home Reset", ideas: "home planner, cottage room, declutter checklist, cozy corner" },
  { month: 9, monthName: "กันยายน", theme: "Autumn Prep", ideas: "fall decor, gratitude sheet, autumn wall art, warm routine" },
  { month: 10, monthName: "ตุลาคม", theme: "Cozy Fall", ideas: "tea, pumpkins, leaves, indoor hobbies, fall coloring book" },
  { month: 11, monthName: "พฤศจิกายน", theme: "Gratitude", ideas: "Thanksgiving, gratitude journal, family calm, thankful prompts" },
  { month: 12, monthName: "ธันวาคม", theme: "Christmas Calm", ideas: "soft holiday, winter calm, Christmas activity book, cozy gifts" }
];

const projectMap = [
  { project: "ByeTension", channels: "Etsy + Pinterest", role: "ร้านวอลอาร์ท / printable wall art", whatToDo: "ลง wall art วันละ 5 listings เวลา 21:30 และใช้ Pinterest ดันทราฟฟิก", platform: "etsy" },
  { project: "Life Next Chapter", channels: "Facebook + YouTube Shorts", role: "แบรนด์แม่ / ห้องนั่งเล่นของแบรนด์", whatToDo: "ลงคอนเทนต์พักใจ slow life คนแก่พักใจ และวิดีโอ mood สั้น ๆ", platform: "facebook" },
  { project: "Cozy Brain Games", channels: "KDP + Etsy ร้านใหม่ในอนาคต", role: "สมุดเกมฝึกสมอง / activity book", whatToDo: "ทำหนังสือธีมเดียวต่อเล่ม เช่น Flower Garden, Tea Time, Travel Memories", platform: "kdp" },
  { project: "Life Next Planner", channels: "KDP + Etsy ร้านใหม่ในอนาคต", role: "planner / journal / checklist", whatToDo: "ทำ planner, checklist, journal และ printable bundle สำหรับชีวิตช้าลง/เกษียณ", platform: "product" },
  { project: "Life Next Guides", channels: "KDP + Etsy PDF", role: "ebook / mini guide / workbook", whatToDo: "ทำคู่มือสั้น ๆ เช่น retirement lifestyle, cozy living, hobby after retirement", platform: "neutral" }
];

const defaultStockTargets = { facebookDailyNeed: 1, youtubeWeeklyNeed: 3, etsyDailyNeed: 5, pinterestDailyNeed: 5 };
