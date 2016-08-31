import detect from 'mastic-detect';
import { isIE } from './browser-tools.js';

export const Promise = {
	isNeeded: !detect.Promise,
	bundle: 'Promise'
};

export const fetch = {
	isNeeded: !detect.fetch,
	bundle: () => {
		if (isIE(9)) {
			return 'fetch-jsonp';
		} else {
			return 'fetch';
		}
	}
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
		if (window.navigator.language) {
			return `IntlLocale-${window.navigator.language}.js`;
		}
		return '';
	}
};

export const objectFit = {
	isNeeded: !detect.objectFit,
	bundle: 'object-fit'
};

export const objectAssign = {
	isNeeded: !detect.objectAssign,
	bundle: 'object-assign'
};
