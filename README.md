# GP — Systems & Network Security

Portfolio professionnel bilingue (FR/EN), statique et *privacy-first*, publié sous le seul pseudonyme **GP**.

- **Astro 7 + TypeScript**, sortie 100 % statique, aucun backend, aucune base de données, aucune API.
- **Aucune ressource externe** : polices, icônes, scripts et styles sont servis depuis le domaine.
- **Aucun cookie, aucun traceur.** Seule donnée stockée : la langue choisie (`localStorage`, clé `gp.lang`), uniquement après un clic explicite.
- **CSP stricte sans `unsafe-inline` ni `unsafe-eval`**, Trusted Types imposés, vérification automatique à chaque build.

---

## Prérequis

- Node.js ≥ 22.12 (testé avec Node 26.13 LTS)
- npm ≥ 10

## Commandes

| Action | Commande |
| --- | --- |
| Installer | `npm ci` (ou `npm install` la première fois) |
| Serveur de développement | `npm run dev` → http://localhost:4321 |
| Vérification des types | `npm run check` |
| Construire le site | `npm run build` → `dist/` |
| Tester la production **avec les en-têtes de sécurité réels** | `npm run serve` → http://localhost:4322 |
| Audit du site généré (données perso, traceurs, hôtes externes, code inline, métadonnées) | `npm run audit:dist` |
| Audit des dépendances | `npm run audit:deps` |
| Tout enchaîner avant publication | `npm run verify` |

> `npm run preview` (serveur Astro) fonctionne aussi mais **n'applique pas** les en-têtes HTTP ; utilisez `npm run serve` pour tester la CSP.

Optionnel : `SITE_URL=https://votre-domaine npm run build` active l'URL canonique, les URL Open Graph et le sitemap. Sans `SITE_URL`, ils sont omis plutôt que de pointer vers un domaine fictif.

`BASE_PATH=/Site` sert le site sous un sous-chemin (GitHub Pages de projet : `https://intheshadowgp.github.io/Site/`). Le déploiement GitHub Pages est automatisé par `.github/workflows/deploy.yml` (voir `docs/DEPLOYMENT.md`).

---

## Parcours

1. **`/` — Loading screen** : logo tracé, ligne rouge/or, indicateur `INITIALIZING INTERFACE`. La progression suit des étapes réelles (document analysé → polices prêtes → ressources chargées), sans faux délai ; durée minimale ≈ 1,3 s pour laisser le tracé du logo se terminer, réduite à zéro si `prefers-reduced-motion`.
2. **`/` — Sélection de langue** : `WELCOME TO GP` / `SELECT YOUR LANGUAGE`, deux boutons typographiques FR / EN. Au clic : enregistrement local, transition rideau, ouverture du portfolio.
3. **`/fr/` et `/en/` — Portfolio** : Accueil, À propos, Compétences, Expérience, Formation & certifications, Laboratoire technique, Contact.

Un visiteur qui a déjà choisi est redirigé directement vers sa langue ; `/?choose` réaffiche l'écran de choix. La langue reste modifiable depuis le header et le footer (la section en cours est conservée).

**Replis** : sans JavaScript, le loader n'apparaît jamais, les boutons de langue sont de simples liens, le menu devient une ligne défilante, tout le contenu est visible. Si le stockage local est indisponible, un message bilingue l'indique et la navigation continue.

---

## Architecture

```
config/security.mjs          Source unique de la politique HTTP (CSP, HSTS, Permissions-Policy…)
integrations/security-hardening.mjs
                             Hook de build : écrit dist/_headers, supprime les artefacts,
                             échoue si du code inline (script/style/handler) apparaît
scripts/serve.mjs            Serveur local de production avec les vrais en-têtes
scripts/audit-dist.mjs       Audit pré-publication de dist/
scripts/generate-icons.mjs   Génère favicons PNG + image Open Graph (sans métadonnées)
deploy/                      Exemples nginx, Caddy, Apache
docs/                        Déploiement, confidentialité, checklist, validation
public/                      Fichiers servis tels quels (boot.js, favicon, manifest)
src/
  config/site.ts             Identité publique (GP) et canal de contact optionnel
  i18n/                      Système de traduction centralisé (fr.ts = référence typée, en.ts)
  data/                      Contenu structuré bilingue : skills, experience, education, projects
  components/                Un composant par section, aucun composant dupliqué par langue
  layouts/BaseLayout.astro   <head> : CSP meta, SEO, hreflang, préchargement des polices
  pages/index.astro          Loader + sélection de langue
  pages/[lang]/index.astro   Portfolio (généré pour fr et en)
  pages/404.astro            Erreur bilingue
  scripts/                   Améliorations progressives (TypeScript, bundlé en fichiers externes)
  styles/global.css          Design system : tokens, typographie, boutons, mouvements
  assets/fonts/              Polices auto-hébergées (sous-ensemble latin, licences OFL dans licenses/)
```

### Traductions

- Interface : `src/i18n/fr.ts` définit la forme du dictionnaire ; `src/i18n/en.ts` est typé contre elle — une clé manquante casse `npm run check`.
- Contenu : chaque texte de `src/data/*.ts` est un objet `{ fr, en }`.
- Les composants reçoivent `lang` et lisent `t(lang)` / `pick(valeur, lang)`.

### Ajouter ou faire évoluer un projet

Éditer `src/data/projects.ts`. Statuts : `draft` (à l'étude), `in-progress`, `completed`. Règles :
ne jamais passer un projet en `completed` avant qu'il soit réalisé et documenté, ne jamais ajouter de lien vers un dépôt qui n'existe pas. `published: false` garde une fiche sans la publier.

### Ajouter une certification

`src/data/education.ts` → `certifications`, avec `status: 'preparing'` tant qu'elle n'est pas obtenue.

### Publier un canal de contact

`src/config/site.ts` → `CONTACT_CHANNEL`. Laisser `null` tant qu'aucun canal pseudonyme n'est validé (voir `docs/PRIVACY.md`).

---

## Design system (résumé)

| Rôle | Valeur |
| --- | --- |
| Fond dominant | `#080808` / `#111111` |
| Accent rouge (marqueurs, états actifs) | `#8E151B` / `#C62832` |
| Accent or (index, bordures, survol) | `#C5A45A` / `#E2C98C` |
| Texte secondaire | `#AEB2B7` |
| Texte principal | `#E8E6E1` |
| Titres | Cormorant Garamond (300–500) |
| Texte | Manrope (variable) |
| Données / labels | JetBrains Mono (variable) |

Grille éditoriale 3/9 colonnes, filets de 1 px, angles vifs, sceau rouge (clin d'œil au *hanko* japonais) repris du logo. Animations : apparition légère au défilement, tracé du logo, un seul reflet métallique ; toutes neutralisées par `prefers-reduced-motion`.

---

## Documentation

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — hébergement, en-têtes, domaine
- [docs/PRIVACY.md](docs/PRIVACY.md) — ce qui reste visible, hébergeur, WHOIS, journaux
- [docs/SECURITY-CHECKLIST.md](docs/SECURITY-CHECKLIST.md) — checklist avant mise en ligne
- [docs/VALIDATION.md](docs/VALIDATION.md) — tests exécutés et résultats réels

## Licences

Code : tous droits réservés (GP). Polices : SIL Open Font License 1.1 (`src/assets/fonts/licenses/`).
