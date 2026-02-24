#!/usr/bin/env node
const manager = require('./index');
const args = process.argv.slice(2);

const options = {
	copyOnly: args.includes('--copy-only'),
	noVscode: args.includes('--no-vscode'),
};

if (options.copyOnly) {
	manager.syncAssets(options);
} else {
	manager.updateAndSync(options);
}
