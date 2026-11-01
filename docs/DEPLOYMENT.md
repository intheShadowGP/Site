# Déploiement

Le site est un dossier statique (`dist/`). N'importe quel hébergeur de fichiers statiques convient ; le critère décisif est la **possibilité de définir des en-têtes HTTP** (CSP, HSTS…).

## 1. Construire

```bash
npm ci
SITE_URL=https://votre-domaine.tld npm run verify
```

Sous PowerShell :

```powershell
$env:SITE_URL = "https://votre-domaine.tld"; npm run verify
```

`verify` enchaîne : vérification TypeScript → build (avec contrôle CSP intégré) → audit de `dist/` → `npm audit`. Ne publiez que si les quatre étapes passent.

## 2. Tester la production localement

```bash
npm run serve
```

Ouvre `http://localhost:4322` avec les mêmes en-têtes que la production (hors HSTS et `upgrade-insecure-requests`, inutiles en HTTP local). Vérifier dans les outils de développement : aucune erreur console, aucune violation CSP, aucune requête vers un autre domaine.

## 3. Choisir un mode d'hébergement

| Option | En-têtes | Remarque |
| --- | --- | --- |
| **Netlify / Cloudflare Pages** | `dist/_headers` (généré au build) est lu automatiquement | Le plus simple. Vérifier la politique de journaux du fournisseur. |
| **VPS + Caddy** | `deploy/Caddyfile` | TLS automatique, pas de journal d'accès par défaut. Contrôle maximal. |
| **VPS + nginx** | `deploy/nginx.conf` | `access_log off` dans l'exemple. |
| **Hébergement mutualisé Apache** | `deploy/apache.htaccess` → copier en `dist/.htaccess` | Nécessite `mod_headers` et `mod_rewrite`. |
| **GitHub Pages** (configuré) | ❌ en-têtes non configurables | Workflow `.github/workflows/deploy.yml`. Seules la CSP et la politique de référent en `<meta>` s'appliquent : pas de `frame-ancestors`, `Permissions-Policy`, COOP/CORP/COEP ni HSTS personnalisé (HTTPS assuré par GitHub). |

### GitHub Pages (déploiement actuel)

Le dépôt `intheShadowGP/Site` est publié sur `https://intheshadowgp.github.io/Site/`.

1. Dépôt GitHub → **Settings → Pages → Build and deployment → Source : GitHub Actions** (une seule fois).
2. Chaque push sur `main` lance `npm run verify` puis publie `dist/`. Un échec (types, CSP, audit, vulnérabilité npm) bloque la mise en ligne.
3. Le site est servi sous le sous-chemin `/Site` : le workflow définit `BASE_PATH=/Site` et `SITE_URL=https://intheshadowgp.github.io`.
   Avec un domaine personnalisé : mettre `BASE_PATH: /` et `SITE_URL` sur le domaine.
4. Test local identique : `BASE_PATH=/Site npm run build` puis `BASE_PATH=/Site npm run serve` → `http://localhost:4322/Site/`.

Limite : sur un site de projet, `robots.txt` n'est pas lu par les moteurs (ils ne lisent que celui de la racine du domaine) ; soumettre `…/Site/sitemap.xml` directement si besoin.

`config/security.mjs` est la source unique de la politique. Si vous la modifiez, reportez la modification dans les exemples de `deploy/` (le fichier `_headers` est, lui, régénéré automatiquement).

## 4. Domaine et TLS

- Activer HTTPS (Let's Encrypt via Caddy/Certbot, ou certificat du fournisseur).
- Rediriger HTTP → HTTPS (inclus dans les exemples).
- HSTS est à `max-age=63072000; includeSubDomains`. N'ajoutez `preload` (et l'inscription sur hstspreload.org) que si **tous** les sous-domaines sont durablement en HTTPS : c'est difficilement réversible.
- Activer la protection WHOIS / la confidentialité du titulaire chez le registrar (voir `PRIVACY.md`).
- Optionnel : enregistrement DNS `CAA` limitant l'émission de certificats à votre autorité (ex. `0 issue "letsencrypt.org"`).

## 5. Après la mise en ligne

1. Vérifier les en-têtes : `curl -sI https://votre-domaine.tld/fr/`
2. Tester avec un outil d'analyse d'en-têtes (ex. Mozilla HTTP Observatory) — **ce test envoie l'URL publique à un service tiers** ; à faire en connaissance de cause.
3. Mesurer Lighthouse (Chrome DevTools → Lighthouse, ou `npx lighthouse https://votre-domaine.tld/fr/`) et reporter les scores réels dans `VALIDATION.md`.
4. Dérouler `SECURITY-CHECKLIST.md`.

## Mettre à jour

```bash
npm outdated
npm update
npm run verify
```

Les versions sont épinglées (`save-exact`) et `.npmrc` désactive les scripts d'installation des dépendances (`ignore-scripts=true`) pour limiter le risque de chaîne d'approvisionnement.
