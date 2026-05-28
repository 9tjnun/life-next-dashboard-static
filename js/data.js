window.LN = window.LN || {};
LN.channelLinks = {
  pinterest: "https://www.pinterest.com/byetension/",
  etsy: "https://www.etsy.com/shop/ByeTension",
  youtube: "https://www.youtube.com/@LifeNextChapterCozy",
  facebook: "https://www.facebook.com/LifeNextChapter/"
};
LN.platformMeta = {
  facebook: { label: "Facebook", short: "FB", color: "c-fb", soft: "soft-fb", dot: "var(--fb)", full: "fb" },
  youtube: { label: "YouTube", short: "YT", color: "c-yt", soft: "soft-yt", dot: "var(--yt)", full: "yt" },
  etsy: { label: "Etsy", short: "Etsy", color: "c-etsy", soft: "soft-etsy", dot: "var(--etsy)", full: "etsy" },
  pinterest: { label: "Pinterest", short: "Pin", color: "c-pin", soft: "soft-pin", dot: "var(--pin)", full: "pin" },
  kdp: { label: "KDP", short: "KDP", color: "c-kdp", soft: "soft-kdp", dot: "var(--kdp)", full: "kdp" },
  product: { label: "Product", short: "Prod", color: "c-product", soft: "soft-product", dot: "var(--product)", full: "product" },
  ebook: { label: "Ebook", short: "Ebook", color: "c-ebook", soft: "soft-ebook", dot: "var(--ebook)", full: "ebook" },
  neutral: { label: "General", short: "Gen", color: "text-muted", soft: "soft", dot: "#94a3b8", full: "light" }
};
const dailyCore = [
  { id: "facebook-post", platform: "facebook", title: "Facebook post", detail: "ลงแคปชั่นพักใจ 1 โพสต์" },
  { id: "etsy-5", platform: "etsy", title: "Etsy 5 listings", detail: "ลง ByeTension 5 listings เวลา 21:30" },
  { id: "pinterest-pins", platform: "pinterest", title: "Pinterest pins", detail: "ลง 3–5 pins" }
];
LN.weeklyTemplate = [
  { dayIndex: 1, day: "จันทร์", focus: "Wall Art Production", morning: "ทำ wall art / mockup / SEO / เตรียม listing", night: "ลง ByeTension 5 listings เวลา 21:30 + บันทึกงาน", tasks: [...dailyCore] },
  { dayIndex: 2, day: "อังคาร", focus: "Product Creation / Stock", morning: "ทำ activity book / planner / printable แบบไม่กดดัน หรือเติม stock งานขาย", night: "ลง Etsy 5 listings + จด record", tasks: [...dailyCore, { id: "product-work", platform: "product", title: "Product work", detail: "ทำหน้า activity book / planner / checklist / ebook แบบสะสม stock" }] },
  { dayIndex: 3, day: "พุธ", focus: "Shorts + Reels", morning: "เตรียม short video / เลือกภาพ / ทำ caption", night: "ลง Shorts 1 คลิป + Reels + Etsy 5 listings", tasks: [...dailyCore, { id: "youtube-short", platform: "youtube", title: "YouTube Short / Reels", detail: "ลง Shorts 1 คลิป และกระจายลง Reels" }] },
  { dayIndex: 4, day: "พฤหัส", focus: "Planner / Checklist", morning: "ทำ checklist หรือ planner printable 1 ชิ้น", night: "ลง Etsy 5 listings + บันทึก record", tasks: [...dailyCore, { id: "product-printable", platform: "product", title: "Printable work", detail: "ทำ checklist หรือ planner printable 1 ชิ้น" }] },
  { dayIndex: 5, day: "ศุกร์", focus: "QA + Shorts", morning: "ตรวจไฟล์ SEO mockup listing package", night: "ลง Shorts 1 คลิป + Etsy 5 listings", tasks: [...dailyCore, { id: "youtube-short", platform: "youtube", title: "YouTube Short / Reels", detail: "ลง Shorts 1 คลิป และกระจายลง Reels" }, { id: "qa-files", platform: "product", title: "QA files", detail: "ตรวจไฟล์ / SEO / mockup" }] },
  { dayIndex: 6, day: "เสาร์", focus: "Batch + Distribute", morning: "งานเบา / จัด Pinterest batch ถ้ามีแรง", night: "ลง Etsy 5 listings + Facebook post", tasks: [...dailyCore, { id: "batch-content", platform: "product", title: "Batch content", detail: "เตรียม stock คอนเทนต์ล่วงหน้า" }] },
  { dayIndex: 0, day: "อาทิตย์", focus: "Review + Scheduled Publish Slots", morning: "รีวิวสัปดาห์ / เติม stock ที่ใกล้หมด / เช็กงานรอบอาทิตย์", night: "เตรียมแผนสัปดาห์หน้า + Etsy 5 listings", tasks: [...dailyCore, { id: "youtube-short", platform: "youtube", title: "YouTube Short / Reels", detail: "ลง Shorts หรือเตรียมคลิปสัปดาห์หน้า" }, { id: "weekly-review", platform: "product", title: "Weekly review", detail: "เช็ก KDP / Etsy ร้านใหม่ / Ebook pipeline" }] }
];
LN.seasonalGuide = [
  { month: 1, monthName: "มกราคม", theme: "New Year Reset", ideas: "fresh start planner, habit tracker, reset checklist, home organization", themes: [
    { title: "Fresh Start / Reset", desc: "planner, goal sheet, habit tracker, yearly reset checklist, simple routine printable" },
    { title: "Home Organization", desc: "declutter checklist, pantry labels, cleaning plan, storage planner, home command center" },
    { title: "Winter Calm", desc: "snowy window view, tea corner, cozy reading, soft neutral wall art, winter activity book" },
    { title: "Wellness After Holidays", desc: "gentle self-care, sleep routine, water tracker, low-stress reflection pages" }
  ] },
  { month: 2, monthName: "กุมภาพันธ์", theme: "Love & Home", ideas: "self-love, cozy home, couple gift, soft floral", themes: [
    { title: "Self-Love / Gentle Care", desc: "self-care checklist, affirmation cards, gratitude journal, calming quote print" },
    { title: "Home & Couple Gift", desc: "cozy home wall art, soft floral printable, couple memory page, warm neutral decor" },
    { title: "Friendship / Family Love", desc: "family note cards, grandparent printable, kindness prompts, small gift bundle" },
    { title: "Soft Florals", desc: "rose, peony, blush botanical, muted pink cottage flower wall art" }
  ] },
  { month: 3, monthName: "มีนาคม", theme: "Spring Garden", ideas: "flowers, garden, renewal, spring activity pages", themes: [
    { title: "Spring Garden", desc: "flower garden wall art, seed starting checklist, garden journal, cottage bloom activity pages" },
    { title: "Renewal / Light Routine", desc: "spring cleaning, morning checklist, fresh weekly planner, gentle reset workbook" },
    { title: "Birds & Nature", desc: "small bird prints, nest, garden visitor, botanical nature decor" },
    { title: "Easter Prep", desc: "soft Easter floral, pastel activity sheets, family calm printables, non-childish holiday decor" }
  ] },
  { month: 4, monthName: "เมษายน", theme: "Easter / Cottage Bloom", ideas: "cottage bloom, floral, Easter calm, soft colors", themes: [
    { title: "Easter Calm", desc: "soft Easter wall art, spring table printable, bunny-free floral alternatives, calm holiday cards" },
    { title: "Cottage Bloom", desc: "wildflower meadow, cottage garden window, flower basket, vintage botanical print" },
    { title: "Rainy Day Cozy", desc: "rain window view, tea time activity book, indoor hobby checklist, quiet afternoon journal" },
    { title: "Garden Planning", desc: "plant tracker, watering checklist, seed inventory, garden habit printable" }
  ] },
  { month: 5, monthName: "พฤษภาคม", theme: "Mother’s Day / Garden Life", ideas: "gift, flowers, gratitude, mother’s day printable", themes: [
    { title: "Mother’s Day Gift", desc: "floral wall art, gratitude letter, memory page, printable gift bundle, soft quote card" },
    { title: "Garden Life", desc: "garden bench, flower pot, birdbath, slow morning garden scene" },
    { title: "Tea & Flowers", desc: "tea table still life, vase flowers, cottage kitchen print, cozy afternoon planner" },
    { title: "Retirement Gentle Gift", desc: "peaceful new chapter print, hobby tracker, slow living checklist, calm home decor" }
  ] },
  { month: 6, monthName: "มิถุนายน", theme: "Summer Slow Living", ideas: "garden, lake, quiet morning, summer wall art, flower activity book", themes: [
    { title: "Summer Garden", desc: "hydrangea, wildflower, garden path, cottage porch, flower activity book" },
    { title: "Lake / Quiet Morning", desc: "lake window view, dock chair, sunrise coffee, calm landscape wall art" },
    { title: "Travel Window Views", desc: "seaside window, countryside window, balcony view, slow travel printable decor" },
    { title: "Light Hobby Season", desc: "reading tracker, bird watching log, garden journal, gentle puzzle book theme" }
  ] },
  { month: 7, monthName: "กรกฎาคม", theme: "Travel Memories", ideas: "travel window view, seaside, vacation memory, slow travel", themes: [
    { title: "Travel Memories", desc: "travel journal, memory page, postcard printable, map-free soft travel bundle" },
    { title: "Seaside / Coastal Calm", desc: "quiet beach chair, coastal cottage window, shell still life, soft blue wall art" },
    { title: "Countryside Escape", desc: "farmhouse view, meadow road, picnic basket, summer field print" },
    { title: "Family Visit / Grandkids", desc: "visit planner, activity checklist, summer memory pages, simple games printable" }
  ] },
  { month: 8, monthName: "สิงหาคม", theme: "Cozy Home Reset", ideas: "home planner, cottage room, declutter checklist, cozy corner", themes: [
    { title: "Home Reset", desc: "declutter checklist, room-by-room planner, linen closet tracker, home routine printable" },
    { title: "Cozy Corner", desc: "reading nook wall art, armchair scene, lamp and books still life, quiet room decor" },
    { title: "Back To Routine", desc: "weekly routine, meal planner, gentle productivity, simple dashboard printable" },
    { title: "Late Summer Florals", desc: "sunflower muted style, dried flowers, garden harvest, warm botanical print" }
  ] },
  { month: 9, monthName: "กันยายน", theme: "Autumn Prep", ideas: "fall decor, gratitude sheet, autumn wall art, warm routine", themes: [
    { title: "Autumn Prep", desc: "fall planner, seasonal checklist, home refresh, warm routine tracker" },
    { title: "Fall Wall Art", desc: "autumn leaves, pumpkin-free cottage scene, warm landscape, soft brown botanical" },
    { title: "Cozy Kitchen", desc: "tea, bread, apple bowl, warm still life, printable recipe cards" },
    { title: "Gratitude Warm-Up", desc: "daily gratitude page, reflection prompt, family memory sheet, cozy journal" }
  ] },
  { month: 10, monthName: "ตุลาคม", theme: "Cozy Fall", ideas: "tea, pumpkins, leaves, indoor hobbies, fall coloring book", themes: [
    { title: "Cozy Fall Decor", desc: "tea and books, leaf branch, pumpkin still life, warm cottage wall art" },
    { title: "Indoor Hobbies", desc: "knitting, puzzle, reading, journaling, cozy brain games activity book" },
    { title: "Soft Halloween", desc: "non-scary autumn decor, vintage candle, moody window, adult fall printable" },
    { title: "Fall Coloring / Puzzle", desc: "large print word search, coloring pages, number search, autumn theme activity book" }
  ] },
  { month: 11, monthName: "พฤศจิกายน", theme: "Gratitude", ideas: "Thanksgiving, gratitude journal, family calm, thankful prompts", themes: [
    { title: "Gratitude Journal", desc: "thankful prompts, gratitude tracker, reflection pages, calm family journal" },
    { title: "Thanksgiving Calm", desc: "warm table still life, family gathering checklist, non-noisy holiday printable" },
    { title: "Cozy Gift Prep", desc: "gift list, printable tags, holiday planner, small digital bundle" },
    { title: "Warm Home Decor", desc: "candle, tea, window light, amber leaves, vintage wall art" }
  ] },
  { month: 12, monthName: "ธันวาคม", theme: "Christmas Calm", ideas: "soft holiday, winter calm, Christmas activity book, cozy gifts", themes: [
    { title: "Christmas Calm", desc: "soft holiday wall art, pine branch, berry still life, warm cottage Christmas decor" },
    { title: "Winter Activity Book", desc: "large print word search, coloring pages, reflection pages, cozy indoor games" },
    { title: "Giftable Printables", desc: "gift tags, planner pages, memory cards, cozy bundle, printable small gifts" },
    { title: "Year-End Reflection", desc: "reflection journal, memory pages, yearly review, new chapter planning" }
  ] }
];
LN.projectMap = [
  { project: "ByeTension", channels: "Etsy + Pinterest", role: "ร้านวอลอาร์ท / printable wall art", whatToDo: "ลง wall art วันละ 5 listings เวลา 21:30 และใช้ Pinterest ดันทราฟฟิก", platform: "etsy" },
  { project: "Life Next Chapter", channels: "Facebook + YouTube Shorts", role: "แบรนด์แม่ / ห้องนั่งเล่นของแบรนด์", whatToDo: "ลงคอนเทนต์พักใจ slow life คนแก่พักใจ และวิดีโอ mood สั้น ๆ", platform: "facebook" },
  { project: "Cozy Brain Games", channels: "KDP + Etsy ร้านใหม่ในอนาคต", role: "สมุดเกมฝึกสมอง / activity book", whatToDo: "ทำหนังสือธีมเดียวต่อเล่ม เช่น Flower Garden, Tea Time, Travel Memories", platform: "kdp" },
  { project: "Life Next Planner", channels: "KDP + Etsy ร้านใหม่ในอนาคต", role: "planner / journal / checklist", whatToDo: "ทำ planner, checklist, journal และ printable bundle สำหรับชีวิตช้าลง/เกษียณ", platform: "product" },
  { project: "Life Next Guides", channels: "KDP + Etsy PDF", role: "ebook / mini guide / workbook", whatToDo: "ทำคู่มือสั้น ๆ เช่น retirement lifestyle, cozy living, hobby after retirement", platform: "neutral" }
];
LN.defaultStockTargets = { facebookDailyNeed: 1, youtubeWeeklyNeed: 3, etsyDailyNeed: 5, pinterestDailyNeed: 5 };
LN.menu = [
  { href: "#/", label: "วันนี้", icon: "⌂", cls: "light" }, { href: "#/calendar", label: "ปฏิทิน", icon: "◷", cls: "light" },
  { href: "#/facebook", label: "Facebook", icon: "f", cls: "fb" }, { href: "#/youtube", label: "YouTube", icon: "▶", cls: "yt" },
  { href: "#/etsy", label: "Etsy", icon: "▣", cls: "etsy" }, { href: "#/pinterest", label: "Pinterest", icon: "P", cls: "pin" },
  { href: "#/kdp", label: "KDP", icon: "▤", cls: "kdp" }, { href: "#/products", label: "Product", icon: "▦", cls: "light" },
  { href: "#/seasonal", label: "Seasonal", icon: "✦", cls: "light" }, { href: "#/guide", label: "Guide", icon: "☑", cls: "light" },
  { href: "#/settings", label: "Settings", icon: "⚙", cls: "light" }
];
