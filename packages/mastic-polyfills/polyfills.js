import { hasPromise } from 'mastic-detect';

export const Promise = () => {
	if (hasPromise) {
		return 'Promise';
	}
};
