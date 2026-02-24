#!/usr/bin/env node
const manager = require('./index');
const args = process.argv.slice(2);

const options = {
	copyOnly: args.includes('--copy-only') || args.includes('-c'),
	noVscode: args.includes('--no-vscode') || args.includes('-n')
};

if (options.copyOnly) {
	manager.syncAssets(options);
} else {
	manager.updateAndSync(options);
}
