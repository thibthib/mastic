const express = require('express')();
const fs = require('fs');

const getPolyfill = (polyfillName) => {
	return new Promise((resolve, reject) => {
		const polyfillPath = require.resolve(`mastic-polyfills/bundles/${polyfillName}.js`);
		fs.readFile(polyfillPath, 'utf8', (error, contents) => {
			if (error) {
				reject(error);
			} else {
				resolve(contents);
			}
		});
	});
};

express.get('/polyfills.js', (request, response) => {
	const polyfills = [];
	if (request.query.with) {
		console.log('getting polyfills :', request.query.with); //eslint-disable-line
		request.query.with.split(',').forEach(polyfillName => {
			polyfills.push(getPolyfill(polyfillName));
		});
	}
	
	Promise.all(polyfills).then(polyfillsContents => {
		response.set('Content-Type', 'application/javascript;charset=utf-8');
		response.set('Access-Control-Allow-Origin', '*');
		response.send(polyfillsContents.join(''));
	}).catch(error => {
		console.log(error); //eslint-disable-line
		response.send(error);
	});
});

express.listen(4000);
