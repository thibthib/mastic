# mastic
🎯 Set of tools to step up your polyfill game

### Isn't my polyfill game up enough ?

Well, I don't know you but mine surely wasn't ! 🙃

Nowadays, the simplest method to polyfill a feature is to bundle the polyfill's code with the app's code. If this is a good polyfill, it will fallback to the native features when the browser supports them. And this works pretty well !

But if an app uses many (great) features, it will come with many polyfills, and its final bundle size will increase significantly. And if an user loads this app with a recent browser supporting most of theses features natively, it will have to download quite a lot of useless code. 😭😵

To optimize this, the app can load the polyfills only if it needs them by detecting if the features are present in the browser. With modules bundlers like Webpack, it doesn't take much to do to conditionally and asynchronously load bits of code :

```js
if (typeof feature !== 'function') {
    require.ensure(['feature'], require => {
		const feature = require('feature');
	});
}
```

✨ TADA ! ✨ Now all the polyfills are loaded on-demand and only if needed. The sad user now downloads only necessary code 😍

But, as you can imagine, this isn't quite optimized enough : old browsers will make quite a lot of HTTP requests to get all the polyfills it needs. And as polyfills have to be loaded before the app's code is executed, it can slow down the user exeperience a lot, especially on mobile where network can be fluctuating. 🐌👎

I suppose you can see where I'm going now : I want to load only the polyfills I need, in one request.
