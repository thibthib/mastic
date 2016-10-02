const denodeify = require('denodeify');
const { rollup } = require('rollup');
const glob = denodeify(require('glob'));
const path = require('path');
const fs = require('fs');
const readFile = denodeify(fs.readFile);
const writeFile = denodeify(fs.writeFile);
const camelcase = require('camelcase');
const chalk = require('chalk');
const getRollupConfigForEntry = require('./rollup-config.js');
const flatten = require('array-flatten');

rollup(getRollupConfigForEntry('polyfills.js'))
.then(bundle => {
	bundle.write({
		format: 'cjs',
		dest: 'es5-polyfills.js'
	});
}).catch(error => {
	console.error(error); //eslint-disable-line
});

const writeBundleExports = bundles => {
	const bundlesExports = bundles.reduce((file, bundle) => {
		return file += `\nmodule.exports.${camelcase(bundle.name)} = ${JSON.stringify(bundle)};`;
	}, '');
	return writeFile('bundles/index.js', bundlesExports).then(() => {
		console.log(`\n${chalk.dim(`🛄  Exports file with`)} ${bundles.length} bundles ${chalk.dim('generated')}`); //eslint-disable-line
	});
};

const writeRollupBundleWithName = bundleName => bundle => {
	const bundlePath = `bundles/${bundleName}`;
	return bundle.write({
		useStrict: false,
		format: 'cjs',
		dest: bundlePath
	}).then(() => {
		console.log(`📦  ${bundleName} ${chalk.dim('bundle generated')}`); //eslint-disable-line
		return {
			name: path.parse(bundleName).name,
			path: `mastic-polyfills/${bundlePath}`
		};
	});
};

const getRollupBundle = (config, bundleName) => {
	return rollup(config).then(writeRollupBundleWithName(bundleName));
};

const getBundles = ({ files, alias, bundlePrefix }) => {
	return Promise.all(files.map(file => {
		const basename = path.basename(file);
		if (basename.endsWith('-multi.js')) {
			const cleanBasename = basename.replace('-multi.js', '');
			return readFile(`source/${cleanBasename}-config.json`, 'utf8').then(filecontent => {
				const config = JSON.parse(filecontent);
				return getBundles({ files: config.files, alias: config.alias, bundlePrefix: cleanBasename });
			});
		} else {
			const rollupConfig = getRollupConfigForEntry(file, alias);
			const bundleName = `${typeof bundlePrefix !== 'undefined' ? `${bundlePrefix}-` : ''}${basename}`;
			return getRollupBundle(rollupConfig, bundleName);
		}
	}));
};

glob('source/*.js')
.then(files => ({ files }))
.then(getBundles)
.then(bundles => flatten(bundles))
.then(writeBundleExports)
.catch(error => {
	console.error(error); //eslint-disable-line
});
