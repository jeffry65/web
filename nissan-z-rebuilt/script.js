const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const searchInput = document.querySelector('[data-model-search]');
const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-model-card]');

function applyFilters() {
  if (!cards.length) return;
  const search = (searchInput?.value || '').toLowerCase().trim();
  const activeButton = document.querySelector('[data-filter].active');
  const activeFilter = activeButton ? activeButton.dataset.filter : 'all';

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const era = card.dataset.era || '';
    const matchesSearch = !search || text.includes(search);
    const matchesEra = activeFilter === 'all' || era === activeFilter;
    card.style.display = matchesSearch && matchesEra ? '' : 'none';
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});
if (searchInput) searchInput.addEventListener('input', applyFilters);

const panelHeading = document.getElementById('panelHeading');
const panelBody = document.getElementById('panelBody');
const panelTags = document.getElementById('panelTags');
const hotspots = document.querySelectorAll('[data-panel-title]');
if (hotspots.length && panelHeading && panelBody && panelTags) {
  hotspots.forEach(item => {
    item.addEventListener('mouseenter', () => {
      panelHeading.textContent = item.dataset.panelTitle;
      panelBody.textContent = item.dataset.panelBody;
      panelTags.innerHTML = '';
      (item.dataset.tags || '').split('|').filter(Boolean).forEach(tag => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.textContent = tag;
        panelTags.appendChild(span);
      });
    });
    item.addEventListener('focus', () => item.dispatchEvent(new Event('mouseenter')));
  });
}
applyFilters();
