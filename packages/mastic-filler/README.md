# 🔮 mastic-filler 🌟

Automatically tests your browser for the features you want, and then fetches the polyfills

## How to use it

First, install mastic-filler as one of your dependencies :

```
npm i mastic-filler --save
```

You'll need to provide three things to mastic-filler :
* a list of polyfills to test
* an url to fetch the polyfills if needed
* a list of scripts to load and execute when the browser is polyfilled and ready to rock

```js
import filler from 'mastic-filler';
import { Promise } from 'mastic-polyfills';

filler({
	polyfills: [Promise],
	url: 'http://url.of.your.mastic.server',
	scripts: ['/assets/app.js']
});
```

## `filler()` options
### polyfills
`Array` of `Polyfill` objects

The list of polyfills the fill script will test and fetch if needed. You can import and use the ones from `mastic-polyfills`, but you can also make it work with your hand-made polyfills :

```js
import filler from 'mastic-filler';
import Polyfill, { Promise } from 'mastic-polyfills';

const isFeatureSupported = typeof feature !== 'undefined';
const myBundleName = 'feature-polyfill';
const myPolyfill = new Polyfill(isFeatureSupported, customBundleName);

filler({
	polyfills: [Promise, customPolyfill],
	url: 'http://url.of.your.mastic.server',
	scripts: ['/assets/app.js']
});
```

For more information on polyfills objects, see [the mastic-polyfills readme](https://github.com/thibthib/mastic/blob/master/packages/mastic-polyfills/README.md).

### url
`String`

The url of the server serving your polyfills bundles. See [the mastic-node-server readme](https://github.com/thibthib/mastic/blob/master/packages/mastic-node-server/README.md) for more information.

### scripts
`Array` of `String`

To be able to polyfill your browser before your app code runs, `mastic-filler` must control the script loading and executing order. It means you have to remove the scripts tags from your pages, and provide the urls to `mastic-filler`. It can be done with a global variable or anything you want.

```diff
- <script src="/assets/app.js"></script>
+ <script>window.scripts=['/assets/app.js']></script>
```
```js
filler({
	polyfills: [Promise],
	url: 'http://url.of.your.mastic.server',
	scripts: window.scripts
});
```

You can improve the loading speed of your scripts in [the browsers supporting resources preload (mainly Chrome for the moment)](http://caniuse.com/#search=preload) by adding some lines in the header of your page :
```html
<link rel="preload" href="/assets/app.js" as="script">
```

This will preload the scripts you specify without executing them, so when `mastic-filler` will want to execute them they will already be in loaded in cache.
