# 🍞 mastic-node-server 🍞

Bakes custom polyfills for each user's browser. Heavily inspired by [polyfill service](https://github.com/Financial-Times/polyfill-service)

Tastes beter with mastic-fetcher for computing the custom request.

## How to use it

First, install mastic-node-server as one of your dependencies :

```
npm i mastic-node-server --save
```

and then run it !

```js
import mastic from 'mastic-node-server';

const server = mastic({
	//options
});

server.listen();
```
