/**
 * Language gate: loader driven by real loading stages, then language choice.
 * Without JavaScript the gate is a pair of plain links and the loader never shows.
 */
import { isLang } from '../i18n/constants';
import { prefersReducedMotion, saveLang } from './preferences';

const root = document.documentElement;
const loader = document.querySelector<HTMLElement>('[data-loader]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const percent = document.querySelector<HTMLElement>('[data-percent]');
const main = document.querySelector<HTMLElement>('#main');
const errorBox = document.querySelector<HTMLElement>('[data-gate-error]');
const reduced = prefersReducedMotion();

/** Minimum on-screen time, only so the logo reveal can complete. */
const MIN_VISIBLE_MS = reduced ? 0 : 1300;
const SAFETY_MS = 5000;

function setStage(stage: 1 | 2 | 3) {
  if (progress) progress.dataset['stage'] = String(stage);
  if (percent) percent.textContent = String(Math.round((stage / 3) * 100)).padStart(3, '0');
}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
const loaded = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

let finished = false;
function finish() {
  if (finished) return;
  finished = true;
  loader?.classList.add('is-done');
  if (main) main.inert = false;
  root.classList.add('is-ready');
}

async function boot() {
  if (root.classList.contains('is-redirecting')) return;
  if (main) main.inert = true;
  window.setTimeout(finish, SAFETY_MS);

  setStage(1); // document parsed (module scripts run after parsing)
  await document.fonts.ready.catch(() => undefined);
  setStage(2); // typefaces ready
  await loaded();
  setStage(3); // all resources loaded

  // performance.now() is the time elapsed since navigation started
  const remaining = MIN_VISIBLE_MS - performance.now();
  await wait(Math.max(0, remaining) + (reduced ? 0 : 250));
  finish();
}

/* ---------- Language choice ---------- */
for (const option of Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-choose]'))) {
  option.addEventListener('click', async (event) => {
    const lang = option.dataset['choose'];
    if (!isLang(lang)) return;
    // modifier clicks keep their native behaviour (new tab, etc.)
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    option.setAttribute('aria-busy', 'true');

    const saved = saveLang(lang);
    if (!saved && errorBox) {
      errorBox.hidden = false;
      await wait(2200); // leave time to read the notice; navigation still proceeds
    }

    if (!reduced) {
      root.classList.add('is-leaving');
      await wait(560);
    }
    window.location.assign(option.href);
  });
}

// Coming back through the history cache: reset the exit state.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    root.classList.remove('is-leaving');
    document.querySelectorAll('[aria-busy]').forEach((el) => el.removeAttribute('aria-busy'));
  }
});

void boot();
