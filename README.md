# electron-higgins

## Stack

 - App Electron 
 - Proxy NodeJs 
 - Front Backbone.js / Marionnette v3

## Inspiré par 

 - https://github.com/efeiefei/node-file-manager
 - http://demo.tutorialzine.com/2014/09/cute-file-browser-jquery-ajax-php/

## Instructions

    npm install && cd app/public && bower install

puis, revenir au dossier racine du repo, et ensuite,

    npm start

## TODO
 - Implémenter https://github.com/lorenwest/node-config
 - Gérer les filesystems unix
 - Save d'un fichier de config user
 - Liste récursive des fichiers vidéos
 - ~~Sélecteur de sous titres via addic7ed v1~~, voire d'autres parses / api en v2

## DevLog
    23/10 - Structure en place, accueil dégueu mais vue fichiers fonctionnelle
          - Côté Proxy : 
	          - Route de listage d'un répertoire fonctionnelle
	          - Route de parsage d'addic7ed pour un épisode d'une saison d'une série fonctionnelle 
	24/10 - Route de gettage des versions d'un sous titre d'un épisode d'une saison
	      d'une série OK
          - Affichage des versions OK
          - En avant Guimgamp pour le download ...