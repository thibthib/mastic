import { hasPromise, hasFetch } from 'mastic-detect';

export const Promise = {
	isNeeded: !hasPromise,
	bundle: 'Promise'
};

export const fetch = {
	isNeeded: !hasFetch,
	bundle: 'fetch'
};
