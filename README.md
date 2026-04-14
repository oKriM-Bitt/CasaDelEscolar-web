1. ¿Qué es realmente node_modules?
Tu profe te pidió usar ExpressJS. Express no viene instalado por defecto en tu 
computadora ni en Node.js; es una herramienta externa.
Cuando nosotros tiramos el comando npm install express, Node.js fue a internet, 
descargó Express y lo guardó adentro de la carpeta node_modules.

Es decir: node_modules ES Express. Si la borrás, dejás de tener Express 
en tu proyecto y ya no estarías cumpliendo con el punto 2.1 de la guía.

2. El archivo package.json
El punto 2.3 pide que el proyecto sea "fácil de mantener y escalar". 
El archivo package.json es la receta de tu proyecto. Ahí es donde dice "este proyecto necesita 
Express para funcionar". Es la forma oficial y profesional de organizar un proyecto en Node.js.

3. ¿Por qué lo ocultamos en GitHub entonces?
Como futuro analista en sistemas, esto te va a servir como regla de oro para toda tu carrera: 
el código de terceros (librerías) nunca se sube a un repositorio.

Tu profe cuando corrija tu trabajo, va a bajar tu código desde GitHub, 
va a ver tu archivo package.json, va a abrir su propia terminal y va a escribir npm install.
 Ahí su computadora le va a crear su propia carpeta node_modules para que el servidor le funcione. 
Por eso armamos el .gitignore
