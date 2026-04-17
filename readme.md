# NYSDOH NYSDS Asset Manager
---
## Useage
`$ npx nysds-sync`

## Install
1. Download repo to your local system
1. From the root of your local copy execute `$ npm link` (installs the asset manager as a global package)
1. Optionally, CD to your project and execute `$ npm link nysds-asset-manager` to add to local node modules
1. Run the asset manager from npx `$ npx nysds-sync`

Alternately you can add sync functions to your scripts in your project package.json:
```json
  "scripts": {
  "nysds:sync": "npx nysds-sync",
  "nysds:sync-no-editor": "npx nysds-sync --no-vscode",
  "nysds:copy": "npx nysds-sync --copy-only"
}
```

Then run the commands with npm `$ npm run nysds:*`

### Synopsis
*npx nysds-sync* [-n | --no-vscode] [-c | --copy-only] 

### Description
Check and update New York State Design System node modules and copy component, styles, and VS Code support files into your project.

### Options
**-n**
**--no-vscode** 
: Skip VS Code intellisense autocomplete support.

**-c**
**--copy-only** 
: Skip check for updated modules and copy files only.

NYSDS Asset Manager streamlines updating and synchronizing files from the New York State Design System node modules (@nysds/components and @nysds/styles). Upon synch the manager checks for the latest version of @nysds modules and installs updates if necessary and then synchronizes files.

#### JavaScript (components)
The manager copies all .js and .map files from **node_modules/@nysds/components/dist/** to **assets/js/vendor/** making all NYSDS components available in your project. You can adjust the destination path in index.js.

#### CSS (styles)
Adapted for Department of Health projects the manager copies all css files that begin with nysds and the theme-health.css file from **node_modules/@nysds/styles/dist** to **assets/styles/vendor/** making all relevant NYSDS styles available in your project. You can adjust the destination path in index.js.

#### VS Code Support
NYSDS provides intellisense support files for VS Code to allow for autocompletion. By default VS Code support is included in asset synchronization. VS Code autocomplete requires a .vscode folder in the root of your project. If .vscode/ doesn't exist, the manager creates it and the settings.json file with the NYSDS custom data keys so VS Code recognizes the NYSDS components immediately. The manager then copies all files from **node_modules/@nysds/components/dist/.vscode/** to your root **.vscode** folder.
VS Code autocomplete can be turned off by passing the **--no-vscode** option.

### Troubleshooting
- Verify your node_modules global directory: **npm root -g**
- Verify global modules: **npm ls -g --depth=0**

