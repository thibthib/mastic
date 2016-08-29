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
