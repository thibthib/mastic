const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');
const rollupAlias = require('rollup-plugin-alias');

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

module.exports = (entry, alias) => {
	const entryConfig = {
		entry
	};
	
	if (typeof alias !== 'undefined') {
		entryConfig.plugins = [rollupAlias({
			[alias]: entry
		})];
	}
	return Object.assign(entryConfig, rollupConfig);
};
