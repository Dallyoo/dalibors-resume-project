# This repository is not in use anymore.
Please see this [repository](https://github.com/dallyh/astro-nomical-resume) where I used a different framework, as this one was a little bit overkill for such a simple website.

## Dalibor's Resume Project

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

## Why did I create this?
This page was created as a fun project of mine, trying to learn something more about web development, and get better with my coding skills. I decided to use ASP.NET Core Razor Pages (because I have some experience with C# and .NET in general) with combination of Blazor components. Of course I had to use JavaScript, CSS, HTML and later I decided to also incorporate TypeScript (with some libraries like jQuery) about which I didn't know anything.

I decided to start by using [Start Bootstrap](https://startbootstrap.com/theme/resume) ([Licensed under MIT](https://opensource.org/licenses/MIT)) as I did not have any previous experience on writing plain HTML, using CSS and of course with Bootstrap. I modified it for my needs, with some cool tweaks and features like ASP.NET localization, Blazor components for some of the page feautures and such.

When I initially started, I did not have much experience with web development, so this project took longer than I expected. Anyways it was a great journey (that doesn't end), and now I can say that I know a lot more than before. And what's better? I enjoyed it!
