#!/usr/bin/env node
const manager = require('./index');
const args = process.argv.slice(2);

const options = {
	copyOnly: args.includes('--copy-only') || args.includes('-c'),
	noVscode: args.includes('--no-vscode') || args.includes('-n'),
	theme: args.includes('admin') || args.includes('-a') ||
				 args.includes('business') || args.includes('-b') ||
				 args.includes('environment') || args.includes('-e') ||
				 args.includes('health') || args.includes('-h') ||
				 args.includes('local') || args.includes('-l') ||
				 args.includes('safety') || args.includes('-s') ||
				 args.includes('transportation') || args.includes('-t')
};

if (options.copyOnly) {
	manager.syncAssets(options);
} else {
	manager.updateAndSync(options);
}
