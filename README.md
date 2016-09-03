# mastic
🎯 Set of tools to step up your polyfill game

## What's to improve ?

Nowadays, the simplest method to polyfill a feature is to bundle the polyfill's code with the app's code. If this is a good polyfill, it will fallback to the native features when the browser supports them. And this works pretty well !

But if an app uses many (great) features, it will come with many polyfills, and its final bundle size will increase significantly. And if an user loads this app with a recent browser supporting most of theses features natively, it will have to download quite a lot of useless code. 😭😵

## Feature detection and async loading

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

I suppose you can see where I'm going now : I want to load only the polyfills I need, in one request. And this is already possible with the following solution :

## polyfill.io

This is super simple, as the only thing needed is this script tag :

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
```
Based on the user-agent that the browser sends when requesting this script, polyfill.io will return only the polyfills need. The response can be tailored to return only the features your app uses. This solution is open-source, and can be self-hosted. ✅ 

You can see their documentation at [polyfill.io](https://polyfill.io/v2/docs/) and their repository at [Financial-Times/polyfill-service](https://github.com/Financial-Times/polyfill-service)

But.

This solution has several flaws to me :

### ❌ Custom polyfills
It doesn't seem possible to add your custom polyfills, but only to use the provided list of polyfills. It really is a no-go, as I might rather use another `Promise` polyfill instead of theirs, or simply add a polyfill not yet in their list (like the Web Animation API).

### ⚠️ User-agent detection
The user-agent detection will never be as good as a feature detection right in the browser.

### 👻 Caching
As they say themselves
> Caching responses that vary by User-Agent is very hard to do with good cache performance. We use a custom Fastly VCL configuration that separates the UA normalisation from the polyfill bundle.

It means that if I want to self-host their service with a good cache, I will have to improve my CDN game.

## Okay, so what now ?

Let's build our own ! This project aims to provide tools to have the best loading of polyfills you can get :
* only the polyfills needed by the users
* in only one HTTP request
* detected direclty in the users' browsers
* configurable to allow everyone to use it

❤️👏
