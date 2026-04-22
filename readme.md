# NYSDOH NYSDS Asset Manager
---
## Useage
<pre>$ npx nysds-sync <i>flags</i></pre>

## Install
1. Clone this repo.
1. From the root of your local copy execute: `$ npm link` (installs the Asset Manager globally)
1. CD to your project and run the asset manager from npx: `$ npx nysds-sync`

Optionally, once installed globally, execute `$ npm link nysds-asset-manager` from your project root to add the Asset Manager to your project node_modules and enable sync functions from within your project package.json:

```json
  "scripts": {
  "nysds:sync": "npx nysds-sync",
  "nysds:sync-no-editor": "npx nysds-sync --no-vscode",
  "nysds:copy": "npx nysds-sync --copy-only"
}
```

Then run the commands with npm `$ npm run nysds:*`

### Synopsis
*npx nysds-sync* [-n | --no-vscode] [-c | --copy-only] [-a | admin] [-b | business] [-e | environment] [-h | health] [-l | local] [-s | safety] [-t | transportation]

### Description
Check and update New York State Design System node modules and copy component, style, and VS Code support files into your project.

### Options
**[-n | --no-vscode]** 
: Skip VS Code intellisense autocomplete support.

**[-c | --copy-only]** 
: Skip checking for updated modules and copy files only.

**[-a | admin]**, 
**[-b | business]**, 
**[-e | environment]**, 
**[-h | health]**, 
**[-l | local]**, 
**[-s | safety]**, 
**[-t | transportation]**
: Agency themes. Only the first valid agency flag is applied—you cannot synchronize more than one agency stylesheet at a time.

NYSDS Asset Manager streamlines updating and synchronizing files from the New York State Design System node modules (@nysds/components and @nysds/styles). Upon synch the manager checks for the latest version of @nysds modules and installs updates if necessary and then synchronizes files.

#### JavaScript (components)
The manager copies all .js and .map files from **node_modules/@nysds/components/dist/** to **assets/js/vendor/** making all NYSDS components available in your project. You can adjust the destination path in index.js.

#### CSS (core styles)
The manager copies all css files that begin with nysds from **node_modules/@nysds/styles/dist** to **assets/styles/vendor/** making all relevant NYSDS styles available in your project. You can adjust the destination path in index.js.

#### VS Code Support
NYSDS provides IntelliSense support for VS Code to enable autocompletion. By default, VS Code support is included during asset synchronization.
VS Code autocomplete requires a .vscode folder at the root of your project. If this folder doesn’t exist, the manager will create it along with a settings.json file containing the NYSDS custom data keys. The manager then copies all files from **node_modules/@nysds/components/dist/.vscode/** into your project’s root **.vscode** folder.

You can disable VS Code autocomplete by passing the **--no-vscode** flag.

#### Theme (agency styles)
To include an agency stylesheet during synchronization, pass the corresponding agency flag to the command. For example:
```bash
$ npx nysds-sync -h
$ npx nysds-sync health

```
Either command will sync the theme-health.css stylesheet along with the other CSS files. Agency theme stylesheets are placed in the same destination as all other synced stylesheets.
Note that only the first valid agency flag is applied—you cannot synchronize more than one agency stylesheet at a time. Additionally, the manager does not currently remove agency stylesheets that were previously synchronized to your project.

### Troubleshooting
- Verify your node_modules global directory: **npm root -g**
- Verify global modules: **npm ls -g --depth=0**
- It is only necessary to install the module locally to use npm scripts.
- The `$ npm link` command installs the Asset Manager globally by creating a symbolic link to your local copy of this repo. NPM on windows cannot traverse drive partitions, therefore, if you intend to install the Asset Manager locally to your project (to enable npm scripts) your local copy of this repo, your global node_modules folder, and your project must all be on the same logical drive. Note you can execute npx commands without installing the Asset Manager to your project node_modules. 

