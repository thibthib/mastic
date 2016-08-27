# mastic-detect

Collection of feature detection tests

## How to use it

First, install mastic-detect as one of your dependencies :

```
npm i mastic-detect --save
```

and then you can import it in your project

```js
import detect from 'mastic-detect';

if (detect.Promise) {
	// yay ! Promises are here ❤️
}
```

you can also import only the test you want

```js
import { hasPromise } from 'mastic-detect';

if (hasPromise) {
	// yay ! Promises are here ❤️
}
```
