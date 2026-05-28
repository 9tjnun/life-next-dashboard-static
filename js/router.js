function route(){
  const active = (location.hash || '#today').slice(1);
  renderNav(active);
  if(active==='today') return renderToday();
  if(active==='calendar') return renderCalendar();
  if(active==='facebook') return facebookPage();
  if(active==='youtube') return youtubePage();
  if(active==='etsy') return etsyPage();
  if(active==='pinterest') return pinterestPage();
  if(active==='kdp') return kdpPage();
  if(active==='products') return productsPage();
  if(active==='seasonal') return seasonalPage();
  if(active==='guide') return guidePage();
  if(active==='settings') return settingsPage();
  renderToday();
}
window.addEventListener('hashchange', route);
route();
