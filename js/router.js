window.LN = window.LN || {};
LN.routes = {
  '/': { render: LN.renderToday },
  '/calendar': { render: LN.renderCalendar, bind: LN.bindCalendar },
  '/facebook': { render: LN.renderFacebook, bind: LN.bindFacebook },
  '/youtube': { render: LN.renderYoutube, bind: LN.bindYoutube },
  '/etsy': { render: LN.renderEtsy },
  '/pinterest': { render: LN.renderPinterest },
  '/kdp': { render: LN.renderKdp, bind: LN.bindProductRecords },
  '/products': { render: LN.renderProducts, bind: LN.bindProductRecords },
  '/seasonal': { render: LN.renderSeasonal },
  '/guide': { render: LN.renderGuide },
  '/settings': { render: LN.renderSettings, bind: LN.bindSettings }
};
LN.navigate = (route, push=true) => {
  route = route || '/'; if(!LN.routes[route]) route='/';
  if(push && location.hash !== '#'+route) location.hash = route;
  LN.setActiveNav(route);
  const app = document.getElementById('app');
  app.innerHTML = LN.routes[route].render();
  LN.routes[route].bind?.();
  window.scrollTo({top:0,behavior:'instant'});
};
window.addEventListener('hashchange',()=>LN.navigate(location.hash.replace('#','')||'/', false));
window.addEventListener('DOMContentLoaded',()=>{ LN.renderSidebar(); LN.navigate(location.hash.replace('#','')||'/', false); });
