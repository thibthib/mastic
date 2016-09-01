# mastic-polyfills

Collection of polyfills intended to be used by [mastic-node-server](https://github.com/thibthib/mastic/tree/master/packages/mastic-node-server) and [mastic-fetcher](https://github.com/thibthib/mastic/tree/master/packages/mastic-fetcher)

## How to use it

First, install mastic-polyfills as one of your dependencies :

```
npm i mastic-polyfills --save
```

and then you can import the polyfills you want to pass to mastic-node-server or mastic-fetcher

```js
import { Promise } from 'mastic-polyfills';
```

## List of polyfills

### Animations
`web-animations-js/web-animations-next.min.js` from [web-animations/web-animations-js](https://github.com/web-animations/web-animations-js)

[See browser support](https://github.com/web-animations/web-animations-js/blob/master/docs/support.md#browser-support)
### classList
`dom-shims/shim/Element.classList` from [necolas/dom-shims](https://github.com/necolas/dom-shims)

[See browser support](https://github.com/necolas/dom-shims#browser-support)

### fetch
`whatwg-fetch` from [github/fetch](https://github.com/github/fetch)

[See browser support](https://github.com/github/fetch#browser-support)
### fetch-jsonp
`fetch-jsonp` from [camsong/fetch-jsonp](https://github.com/camsong/fetch-jsonp)

This is to support a your fetch calls in <IE10

[See browser support](https://github.com/camsong/fetch-jsonp#browser-support)
### Intl
`intl` from [andyearnshaw/Intl.js](https://github.com/andyearnshaw/Intl.js)

[See browser support](https://github.com/andyearnshaw/Intl.js#compatibility)

### Object.assign
`object-assign` from [sindresorhus/object-assign](https://github.com/sindresorhus/object-assign)

[See browser support](https://github.com/sindresorhus/object-assign/issues/9)

### object-fit
`object-fit-images` from [bfred-it/object-fit-images](https://github.com/bfred-it/object-fit-images)

[See browser support](https://github.com/bfred-it/object-fit-images#object-fit-images)

### Promise
`promise/lib/es6-extensions.js` from [then/promise](https://github.com/then/promise)

[See browser support](https://github.com/then/promise#installation)
