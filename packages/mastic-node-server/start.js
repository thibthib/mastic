const mastic = require('./server.js');
const { promise } = require('mastic-polyfills/bundles');

const server = mastic({
	polyfills: [promise]
});

server.listen();
