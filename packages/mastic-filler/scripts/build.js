const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

rollup({
	entry: './filler.js',
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup']
		}),
		uglify()
	]
}).then(bundle => {
	bundle.write({
		format: 'cjs',
		dest: 'es5-filler.js'
	});
}).catch(error => {
	console.error(error); //eslint-disable-line
});
