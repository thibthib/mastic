const getUserPolyfills = (polyfills) => {
	return polyfills.reduce((userPolyfills, polyfill) => {
		if (polyfill.isNeeded) {
			userPolyfills.push(polyfill.bundle);
		}
		return userPolyfills;
	}, []);
};

const getPolyfillsURL = (polyfillBundles, { url }) => {
	return `${url}/polyfills.js?with=${polyfillBundles.join(',')}`;
};

const loadPolyfills = (url) => {
	const tag = document.createElement('script');
	tag.setAttribute('type', 'text/javascript');
	tag.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(tag);
};

export default ({ polyfills, url }) => {
	const userPolyfills = getUserPolyfills(polyfills);
	if (userPolyfills.length > 0) {
		console.log('fetching polyfills : ', userPolyfills.join(', ')); //eslint-disable-line
		const polyfillURL = getPolyfillsURL(userPolyfills, { url });
		loadPolyfills(polyfillURL);
	} else {
		console.log('you dont need no polyfill'); //eslint-disable-line
	}
};
