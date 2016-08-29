const { rollup } = require('rollup');
const glob = require('glob');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const path = require('path');

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
	});
});
