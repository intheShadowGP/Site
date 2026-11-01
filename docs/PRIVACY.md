# Confidentialité

Ce site applique *Privacy by Design* : il ne collecte rien, ne trace rien et ne publie que le pseudonyme **GP**. Ce document décrit honnêtement ce qui est protégé, ce qui reste visible et comment réduire ce qui peut l'être.

> **Aucune anonymisation totale n'est garantie.** Un site public expose toujours des informations techniques. L'objectif est la minimisation, pas l'invisibilité.

## Ce que le site ne fait pas

- Aucun cookie, aucun traceur, aucune mesure d'audience, aucun fingerprinting.
- Aucune requête vers un domaine tiers (polices, scripts, images auto-hébergés — vérifié par `npm run audit:dist` et par la CSP `default-src 'none'` + `connect-src 'none'`).
- Aucun formulaire, aucune API, aucun backend.
- `Referrer-Policy: no-referrer` : les liens sortants ne transmettent pas l'adresse de la page.

## Seule donnée stockée chez le visiteur

`localStorage["gp.lang"] = "fr" | "en"` — enregistré uniquement après un choix explicite de langue, jamais transmis. Ce n'est pas un cookie et il n'est pas envoyé au serveur. Le visiteur peut l'effacer via son navigateur.

## Ce qui reste visible (et ne peut pas être masqué par le site)

| Élément | Visible par | Comment réduire |
| --- | --- | --- |
| Adresse IP du serveur | Tout le monde (DNS) | Hébergeur / CDN : l'IP est celle du fournisseur, pas la vôtre. Ne jamais héberger chez soi. |
| Nom de domaine | Tout le monde | Choisir un nom sans lien avec l'identité civile. |
| Titulaire du domaine (WHOIS/RDAP) | Tout le monde si non protégé | Activer la protection de confidentialité du registrar. En `.fr`, les données des particuliers sont masquées par défaut par l'AFNIC ; elles restent connues du registrar et communicables sur réquisition. |
| Certificat TLS | Journaux publics Certificate Transparency | Contient le(s) nom(s) de domaine — jamais d'information personnelle si le certificat est de type DV (Let's Encrypt). Éviter les certificats OV/EV qui incluent une identité. |
| En-têtes HTTP | Tout le monde | Nécessaires ; `server_tokens off` / `-Server` masquent les versions logicielles. |
| Journaux de l'hébergeur | Hébergeur (et autorités sur réquisition) | Choisir un hébergeur à journaux minimaux, désactiver les journaux d'accès quand c'est possible (exemples `deploy/`). |
| Compte chez l'hébergeur / registrar | Ces prestataires | Utiliser une adresse e-mail dédiée sous pseudonyme, activer la 2FA. |
| Métadonnées Git (si dépôt public) | Tout le monde | Configurer `user.name`/`user.email` du dépôt sur un pseudonyme et une adresse *noreply* avant le premier commit. |

## Choisir un hébergeur respectueux de la vie privée

Critères :

1. Possibilité de définir les en-têtes HTTP (CSP, HSTS).
2. Politique de journaux publiée et courte (ou désactivable).
3. Juridiction et localisation des données (UE de préférence pour le RGPD).
4. Pas d'injection de scripts (analytics, bannières) par la plateforme.
5. Authentification forte (2FA) sur le compte.

Un VPS européen avec Caddy (`deploy/Caddyfile`, sans journal d'accès) offre le contrôle maximal ; Netlify et Cloudflare Pages sont plus simples mais journalisent côté fournisseur.

## Canal de contact

Le site n'affiche ni e-mail, ni téléphone, ni adresse, ni profil personnel. Pour ouvrir un canal :

- créer un canal **dédié, sous pseudonyme GP**, sans lien avec les comptes personnels (adresse e-mail d'alias, messagerie chiffrée avec identifiant de pseudonyme, etc.) ;
- vérifier qu'il ne révèle ni nom civil ni numéro de téléphone (certaines messageries exposent le numéro par défaut) ;
- le renseigner dans `src/config/site.ts` → `CONTACT_CHANNEL`, ajouter son domaine à `allowedHosts` dans `scripts/audit-dist.mjs` (sinon l'audit le signale comme hôte externe), puis `npm run verify`.

Un formulaire de contact n'est pas possible sans serveur ou sans service tiers qui recevrait les messages : il a donc été volontairement écarté.

## Vérifier qu'aucune donnée personnelle n'est publiée

`npm run audit:dist` recherche dans `dist/` : adresses e-mail, numéros de téléphone, coordonnées GPS, chemins locaux, nom du compte système, traceurs, hôtes externes, source maps, code inline, formulaires et métadonnées PNG.

Pour ajouter vos propres termes interdits (nom civil, ville, employeur…) **sans les écrire dans le dépôt** : créez `private/forbidden-terms.txt` (dossier ignoré par Git), un terme par ligne. L'audit échouera si l'un d'eux apparaît.

## Images

Les PNG du site sont générés par `scripts/generate-icons.mjs` (sharp), sans EXIF/XMP/texte. Toute image ajoutée manuellement doit être nettoyée avant publication (ex. `exiftool -all= image.jpg`) ; l'audit signale les formats photo et les blocs de métadonnées PNG.
