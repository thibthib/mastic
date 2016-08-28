# 🍞 mastic-server 🍞

Bakes custom polyfills for each user's browser. Heavily inspired by [polyfill service](https://github.com/Financial-Times/polyfill-service)

Tastes beter with mastic-fill for computing the custom request.

## How to use it

First, install mastic-server as one of your dependencies :

```
npm i mastic-server --save
```

and then run it !

```js
import mastic from 'mastic-server';

const server = mastic({
	//options
});

server.listen();
```
