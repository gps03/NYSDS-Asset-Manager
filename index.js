const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = process.cwd();
const REQUIRED_DEPS = ['@nysds/components', '@nysds/styles'];

const config = {
	components: {
		src: path.join(projectDir, 'node_modules/@nysds/components/dist'),
		dest: path.join(projectDir, 'assets/js/vendor'),
		filter: (file) => file.endsWith('.js') || file.endsWith('.map'),
	},
	styles: {
		src: path.join(projectDir, 'node_modules/@nysds/styles/dist'),
		dest: path.join(projectDir, 'assets/styles/vendor'),
		filter: (file) => file.startsWith('nysds') || file === 'theme-health.css',
	},
	vscode: {
		src: path.join(projectDir, 'node_modules/@nysds/components/dist/.vscode'),
		dest: path.join(projectDir, '.vscode'),
	},
};

function validateDependencies() {
	const missing = REQUIRED_DEPS.filter((dep) => !fs.existsSync(path.join(projectDir, 'node_modules', dep)));

	if (missing.length > 0) {
		console.error('\n❌ ERROR: Missing NYSDS Dependencies');
		console.error(`Please run: npm install ${missing.join(' ')}\n`);
		process.exit(1);
	}
}

/**
 * Copies VS Code intellisense files and initializes settings.json if needed.
 */
function syncVscode() {
	const { src, dest } = config.vscode;

	if (!fs.existsSync(src)) {
		console.warn('⚠️  VS Code source files not found in @nysds/components. Skipping...');
		return;
	}

	const folderExists = fs.existsSync(dest);
	if (!folderExists) {
		fs.mkdirSync(dest, { recursive: true });

		const settingsPath = path.join(dest, 'settings.json');
		const settingsContent = {
			'html.customData': ['.vscode/vscode.html-custom-data.json'],
			'css.customData': ['.vscode/vscode.css-custom-data.json'],
		};

		fs.writeFileSync(settingsPath, JSON.stringify(settingsContent, null, 4));
		console.log('📄 Created .vscode/settings.json with custom data paths.');
	}

	const files = fs.readdirSync(src);
	files.forEach((file) => {
		fs.copyFileSync(path.join(src, file), path.join(dest, file));
	});
	console.log(`✅ VS Code: Synced ${files.length} configuration files.`);
}

function syncAssets(options = {}) {
	validateDependencies();

	// 1. Sync Standard Assets
	Object.entries(config).forEach(([name, dirConfig]) => {
		if (name === 'vscode') return; // Handled separately
		const { src, dest, filter } = dirConfig;
		if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

		const targetFiles = fs.readdirSync(src).filter((item) => {
			const fullPath = path.join(src, item);
			return fs.statSync(fullPath).isFile() && filter(item);
		});

		targetFiles.forEach((file) => {
			fs.copyFileSync(path.join(src, file), path.join(dest, file));
		});
		console.log(`✅ ${name}: Synced ${targetFiles.length} files.`);
	});

	// 2. Sync VS Code (unless ignored)
	if (!options.noVscode) {
		syncVscode();
	}
}

function updateAndSync(options = {}) {
	validateDependencies();
	console.log('🔍 Checking for @nysds updates...');
	try {
		let outdatedJson = '';
		try {
			outdatedJson = execSync('npm outdated --json', { encoding: 'utf8' });
		} catch (err) {
			outdatedJson = err.stdout;
		}

		if (outdatedJson) {
			const outdated = JSON.parse(outdatedJson);
			const nysdsUpdates = Object.keys(outdated).filter((pkg) => pkg.startsWith('@nysds/'));
			if (nysdsUpdates.length > 0) {
				console.log(`📦 Updating: ${nysdsUpdates.join(', ')}...`);
				execSync(`npm install ${nysdsUpdates.join(' ')}`, { stdio: 'inherit' });
			}
		}
	} catch (err) {
		/* No updates */
	}

	syncAssets(options);
}

module.exports = { syncAssets, updateAndSync };
