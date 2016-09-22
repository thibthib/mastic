const express = require('express');
const fs = require('fs');
const defaultPolyfills = require('mastic-polyfills');

export default ({ polyfills = defaultPolyfills }) => {
	const polyfillsMap = polyfills.reduce((map, polyfill) => {
		map.set(polyfill.identifier, polyfill);
	}, new Map());
	
	const getPolyfill = (polyfillIdentifier) => {
		return new Promise((resolve, reject) => {
			const polyfill = polyfillsMap.get(polyfillIdentifier);
			if (typeof polyfill.bundle === 'undefined') {
				const bundlePath = require.resolve(polyfill.bundlePath);
				fs.readFile(bundlePath, 'utf8', (error, contents) => {
					if (error) {
						reject(error);
					} else {
						polyfill.bundle = contents;
						polyfillsMap.set(polyfillIdentifier, polyfill);
						resolve(contents);
					}
				});
			} else {
				resolve(polyfill.bundle);
			}
		});
	};
	
	const server = express();
	server.get('/polyfills.js', (request, response) => {
		const polyfillsToLoad = [];
		if (request.query.with) {
			request.query.with.split(',').forEach(polyfillIdentifier => {
				polyfillsToLoad.push(getPolyfill(polyfillIdentifier));
			});
		}
		
		Promise.all(polyfillsToLoad).then(polyfillsContents => {
			response.set('Content-Type', 'application/javascript;charset=utf-8');
			response.set('Access-Control-Allow-Origin', '*');
			response.send(polyfillsContents.join(''));
		}).catch(error => {
			console.error(error); //eslint-disable-line
			response.send(error);
		});
	});
	
	return server;
};
