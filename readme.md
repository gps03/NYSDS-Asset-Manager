# NYSDOH NYSDS Asset Manager
---
## Useage
`$ npx nysds-sync`

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
Check and update New York State Design System node modules and copy component, styles, and VS Code support files into your project.

### Options
**-n**
**--no-vscode** 
: Skip VS Code intellisense autocomplete support.

**-c**
**--copy-only** 
: Skip check for updated modules and copy files only.

**-a**
**admin**
**-b**
**business**
**-e**
**environment**
**-h**
**health**
**-l**
**local**
**-s**
**safety**
**-t**
**transportation**
: Agency themes. The manager only respects the first agency flag, that is you cannot sync two or more agency stylesheets in one project.

NYSDS Asset Manager streamlines updating and synchronizing files from the New York State Design System node modules (@nysds/components and @nysds/styles). Upon synch the manager checks for the latest version of @nysds modules and installs updates if necessary and then synchronizes files.

#### JavaScript (components)
The manager copies all .js and .map files from **node_modules/@nysds/components/dist/** to **assets/js/vendor/** making all NYSDS components available in your project. You can adjust the destination path in index.js.

#### CSS (styles)
The manager copies all css files that begin with nysds from **node_modules/@nysds/styles/dist** to **assets/styles/vendor/** making all relevant NYSDS styles available in your project. You can adjust the destination path in index.js.

#### VS Code Support
NYSDS provides intellisense support files for VS Code to allow for autocompletion. By default VS Code support is included in asset synchronization. VS Code autocomplete requires a .vscode folder in the root of your project. If .vscode/ doesn't exist, the manager creates it and the settings.json file with the NYSDS custom data keys so VS Code recognizes the NYSDS components immediately. The manager then copies all files from **node_modules/@nysds/components/dist/.vscode/** to your root **.vscode** folder.
VS Code autocomplete can be turned off by passing the **--no-vscode** option.

#### Theme (styles)
Include an agency stylesheet in the sync by passing the flag for the sheet you want, e.g., `$ npx nysds-sync -h` or `$ npx nysds-sync health` will cause the theme-health.css stylesheet to be synced with other css files. Theme stylesheets share the same destination as other stylesheets. Note that the manager will only include the first valid flag, you cannot syncronize more than one agency stylesheet. At this time the manager does not remove stylesheets you have previously synchronized to your project.

### Troubleshooting
- Verify your node_modules global directory: **npm root -g**
- Verify global modules: **npm ls -g --depth=0**
- It is only necessary to install the module locally to use npm scripts.
- The `$ npm link` command installs the Asset Manager globally by creating a symbolic link to your local copy of this repo. NPM on windows cannot traverse drive partitions, therefore, if you intend to install the Asset Manager locally to your project (to enable npm scripts) your local copy of this repo, your global node_modules folder, and your project must all be on the same logical drive. Note you can execute npx commands without installing the Asset Manager to your project node_modules. 

