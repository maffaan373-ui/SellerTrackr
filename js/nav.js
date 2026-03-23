// nav.js — shared navigation with 9-dot dropdown

const NAV_PAGES = [
  { href: 'video-call.html',   label: 'Video Call',    desc: 'AI avatar in live calls', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>` },
  { href: 'voice.html',        label: 'Voice AI',      desc: 'Talk, get voice replies',  icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>` },
  { href: 'video-making.html', label: 'Video Making',  desc: 'AI-generated video',       icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>` },
  { href: 'pic-making.html',   label: 'Pic Making',    desc: 'Generate any image',       icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>` },
  { href: 'pricing.html',      label: 'Pricing',       desc: 'Plans and pricing',        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
  { href: 'docs.html',         label: 'Docs',          desc: 'API & documentation',      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` },
  { href: 'mobile.html',       label: 'Mobile App',    desc: 'iOS & Android',            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>` },
  { href: 'about.html',        label: 'About',         desc: 'Our mission & team',       icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>` },
  { href: 'changelog.html',    label: 'Changelog',     desc: 'Updates & releases',       icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
];

export function initNav(currentPage) {
  const nav = document.getElementById('top-nav');
  if (!nav) return;

  const currentFile = window.location.pathname.split('/').pop() || currentPage;

  const gridIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="5" height="5" rx="1"/><rect x="10" y="3" width="5" height="5" rx="1"/>
    <rect x="17" y="3" width="5" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1"/>
    <rect x="10" y="10" width="5" height="5" rx="1"/><rect x="17" y="10" width="5" height="5" rx="1"/>
    <rect x="3" y="17" width="5" height="5" rx="1"/><rect x="10" y="17" width="5" height="5" rx="1"/>
    <rect x="17" y="17" width="5" height="5" rx="1"/>
  </svg>`;

  const logoSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  const ddItems = NAV_PAGES.map(p => `
    <a href="${p.href}" class="nav-dd-item ${p.href === currentFile ? 'current' : ''}">
      <div class="nav-dd-icon">${p.icon}</div>
      <div class="nav-dd-label">${p.label}</div>
      <div class="nav-dd-desc">${p.desc}</div>
    </a>
  `).join('');

  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">${logoSvg}</div>
      <span class="nav-logo-name">Nomino</span>
    </a>
    <div class="nav-spacer"></div>
    <div class="nav-grid-btn" id="nav-grid-btn" title="All features">
      ${gridIcon}
      <div class="nav-dropdown" id="nav-dropdown">
        <div class="nav-dropdown-grid">${ddItems}</div>
      </div>
    </div>
  `;

  const gridBtn = document.getElementById('nav-grid-btn');
  const dropdown = document.getElementById('nav-dropdown');

  gridBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    dropdown.classList.toggle('open', !isOpen);
    gridBtn.classList.toggle('open', !isOpen);
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    gridBtn.classList.remove('open');
  });

  dropdown.addEventListener('click', e => e.stopPropagation());
}
