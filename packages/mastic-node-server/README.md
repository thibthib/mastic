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
import mastic from 'mastic-node-server';
import Polyfill, { Promise } from 'mastic-polyfills';

const isFeatureSupported = typeof feature !== 'undefined';
const bundleIdentifier = 'feature-polyfill';
const bundlePath = './path/to/my-bundle.js';
const myPolyfill = new Polyfill(isFeatureSupported, bundleIdentifier, bundlePath);

const server = mastic({
	polyfills: [Promise, myPolyfill]
});

server.listen();
```
