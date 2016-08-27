import { Promise } from 'mastic-detect';

export default () => {
	if (!Promise) {
		return 'promise/lib/es6-extensions.js';
	}
};
