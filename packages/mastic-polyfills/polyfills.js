import { hasPromise } from 'mastic-detect';

export const Promise = {
	isNeeded: !hasPromise,
	bundle: 'Promise'
};
