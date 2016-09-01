const getUserPolyfills = (polyfills) => {
	return polyfills.reduce((userPolyfills, polyfill) => {
		if (polyfill.isNeeded) {
			const bundle = typeof polyfill.bundle === 'function' ? polyfill.bundle() : polyfill.bundle;
			if (typeof bundle !== 'undefined') {
				userPolyfills.push(bundle);
			}
		}
		return userPolyfills;
	}, []);
};

const getPolyfillsURL = (polyfillBundles, { url }) => {
	return `${url}/polyfills.js?with=${polyfillBundles.join(',')}`;
};

const getScriptLoader = () => {
	const scriptTag = document.scripts[0];
	
	const loadAsyncScript = (url) => {
		const tag = document.createElement('script');
		tag.src = url;
		tag.async = false;
		document.head.appendChild(tag);
	};
	
	const pendingScripts = [];
	const scriptStateChange = () => {
		while (pendingScripts[0] && pendingScripts[0].readyState === 'loaded') {
			const scriptToExecute = pendingScripts.shift();
			scriptToExecute.onreadystatechange = null;
			scriptTag.parentNode.insertBefore(scriptToExecute, scriptTag);
		}
	};
	const loadReadyStateScript = (url) => {
		const tag = document.createElement('script');
		pendingScripts.push(tag);
		tag.onreadystatechange = scriptStateChange;
		tag.src = url;
	};
	
	if ('async' in scriptTag) {
		return {
			load: loadAsyncScript
		};
	} else {
		return {
			load: loadReadyStateScript
		};
	}
};

export default ({ polyfills, url, scripts }) => {
	const scriptLoader = getScriptLoader();
	const userPolyfills = getUserPolyfills(polyfills);
	if (userPolyfills.length > 0) {
		console.log('fetching polyfills : ', userPolyfills.join(', ')); //eslint-disable-line
		const polyfillURL = getPolyfillsURL(userPolyfills, { url });
		scriptLoader.load(polyfillURL);
	} else {
		console.log('you dont need no polyfill'); //eslint-disable-line
	}
	scripts.forEach(scriptURL => {
		scriptLoader.load(scriptURL);
	});
};
