# Cider + Vue 3 + TypeScript + Vite

**(Requires Cider 4 or later)**

This is a template/boilerplate for creating Cider plugins using Vue 3, TypeScript, and Vite.

## Starting a new plugin project
Using **Node**
```bash
npx giget github:ciderapp/plugin-template your-plugin-name
```
Using **Bun**
```bash
bunx giget github:ciderapp/plugin-template your-plugin-name
```

## Available Commands
- `npm run dev` - Start development server, Cider can then listen to this server when you select "Enable Vite for Plugins" from the main menu
- `npm run build` - Build the plugin to `dist/`
- `npm run prepare-marketplace` - Prepare a ZIP package in the correct format for the Cider Marketplace

## Plugin configuration
Edit `src/plugin.config.ts`. The build generates `dist/plugin.yml` from it, so set your plugin's metadata there.

Cider 4 only runs a plugin if its default export has a `pluginKitVersion`. `definePluginContext` from the PluginKit version this template uses (`@ciderapp/pluginkit#cider-4`) adds it for you. If Cider logs `Plugin <identifier> does not specify a pluginKitVersion, cancelling loading.`, the plugin was built with an older PluginKit: update it with `pnpm run update-pluginkit`.

## How to install after build
1. Find the folder Cider reads extensions from. **Open AppData folder** in Cider's settings (under **Extensions** or **Plugins**, depending on your version) opens it, or go there directly:
    - On Windows, this is `%APPDATA%\sh.cider.dotnet`
    - On Linux, this is `~/.config/sh.cider.genten`
2. Copy the contents of `dist/` into `plugins/<identifier>/` inside that folder (create `plugins` if it doesn't exist), e.g. `plugins/org.username.plugin-template/`.
3. In the same settings page, choose **Refresh** (or **Refresh plugins list**), or restart Cider. Your plugin shows up in the plugins list as disabled: click it and enable it. Cider doesn't run newly installed plugins until you do.

## Preparing a ZIP package for the Cider Marketplace
Run `npm run prepare-marketplace`

Running this script will create a ZIP file in the `publish` directory that is ready to be uploaded to the Cider Marketplace.

To configure this plugin edit `src/plugin.config.ts`
