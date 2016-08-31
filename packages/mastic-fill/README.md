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

fill({
	polyfills: [Promise],
	url: 'http://url.of.your.mastic.server'
});
```

you can also make it work with your polyfills : you'll have to provide a polyfill object with 

```js
import fill from 'mastic-fill';
import Polyfill, { Promise } from 'mastic-polyfills';

const myFeatureDetection = typeof feature !== 'undefined';
const myBundleName = 'my-polyfill';
const myPolyfill = new Polyfill(customFeatureDetection, customBundleName);

fill({
	polyfills: [Promise, customPolyfill],
	url: 'http://url.of.your.mastic.server'
});
```

## `fill()` options
### polyfills
`Array` of `Polyfill` objects

The list of polyfills the script will be testing and asking for if needed. For more information on polyfills objects, see [the mastic-polyfills readme](https://github.com/thibthib/mastic/blob/master/packages/mastic-polyfills/README.md).

### url
`String`

The url of the server serving your polyfills bundles. See [the mastic-server readme](https://github.com/thibthib/mastic/blob/master/packages/mastic-server/README.md) for more information.
