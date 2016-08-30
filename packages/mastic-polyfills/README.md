# mastic-polyfills

Collection of polyfills

## How to use it

First, install mastic-polyfills as one of your dependencies :

```
npm i mastic-polyfills --save
```

and then you can import and apply the polyfill you want in your project

```js
import 'mastic-polyfills/Promise.js';
```

## List of polyfills

* **Animations** : `web-animations-js/web-animations-next.min.js` from https://github.com/web-animations/web-animations-js
* **classList** : `dom-shims/shim/Element.classList` from https://github.com/necolas/dom-shims
* **fetch** : `whatwg-fetch` from https://github.com/github/fetch
* **Intl** : `intl` from https://github.com/andyearnshaw/Intl.js/
* **object-fit** : `object-fit-images` from https://github.com/bfred-it/object-fit-images
* **Promise** : `promise/lib/es6-extensions.js` from https://github.com/then/promise
