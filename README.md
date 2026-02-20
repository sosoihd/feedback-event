# Feedback Événement

Application web (PWA) pour collecter les feedbacks post-événement et générer un rapport PDF.

## Fonctionnalités

- Formulaire de feedback structuré en 7 sections (déroulé, F&B, technique, staff, photos, horaires, autres)
- Génération d'un rapport PDF avec mise en page professionnelle
- Upload de photos intégrées au PDF
- Installable sur Android comme une application native (PWA)
- Fonctionne hors connexion une fois installée
- Données sauvegardées localement dans le navigateur

## Déployer sur GitHub Pages

### Prérequis

- Un compte GitHub
- Git installé sur votre machine
- [GitHub CLI](https://cli.github.com/) installé (optionnel, facilite les commandes)

### Étapes

1. **Cloner le dépôt**

```bash
git clone https://github.com/sosoihd/feedback-event.git
cd feedback-event
```

2. **Créer votre propre repo** (si vous faites un fork)

```bash
gh repo create mon-feedback --public --source=. --push
```

3. **Activer GitHub Pages**

- Allez sur votre repo GitHub > **Settings** > **Pages**
- Dans **Source**, sélectionnez la branche `master` et le dossier `/ (root)`
- Cliquez **Save**
- Votre site sera disponible à `https://votre-username.github.io/feedback-event/`

Le déploiement prend 1 à 2 minutes après activation.

### Mettre à jour l'application

Après avoir modifié les fichiers localement :

```bash
git add .
git commit -m "Description de la modification"
git push
```

GitHub Pages se met à jour automatiquement après chaque push (1-2 min de délai).

## Installer sur Android

### Première installation

1. Ouvrir le lien de l'application dans **Chrome** sur Android
2. Chrome affiche une bannière **"Ajouter à l'écran d'accueil"** en bas de l'écran
3. Si la bannière n'apparaît pas, appuyez sur le menu **trois points (...)** en haut à droite, puis **"Installer l'application"** ou **"Ajouter à l'écran d'accueil"**
4. L'application apparaît sur l'écran d'accueil comme une app native

### Mettre à jour l'application sur Android

L'application se met à jour automatiquement grâce au Service Worker :

1. **Automatique** : à chaque ouverture de l'app, le navigateur vérifie si une nouvelle version est disponible sur GitHub Pages. Si oui, les fichiers sont mis à jour en arrière-plan. La nouvelle version sera active au **prochain lancement** de l'app.

2. **Forcer la mise à jour** : si la mise à jour ne se fait pas automatiquement :
   - Ouvrir l'app
   - Fermer complètement l'app (pas juste la minimiser)
   - Rouvrir l'app — la nouvelle version sera chargée

3. **En cas de problème** : vider le cache de Chrome pour ce site :
   - Chrome > menu **...** > **Paramètres** > **Confidentialité** > **Effacer les données de navigation**
   - Ou dans Chrome, aller sur le lien de l'app, menu **...** > **Infos sur le site** > **Effacer les données du site**
   - Puis réinstaller l'app depuis le lien

### Partager l'application avec l'équipe

Envoyez simplement le lien par WhatsApp, SMS ou email :

```
https://sosoihd.github.io/feedback-event/
```

Chaque personne pourra l'installer sur son téléphone en suivant les étapes ci-dessus.

## Structure du projet

```
feedback-event/
├── index.html      # Application complète (HTML + CSS + JS)
├── manifest.json   # Configuration PWA (nom, icônes, thème)
├── sw.js           # Service Worker (cache hors ligne)
├── icon-192.png    # Icône 192x192
├── icon-512.png    # Icône 512x512
└── README.md
```

## Notes techniques

- Application 100% front-end, aucun serveur requis
- Les feedbacks sont stockés dans le `localStorage` du navigateur (aucune donnée n'est envoyée à un serveur)
- Le PDF est généré via la fonction d'impression native du navigateur (`window.print()`)
- Compatible Chrome, Safari, Firefox, Edge (desktop et mobile)
