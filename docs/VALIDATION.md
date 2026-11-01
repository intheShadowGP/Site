# Validation

Résultats des tests **réellement exécutés** le 2026-11-01 sur la build de production servie par `npm run serve` (en-têtes de production, HTTP local), dans le navigateur intégré (Chromium) de l'environnement de développement. Les éléments non testés sont listés comme tels.

Légende : ✅ exécuté et réussi · ⚠️ vérifié partiellement / par inspection du code · ⏳ non exécuté

| # | Test | Résultat | Détail |
| --- | --- | --- | --- |
| 1 | Routes | ✅ | `/` 200, `/fr/` 200, `/en/` 200, `/fr` → 301 `/fr/`, `/nope` 404 (page 404 bilingue), `/robots.txt` 200, `/sitemap.xml` 200, `/_headers` 404, `/.env` 404, traversée `/_assets/../../package.json` 404, `POST` 405 |
| 2 | Traductions | ✅ | `en.ts` typé contre `fr.ts` : `astro check` 0 erreur. Pages FR et EN parcourues section par section ; `<html lang>`, `<title>` et meta description localisés |
| 3 | Sélection de langue | ✅ | Clic souris sur FR → `/fr/`, `localStorage["gp.lang"] = "fr"` ; clavier (Tab ×2 + Entrée) sur EN → `/en/`, `"en"` enregistré |
| 4 | Chargement | ✅ | Loader affiché, progression 034 → 068 → 100 sur étapes réelles, disparition puis écran de langue ; retour sur `/` avec préférence → redirection directe ; `/?choose` réaffiche le choix |
| 5 | Changement de langue | ✅ | Header EN → FR depuis `/en/#projects` → `/fr/#projects`, préférence mise à jour |
| 6 | Responsive | ✅ | 375×812, 768×1024, 1024×768, 1280×800, 1440×900 : pas de défilement horizontal (vérifié à 768 : `scrollWidth` 753 ≤ 768) |
| 7 | Interactions | ✅ | Menu mobile (ouverture, `aria-expanded`, `inert` sur le contenu, Échap, retour du focus) ; filtres projets (Terminé → 0 + message vide + annonce `aria-live`, À l'étude → 5) ; légende compétences (Outil → Cisco Packet Tracer, Wireshark, Nmap) ; navigation active unique au défilement |
| 8 | Navigation clavier | ✅ | Lien d'évitement premier focus et visible, Entrée → `#main`, Tab suivant → premier bouton du hero ; options de langue atteignables et activables |
| 9 | Erreurs console | ✅ | Onglet neuf : aucune erreur sur `/`, choix de langue, `/fr/` (la seule erreur observée, « Transition was skipped », venait d'une règle `@view-transition` retirée depuis) ; sur la 404, seule l'erreur réseau 404 attendue |
| 10 | Requêtes réseau | ✅ | 11 requêtes sur `/fr/`, toutes `localhost:4322` ; 0 cookie ; seul `gp.lang` en stockage local |
| 11 | Ressources externes | ✅ | `npm run audit:dist` : aucun hôte externe (seuls les espaces de noms `w3.org` / `sitemaps.org` sont autorisés) |
| 12 | Audit des dépendances | ✅ | `npm audit` : 0 vulnérabilité ; 3 dépendances directes ; `typescript` 7 disponible mais non adopté (compatibilité `@astrojs/check`) |
| 13 | En-têtes de sécurité | ✅ | CSP, nosniff, `Referrer-Policy: no-referrer`, Permissions-Policy, `X-Frame-Options: DENY`, COOP/CORP/COEP présents sur 200, 404, 405 et `/_assets/*` ; aucune violation CSP ni Trusted Types en console. HSTS : présent dans `dist/_headers`, non testable en HTTP local |
| 14 | Données personnelles | ✅ | `audit:dist` vert ; test négatif : injection volontaire d'un e-mail, d'un script inline et d'un traceur → 7 détections, build rejetée par l'audit |
| 15 | Build de production | ✅ | `npm run verify` vert ; contrôle intégré « strict CSP compatible output verified » ; aucun `.map` ; build avec `SITE_URL` → canonical, hreflang (fr, en, x-default), sitemap et robots corrects |

## Mesures de performance indicatives (non Lighthouse)

Mesurées dans le navigateur, serveur local, cache froid, `/fr/` et `/en/` :

- LCP ≈ 370 ms (élément : texte du hero, après correction d'un fondu qui le retardait à ≈ 1,1 s)
- CLS = 0
- Poids transféré ≈ 226 Kio (polices auto-hébergées majoritaires), 11 requêtes

## Non exécuté / à faire

- ⏳ **Lighthouse** : aucun Chrome/Edge installé sur la machine de build pour lancer Lighthouse en ligne de commande. Les objectifs (Performance ≥ 95, Accessibilité ≥ 95, Bonnes pratiques ≥ 95, SEO ≥ 90) **restent à mesurer**, idéalement sur le domaine réel (DevTools → Lighthouse). Aucun score n'est revendiqué.
- ⚠️ **Sans JavaScript** : vérifié par inspection du code (loader uniquement sous `html.js`, liens natifs, contenus visibles, filtres masqués) ; non exécuté navigateur JS désactivé.
- ⚠️ **`prefers-reduced-motion`** : règles CSS et logique JS en place (animations à 1 ms, loader sans durée minimale, pas de rideau) ; non testé avec la préférence système activée.
- ⏳ Firefox et Safari non testés (Chromium uniquement).
- ⏳ Lecteur d'écran non testé (structure vérifiée : 1 `h1`, hiérarchie de titres cohérente, 0 identifiant dupliqué, 0 contrôle sans nom accessible).
- ⏳ HSTS et redirection HTTPS : à vérifier après déploiement (`curl -sI`).
