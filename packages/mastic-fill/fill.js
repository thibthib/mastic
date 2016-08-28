const getUserPolyfills = (polyfills) => {
	return polyfills.reduce((userPolyfills, getPolyfill) => {
		const polyfill = getPolyfill();
		if (typeof polyfill !== 'undefined') {
			userPolyfills.push(polyfill);
		}
		return userPolyfills;
	}, []);
};

const getPolyfillsURL = (polyfills, { url }) => {
	return `${url}/polyfills.js?with=${polyfills.map(polyfill => polyfill.name).join(',')}`;
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
		const polyfillURL = getPolyfillsURL(userPolyfills, { url });
		loadPolyfills(polyfillURL);
	}
};
