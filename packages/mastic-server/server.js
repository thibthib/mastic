const express = require('express')();
const fs = require('fs');

const getPolyfill = (polyfillName) => {
	return new Promise((resolve, reject) => {
		const polyfillPath = require.resolve(`mastic-polyfills/bundles/${polyfillName}.js`);
		fs.readFile(polyfillPath, 'utf8', (error, contents) => {
			if (error) {
				reject();
			} else {
				resolve(contents);
			}
		});
	});
};

express.get('/polyfills.js', (request, response) => {
	const polyfills = [];
	if (request.query.with) {
		request.query.with.split(',').forEach(polyfillName => {
			console.log('getting polyfill :', polyfillName); //eslint-disable-line
			polyfills.push(getPolyfill(polyfillName));
		});
	}
	
	Promise.all(polyfills).then(polyfillsContents => {
		response.set('Content-Type', 'application/javascript;charset=utf-8');
		response.set('Access-Control-Allow-Origin', '*');
		response.send(polyfillsContents.join(''));
	}).catch(error => {
		response.send(error);
	});
});

express.listen(4000);
