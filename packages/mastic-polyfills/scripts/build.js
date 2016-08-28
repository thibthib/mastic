const { rollup } = require('rollup');
const glob = require('glob');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const path = require('path');

glob('source/*.js', (er, files) => {
	files.forEach(file => {
		rollup({
			entry: file,
			plugins: [
				nodeResolve({
					jsnext: true,
					main: true
				}),
				commonjs({
					include: 'node_modules/**'
				}),
				babel({
					exclude: 'node_modules/**',
					presets: ['es2015-rollup']
				}),
				uglify()
			]
		}).then(bundle => {
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
