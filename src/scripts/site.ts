/**
 * Portfolio enhancements. Everything here is progressive: the page is fully
 * readable and navigable without it. No network access, no DOM HTML sinks
 * (the CSP enforces Trusted Types with no policy allowed).
 */
import { isLang } from '../i18n/constants';
import { prefersReducedMotion, saveLang } from './preferences';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------- Toast (non-blocking notices) ---------- */
const toast = $('[data-toast]');
let toastTimer = 0;
function notify(message: string) {
  if (!toast) return;
  toast.textContent = message;
  toast.setAttribute('data-visible', '');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.removeAttribute('data-visible'), 5000);
}

/* ---------- Header: scrolled state ---------- */
const header = $('[data-header]');
if (header) {
  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 24);
    ticking = false;
  };
  update();
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

/* ---------- Mobile menu ---------- */
const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
const main = $('#main');
const footer = $('footer');
const compact = window.matchMedia('(max-width: 1023px)');

function setMenu(open: boolean, { restoreFocus = true } = {}) {
  if (!toggle || !header) return;
  toggle.setAttribute('aria-expanded', String(open));
  header.toggleAttribute('data-open', open);
  document.documentElement.classList.toggle('menu-open', open);
  const text = $('[data-menu-text]', toggle);
  const sr = $('[data-menu-sr]', toggle);
  if (text) text.textContent = (open ? text.dataset['closeText'] : text.dataset['openText']) ?? '';
  if (sr) sr.textContent = (open ? toggle.dataset['labelClose'] : toggle.dataset['labelOpen']) ?? '';
  for (const el of [main, footer]) if (el) el.inert = open;
  if (open) $<HTMLAnchorElement>('.nav__link', header)?.focus();
  else if (restoreFocus) toggle.focus();
}

if (toggle && header) {
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false);
      return;
    }
    if (event.key !== 'Tab') return;
    // keep focus inside the open menu
    const focusables = $$<HTMLElement>('a[href], button', header).filter((el) => el.offsetParent !== null);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  for (const link of $$('[data-nav-link]', header)) {
    link.addEventListener('click', () => {
      if (compact.matches) setMenu(false, { restoreFocus: false });
    });
  }
  compact.addEventListener('change', (e) => {
    if (!e.matches) setMenu(false, { restoreFocus: false });
  });
}

/* ---------- Language switch: remember the explicit choice ---------- */
for (const link of $$<HTMLAnchorElement>('[data-lang-switch]')) {
  link.addEventListener('click', (event) => {
    const lang = link.dataset['langSwitch'];
    if (!isLang(lang)) return;
    if (link.getAttribute('aria-current') === 'page') {
      event.preventDefault();
      return;
    }
    if (!saveLang(lang)) notify(toast?.dataset['storageError'] ?? '');
    // keep the reader at the same section in the other language
    const hash = window.location.hash;
    if (/^#[a-z-]+$/.test(hash)) {
      event.preventDefault();
      window.location.assign(`${link.pathname}${hash}`);
    }
  });
}

/* ---------- Active section in the navigation ---------- */
const navLinks = new Map($$<HTMLAnchorElement>('[data-nav-link]').map((a) => [a.dataset['navLink'] ?? '', a]));
const sections = $$<HTMLElement>('main > section[id]');
if (navLinks.size && sections.length) {
  let current = '';
  let pending = false;
  const spy = () => {
    pending = false;
    // the active section is the last one whose top has crossed 40% of the viewport
    const line = window.innerHeight * 0.4;
    let active = sections[0]?.id ?? '';
    for (const section of sections) if (section.getBoundingClientRect().top <= line) active = section.id;
    // at the very bottom, the last section wins even if it is short
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1]?.id ?? active;
    }
    // education belongs to the experience chapter of the navigation
    if (active === 'education') active = 'experience';
    if (active === current) return;
    current = active;
    for (const [id, link] of navLinks) {
      if (id === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  spy();
  window.addEventListener(
    'scroll',
    () => {
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(spy);
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', spy, { passive: true });
}

/* ---------- Reveal on scroll ---------- */
const reveals = $$('.reveal');
if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Skills legend: highlight by kind ---------- */
const skills = $('[data-skills]');
const legend = $('[data-skill-legend]');
if (skills && legend) {
  legend.hidden = false;
  const buttons = $$<HTMLButtonElement>('button[data-kind]', legend);
  const items = $$('.skill[data-kind]', skills);
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const kind = button.dataset['kind'] ?? 'all';
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      if (kind === 'all') skills.removeAttribute('data-highlight');
      else skills.setAttribute('data-highlight', kind);
      items.forEach((item) => item.classList.toggle('is-match', item.dataset['kind'] === kind));
    });
  }
}

/* ---------- Projects: filter by status ---------- */
const projects = $('[data-projects]');
const filters = $('[data-project-filters]');
if (projects && filters) {
  filters.hidden = false;
  const buttons = $$<HTMLButtonElement>('button[data-filter]', filters);
  const cards = $$<HTMLElement>('.card[data-status]', projects);
  const grid = $('.cards', projects);
  const empty = $('[data-project-empty]', projects);
  const live = $('[data-project-live]', projects);
  const messages: string[] = JSON.parse(projects.dataset['messages'] ?? '[]');
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const filter = button.dataset['filter'] ?? 'all';
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      let shown = 0;
      for (const card of cards) {
        const match = filter === 'all' || card.dataset['status'] === filter;
        card.hidden = !match;
        if (match) {
          shown += 1;
          card.classList.add('is-visible');
        }
      }
      if (grid) grid.hidden = shown === 0;
      if (empty) empty.hidden = shown !== 0;
      if (live) live.textContent = messages[shown] ?? '';
    });
  }
}

/* ---------- Dynamic copyright year ---------- */
const year = $('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
