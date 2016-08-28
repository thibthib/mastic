# 🔮 mastic-fill 🌟

Automatically tests your browser for the features you want, and then fetches the polyfills

## How to use it

First, install mastic-fill as one of your dependencies :

```
npm i mastic-fill --save
```

and then import it, and specify the features you want to test. If the browser doen't have them, mastic-fill will fetch the polyfills for you.

```js
import fill from 'mastic-fill';
import { Promise } from 'mastic-polyfills';

mastic({
	polyfills: [Promise],
	url: 'http://url.of.your.mastic.server'
});
```
