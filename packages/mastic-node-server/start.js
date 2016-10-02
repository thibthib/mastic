const mastic = require('./server.js');
const bundles = require('mastic-polyfills/bundles');

const server = mastic({
	polyfills: Object.keys(bundles).map(bundleName => bundles[bundleName])
});

server.listen();
