import detect from 'mastic-detect';

export const Promise = {
	isNeeded: !detect.Promise,
	bundle: 'Promise'
};

export const fetch = {
	isNeeded: !detect.fetch,
	bundle: 'fetch'
};

export const classList = {
	isNeeded: !detect.classList,
	bundle: 'classList'
};

export const animations = {
	isNeeded: !detect.animations,
	bundle: 'animations'
};

export const Intl = {
	isNeeded: !detect.Intl,
	bundle: 'Intl'
};

export const IntlLocale = {
	isNeeded: !detect.Intl,
	bundle: () => {
		return `IntlLocale-${window.navigator.language}.js`;
	}
};
