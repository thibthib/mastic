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
There is no API to add your custom polyfills, the only way is to fork their project. This should really be easier, as users could want to use another `Promise` polyfill instead of theirs, or simply add a polyfill not yet in their list (like the Web Animation API).

### ⚠️ User-agent detection
The user-agent detection will never be as good as a feature detection right in the browser.

### 👻 Caching
As they say themselves
> Caching responses that vary by User-Agent is very hard to do with good cache performance. We use a custom Fastly VCL configuration that separates the UA normalisation from the polyfill bundle.

It means that if I want to self-host their service with a good cache, I will have to improve my CDN game.

## Okay, so what now ?

I believe we can have a better polyfill management ! This project aims to provide tools to have the best loading of polyfills you can get :
* only the polyfills needed by the users
* in only one HTTP request
* detected direclty in the users' browsers
* configurable to allow everyone to use it

Let's make it a reality ! ➡️🛠👷

## How does mastic boost polyfills loading performance 🚀

Here's the dreamed mastic scenario :

1. The developer curates a collection of polyfills, which links features with their detection test and their polyfill. He/she can use a collection already defined for faster setup.

2. With this list, the developer starts a server able to serve custom bundles of polyfills to each user.

3. When the app's JS code is transpiled/bundled, a tool reads the code and generate a list of the features used by the app that may require a polyfill in older browsers.

4. This list is then passed as parameter to another tool which generate the code which will detect the user's browser features and download the polyfills' bundle needed by the app.

5. The developer inlines this code in his/her web page.

6. When the user loads the page, the script will detect and download the polyfills needed before executing the app's code.

7. The second time the user visits a page of the website, instead of inlining the feature detection code again to get the polyfill bundle URL, we store this URL and direclty put a script tag with it.

8. Profit 👌

mastic is composed of three main parts :
* ⚒ [a curated list of polyfills](https://github.com/thibthib/mastic/tree/master/packages/mastic-polyfills) with their [features detection tests](https://github.com/thibthib/mastic/tree/master/packages/mastic-detect)
* 🍞 a [node server able to return a custom bundles of polyfills](https://github.com/thibthib/mastic/tree/master/packages/mastic-node-server) in one request
* 👀 the inlined code that [detect the polyfills the browser needs and load them](https://github.com/thibthib/mastic/tree/master/packages/mastic-filler) before the app's code executes
