const { rollup } = require('rollup');
const alias = require('rollup-plugin-alias');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('glob');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const uglify = require('rollup-plugin-uglify');

const multiConfig = {
	IntlLocale: {
		files: [
			'node_modules/intl/locale-data/jsonp/es.js',
			'node_modules/intl/locale-data/jsonp/fr.js',
			'node_modules/intl/locale-data/jsonp/it.js',
			'node_modules/intl/locale-data/jsonp/nl.js'
		],
		alias: 'intl/locale-data'
	}
};

const rollupConfig = {
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		babel({
			include: ['./*.js', 'source/**', 'node_modules/mastic-detect/**'],
			presets: ['es2015-rollup']
		}),
		uglify()
	]
};

rollup(Object.assign({
	entry: 'polyfills.js'
}, rollupConfig)).then(bundle => {
	bundle.write({
		format: 'cjs',
		dest: 'es5-polyfills.js'
	});
}).catch(error => {
	console.error(error); //eslint-disable-line
});

glob('source/*.js', (er, files) => {
	files.forEach(file => {
		if (path.basename(file).endsWith('-multi.js')) {
			const basename = path.basename(file).replace('-multi.js', '');
			const config = multiConfig[basename];
			config.files.forEach(file => {
				rollup(Object.assign({
					entry: file,
					plugins: [alias({
						[config.alias]: file
					})],
				}, rollupConfig)).then(bundle => {
					const filename = path.basename(file);
					console.log(`${filename} bundle generated`); //eslint-disable-line
					bundle.write({
						format: 'cjs',
						dest: `bundles/${basename}-${filename}`
					});
				}).catch(error => {
					console.error(error); //eslint-disable-line
				});
			});
		} else {
			rollup(Object.assign({
				entry: file
			}, rollupConfig)).then(bundle => {
				const filename = path.basename(file);
				console.log(`${filename} bundle generated`); //eslint-disable-line
				bundle.write({
					format: 'cjs',
					dest: `bundles/${filename}`
				});
			}).catch(error => {
				console.error(error); //eslint-disable-line
			});
		}
	});
});
