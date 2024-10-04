# Angular - Electron Forge

This repo is a reference implementation of an Angular 18 app working in Electron.

Electron is integrated using Electron Forge, and [this is why](https://www.electronforge.io/core-concepts/why-electron-forge).

As the monorepo is a [Nx workspace](https://nx.dev), it is simple to add more apps, if needed, as explained below.

## Features

* Angular 18
  * Eslint w/ Prettier
    * Custom rules can be added to [eslint.custom.config.js](apps/angular-electron-forge/eslint.custom.config.js)
  * Tailwind
    * Configuration file is [tailwind.config.js](apps/angular-electron-forge/tailwind.config.js)
* Electron
  * Electron Forge
  * [Security best practices](https://www.electronjs.org/docs/latest/tutorial/security)
    * [preload.ts](apps/electron/src/lib/preload.ts) can expose APIs to the renderer process (ie. web apps) and [cannot import files](https://www.electronjs.org/docs/latest/tutorial/sandbox#preload-scripts)
    * [index.ts](apps/electron/src/lib/index.ts) is the entry point of the main process
  * Dependencies
    * Add dependencies of the main process to [this package.json](apps/electron/package.json), in addition to the root one

## `npm` scripts

### Development

The *dev* command is `start`:

1. Start Angular app in serve/watch mode
1. Build the Electron app in watch mode
1. Start Electron as soon as the Angular app is ready

So you can use:

```sh
npm start
```

### Electron forge build

The following scripts has been setup to leverage the [Electron Forge Build Lifecycle](https://www.electronforge.io/core-concepts/build-lifecycle):

* `npm run electron:package`
* `npm run electron:make`
* `npm run electron:publish`

## Nx tasks

✨ This is a [Nx workspace](https://nx.dev) ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created.

### Angular / Web app

To run the dev server for your app, use:

```sh
npx nx serve angular-electron-forge
```

To create a production bundle:

```sh
npx nx build angular-electron-forge
```

To see all available targets to run for a project, run:

```sh
npx nx show project angular-electron-forge
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

#### Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Electron

To see all available targets to run for a project, run:

```sh
npx nx show project electron
```
