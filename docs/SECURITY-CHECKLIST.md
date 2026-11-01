# Checklist sécurité avant mise en ligne

À dérouler à chaque publication. Cocher uniquement ce qui a été **réellement vérifié**.

## Contenu et confidentialité

- [ ] Aucun nom civil, e-mail personnel, téléphone, adresse, photo, CV original dans `src/`, `public/` ni `dist/`
- [ ] `private/forbidden-terms.txt` à jour (nom civil, ville, employeurs…) et `npm run audit:dist` vert
- [ ] Aucun projet marqué `completed` sans être réellement réalisé ; aucun lien vers un dépôt inexistant
- [ ] Aucune certification présentée comme obtenue si elle est en préparation
- [ ] `CONTACT_CHANNEL` = `null` ou canal pseudonyme validé
- [ ] Images ajoutées nettoyées de leurs métadonnées

## Build

- [ ] `npm run verify` passe intégralement (types, build, audit dist, audit npm)
- [ ] Le build affiche `strict CSP compatible output verified; _headers written`
- [ ] Aucun fichier `.map`, `.env`, `.git`, `.log` dans `dist/`
- [ ] `SITE_URL` défini sur le vrai domaine (canonical, Open Graph, sitemap)

## Test local de production (`npm run serve`)

- [ ] Console vide (aucune violation CSP / Trusted Types)
- [ ] Onglet Réseau : uniquement des requêtes vers `localhost:4322`
- [ ] Parcours loader → choix de langue → portfolio fonctionnel en FR et en EN
- [ ] Changement de langue depuis le header et le footer
- [ ] Menu mobile : ouverture, fermeture (Échap), focus piégé, retour du focus
- [ ] Navigation clavier complète, lien d'évitement visible au focus
- [ ] Rendu correct en 375 px, 768 px, ≥ 1280 px, sans défilement horizontal

## Serveur / hébergeur

- [ ] HTTPS actif, redirection HTTP → HTTPS
- [ ] `curl -sI https://domaine/fr/` montre : `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy`, `X-Frame-Options: DENY` (et `frame-ancestors 'none'` dans la CSP)
- [ ] Les en-têtes sont aussi présents sur la page 404 et sur `/_assets/*`
- [ ] `/_headers`, `/.env`, `/.git/` renvoient 404
- [ ] Pas de bannière de version serveur (`Server`, `X-Powered-By`)
- [ ] Journaux d'accès désactivés ou minimisés ; durée de rétention connue
- [ ] 2FA activée sur les comptes hébergeur, registrar et dépôt de code

## Domaine

- [ ] Protection WHOIS / confidentialité du titulaire activée
- [ ] Certificat de type DV (aucune identité dans le certificat)
- [ ] Optionnel : enregistrement `CAA`
- [ ] Optionnel : `preload` HSTS seulement après réflexion (quasi irréversible)

## Dépendances

- [ ] `npm audit` : 0 vulnérabilité
- [ ] `npm outdated` revu ; mises à jour testées avant publication
- [ ] Aucune dépendance ajoutée sans nécessité (3 paquets directs : `astro`, `@astrojs/check`, `typescript`)

## Après publication

- [ ] Lighthouse mesuré sur le domaine réel (objectifs : Performance ≥ 95, Accessibilité ≥ 95, Bonnes pratiques ≥ 95, SEO ≥ 90) et scores reportés dans `VALIDATION.md`
- [ ] Analyse d'en-têtes externe effectuée si souhaitée (envoie l'URL à un tiers)
