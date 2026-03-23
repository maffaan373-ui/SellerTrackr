// nav.js — shared navigation for all inner pages
const NAV_PAGES = [
  {href:'video-call.html',   label:'Video Call',   desc:'AI avatar in calls',   icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`},
  {href:'voice.html',        label:'Voice AI',     desc:'Talk, get voice back',  icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>`},
  {href:'video-making.html', label:'Video Make',   desc:'AI video generation',   icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`},
  {href:'pic-making.html',   label:'Pic Making',   desc:'Generate any image',    icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`},
  {href:'pricing.html',      label:'Pricing',      desc:'Plans & pricing',       icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`},
  {href:'docs.html',         label:'Docs',         desc:'API & guides',          icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`},
  {href:'mobile.html',       label:'Mobile',       desc:'iOS & Android',         icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`},
  {href:'about.html',        label:'About',        desc:'Mission & team',        icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`},
  {href:'changelog.html',    label:'Changelog',    desc:'Updates & releases',    icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`},
];

export function initNav(current) {
  const nav = document.getElementById('top-nav');
  if (!nav) return;
  const logoSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
  const gridSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="10" y="3" width="5" height="5" rx="1"/><rect x="17" y="3" width="5" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/><rect x="17" y="10" width="5" height="5" rx="1"/><rect x="3" y="17" width="5" height="5" rx="1"/><rect x="10" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/></svg>`;

  const ddItems = NAV_PAGES.map(p => `
    <a href="${p.href}" class="nav-dd-item ${p.href === current ? 'current' : ''}">
      <div class="nav-dd-icon">${p.icon}</div>
      <div class="nav-dd-label">${p.label}</div>
      <div class="nav-dd-desc">${p.desc}</div>
    </a>`).join('');

  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">${logoSvg}</div>
      <span class="nav-logo-name">Nomino</span>
    </a>
    <div class="nav-spacer"></div>
    <div class="nav-grid-btn" id="__ngb">
      ${gridSvg}
      <div class="nav-dropdown" id="__ndd">
        <div class="nav-dropdown-grid">${ddItems}</div>
      </div>
    </div>
    <a href="signup.html" class="nav-btn nav-btn-primary">Get started</a>
  `;

  const ngb = document.getElementById('__ngb');
  const ndd = document.getElementById('__ndd');
  ngb.addEventListener('click', e => {
    e.stopPropagation();
    const o = ndd.classList.contains('open');
    ndd.classList.toggle('open', !o);
    ngb.classList.toggle('open', !o);
  });
  document.addEventListener('click', () => { ndd.classList.remove('open'); ngb.classList.remove('open'); });
  ndd.addEventListener('click', e => e.stopPropagation());
}
