# 🍞 mastic-node-server 🍞

Bakes custom polyfills for each user's browser. Heavily inspired by [polyfill service](https://github.com/Financial-Times/polyfill-service)

Tastes beter with mastic-filler for computing the custom request.

## How to use it

First, install mastic-node-server as one of your dependencies :

```
npm i mastic-node-server --save
```

and then run it !

```js
const mastic = require('mastic-node-server');
const { promise } = require('mastic-polyfills/bundles');

const myPolyfillBundle = {
	name: 'feature-polyfill',
	bundlePath: './path/to/my-bundle.js'
}

const server = mastic({
	polyfills: [promise, myPolyfillBundle]
});

server.listen();
```
