# Utiliser l'image de base Node.js
FROM node:14

# Créer le répertoire de travail de l'application
WORKDIR /

# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers de l'application dans le conteneur
COPY src/ .

# Exposer le port sur lequel votre application s'exécute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "index.js"]
