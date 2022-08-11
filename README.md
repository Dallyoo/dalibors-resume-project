# Dalibor's Resume Project

For propper function you need to have Node.JS with NPM installed.

Clone this repository and run npm install under /Resume folder. This will install all the required NPM dependencies

After that there is a webpack configuration. This configuration can be run in multiple ways:
- npm run build-dev
  - Development build of static assets. Assets are not minified.
- npm run build-prod
  - Production build of static assets. Assets are minified and hashed.
- npm run dev-watch
  - Webpack watcher, that watches for changes on static source files (SCSS, TS...)

Either of those creates static files under wwwroot directory.

MSBuild automatically runs Webpack build tasks depending on configuration (Debug = build-dev, release = build-prod). Also please take into account launch profiles:
- When building for production, use profile **Resume PROD**.
- When buidling for development (debug), use profile **Resume DEV**.

This is because on production and development there are different paths to static files, depending on which profile is used, the application takes into account *ASPNETCORE_ENVIRONMENT* variable, and sets the paths to the files automatically (minified and hashed for production, and non minified/hashed for development).
